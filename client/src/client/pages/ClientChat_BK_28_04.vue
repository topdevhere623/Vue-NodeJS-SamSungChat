<template>
        <div style="height:100vh">
            <div class="App__transitionGroup___2QTyy">
                <div class="ChatRoller__outerContainer___ImPO2">
                    <div class="ChatRoller__chatRoller___SwO92" style="height: 100%;" ref="messages">
                        <div class="ChatRoller__spinnerContainer___1926B" style="opacity: 0;"><svg viewBox="0 0 66 66"
                                xmlns="http://www.w3.org/2000/svg" class="ChatRoller__spinner___3tsX8">
                                <g class="Spinner__spinner___3C2E-" viewBox="0 0 66 66">
                                    <circle class="Spinner__path___2tz_N" fill="none" stroke-width="6"
                                        stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                                </g>
                            </svg><span>Loading previous messages...</span></div>
                        <div class="ChatRoller__liveTranscriptWrapper___JJkDd" style="height: 100%;">
                            <template v-for="(message,index) in messages">
                                <div v-html="message.description" :key="index"></div>
                                <!-- {{message}} -->
                            </template>
                            <!-- <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh-">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Hi, thanks for contacting Amazon. I'm
                                            Amazon's chat helper.</span></div>
                                </div>
                            </div>
                            <div class="Message__message___1YUAv Message__agentVariant___2NLqJ">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">I'm here to answer your questions &amp;
                                            get the right person to help you out.</span></div>
                                </div>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">As I send you messages, you can select
                                            a button to reply. Give it a try.</span></div>
                                </div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet"
                                    class="Message__avatar___1w-7K">
                                    <circle r="630" fill="#333" cx="630" cy="630"></circle>
                                    <g id="layer1" fill="#f3f3f3" stroke="none">
                                        <path
                                            d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z">
                                        </path>
                                        <path
                                            d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z">
                                        </path>
                                    </g>
                                </svg><span class="Message__timeStamp___1WvX7">{{new Date().getHours() }} : {{new Date().getMinutes()}}</span>
                            </div> -->
                                            <!-- <div class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No typingIndicatorMessage Message__animated___KeDYU"><span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer Service</span><div class="Message__messageBody___3G5M0"><div class="Message__contentWrapper___C8jyb"><svg class="TypingIndicator__typingIndicator___22Pa8" viewBox="0 0 8 2"><g class="TypingIndicator__circleGroup___J7zB3"><circle cx="1" cy="1" r="0.66"></circle><circle cx="4" cy="1" r="0.66"></circle><circle cx="7" cy="1" r="0.66"></circle></g></svg></div></div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet" class="Message__avatar___1w-7K
         Message__typingIndicatorAvatar___2eJeC"><circle r="630" fill="#333" cx="630" cy="630"></circle><g id="layer1" fill="#f3f3f3" stroke="none"><path d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z"></path><path d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z"></path></g></svg></div> -->

                            <div class="TouchWords__touchWordsGroup___DJHDV TouchWords__touchWordsWrapped___dc9GR">
                                <button class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj" @click.prevent="gotit = true" v-if="!gotit">Got it
                                    </button>
                            </div>
                                
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU" v-if="gotit">
                                <div class="Message__messageBody___3G5M0" >
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Got it</span></div>
                                </div><span class="Message__timeStamp___1WvX7">{{new Date().getHours() }} : {{new Date().getMinutes()}}</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__animated___KeDYU" v-if="gotit">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">OK</span></div>
                                </div>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No Message__animated___KeDYU" v-if="gotit">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">So, what can I help you with?</span>
                                    </div>
                                </div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet"
                                    class="Message__avatar___1w-7K">
                                    <circle r="630" fill="#333" cx="630" cy="630"></circle>
                                    <g id="layer1" fill="#f3f3f3" stroke="none">
                                        <path
                                            d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z">
                                        </path>
                                        <path
                                            d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z">
                                        </path>
                                    </g>
                                </svg><span class="Message__timeStamp___1WvX7">{{new Date().getHours() }} : {{new Date().getMinutes()}}</span>
                            </div>
                            <div class="TouchWords__touchWordsGroup___DJHDV TouchWords__touchWordsWrapped___dc9GR" v-if="gotit && chatoption == ''">
                                <button class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj" @click.prevent="initiateChat">Ok, get help through chat</button>
                                <button
                                    class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj" @click.prevent="chatoption = 'ok'">Never mind, I’m all set</button>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU" v-if="gotit && chatoption == 'chat'">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Ok, get help through chat</span></div>
                                </div><span class="Message__timeStamp___1WvX7">{{new Date().getHours() }} : {{new Date().getMinutes()}}</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU" v-if="gotit && chatoption == 'ok'">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Never mind, I’m all set</span></div>
                                </div><span class="Message__timeStamp___1WvX7">{{new Date().getHours() }} : {{new Date().getMinutes()}}</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No Message__animated___KeDYU" v-if="gotit && chatoption == 'chat'">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">An associate will join the chat.</span>
                                    </div>
                                </div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet"
                                    class="Message__avatar___1w-7K">
                                    <circle r="630" fill="#333" cx="630" cy="630"></circle>
                                    <g id="layer1" fill="#f3f3f3" stroke="none">
                                        <path
                                            d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z">
                                        </path>
                                        <path
                                            d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z">
                                        </path>
                                    </g>
                                </svg><span class="Message__timeStamp___1WvX7">{{new Date().getHours() }} : {{new Date().getMinutes()}}</span>
                            </div>
                                <template v-for="(message,index) in client_messages">
                                    <div :key="`${index}-general`" class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU" v-if="!message.admin && message.user && message.user._id === user._id">
                                        <div class="Message__messageBody___3G5M0">
                                            <div class="Message__contentWrapper___C8jyb"><span class="Message__textContent___ugH_K">{{message.content}}</span></div>
                                        </div><span class="Message__timeStamp___1WvX7">{{ moment(message.created_at).fromNow() }}</span>
                                    </div>

                                    <div :key="`${index}-support`" class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU" v-if="message.admin && message.content">
                                        <span class="Message__messageDisplayName___1U_jv"> Consumer Care</span>
                                        <div class="Message__messageBody___3G5M0">
                                            <div class="Message__contentWrapper___C8jyb"><span class="Message__textContent___ugH_K">{{message.content}}</span></div>
                                        </div>
                                        <div class="AgentAvatar__agentAvatar___2jl2R Message__avatar___1w-7K"><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet">
                                                <circle class="AgentAvatar__agentInitialBackground___1Q5am" r="630" cx="630" cy="630"></circle>
                                            </svg><span class="AgentAvatar__agentInitial___2K5jw">S</span></div><span class="Message__timeStamp___1WvX7">{{ moment(message.created_at).fromNow() }}</span>
                                    </div>
                                    <div :key="`${index}-consumer`" class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU" v-if="!message.admin && message.content">
                                        <div class="Message__messageBody___3G5M0">
                                            <div class="Message__contentWrapper___C8jyb"><span class="Message__textContent___ugH_K">{{message.content}}</span></div>
                                        </div><span class="Message__timeStamp___1WvX7">{{ moment(message.created_at).fromNow() }}</span>
                                    </div>
                                </template>
                                <!-- Typing Start -->
                                    <div v-if="usersTyping.length > 0" class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No typingIndicatorMessage Message__animated___KeDYU"><span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer Service</span><div class="Message__messageBody___3G5M0"><div class="Message__contentWrapper___C8jyb"><svg class="TypingIndicator__typingIndicator___22Pa8" viewBox="0 0 8 2"><g class="TypingIndicator__circleGroup___J7zB3"><circle cx="1" cy="1" r="0.66"></circle><circle cx="4" cy="1" r="0.66"></circle><circle cx="7" cy="1" r="0.66"></circle></g></svg></div></div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet" class="Message__avatar___1w-7K
                                        Message__typingIndicatorAvatar___2eJeC"><circle r="630" fill="#333" cx="630" cy="630"></circle><g id="layer1" fill="#f3f3f3" stroke="none"><path d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z"></path><path d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z"></path></g></svg></div>
                                <!-- Typing End -->
                        
                        </div>
                    </div>
                </div>
                <div class="Overlay__overlayParent___2Jsj7"></div>
                <div class="ChatInput__chatInputRow___1HmKN">
                    <form class="">
                        <div class="ChatInput__textInputContainer___1Em-l"><textarea type="text"
                                placeholder="Write a message..." rows="1" maxlength="5000" class=""            
                                v-model.trim="content"
                                v-on:keyup.prevent="triggerMessageSend"
                                data-gramm_editor="false">
                                </textarea><textarea
                                readonly="" class="ChatInput__invisibleSibling___1eapz" rows="1"
                                style="width: 406.453px;"></textarea></div>
                        <div class="ChatInput__buttonContainer___3DxRc"><button
                                class="ChatInput__sendButton___iTKUO" @click.prevent="sendMessage">Send</button></div>
                    </form>
                </div>
                <div class="LiveHelpOverlay__liveHelpOverlayContainer___12w7a" style="flex-basis: 0px;"></div>
            </div>
        </div>
