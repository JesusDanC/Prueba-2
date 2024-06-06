<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import UserService from '../services/usuarios.js';

const router = useRouter();
export default {
  setup() {
    const router = useRouter();
    const nombre = ref('');
    const pin = ref('');
    const error = ref(null);

    const handleSubmit = async () => {
      try {
        await UserService.crearUsuario({
          nombre: nombre.value,
          pin: pin.value
        });
        router.push('/Login');
      } catch (error) {
        error.value = error.message || 'Error al registrar usuario';
      }
    };

    const Login = async () => {
        router.push('/Login');
    }

    return {
      nombre,
      pin,
      error,
      handleSubmit,
      Login
    };
  }
};

</script>

<template>
    <br>
    <div class="container">
        <h2>Registro</h2>
        <form @submit.prevent="handleSubmit">
        <div>
            <label for="nombre">Nombre:</label>
            <input type="text" v-model="nombre" required>
        </div>
        <div>
            <label for="pin">Contraseña:</label>
            <input type="password" v-model="pin" required>
        </div>
        <button type="submit">Registrarse</button>
        <p v-if="error">{{ error }}</p>
        </form>
        <br>
        <button @click.prevent="Login">Login</button>
    </div>
</template>

<style>

</style>
