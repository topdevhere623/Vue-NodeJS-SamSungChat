<template>
  <div class="min-h-full flex items-center justify-center items-center py-12 px-4 sm:px-6 lg:px-8 h-full" style="height:100vh">
    <div class="max-w-md w-full space-y-8">
      <div>
        <!-- <img class="mx-auto h-12 w-auto" src="https://www.synointcdn.com/wp-content/uploads/2019/04/Amazon-Logo-PNG.png" alt=""> -->
        <img class="mx-auto h-12 w-auto" src="../../assets/samsung-logo.svg" alt="Workflow">
        <!-- <h2 class="mt-6 text-center text-3xl font-extrabold text-gray-900">Client Sign In</h2> -->
      </div>
      <form class="mt-8 space-y-6 px-8 py-6 mt-4 text-left bg-white shadow-lg rounded" @submit.prevent="handleSubmit">
        <input type="hidden" name="remember" value="true">
        <div class="rounded-md shadow-sm">
          <div class="my-4">
            <label for="knox_id" class="text-sm font-medium text-gray-900 block mb-2 dark:text-gray-300">Please enter your KNOX ID</label>
            <input type="text" placeholder="Knox ID"  v-model="username" id="knox_id" class="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-600 dark:border-gray-500 dark:placeholder-gray-400 dark:text-white">
          </div>
        </div>
        <ErrorMessage :errors="errors"/>
        <div>
          <button type="submit" class="group relative w-full flex justify-center py-2 px-4 border border-transparent text-sm font-medium rounded-md text-white bg-amazon focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500">
            <span class="absolute left-0 inset-y-0 flex items-center pl-3">
              <!-- Heroicon name: solid/lock-closed -->
              <svg class="h-5 w-5 text-white-500 group-hover:text-indigo-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" aria-hidden="true">
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
import axios from 'axios';
import slugify from 'slugify';
import ErrorMessage from '../components/ErrorMessage';
import setAuthToken from '../../utils/authToken';
import { mapActions, mapGetters } from 'vuex';
import { wordList } from './wordList.js';

export default {
  name: "ClientLogin",
  title: 'Login | Samsung Technologies',
  components: {
    ErrorMessage,
  },
  data() {
    return {
        username:'',
        errors:'',
        wordList: wordList,
    };
  },
  created() {
    
    var chooseWord = this.wordList.wordList[Math.floor(Math.random()*this.wordList.wordList.length)];
    var randomNumber = Math.floor((Math.random() * 1000) + 1);
    var generatedUsername = chooseWord + randomNumber;

    console.log("generatedUsername", generatedUsername)
  },
    computed: {
        ...mapGetters(['getSocket'])
    },
    methods: {
        ...mapActions(['saveUserData', 'toggleAuthState']),
        handleSubmit() {
            this.errors = [];
            if (this.username) {
                axios
                    .post(`/api/auth/register`, {
                        handle: slugify(this.username.toLowerCase()),
                        username: this.username,
                        type: "consumer"
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
                            this.$store.dispatch('toggleAuthState', true);
                            this.$store.dispatch('saveUserData', res.data.user);
                            localStorage.setItem('user',JSON.stringify(res.data.user));
                            setAuthToken(res.data.token);
                            this.$router.push({
                                name: 'clientChat',
                            });
                        }
                    });
            }
            setTimeout(() => {
                this.errors = [];
            }, 1500);
        }
    },
};
</script>
<style scoped>
</style>
