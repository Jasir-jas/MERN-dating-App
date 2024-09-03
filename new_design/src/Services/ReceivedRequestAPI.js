import axios from "axios";
const API_URL = 'http://localhost:4000/users/'

const getReceivedRequest = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios(`${API_URL}get-receivedRequest`, {
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

const AcceptRequest = async (senderId) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios.post(`${API_URL}accept-request`, { senderId }, {
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

export { getReceivedRequest, AcceptRequest }