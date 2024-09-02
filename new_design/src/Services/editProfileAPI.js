import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const uploadToCloudinary = async (file) => {
    try {
        const fileUrls = await Upload([file]); // Pass the file as an array
        return fileUrls[0]; // Return the first (and only) URL
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
};

const Upload = async (files) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found');
        return;
    }
    try {
        const formData = new FormData();
        files.forEach((file, index) => {
            formData.append(`file${index}`, file);
        });

        const response = await axios.post(`${API_URL}upload`, formData, {
            headers: {
                'Authorization': `Bearer ${token}`,
                'Content-Type': 'multipart/form-data'
            }
        });

        return response.data.fileUrls;
    } catch (error) {
        console.error('File upload failed:', error);
        throw error;
    }
};

const EditProfileAPI = async (editedData) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('Token not found');
        return
    }
    try {
        const response = await axios.post(`${API_URL}edit-profile`, editedData, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
    }
}
export { uploadToCloudinary, EditProfileAPI }