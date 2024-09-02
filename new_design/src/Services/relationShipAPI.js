import axios from 'axios';

const API_URL = 'http://localhost:4000/users/';

const RelationStatus = async (relationStatus) => {
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    try {
        const response = await axios.post(`${API_URL}relation-status`, relationStatus, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.error('Server not responded', error);
        throw error;
    }
};

const getLocationName = async (lat, lon) => {
    try {
        const response = await axios.get(`https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`);
        return response.data.display_name;
    } catch (error) {
        console.error('Error fetching location name:', error);
        throw error;
    }
};

export { RelationStatus, getLocationName };