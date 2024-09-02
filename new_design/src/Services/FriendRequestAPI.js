import axios from "axios";
const API_URL = 'http://localhost:4000/users/'


const sentFriendRequest = async (receiverId) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios.post(`${API_URL}sent-friendRequest`, { receiverId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
        return
    }
}

const getFriendRequest = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
        return
    }
    try {
        const response = await axios.get(`${API_URL}get-sentRequest`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.error('Server no responded:', error);
        return
    }
}

export { sentFriendRequest, getFriendRequest }