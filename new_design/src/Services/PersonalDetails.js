import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'


const Upload = async (files) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
        return
    }
    try {
        const formData = new FormData();

        // Append each file to the formData
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });

        // Make the POST request to upload files
        const response = await axios.post(`${API_URL}upload`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        // Return the file URLs from the response
        return response.data.fileUrls; // Assuming the server responds with an array of file URLs
    } catch (error) {
        console.error('File upload failed:', error);
        throw error;
    }
};



const Profile = async (profileData) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
        return
    }
    try {
        const response = await axios.post(`${API_URL}profileDetails`, profileData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
        throw error
    }
}

export { Profile, Upload }