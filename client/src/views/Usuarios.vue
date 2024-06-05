<script>
import api from '../lib/axios'
import { ref } from 'vue';

export default {
  data() {
    const EstaAbierto = ref(false)
    return {
      nombre: '',
      pin: '',
      DatosRecibidos: [],
      EstaAbierto
    };
  },
  methods: {
    async SubirDatos() {
      try {
        const response = await api.post('/usuarios', {
          nombre: this.nombre,
          pin: this.pin
        });
        console.log(response.data);
      } catch (error) {
        console.error('Hubo un error:', error);
      }
    },
    async Mandar_datos_modal() {
      this.EstaAbierto = true;
      
    },
    async RecibirDatos() {
      try {
        const response = await api.get('/usuarios'); 
        this.DatosRecibidos = response.data;
        

      } catch (error) {
        console.error('Hubo un error al obtener los datos:', error);
      }
    }
  },
  mounted() {
    this.RecibirDatos(); 
  }
};

</script>

<template>
    <br>
    <div class="container">
        <form @submit.prevent="SubirDatos">
            <input type="text" v-model="nombre" placeholder="Nombre" />
            <input type="text" v-model="pin" placeholder="Pin" />
            <button type="submit">Enviar</button>
        </form>
    </div>

    <br>
        
    <div class="container ">
        <div class="col">
          <h2>Datos Obtenidos:</h2>
            <table class="table table-bordered">
                <thead class="table-dark">
                    <tr>
                    <th scope="col">#</th>
                    <th scope="col">Nombre del usuario</th>
                    <th scope="col">Role del usuario</th>
                    <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                    <tr v-for="(usuario, index) in DatosRecibidos" :key="index">
                        <th scope="row">{{ index + 1 }}</th>
                        <td>{{ usuario.nombre }}</td>
                        <td>{{ usuario.role }}</td>
                        <td>
                          <button class="btn btn-outline-secondary" @click.prevent="Mandar_datos_modal">
                            <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-box-arrow-up" viewBox="0 0 16 16">
                            <path fill-rule="evenodd" d="M3.5 6a.5.5 0 0 0-.5.5v8a.5.5 0 0 0 .5.5h9a.5.5 0 0 0 .5-.5v-8a.5.5 0 0 0-.5-.5h-2a.5.5 0 0 1 0-1h2A1.5 1.5 0 0 1 14 6.5v8a1.5 1.5 0 0 1-1.5 1.5h-9A1.5 1.5 0 0 1 2 14.5v-8A1.5 1.5 0 0 1 3.5 5h2a.5.5 0 0 1 0 1z"/>
                            <path fill-rule="evenodd" d="M7.646.146a.5.5 0 0 1 .708 0l3 3a.5.5 0 0 1-.708.708L8.5 1.707V10.5a.5.5 0 0 1-1 0V1.707L5.354 3.854a.5.5 0 1 1-.708-.708z"/>
                          </svg></button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
        <div class="container">
           <teleport to="body">
           <Transition>
                <div class="modal" v-if="EstaAbierto">
                    <div>
                      <form>
                        <div class="mb-3">
                          <label class="form-label">Usuario</label>
                          <input type="text" class="form-control" id="usuario" aria-describedby="emailHelp">
                        </div>
                        <div class="mb-3">
                          <label class="form-label">Role</label>
                          <input type="text" class="form-control" id="role" disabled="true">
                        </div>
                        <div class="mb-3 form-check">
                          <input type="checkbox" class="form-check-input" id="exampleCheck1">
                          <label class="form-check-label" for="exampleCheck1">Check me out</label>
                        </div>
                        <div>
                          <table>
                            <td>
                              <button type="submit" class="btn btn-primary">Submit</button>
                            </td>
                            <td>
                              <button type="button" class="btn btn-warning" @click="EstaAbierto = false">Cerrar</button>
                            </td>
                          </table>
                        </div>
                      </form>
                    </div>
                </div>
            </Transition>
        </teleport>
    </div>
    </div>

</template>

<style>

</style>