// import axios from "axios";
// const API_URL = 'http://localhost:4000/users/'

// const getAcceptRequest = async () => {
//     const token = localStorage.getItem('token')
//     if (!token) {
//         console.log('No token found');
//     }
//     try {
//         const response = await axios.get(`${API_URL}get-acceptedRequest`, {
//             headers: {
//                 'Authorization': `Bearer ${token}`
//             }
//         })
//         return response.data
//     } catch (error) {
//         console.log('Server not responded');
//         return
//     }
// }
// export { getAcceptRequest }


import axios from "axios";

const API_URL = 'http://localhost:4000/users/';

const getAcceptRequest = async (profileId = null) => {
    const token = localStorage.getItem('token');
    if (!token) {
        console.log('No token found');
        return;
    }
    try {
        let url = `${API_URL}get-acceptedRequest`;
        if (profileId) {
            url += `?profileId=${profileId}`;
        }
        const response = await axios.get(url, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        });
        return response.data;
    } catch (error) {
        console.log('Server not responded', error);
        throw error;
    }
};

export { getAcceptRequest };