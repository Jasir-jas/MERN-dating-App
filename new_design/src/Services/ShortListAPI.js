import axios from 'axios'
const API_URL = 'http://localhost:4000/users/'

const ShortListedProfiles = async (profileId) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
        return []
    }
    try {
        const response = await axios.post(`${API_URL}shortList`, { profileId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
        return
    }
}

const getShortListed = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios.get(`${API_URL}get-shortlisted`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
        return []
    }
}

const removeShortList = async (profileId) => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios.post(`${API_URL}remove-shortlist`, { profileId }, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
        return
    }
}

const ShortListedBy = async () => {
    const token = localStorage.getItem('token')
    if (!token) {
        console.log('No token found');
    }
    try {
        const response = await axios.get(`${API_URL}get-shortlistedBy`, {
            headers: {
                'Authorization': `Bearer ${token}`
            }
        })
        return response.data
    } catch (error) {
        console.log('Server not responded');
        return []
    }
}

export { ShortListedProfiles, getShortListed, removeShortList, ShortListedBy }