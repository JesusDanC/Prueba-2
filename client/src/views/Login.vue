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
    <form class="login-form"  @submit.prevent="handleSubmit">  
          <div class="mb-3" >
            <label class="login-label" for="Email">Correo Electronico</label>
            <input class="login-input" id="Email" type="email" v-model="userEmail" required/>
          </div>
          <div class="mb-3">
            <label class="login-label" for="Password">Contraseña </label>
            <input class="login-input" id="password" type="password" v-model="userPassword" required/>
          </div>
          <button class="login-button btn btn-outline-dark" type="submit">
            Login
          </button>

          <RouterLink class="create-account" to="/Registrar">Crear cuenta</RouterLink>
        </form>
</template>

<style>
.login-form {
  font-family:'Times New Roman', Times, serif;
  color: #ffffff;
  max-width: 400px;
  margin: 90px auto;
  padding: 60px;
  border: 2px solid #4f4fff;
  background: linear-gradient(to left, hsla(256, 73%, 51%, 0.823), #b14ff3bb);
  border-radius: 5px;
  background-size: cover;
  box-shadow: 40px 30px 50px rgba(0, 0, 0, 0.1);
}

.mb-3 {
  margin-bottom: 55px;
}

.login-label {
  display: block;
  margin-bottom: 5px;
}

.login-input {
  width: 100%;
  padding: 8px;
  box-sizing: border-box;
  font-family: 'Times New Roman', Times, serif; 
}

.login-button {
  width: 100%;
  padding: 10px;
  background-color: #ffffff;
  color: rgb(34, 1, 36);
  border: none;
  border-radius: 5px;
  cursor: pointer;
}

.login-button:hover {
  background-color: #80a7d1;
 
}

.create-account {
  position: center; 
  color: #ffffff; 
  font-weight: bold; 
  text-decoration: underline; 
}
</style>