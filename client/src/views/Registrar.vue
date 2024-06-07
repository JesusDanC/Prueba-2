<script>
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useUserStore } from '../stores/users.js';

export default {
  setup() {
    const router = useRouter();
    const userStore = useUserStore();
    const userFirstName = ref('');
    const userLastName = ref('');
    const userEmail = ref('');
    const userPassword = ref('');
    
    const addUser = () => {
      const user = { 
        userFirstName: userFirstName.value, 
        userLastName: userLastName.value, 
        userEmail: userEmail.value, 
        userPassword: userPassword.value
      };
      userStore.createUser(user);
      userFirstName.value = '';
      userLastName.value = '';
      userEmail.value = ''
      userPassword.value = ''
    };

    const Login = () => {
      router.push("/Login")
    }

    return {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      addUser,
      Login
    };
  }
};

</script>

<template>
    <br>
    <div class="container">
        <h2>Registro</h2>
        <form @submit.prevent="addUser">
          <input v-model="userFirstName" placeholder="Nombre" />
          <input v-model="userLastName" placeholder="Apellido" />
          <input v-model="userEmail" placeholder="Email" />
          <input v-model="userPassword" placeholder="Contraseña" />
          <button type="submit">Agregar usuario</button>
        </form>
        <br>
        <button @click.prevent="Login">Login</button>
    </div>
</template>

<style>

</style>
