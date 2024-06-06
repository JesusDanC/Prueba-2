import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/auth';
import Home from '../views/Home.vue'
import Usuarios from '../views/Usuarios.vue'
import Login from '../views/Login.vue'
import Productos from '../views/Productos.vue'
import Registrar from '../views/Registrar.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/Login',
      name: 'Login',
      component: Login
    },
    {
      path: '/Usuarios',
      name: 'Usuarios',
      component: Usuarios,
      meta: { requiresAuth: true }
    },
    {
      path: '/Home',
      name: 'Home',
      component: Home,
      meta: { requiresAuth: true }
    },
    {
      path: '/Productos',
      name: 'Productos',
      component: Productos,
      meta: { requiresAuth: true }
    },
    {
      path: '/Registrar',
      name: 'Registrar',
      component: Registrar,
      meta: { requiresAuth: false }
    }
  ]
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (to.meta.requiresAuth && !authStore.user) {
    next('/Login');
  } else if (to.path === '/Login' && authStore.user) {
    next('/Home');
  } else {
    next();
  }
});

export default router