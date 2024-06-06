<script>
import { ref } from 'vue';
import { useAuthStore } from '../stores/auth';
import { useRouter } from 'vue-router';

export default {
  setup() {
    const router = useRouter();
    const authStore = useAuthStore();
    const nombre = ref('');
    const pin = ref('');
    const { error, loginUser } = authStore;
    

    const handleSubmit = async () => {
      await loginUser(nombre.value, pin.value);
      router.push('/Home')
    };

    const Registrar = async () => {
        router.push('/Registrar')
    }

    return {
      nombre,
      pin,
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
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="nombre" required>
        </div>
        <div>
            <label for="pin">Contraseña:</label>
            <input type="password" v-model="pin" required>
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