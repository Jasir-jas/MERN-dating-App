import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const JobStatusAPI = async (employerData) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('Token not found');
    }
    try {
        const response = await axios.post(`${API_URL}job-status`, employerData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
    }
}

export { JobStatusAPI }