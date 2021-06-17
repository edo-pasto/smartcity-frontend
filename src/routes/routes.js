import DashboardLayout from '@/views/Layout/DashboardLayout.vue';
import AuthLayout from '@/views/Pages/AuthLayout.vue';

import NotFound from '@/views/NotFoundPage.vue';

const routes = [
  {
    path: '/',
    redirect: 'dashboard',
    component: DashboardLayout,
    children: [
      {
        path: '/dashboard',
        name: 'dashboard',
        // route level code-splitting
        // this generates a separate chunk (about.[hash].js) for this route
        // which is lazy-loaded when the route is visited.
        component: () => import(/* webpackChunkName: "demo" */ '../views/Dashboard.vue')
      },
      {
        path: '/icons',
        name: 'icons',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Icons.vue')
      },
      {
        path: '/profile',
        name: 'profile',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/UserProfile.vue')
      },
      {
        path: '/product',
        name: 'product',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Product.vue')
      },
      {
        path: '/code',
        name: 'code',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Code.vue')
      },
      {
        path: '/partner',
        name: 'partner',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Partner.vue')
      },
      {
        path: '/customer',
        name: 'customer',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Customer.vue')
      },
      {
        path: '/order',
        name: 'order',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Order.vue')
      },
      {
        path: '/task',
        name: 'task',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Task.vue')
      },
      {
        path: '/device',
        name: 'device',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Device.vue')
      },
      {
        path: '/registerDevice',
        name: 'registerDevice',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegisterDevice.vue')
      },

      //task attivi
            //device attivi per specifico task
            //registrare device per task manager
      
      {
        path: '/maps',
        name: 'maps',
        component: () => import(/* webpackChunkName: "demo" */ '../views/GoogleMaps.vue')
      },
      {
        path: '/tables',
        name: 'tables',
        component: () => import(/* webpackChunkName: "demo" */ '../views/RegularTables.vue')
      }
    ]
  },
  {
    path: '/',
    redirect: 'login',
    component: AuthLayout,
    children: [
      {
        path: '/login',
        name: 'login',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Login.vue')
      },
      {
        path: '/register',
        name: 'register',
        component: () => import(/* webpackChunkName: "demo" */ '../views/Pages/Register.vue')
      },
      { path: '*', component: NotFound }
    ]
  }
];

export default routes;