</template>
<script>
// import { io } from 'socket.io-client';
// import SocketioService from '../../services/socketio.service';
import axios from 'axios'
import { mapGetters } from 'vuex';
import _ from 'lodash'
// import { uuid } from 'vue-uuid' ;

export default {
  name: "ClientChat",
  data() {
    return {
        Loader:false,
        user:{},
        content:'',
        client_messages:[],
        usersTyping:'',
        chat_bot:true,
        gotit:false,
        chatoption:'',
        newMessage: null,
        messages: [],
        user_messages:[],
        typing: false,
        username: null,
        ready: false,
        info: [],
        connections: 0,
        initial_message:`                              <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh-">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Hi, thanks for contacting Samsung. I'm
                                            Samsung's chat helper.</span></div>
                                </div>
                            </div>
                            <div class="Message__message___1YUAv Message__agentVariant___2NLqJ">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">I'm here to answer your questions &amp;
                                            get the right person to help you out.</span></div>
                                </div>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">As I send you messages, you can select
                                            a button to reply. Give it a try.</span></div>
                                </div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet"
                                    class="Message__avatar___1w-7K">
                                    <circle r="630" fill="#333" cx="630" cy="630"></circle>
                                    <g id="layer1" fill="#f3f3f3" stroke="none">
                                        <path
                                            d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z">
                                        </path>
                                        <path
                                            d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z">
                                        </path>
                                    </g>
                                </svg><span class="Message__timeStamp___1WvX7">${Date.now()}</span>
                            </div>`
    };
  },
    // watch: {
    //         newMessage(value) {
    //             value ? this.socket.emit('typing', this.username) : this.socket.emit('stopTyping')
    //         },
    //               delay(value){
    //       setTimeout(() => {return true}, value)
    //   }
    // },
    computed:{
           ...mapGetters(['getUserData', 'getSocket','getCurrentRoom']),
        current_room:{
            get(){
                return this.getCurrentRoom;
            },
            set(current_room){
                 this.$store.dispatch('addCurrentRoom',current_room);
            }
            
        },
        loading:{
            get(){
                return this.Loader;
            },
            set(value){
                this.Loader = value;
            }
        },
    },
        created() {
        // this.fetchRoomData();
        this.loading = true;
        if (localStorage.getItem('authToken') && _.isEmpty(this.getUserData)) {
            axios
                .get(`/api/user/current`)
                .then(res => {
                    this.$store.dispatch('saveUserData', res.data);
                    this.$store.dispatch('toggleAuthState', true);
                    this.user = res.data;
                    this.loading = false;
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                    });
        } else {
            this.user = this.getUserData;
             this.loading = false;
        }
                        /** Socket IO: Received New User Event */
                this.getSocket.on('updateRoomData', data => {
                    console.log('update Room Data');
                    console.log(data);
                    data = JSON.parse(data);
                    if (data.messages) {
                        this.client_messages = data.messages;
                    setTimeout(() => {
                        this.scrollMessages();
                    }, 100);
                        
                    }
                    if (data.room) {
                        this.room = data.room;
                        this.users = data.room.users;
                        this.$store.dispatch('saveCurrentRoom', data.room);
                    }
                    
                });
                /** Socket IO: Reconnect User Event */
                this.getSocket.on('reconnect', () => {
                    this.usersTyping = [];
                    this.getSocket.emit('reconnectUser', {
                        room: this.getCurrentRoom,
                        user: this.getUserData
                    });
                });
                this.getSocket.on('reconnected', () => {
                    console.warn('Reconnected');
                });
                this.getSocket.on('disconnect', () => {
                    console.warn('Disconnected');
                });
                /** Socket IO: User Exit Event - Update User List */
                this.getSocket.on('updateUserList', data => {
                    if(JSON.parse(data).users.length > 0){
                        this.users = JSON.parse(data).users;
                    }
                });
                /** Socket IO: User Exit Event - Check other tabs of the same room and redirect */
                this.getSocket.on('receivedUserExit', room => {
                    this.checkUserTabs(room);
                });
                /** Socket IO: New Messaage Event - Append the new message to the messages array */
                this.getSocket.on('receivedNewMessage', message => {
                    console.log('Recieved Message');
                    let transform_message = JSON.parse(message);
                    this.client_messages.push(transform_message);  
                    // setTimeout(() => {
                    //     this.scrollMessages();
                    // }, 100);                
                });
                /** Socket IO: User Typing Event  */
                this.getSocket.on('receivedUserTyping', data => {
                    this.usersTyping = JSON.parse(data).filter(
                        user => user !== this.getUserData.username
                    );
                    // setTimeout(() => {
                    //     this.scrollMessages();
                    // }, 100);   
                });
                /** Socket IO: Room Deleted Event - Redirect all users */
                // this.getSocket.on('roomDeleted', () => {
                //     this.$store.dispatch('saveCurrentRoom', null);
                //     setTimeout(() => {
                //         this.$router.push({ name: 'RoomList' });
                //     }, 2000);
                // });
                /** Socket IO: Room Updated Event */
                this.getSocket.on('roomUpdated', data => {
                    this.room = JSON.parse(data).room;
                    this.$store.dispatch('saveCurrentRoom', JSON.parse(data).room);
                });

        // this.getSocket.on('receivedNewMessage', message => {
        //             console.log(message)
        //             this.client_messages.push(JSON.parse(message));
        //         });
        //         /** Socket IO: User Typing Event  */
        //         this.getSocket.on('receivedUserTyping', data => {
        //             this.usersTyping = JSON.parse(data).filter(
        //                 user => user !== this.getUserData.username
        //             );
        //         });

        },
        mounted(){
            this.messages.push(
                    {
                        description:`<div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh-">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Hi, thanks for contacting Samsung. I'm Samsung's chat helper.</span></div>
                                </div>
                            </div>`
                    }
            )
            this.messages.push({
                description:`                                            <div class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No typingIndicatorMessage Message__animated___KeDYU"><div class="Message__messageBody___3G5M0"><div class="Message__contentWrapper___C8jyb"><svg class="TypingIndicator__typingIndicator___22Pa8" viewBox="0 0 8 2"><g class="TypingIndicator__circleGroup___J7zB3"><circle cx="1" cy="1" r="0.66"></circle><circle cx="4" cy="1" r="0.66"></circle><circle cx="7" cy="1" r="0.66"></circle></g></svg></div></div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet" class="Message__avatar___1w-7K
         Message__typingIndicatorAvatar___2eJeC"><circle r="630" fill="#333" cx="630" cy="630"></circle><g id="layer1" fill="#f3f3f3" stroke="none"><path d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z"></path><path d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z"></path></g></svg></div>`
            })
            setTimeout( () => {
                this.messages.pop()
                this.messages.push({
                description:`                            <div class="Message__message___1YUAv Message__agentVariant___2NLqJ">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">I'm here to answer your questions &amp;get the right person to help you out.</span></div>
                                </div>
                            </div>
`
            });
            },500);
            setTimeout( () => {
                
                            this.messages.push({
                description:`                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">As I send you messages, you can select a button to reply. Give it a try.</span></div>
                                </div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet"
                                    class="Message__avatar___1w-7K">
                                    <circle r="630" fill="#333" cx="630" cy="630"></circle>
                                    <g id="layer1" fill="#f3f3f3" stroke="none">
                                        <path
                                            d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z">
                                        </path>
                                        <path
                                            d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z">
                                        </path>
                                    </g>
                                </svg><span class="Message__timeStamp___1WvX7">${new Date().getHours() } : ${new Date().getMinutes()}</span>
                            </div>`
            })
            },1000);


        },
  methods: {
        checkLingeringUser(data) {
            for (const room of data) {
                if (room.users.some(room => room._id === this.getUserData._id)) {
                    return true;
                }
            }
            return false;
        },
    async initiateChat(e){
        e.preventDefault();
        this.chatoption = 'chat';
        // this.loading = true;
        // SocketioService.setupSocketConnection();
        // let chatRoom = this.createChatRoom();
        await this.handleCreateRoom();
        await axios
            .get(`/api/room/name/${this.user.username}`)
            .then(res => {
                this.room = res.data;
                this.users = res.data.users;
                this.$store.dispatch('saveCurrentRoom', res.data);
                this.loading = false;
                /** Socket IO: User join event, get latest messages from room */
                this.getSocket.emit('userJoined', {
                    room: this.getCurrentRoom,
                    user: this.getUserData,
                    content: null,
                    admin: false
                });

                
            })
            .catch(err => {
                if (err.response.status === 404) {
                    this.$router.push({
                        name: 'RoomList',
                        params: { message: 'This room does not exist or has been deleted' }
                    });
                }
            });

    },
    handleCreateRoom() {
            this.loading = true;
            axios
                .post('/api/room', {
                    room_name: this.user.username,
                })
                .then(res => {
                    if (res.data.errors) {
                        for (const error of res.data.errors) {
                            const [value] = Object.values(error);
                            this.errors.push(value);
                        }
                        this.loading = false;
                    } else {
                        this.$store.dispatch('addRoom', res.data);
                        this.room_name = null;
                        this.password = null;
                        this.getSocket.emit('roomAdded', res.data);
                        this.loading = false;
                    }
                })
                .catch(err => {
                    console.log(err);
                    this.loading = false;
                });
            setTimeout(() => {
                this.errors = [];
            }, 1500);
        },
        sendUserTyping() {
            console.log(this.getCurrentRoom)
            this.getSocket.emit('userTyping', {
                room: this.getCurrentRoom,
                user: this.getUserData,
                admin:false,
            });
        },
        sendUserNotTyping() {
            this.getSocket.emit('removeUserTyping', {
                room: this.getCurrentRoom,
                user: this.getUserData,
                admin:false,
            });
        },
        triggerMessageSend(e) {
            e.preventDefault();
            // console.log('Trigger Send Message');
            // if (e.keyCode === 13 && !e.shiftKey) {
            //     this.sendMessage();
            // } else {
            //     if (this.content !== '') {
            //         this.sendUserTyping();
            //     } else {
            //         this.sendUserNotTyping();
            //     }
            // }
        },
        sendMessage() {
            console.log('Send  Message');
            this.getSocket.emit('newMessage', {
                room: this.getCurrentRoom,
                user: this.getUserData,
                content: this.content,
                admin:false,
            });
            this.content = '';
            this.sendUserNotTyping();
            setTimeout(() => {
                this.scrollMessages();
            }, 100);
        },
        scrollMessages() {
            var container = this.$refs.messages;
            container.scrollTop = container.scrollHeight;
        },
        updated() {
            this.scrollMessages();
        },
        // scrollToView() {
        //     const el = this.$refs.messages;
        //     if (el) {
        //         // Use el.scrollIntoView() to instantly scroll to the element
        //         el.scrollIntoView({ behavior: "smooth" });
        //     }
        // },
  },
};
</script>
<style scoped>
.app-transition-container{
    height: 100%;
    width: 100%;
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
    -webkit-flex-wrap: nowrap;
    flex-wrap: nowrap;
}
.chat-scroll-container-outer{
    -webkit-flex-grow: 1;
    flex-grow: 1;
    overflow: hidden;
}
.chat-scroller-chat-scroller{
    overflow-y: auto;
    padding-bottom: 0;
    padding-top: 0;
    -webkit-flex-grow: 1;
    flex-grow: 1;
    will-change: transform;
    background: linear-gradient(135deg,#fff,#f7feff);
    min-width: 300px;
}
.chat-scroller-chat-scroller .chat-scroller-spinner-container{
    padding-top: 0.5rem;
    padding-bottom: 0.5rem;
    background-color: transparent;
    opacity: 0;
    transition: opacity .1s linear;
    text-align: center;
    font-size: .85rem;
    color: #767676
}
.chat-scroller-chat-scroller .chat-scroller-spiner-container .chat-scroller-spinner{
    height: 3rem;
    margin-left: auto;
    margin-right: auto;
    display: block;
    margin-bottom: 0.25rem;
}
.spinner-spinner{
    stroke: #36c2b4;
    opacity: 1;
    transition: opacity .3s ease-in;
    -webkit-animation: Spinner__message-us-loader-rotator___123N_ 2s linear infinite;
    animation: Spinner__message-us-loader-rotator___123N_ 2s linear infinite;
    -webkit-transform-origin: center;
    transform-origin: center;
}
.spinner-spinner>.spinner-path{
    stroke-dasharray: 180;
    stroke-dashoffset: 220;
    -webkit-transform-origin: center;
    transform-origin: center;
    -webkit-animation: Spinner__message-us-loader-dash___21w-J 2s cubic-bezier(.39,0,.35,.96) 0s infinite;
    animation: Spinner__message-us-loader-dash___21w-J 2s cubic-bezier(.39,0,.35,.96) 0s infinite;
}
.chat-scroller-live-transcript-wrapper{
    display: -webkit-flex;
    display: flex;
    -webkit-flex-direction: column;
    flex-direction: column;
}
</style>
