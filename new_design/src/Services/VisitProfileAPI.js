import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const VisitProfile = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
        return
    }
    try {
        const response = await axios.get(`${API_URL}getVisit-profiles`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');

    }
}
export { VisitProfile }