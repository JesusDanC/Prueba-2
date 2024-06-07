<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const userEmail = ref('');
    const userPassword = ref('');
    const { error, loginUser } = authStore;
    

    const handleSubmit = async () => {
      await loginUser(userEmail.value, userPassword.value);
      router.push('/Home')
    };

    const Registrar = async () => {
        router.push('/Registrar')
    }

    return {
      userEmail,
      userPassword,
      error,
      handleSubmit,
      Registrar
    };
  }
};
</script>

<template>
    <br>
    <div class="container">
        <h2>Iniciar Sesión</h2>
        <form @submit.prevent="handleSubmit">
        <div>
            <label for="email">Email:</label>
            <input type="text" v-model="userEmail" required>
        </div>
        <div>
            <label for="password">Contraseña:</label>
            <input type="password" v-model="userPassword" required>
        </div>
        <button type="submit">Iniciar Sesión</button>
        <p v-if="error">{{ error }}</p>
        </form>
        <br>
        <button @click="Registrar">Registrar</button>
    </div>
</template>

<style>

</style>