import { defineStore } from 'pinia';
import { ref } from 'vue';
import { login } from '../services/auth';

export const useAuthStore = defineStore('auth', () => {
    const user = ref(null);
    const error = ref(null);

    const loginUser = async (nombre, pin) => {
        try {
            const data = await login(nombre, pin);
            user.value = data.usuario_buscado;
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
