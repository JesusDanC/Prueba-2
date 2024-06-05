import { createRouter, createWebHistory } from 'vue-router'
import Home from '../views/Home.vue'
import Form from '../views/Form.vue'
import Table from '../views/Table.vue'
import Modal from '../views/Modal.vue'
import Usuarios from '../views/Usuarios.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Home',
      name: 'Home',
      component: Home
    },
    {
      path: '/Form',
      name: 'Form',
      component: Form
    },
    {
      path: '/Table',
      name: 'Table',
      component: Table
    },
    {
      path: '/Modal',
      name: 'Modal',
      component: Modal
    },
    {
      path: '/Usuarios',
      name: 'Usuarios',
      component: Usuarios
    }
  ]
})

export default router