// require('dotenv').config()
// const express = require('express')
// const cors = require('cors')
// const connectDB = require('./config/db')
// const passport = require('./config/passport')
// const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000'
// const session = require('express-session')
// const jwt = require('jsonwebtoken')
// const Message = require('./Models/Message')
// const http = require('http')
// const app = express()
// const { Server } = require('socket.io')
// const server = http.createServer(app)
// const io = new Server(server, {
//     cors: {
//         origin: FRONTEND_URL, // Allow requests from your frontend URL
//         methods: ['GET', 'POST'],
//         allowedHeaders: ['Authorization'],
//         credentials: true,
//     },
//     transports: ['websocket'],
// });

// const PORT = process.env.PORT || 4000
// app.use(cors({
//     origin: FRONTEND_URL,
//     credentials: true
// }))
// app.use(express.json({ limit: '50mb' }))
// app.use(express.urlencoded({ limit: '50mb', extended: true }))
// const userRoutes = require('./Routes/UserRoutes')
// connectDB()

// app.use(session({
//     secret: process.env.SESSION_SECRET,
//     resave: false,
//     saveUninitialized: false,
//     cookie: {
//         secure: true,
//         maxAge: 24 * 60 * 60 * 1000 // 24 hours
//     }
// }));

// // Initialize Passport
// app.use(passport.initialize());
// app.use(passport.session());

// const generateToken = (user) => {
//     return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });
// };

// app.get('/auth/google', passport.authenticate('google', {
//     scope: ['profile', 'email']
// }));
// app.get('/auth/google/callback', passport.authenticate('google', {
//     failureRedirect: `${FRONTEND_URL}/`
// }), async (req, res) => {
//     try {
//         if (req.user) {
//             const token = generateToken(req.user);
//             res.redirect(`${FRONTEND_URL}/personalDetail?token=${token}`);
//         } else {
//             res.redirect(`${FRONTEND_URL}/`);
//         }
//     } catch (error) {
//         console.error('Error during authentication callback:', error);
//         res.redirect(`${FRONTEND_URL}/`);
//     }
// });

// io.on('connection', (socket) => {
//     console.log('User connected:', socket.id);

//     // Load previous messages
//     Message.find().sort('-timestamp').limit(50).exec((err, messages) => {
//         if (err) return console.error(err);
//         socket.emit('load previous messages', messages);
//     });

//     // Handle sending messages
//     socket.on('sendMessage', async ({ senderId, receiverId, text, attachments }) => {
//         try {
//             const newMessage = new Message({
//                 senderId,
//                 receiverId,
//                 text,
//                 attachments
//             });
//             await newMessage.save();

//             // Emit the new message to the receiver
//             io.to(receiverId).emit('receiveMessage', newMessage);
//         } catch (error) {
//             console.error('Error sending message:', error);
//         }
//     });


//     // Listen for new messages
//     socket.on('chat message', ({ senderId, receiverId, text, attachments }) => {
//         const newMessage = new Message({
//             senderId,
//             receiverId,
//             text,
//             attachments
//         });
//         newMessage.save();
//         newMessage.save((err) => {
//             if (err) return console.error(err);
//             io.emit('chat message', msg);
//         });
//     });

//     // Handle disconnection
//     socket.on('disconnect', () => {
//         console.log('User disconnected:', socket.id);
//     });
// });
// app.use('/users', userRoutes)

// app.listen(PORT, () => {
//     console.log(`Server Running on ${PORT}`);
// })

require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./config/db');
const passport = require('./config/passport');
const session = require('express-session');
const jwt = require('jsonwebtoken');
const Message = require('./Models/Message');
const http = require('http');
const { Server } = require('socket.io');
const upload = require('./config/Cloudinary')
// const router = express.Router()

const app = express();
const server = http.createServer(app);

const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';
const PORT = process.env.PORT || 4000;

const io = new Server(server, {
    cors: {
        origin: FRONTEND_URL,
        methods: ['GET', 'POST'],
        allowedHeaders: ['Authorization'],
        credentials: true,
    },
    transports: ['websocket'],
});

app.use(cors({
    origin: FRONTEND_URL,
    credentials: true
}));

app.use(express.json({ limit: '50mb' }));
app.use(express.urlencoded({ limit: '50mb', extended: true }));

connectDB();

app.use(session({
    secret: process.env.SESSION_SECRET,
    resave: false,
    saveUninitialized: false,
    cookie: {
        secure: true,
        maxAge: 24 * 60 * 60 * 1000 // 24 hours
    }
}));

app.use(passport.initialize());
app.use(passport.session());

const generateToken = (user) => {
    return jwt.sign({ _id: user._id }, process.env.JWT_SECRET_KEY, { expiresIn: '5h' });
};

app.get('/auth/google', passport.authenticate('google', {
    scope: ['profile', 'email']
}));

app.get('/auth/google/callback', passport.authenticate('google', {
    failureRedirect: `${FRONTEND_URL}/`
}), async (req, res) => {
    try {
        if (req.user) {
            const token = generateToken(req.user);
            res.redirect(`${FRONTEND_URL}/personalDetail?token=${token}`);
        } else {
            res.redirect(`${FRONTEND_URL}/`);
        }
    } catch (error) {
        console.error('Error during authentication callback:', error);
        res.redirect(`${FRONTEND_URL}/`);
    }
});

const users = {};
io.on('connection', async (socket) => {
    socket.on('register', (userId) => {
        users[userId] = socket.id;
        console.log(`User ${userId} connected with socket ${socket.id}`);
        socket.userId = userId; // Store userId in socket instance
    });

    // Handle loading previous messages for the specific conversation
    socket.on('load conversation', async ({ senderId, receiverId }) => {
        try {
            const messages = await Message.find({
                $or: [
                    { senderId, receiverId },
                    { senderId: receiverId, receiverId: senderId }  // Check both directions of conversation
                ]
            }).sort({ createdAt: 1 }).exec(); // Sort messages by creation time

            socket.emit('load previous messages', messages);
        } catch (err) {
            console.error('Error loading previous messages:', err);
            socket.emit('error', 'Failed to load previous messages');
        }
    });

    // Handle sending messages
    socket.on('sendMessage', async ({ senderId, receiverId, text, attachments }) => {
        try {
            const newMessage = new Message({
                senderId,
                receiverId,
                text: text || '',
                attachments: attachments || []
            });
            await newMessage.save();

            // Emit the new message to the sender and receiver
            socket.emit('chat message', newMessage);

            const receiverSocket = users[receiverId];
            if (receiverSocket) {
                io.to(receiverSocket).emit('chat message', newMessage);  // Send message to the receiver
            } else {
                console.log(`Receiver ${receiverId} not connected`);
            }
        } catch (error) {
            console.error('Error sending message:', error);
            socket.emit('error', 'Failed to send message');
        }
    });

    socket.on('disconnect', () => {
        for (let [key, value] of Object.entries(users)) {
            if (value === socket.id) {
                delete users[key];
                break;
            }
        }
        console.log('User disconnected:', socket.id);
    });
});

const userRoutes = require('./Routes/UserRoutes');
app.use('/users', userRoutes);

server.listen(PORT, () => {
    console.log(`Server Running on ${PORT}`);
});