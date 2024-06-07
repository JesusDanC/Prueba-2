import api from '../lib/axios';

export const login = async (userEmail, userPassword) => {
    try {
        const response = await api.post('/auth', { userEmail, userPassword });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};