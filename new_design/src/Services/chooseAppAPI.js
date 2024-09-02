import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const ChooseAppAPI = async (chooseApp) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios.post(`${API_URL}choose-app`, chooseApp, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
    }
}
export { ChooseAppAPI }