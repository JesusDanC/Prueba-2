import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login } from '../services/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const error = ref(null);

    const loginUser = async (userEmail, userPassword) => {
        try {
            const data = await login(userEmail, userPassword);
            user.value = data.data;
            console.log(data.data)
            error.value = null;
        } catch (err) {
            error.value = err.mensaje || 'Error al iniciar sesión';
        }
    };

    return {
        user,
        error,
        loginUser
    };
});
