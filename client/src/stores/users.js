import { defineStore } from 'pinia';
import { apiUser } from '../services/users';

export const useUserStore = defineStore('user', {
  state: () => ({
    users: [],
    user: null
  }),
  getters: {
    allUsers: state => state.users,
    getUser: state => state.user
  },
  actions: {
    async fetchUsers() {
      const response = await apiUser.getUsers();
      this.users = response.data;
    },
    async fetchUser(id) {
      const response = await apiUser.getUser(id);
      this.user = response.data;
    },
    async createUser(user) {
      const response = await apiUser.createUser(user);
      this.users.push(response.data);
    },
    async updateUser(id, user) {
      const response = await apiUser.updateUser(id, user);
      const index = this.users.findIndex(u => u.id === id);
      if (index !== -1) {
        this.users.splice(index, 1, response.data);
      }
    },
    async deleteUser(id) {
      await apiUser.deleteUser(id);
      this.users = this.users.filter(user => user.id !== id);
    }
  }
});
