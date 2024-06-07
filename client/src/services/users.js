import api from '../lib/axios';

export const apiUser = {
    getUsers() {
      return api.get(`/users`);
    },
    getUser(userId) {
      return api.get(`/users/${userId}`);
    },
    createUser(user) {
      return api.post(`/users`, user);
    },
    updateUser(userId, user) {
      return api.put(`/users/${userId}`, user);
    },
    deleteUser(userId) {
      return api.delete(`/users/${userId}`);
    }
  };