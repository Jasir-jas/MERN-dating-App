import React, { useContext, useEffect, useState, useRef } from 'react';
import styles from './PersonalMessages.module.css';
import { Link, useParams } from 'react-router-dom';
import { fetchMessageProfile } from '../../Services/PersonalMessageAPI';
import LoadingPage from "../../Components/LoadingPage/LoadingPage";
import io from 'socket.io-client';
import { UserContext } from '../../Components/Context/UserContext';
import { chatImagesAPI } from '../../Services/chattingImagesAPI';
const socket = io('http://localhost:4000', {
    transports: ['websocket'],
    withCredentials: true,
});

const PersonalMessages = () => {
    const { user } = useContext(UserContext);
    const { profileId } = useParams();
    const [name, setName] = useState('');
    const [loading, setLoading] = useState(true);
    const [inputMessage, setInputMessage] = useState('');
    const [messages, setMessages] = useState([]);
    const [file, setFile] = useState(null)
    const [imagePreview, setImagePreview] = useState(null)
    const messagesEndRef = useRef(null);
    const fileInputRef = useRef(null)

    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
    };

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await fetchMessageProfile(profileId);
                if (response && response.success) {
                    console.log('messageProfile:', response.profileName);
                    setName(response.profileName);
                } else {
                    console.log('Error fetching profiles');
                }
            } catch (error) {
                console.log('Services not responded', error);
            } finally {
                setLoading(false);
            }
        };
        fetchProfile();

        if (user && user._id && profileId) {
            socket.emit('register', user._id);

            // Load previous messages for the conversation
            socket.emit('load conversation', { senderId: user._id, receiverId: profileId });

            socket.on('load previous messages', (previousMessages) => {
                if (Array.isArray(previousMessages)) {
                    setMessages(previousMessages);
                    scrollToBottom();
                } else {
                    console.error('Expected array for previousMessages, but received:', previousMessages);
                }
            });

            socket.on('chat message', (msg) => {
                if (msg.senderId === user._id || msg.receiverId === user._id) {
                    setMessages((prevMessages) => [...prevMessages, msg]);
                    scrollToBottom();
                }
            });

            socket.on('error', (error) => {
                console.error('Socket error:', error);
            });

            return () => {
                socket.off('chat message');
                socket.off('load previous messages');
                socket.off('error');
            };
        }
    }, [user, profileId]);


    useEffect(scrollToBottom, [messages]);

    const handleSendMessage = async () => {
        if (inputMessage.trim() || file) {
            let messageData = {
                senderId: user._id,
                receiverId: profileId,
                text: inputMessage,
                attachments: []
            };

            if (file) {
                try {
                    const formData = new FormData();
                    formData.append('attachments', file);
                    const response = await chatImagesAPI(formData);
                    messageData.attachments = [response.imageUrl];
                } catch (error) {
                    console.error('Error uploading file:', error);
                    // Handle error (e.g., show a message to the user)
                    return;
                }
            }
            socket.emit('sendMessage', messageData);
            setInputMessage('');
            setFile(null);
            setImagePreview(null);
        }
    };


    const handleKeyPress = (e) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const handleFileChange = (e) => {
        const selectedFile = e.target.files[0]
        if (selectedFile && selectedFile.type.startsWith('image/')) {
            setFile(selectedFile)

            // Generate a preview for the selected image
            const reader = new FileReader()
            reader.onloadend = () => {
                setImagePreview(reader.result)  // Show image preview
            }
            reader.readAsDataURL(selectedFile)
        }
    }
    const handleFileButtonClick = () => {
        fileInputRef.current.click()
    }

    const formatMessageDate = (messageDate) => {
        const messageDateObj = new Date(messageDate)
        const today = new Date()

        today.setHours(0, 0, 0, 0)
        const yesterday = new Date(today.getDate() - 1)

        if (messageDateObj >= today) {
            return 'Today'
        } else if (messageDateObj >= yesterday) {
            return 'Yesterday'
        } else {
            return messageDateObj.toLocaleDateString()
        }
    }
    if (loading && !user) {
        return <LoadingPage />;
    }

    const messageEmpty = !inputMessage && !file
    let lastMessageDate = null
    return (
        <div className={styles.chatContainer}>
            <header className={styles.header}>
                <button className={styles.backButton}>
                    <Link to='/userhome' style={{ textDecoration: 'none', color: 'white' }}>
                        <i className="fas fa-less-than"></i>
                    </Link>
                </button>
                <h1 className={styles.contactName}>{name}</h1>
                <button className={styles.callButton}>☎</button>
            </header>

            <div className={styles.chatArea}>
                {messages.map((msg, index) => {
                    const currentMessageDate = new Date(msg.createdAt);
                    const showDate =
                        !lastMessageDate || currentMessageDate.toDateString() !== lastMessageDate.toDateString(); // Only show date if it's different from the last message's date

                    lastMessageDate = currentMessageDate; // Update the last message date

                    return (
                        <React.Fragment key={index}>
                            {showDate && (
                                <div className={styles.dateIndicator}>{formatMessageDate(msg.createdAt)}</div>
                            )}

                            <div className={styles.messageWrapper}>
                                <div
                                    className={`${styles.message} ${msg.senderId === user._id ? styles.sent : styles.received}`}
                                >
                                    {msg.attachments && msg.attachments.length > 0 ? (
                                        <div className={styles.imageMessage}>
                                            <img
                                                src={msg.attachments[0]}
                                                alt="sent image"
                                                className={styles.messageImage}
                                            />
                                        </div>
                                    ) : (
                                        <p>{msg.text}</p>
                                    )}
                                    <span className={styles.timestamp}>
                                        {new Date(msg.createdAt).toLocaleTimeString([], {
                                            hour: '2-digit',
                                            minute: '2-digit',
                                            hour12: true,
                                        })}
                                    </span>
                                </div>
                            </div>
                        </React.Fragment>
                    );
                })}

                {/* Image Preview Section */}
                {imagePreview && (
                    <div className={styles.imagePreview}>
                        <img src={imagePreview} alt="Selected Preview" />
                    </div>
                )}
                <div ref={messagesEndRef} />
            </div>

            <div className={styles.inputArea}>
                <input
                    type="text"
                    placeholder="Message"
                    className={styles.messageInput}
                    value={inputMessage}
                    onChange={(e) => setInputMessage(e.target.value)}
                    onKeyPress={handleKeyPress}
                />
                <div className={styles.iconGroup}>
                    <input type='file' style={{ display: 'none' }}
                        ref={fileInputRef}
                        onChange={handleFileChange}
                    />
                    {!messageEmpty && (
                        <button className={styles.sendButton} onClick={handleSendMessage}>Send</button>
                    )}
                    {/* <button className={styles.sendButton} onClick={handleSendMessage}>Send</button> */}
                    <button className={styles.attachButton} onClick={handleFileButtonClick}>📎</button>
                    <button className={styles.voiceButton}>🎤</button>
                </div>
            </div>
        </div>
    );
};

export default PersonalMessages;