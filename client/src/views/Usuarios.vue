<script>
import { ref, onMounted } from 'vue';
import { useUserStore } from '../stores/users.js';

export default {
  setup() {
    const userStore = useUserStore();
    const users = ref([]);

    onMounted(async () => {
      try {
        await userStore.fetchUsers()
        users.value = userStore.allUsers.users;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    });

    return{
      users
    }
  }
}

</script>

<template>
    <br>
    <div class="container ">
        <div class="col">
          <h2>Usuarios:</h2>
            <table class="table table-bordered">
                <thead class="table-dark">
                    <tr>
                      <th scope="col">#</th>
                      <th scope="col">Nombre</th>
                      <th scope="col">Apellido</th>
                      <th scope="col">Email</th>
                      <th scope="col">Role</th>
                      <th scope="col"></th>
                      <th scope="col"></th>
                    </tr>
                </thead>
                <tbody>
                  <tr v-for="user in users" :key="user.userId">
                        <th scope="row">{{ user.userId }}</th>
                        <td>{{ user.userFirstName }}</td>
                        <td>{{ user.userLastName }}</td> 
                        <td>{{ user.userEmail }}</td>
                        <td>{{ user.userRole }}</td> 
                        <td>
                          <button >
                              Editar
                          </button>
                        </td>
                        <td>
                          <button >
                              Eliminar
                          </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>


</template>

<style>

</style>