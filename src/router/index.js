import { createRouter, createWebHistory } from 'vue-router';
import Home from '../views/Home.vue';

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/user',
    name: 'User',
    component: () => import(/* webpackChunkName: "user" */ '../views/User.vue'),
    meta: { requiresAuth: true }
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import(/* webpackChunkName: "login" */ '../views/Login.vue'),
    meta: { requiresUnAuth: true } 
  },
  {
    path: '/addItem',
    name: 'AddItem',
    component: () => import(/* webpackChunkName: "addItem" */ '../views/AddItem.vue'),
    meta: { requiresAuth: true, requiresAdmin: true } 
  },
  {
    path: '/cadastro',
    name: 'Cadastro',
    component: () => import(/* webpackChunkName: "cadastro" */ '../views/Cadastro.vue'),
    meta: { requiresUnAuth: true } 
  }
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

function isAuthenticated() {
  return !!localStorage.getItem('user'); 
}

function isAdmin() {
  const user = localStorage.getItem('user');
  if (!user) return false; 

  const parsedUser = JSON.parse(user); 
  return parsedUser.role === 'Admin'; 
}

router.beforeEach((to, from, next) => {
  if (to.matched.some(record => record.meta.requiresAuth)) {
    if (!isAuthenticated()) {
      next({ name: 'Login' }); 
    } else if (to.matched.some(record => record.meta.requiresAdmin)) {
      if (isAdmin()) {
        next(); 
      } else {
        next({ name: 'Home' }); 
      }
    } else {
      next(); 
    }
  } else if (to.matched.some(record => record.meta.requiresUnAuth)) {
    if (isAuthenticated()) {
      next({ name: 'Home' }); 
    } else {
      next(); 
    }
  } 
  else {
    next(); 
  }
});

export default router;
