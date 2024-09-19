import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const chatImagesAPI = async (formData) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios.post(`${API_URL}chatImage-upload`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
    }
}
export { chatImagesAPI }