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

    return {
      userFirstName,
      userLastName,
      userEmail,
      userPassword,
      addUser,
    };
  }
};

</script>

<template>
  <form name="login-form" class="login-form"  @submit.prevent="addUser">  
          <div class="mb-3">
            <label for="Nombre" class="login-label">Primer Nombre </label>
            <input class="login-input" id="Nombre" type="text" v-model="userFirstName" placeholder="Nombre"/>
          </div>
          <div class="mb-3">
            <label for="Apellido" class="login-label">Primer Apellido</label>
            <input class="login-input" id="Apellido" type="text" v-model="userLastName" placeholder="Apellido"/>
          </div>
          <div class="mb-3">
                <label for="Email" class="login-label">Correo Electronico</label>
                <input class="login-input" id="Email" type="text" v-model="userEmail" placeholder="Email"/>
            </div>
          <div class="mb-3"> 
                <label for="Password" class="login-label">Contraseña</label>
                <input class="login-input" id="Password" type="password" v-model="userPassword" placeholder="Contraseña"/>
            </div>

          <button class="login-button btn btn-outline-dark" type="submit">
            Registrarse
          </button>
        
          <RouterLink class="create-account" to="/Login">Ya tengo una cuenta</RouterLink>
        </form>


</template>

<style>

</style>
