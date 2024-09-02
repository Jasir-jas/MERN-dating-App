import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const FetchIndividualProfile = async (profileId, userId) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found');
        return;
    }
    try {
        const response = await axios.get(`${API_URL}get-profile`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }, params: {
                profileId,
                userId
            }
        })
        return response.data
    } catch (error) {
        console.error('Error fetching profile:', error);
        throw error;
    }


}
export { FetchIndividualProfile }