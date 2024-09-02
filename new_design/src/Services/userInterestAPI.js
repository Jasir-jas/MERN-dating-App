import axios from 'axios';
const API_URL = 'http://localhost:4000/users/';

const UserInterest = async (userInterest) => {
    if (userInterest) {  // Corrected this line
        const token = localStorage.getItem('token');
        if (!token) {
            console.log('No token found');
            return null; // Return null if no token is found
        }

        try {
            const response = await axios.post(`${API_URL}userInterest`, { userInterest }, {
                headers: {
                    'Authorization': `Bearer ${token}`
                }
            });
            return response.data;
        } catch (error) {
            console.error('Error updating user interest:', error);
            return null; // Return null or some default value on error
        }
    }
};
export { UserInterest };
