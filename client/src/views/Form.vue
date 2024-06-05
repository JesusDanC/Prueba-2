<script setup>
import { reactive, ref } from 'vue';

const nuevoUsuario = reactive({
  email: '',
  nombre: '',
  password: ''
});

const usuarios = ref([]);

const agregar = () => {
  usuarios.value.push({ ...nuevoUsuario });
  nuevoUsuario.email = '';
  nuevoUsuario.nombre = '';
  nuevoUsuario.password = '';
};

</script>

<template>
    <br>
    <div class="container">
        <form @submit.prevent="agregar">
            <div class="mb-3">
                <label for="name" class="form-label">Email</label>
                <input type="email" class="form-control" placeholder="ingrese email" id="email" v-model="nuevoUsuario.email" aria-describedby="emailHelp" />
            </div>
            <div class="mb-3">
                <label for="nombre" class="form-label">Nombre</label>
                <input type="text" class="form-control" placeholder="ingrese nombre" id="nombre" v-model="nuevoUsuario.nombre" />
            </div>
            <div class="mb-3">
                <label for="password" class="form-label">Password</label>
                <input type="password" class="form-control" placeholder="ingrese password" id="password" v-model="nuevoUsuario.password" />
            </div>
            <button type="submit" class="btn btn-primary">Subir</button>
        </form>

        <div v-if="usuarios.length > 0">
            <h3>Lista de usuarios:</h3>
            <ul>
                <li v-for="(usuario, index) in usuarios" :key="index">
                    {{ usuario.email }} - {{ usuario.nombre }} - {{ usuario.password }}
                </li>
            </ul>
        </div>
    </div>
</template>

<style>

</style>