import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const FilterQualification = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios.get(`${API_URL}get-filterQualification`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
    }
}
export { FilterQualification }