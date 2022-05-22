import { Role } from '../utils/Role';
// import { loading } from '../main';

export const routes =
  [
    {
      path: '',
      redirect: '/chat',
    },
    // {
    //   path: '/login',
    //   name: 'login',
    //   component: () => import('../client/pages/Login.vue'),
    //   beforeEnter: (to,from,next) => {
    //     // loading = true;
    //     if(localStorage.getItem('authToken')){
    //       next({
    //         name: 'clientChat',
    //         params: { message: 'You are already logged in' }
    //       });
    //     }
    //     else{
    //       next();
    //     }        
    //   },
    //   afterEnter: () => {
    //     // setTimeout(() => loading = false, 1500)
    //   },
    // },
    {
      path: '/chat',
      name: 'clientChat',
      component: () => import('../client/pages/ClientChat.vue'),
      meta: {
        requiresAuth: true,
        meta: { authorize: [Role.Consumer] }
      },
      // beforeEnter: (to, from, next) => {
      //   // loading = true;
      //   if (localStorage.getItem('authToken')) {
      //     next();
      //   }
      //   else {
      //     next({
      //       name: 'login',
      //       params: { message: 'You are unauthorized, Please login to access' }
      //     });
      //   }
      // },
      afterEnter: () => {
        // setTimeout(() => loading = false, 1500)
      },
    },
    {
      path: '/agent/login',
      name: 'agentLogin',
      component: () => import('../agent/pages/Login.vue'),
      beforeEnter: (to, from, next) => {
        // loading = true;
        if (localStorage.getItem('authToken')) {
          next({
            name: 'agentDashboard',
            params: { message: 'You are already logged in' }
          });
        }
        else {
          next();
        }
      },
      afterEnter: () => {
        // setTimeout(() => loading = false, 1500)
      },
    },
    {
      path: '/agent/dashboard',
      name: 'agentDashboard',
      component: () => import('../agent/pages/AgentDashboard.vue'),
      meta: {
        requiresAuth: false,
        meta: { authorize: [Role.Support] }
      },
      beforeEnter: (to, from, next) => {
        // loading = true;
        if (localStorage.getItem('authToken')) {
          next();
        }
        else {
          next({
            name: 'agentLogin',
            params: { message: 'You are unauthorized, Please login to access' }
          });
        }
      },
      afterEnter: () => {
        // setTimeout(() => loading = false, 1500)
      },
    },
    {
      path: '*',
      component: () => import('../components/NotFound.vue')
    }
  ];

//clientChat