<script>
import { ref, onMounted, onUpdated } from 'vue';
import { useUserStore } from '../stores/users.js';

export default {
  setup() {
    const userStore = useUserStore();
    const users = ref([]);
    const userGetted = ref([]);
    const userFirstName = ref('');
    const userLastName = ref('');

    onMounted(async () => {
      await GetData();
    });

    onUpdated(async () => {
      await GetData();
    });

    async function GetData() {
      try {
        await userStore.fetchUsers()
        users.value = userStore.allUsers.users;
      } catch (error) {
        console.error('Error al obtener usuarios:', error);
      }
    }

    const openModalEdit = async (user) => {
      await userStore.fetchUser(user.userId);
      userGetted.value = userStore.getUser.user;
      const myModal = new bootstrap.Modal(document.getElementById('myModal'));
      myModal.show();
    };

    const openModalDelete = async (user) => {
      await userStore.fetchUser(user.userId);
      userGetted.value = userStore.getUser.user;
      const myModal = new bootstrap.Modal(document.getElementById('my2Modal'));
      myModal.show();
    };
    
    const UpdateUser = async () => {
      try {
        const userUpdate = {
          userFirstName: userFirstName.value, 
          userLastName: userLastName.value
        };
        userStore.updateUser(userGetted.value.userId, userUpdate);
        userGetted.value = [];
        userFirstName.value = '';
        userLastName.value = '';
      } catch (error) {
        console.log(error)
      }
    };

    const DeleteUser = async () => {
      try {
        userStore.deleteUser(userGetted.value.userId);
        userGetted.value = [];
        const myModal = new bootstrap.Modal(document.getElementById('my2Modal'));
        myModal.hide();
      } catch (error) {
        console.log(error)
      }
    };

    return{
      users,
      openModalEdit,
      openModalDelete,
      UpdateUser,
      DeleteUser,
      userFirstName,
      userLastName
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
                          <button @click="openModalEdit(user)" class="btn btn-outline-secondary">
                            <i class="bi bi-pencil"></i>
                          </button>
                        </td>
                        <td>
                          <button @click="openModalDelete(user)" class="btn btn-outline-secondary">
                            <i class="bi bi-trash"></i>
                          </button>
                        </td>
                    </tr>
                </tbody>
            </table>
        </div>
    </div>
    <br>

    <div>
      <div id="myModal" class="modal" tabindex="-1">
      <div class="modal-dialog">
        <div class="modal-content">
          <div class="modal-header">
            <h5 class="modal-title">Editar Usuario</h5>
            <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
          </div>
          <div class="modal-body">
            <form>
              <div class="mb-3">
                <label for="firstName" class="form-label">Nombre:</label>
                <input type="text" class="form-control" v-model="userFirstName">
              </div>
              <div class="mb-3">
                <label for="lastName" class="form-label">Apellido:</label>
                <input type="text" class="form-control" v-model="userLastName">
              </div>
            </form>
          </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-outline-secondary" data-bs-dismiss="modal">Cerrar</button>
                <button @click.prevent="UpdateUser()" type="button" class="btn btn-outline-primary">Guardar</button>
            </div>
            </div>
        </div>
        </div>
    </div>

    <div>
      <div id="my2Modal" class="modal" tabindex="-1">
        <div class="modal-dialog">
          <div class="modal-content d-flex justify-content-center align-items-center">
            <div class="modal-header">
              <h5 class="modal-title ">Desea eliminar este usuario</h5>
            </div>
            <div class="modal-body text-center">
              <button @click.prevent="" type="button" class="btn btn-outline-danger mr-10">Si</button>
              <button type="button" class="btn btn-outline-success" data-bs-dismiss="modal">No</button>
            </div>
          </div>
        </div>
      </div>
    </div>
</template>

<style>
  .mr-10{
    margin-right: 10px;
  }
</style>