<template>
  <div class="min-h-full flex items-center justify-center items-center py-12 px-4 sm:px-6 lg:px-8 h-full">
    <div class="max-w-md w-full space-y-8">
      <div>
        <!-- <img class="mx-auto h-12 w-auto" src="https://www.synointcdn.com/wp-content/uploads/2019/04/Amazon-Logo-PNG.png" alt=""> -->
        <img class="mx-auto h-12 w-auto" src="https://tailwindui.com/img/logos/workflow-mark-indigo-600.svg" alt="Workflow">
        <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Client Sign In</h2>
        <p class="mt-2 text-center text-sm text-gray-600">
          No account?
          <a href="/register.html" class="font-medium text-indigo-600 hover:text-indigo-500"> Signup Now</a>
        </p>
      </div>
      <form class="mt-8 space-y-6 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded"  @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm">
          <div class="my-4">
            <label for="email" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Email</label>
            <input type="text" v-model="username" id="email" placeholder="Email" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
          </div>
          <div class="my-4">
            <label for="password" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Password</label>
            <input type="password" v-model="password" id="password" placeholder="Password" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
          </div>
           <ErrorMessage :errors="errors"/>
        </div>
  
        <div class="flex items-center justify-between">
          <!-- <div class="flex items-center">
            <input id="remember-me" name="remember-me" type="checkbox" class="h-4 w-4 text-indigo-600 focus:ring-indigo-500 border-gray-300 rounded">
            <label for="remember-me" class="ml-2 block text-sm text-gray-900"> Remember me </label>
          </div> -->
  
          <!-- <div class="text-sm">
            <a href="/ForgotPassword.html" class="font-medium text-indigo-600 hover:text-indigo-500"> Forgot your password? </a>
          </div> -->
        </div>

        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg class="h-5 w-5 text-indigo-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
                <path fill-rule="evenodd" d="M5 9V7a5 5 0 0110 0v2a2 2 0 012 2v5a2 2 0 01-2 2H5a2 2 0 01-2-2v-5a2 2 0 012-2zm8-2v2H7V7a3 3 0 016 0z" clip-rule="evenodd" />
              </svg>
            </span>
            Sign in
          </button>
        </div>
      </form>
    </div>
  </div>
</template>
<script>
import ErrorMessage from '../components/ErrorMessage.vue';
import setAuthToken from '../../utils/authToken';
import { mapActions } from 'vuex';
import axios from 'axios';

export default {
  name: "ClientLogin",
  components:{
    ErrorMessage
  },
  data() {
    return {
        username:'',
        password:'',
        errors:[],
    };
  },
  methods: {
        ...mapActions(['saveUserData', 'toggleAuthState']),
        handleSubmit() {
            this.errors = [];
            if (this.username && this.password) {
                axios
                    .post('/api/auth/login', {
                        username: this.username,
                        password: this.password
                    })
                    .then(res => {
                        if (res.data.errors) {
                            for (const error of res.data.errors) {
                                const [key] = Object.keys(error);
                                const [value] = Object.values(error);
                                this.errors.push({
                                    key,
                                    value
                                });
                            }
                        } else {
                            localStorage.setItem('authToken', res.data.token);
                            localStorage.setItem('agent',JSON.stringify(res.data.user));
                            this.$store.dispatch('toggleAuthState', true);
                            this.$store.dispatch('saveUserData', res.data.user);
                            setAuthToken(res.data.token);
                            this.$router.push({
                                name: 'agentDashboard'
                            });
                        }
                    });
            }
            setTimeout(() => {
                this.errors = [];
            }, 1500);
        }
    // loginUser() {
    //   //TODO:: Send request for login here
    //   if (this.checkInput("empty", [this.username, this.password])) {
    //         var data = {
    //           userName: this.username.value,
    //           password: this.password.value,
    //         };
    //         var config = {
    //           method: "post",
    //           url: "/api/auth/login",
    //           headers: {
    //             "Content-Type": "application/json",
    //           },
    //           data: data,
    //         };
    //         let self = this;
    //         axios(config)
    //           .then(function (response) {
    //             if (User.responseAfterLogin(response.data)) {
    //               self.$router.push("dashboard");
    //             }
    //           })
    //           .catch(function (err) {
    //             self.displayError(self.username, "Invalid Username or Password");
    //           });
    //   }
    // },
    // displayError(target, message) {
    //   target.error = true;
    //   target.message = message;
    // },
    // checkInput(issue, ...target) {
    //   let list = [...target][0];
    //   let faults = 0;
    //   if (issue == "empty") {
    //     target[0].forEach((element) => {
    //       // console.log(element, element);
    //       if (issue == "empty") {
    //         if (!element.value) {
    //           // console.log(element.name);
    //           this.displayError(element, element.name + " Cannot Be Empty!");
    //           faults += 1;
    //         }
    //       }
    //     });
    //   } else {
    //     if (issue == "length") {
    //       if (list.value.length < 8) {
    //         this.displayError(
    //           list,
    //           list.name + " Must Be Atleast 8 Characters!"
    //         );
    //         faults += 1;
    //       }
    //     } else if (issue == "passwordStrength") {
    //       var strongRegex = new RegExp(
    //         "^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.*[!@#$%^&*])(?=.{8,})"
    //       );
    //       if (!strongRegex.test(list.value)) {
    //         this.displayError(
    //           list,
    //           list.name +
    //             " Must Be Strong Or Must Contain An Uppercase Letter, Lowercase Letter, Number And Special Character Symbol!"
    //         );
    //         faults += 1;
    //       }
    //     }
    //   }

    //   return faults == 0;
    // },
  },
};
</script>
<style scoped>
</style>
