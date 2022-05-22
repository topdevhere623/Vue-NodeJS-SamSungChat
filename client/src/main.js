import axios from 'axios';
import moment from 'moment';
import io from 'socket.io-client';
import Vue from 'vue';
import VueRouter from 'vue-router';
import UUID from 'vue-uuid';
import App from './App.vue';
import './index.css';
import titleMixin from './mixins/titleMixin';
import { routes } from './router';
// import { checkUserData } from './utils/user';
import store from './store';
import setAuthToken from './utils/authToken';






Vue.mixin(titleMixin)


// import {Role} from './utils/Role'

Vue.use(UUID);

Vue.config.productionTip = false;
// Vue.config.ignoredElements = ['ion-icons', /^ion-/];
Vue.prototype.moment = moment;
axios.defaults.baseURL = process.env.VUE_APP_SOCKET_ENDPOINT

let socket = null;

/** Socket IO Client - Store in Vuex State for use in components */
socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);

// if (process.env.NODE_ENV === 'development') {
//     socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
// } else {
//     socket = io('/');
// }

store.dispatch('assignSocket', socket);

/** Check for auth token on refresh and set authorization header for incoming requests */
if (localStorage.getItem('authToken')) {
    setAuthToken(localStorage.getItem('authToken'));
} else {
    setAuthToken(null);
}

/** Axios Request Intercept */
axios.interceptors.request.use(
    function (config) {
        return config;
    },
    function (err) {
        return Promise.reject(err);
    }
);

/** Axios Response Intercept */
axios.interceptors.response.use(
    function (response) {
        return response;
    },
    function (err) {
        if (err.response.status === 401) {
            localStorage.removeItem('authToken');
            store.dispatch('toggleAuthState', false);
            router.push({
                name: 'login',
                params: { message: 'Session has expired, please login again' }
            });
        }
        return Promise.reject(err);
    }
);


Vue.use(VueRouter)

const router = new VueRouter({
    mode: 'history',
    routes
})

new Vue({
    data: { loading: false },
    router,
    store,
    render: h => h(App),
}).$mount('#app')

// export let loading = app.loading;



// router.beforeEach((to,from,next) => {
//   app.loading = true
//   next()
// })



// router.beforeEach(async (to, from, next) => {
//   app.loading = true;
//   const { authorize } = to.meta;
//   await checkUserData(next);
//   if (to.meta.requiresAuth) {
//       if (localStorage.getItem('authToken') === null || localStorage.getItem('authToken') === undefined) {
//           if(authorize.includes(Role.Consumer)){
//             localStorage.clear();
//             next({
//                 name: 'login',
//                 params: { message: 'You are unauthorized, Please login to access' }
//             });
//           }else{
//             localStorage.clear();
//             next({
//                 name: 'agentLogin',
//                 params: { message: 'You are unauthorized, Please login to access' }
//             });
//           }
//       } else {
//           next();
//       }
//   } 
//   // else if (!_.isEmpty(to.meta) && !to.meta.requiresAuth) {
//   //     if (localStorage.getItem('authToken')) {
//   //         next({
//   //             name: 'clientChat',
//   //             params: { handle: store.getters.getUserData.handle }
//   //         });
//   //     } else {
//   //         next();
//   //     }
//   // } 
//   else {
//       next();
//   }
//   next();
// });


// router.afterEach(() => {
//   setTimeout(() => app.loading = false, 1500) // timeout for demo purposes
// })
