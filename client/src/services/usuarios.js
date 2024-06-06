import api from '../lib/axios';

class UserService {
  async createUser(usuario) {
    try {
      const response = await api.post('/api/users', usuario);
      return response.data;
    } catch (error) {
      console.error(error);
      throw error;
    }
  }
}

export default new UserService();