import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const Register = async (registerData) => {
    try {
        const response = await axios.post(`${API_URL}register`, registerData)
        return response.data
    } catch (error) {
        console.error('Login failed:', error);
        throw error;  // Rethrow the error so it can be handled by the caller
    }
}

const Login = async (loginData) => {
    try {
        const response = await axios.post(`${API_URL}login`, loginData)
        return response.data
    } catch (error) {
        console.error('Login failed:', error);
        throw error;
    }
}
export { Register, Login }