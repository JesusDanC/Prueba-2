import api from '../lib/axios';

export const login = async (nombre, pin) => {
    try {
        const response = await api.post('/login', { nombre, pin });
        return response.data;
    } catch (error) {
        throw error.response ? error.response.data : error;
    }
};