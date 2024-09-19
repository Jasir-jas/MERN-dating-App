import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'


const fetchMessageProfile = async (profileId) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
        return
    }
    try {
        const response = await axios.get(`${API_URL}get-personalMessage-Profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            },
            params: { profileId }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
    }
}

export { fetchMessageProfile }