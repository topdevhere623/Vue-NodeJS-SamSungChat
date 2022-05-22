<template>
  <div style="height: 100vh">
    <div class="App__transitionGroup___2QTyy">
      <div class="ChatRoller__outerContainer___ImPO2">
        <div class="ChatRoller__chatRoller___SwO92" style="height: 100%" ref="messages">
          <div class="ChatRoller__spinnerContainer___1926B" style="opacity: 0">
            <svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg" class="ChatRoller__spinner___3tsX8">
              <g class="Spinner__spinner___3C2E-" viewBox="0 0 66 66">
                <circle class="Spinner__path___2tz_N" fill="none" stroke-width="6" stroke-linecap="round" cx="33"
                  cy="33" r="30"></circle>
              </g>
            </svg><span>Loading previous messages...</span>
          </div>
          <div class="ChatRoller__liveTranscriptWrapper___JJkDd" style="height: 100%">
            <message-list :messages="messages" />
            <div v-if="show_client_messages">
              <client-message-list :client_messages="client_messages" />
            </div>

            <div v-if="chatting == false"
              class="TouchWords__touchWordsGroup___DJHDV TouchWords__touchWordsWrapped___dc9GR"
              style="align-content: flex-start">
              <button class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj" @click.prevent="clickGotit"
                v-if="!gotit && !endedChatting && available">
                Got it
              </button>
              <button class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj" @click.prevent="startAgain"
                v-if="endedChatting && gotit">
                Start Again
              </button>
            </div>

            <div class="TouchWords__touchWordsGroup___DJHDV TouchWords__touchWordsWrapped___dc9GR"
              v-if="gotit && chatoption == '' && !isChatBot">
              <button class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj" @click.prevent="initiateChat">
                Ok, get help through chat
              </button>
              <button class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj" @click.prevent="neverMind">
                Never mind, I’m all set
              </button>
            </div>
            <!-- Typing Start -->
            <!-- Typing Start -->
            <div v-if="typingAction"
              class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No typingIndicatorMessage Message__animated___KeDYU">
              <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer Service</span>
              <div class="Message__messageBody___3G5M0">
                <div class="Message__contentWrapper___C8jyb">
                  <svg class="TypingIndicator__typingIndicator___22Pa8" viewBox="0 0 8 2">
                    <g class="TypingIndicator__circleGroup___J7zB3">
                      <circle cx="1" cy="1" r="0.66"></circle>
                      <circle cx="4" cy="1" r="0.66"></circle>
                      <circle cx="7" cy="1" r="0.66"></circle>
                    </g>
                  </svg>
                </div>
              </div>
              <svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet"
                class="Message__avatar___1w-7K Message__typingIndicatorAvatar___2eJeC">
                <circle r="630" fill="#333" cx="630" cy="630"></circle>
                <g id="layer1" fill="#f3f3f3" stroke="none">
                  <path
                    d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z">
                  </path>
                  <path
                    d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z">
                  </path>
                </g>
              </svg>
            </div>
            <!-- Typing End -->
          </div>
        </div>
      </div>
      <div class="Overlay__overlayParent___2Jsj7"></div>
      <chat-input :isChatBot="isChatBot" @emitMessages="receiveMessages" @setChatBot="setChatBot" :Disabled="disabled"
        @LocalMessage.once="appendLocalMessage" />
      <div class="LiveHelpOverlay__liveHelpOverlayContainer___12w7a" style="flex-basis: 0px"></div>
    </div>
  </div>
</template>
<script>
// import { io } from 'socket.io-client';
// import SocketioService from '../../services/socketio.service';
import axios from "axios";
import _ from "lodash";
import slugify from 'slugify';
import { mapActions, mapGetters } from 'vuex';
import setAuthToken from '../../utils/authToken';
import ChatInput from '../components/ChatInput.vue';
import ClientMessageList from '../components/ClientMessageList.vue';
import MessageList from '../components/MessageList.vue';
import { wordList } from './wordList.js';
// import { uuid } from 'vue-uuid' ;

export default {
  components: { ChatInput, MessageList, ClientMessageList },
  name: "ClientChat",
  title: 'Consumer Chat | Samsung Technologies',
  data() {
    return {
      Loader: false,
      user: {},
      content: "",
      client_messages: [],
      usersTyping: [],
      gotit: false,
      chatoption: "",
      newMessage: null,
      messages: [],
      user_messages: [],
      typing: false,
      username: null,
      ready: false,
      info: [],
      connections: 0,
      chat_bot: true,
      Disabled: true,
      showMessages: false,
      wordList: wordList,
      chatting: false,
      endedChatting: false,
      typingAction: false,
      available: true
    };
  },
  computed: {
    ...mapGetters(["getUserData", "getSocket", "getCurrentRoom"]),
    current_room: {
      get() {
        return this.getCurrentRoom;
      },
      set(current_room) {
        this.$store.dispatch("addCurrentRoom", current_room);
      },
    },
    loading: {
      get() {
        return this.Loader;
      },
      set(value) {
        this.Loader = value;
      },
    },
    isChatBot: {
      get() {
        return this.chat_bot;
      },
      set(value) {
        this.chat_bot = value;
      }
    },
    disabled: {
      get() {
        return this.Disabled
      },
      set(value) {
        this.Disabled = value
      }
    },
    show_client_messages: {
      get() {
        return this.showMessages
      },
      set(value) {
        this.showMessages = value;
      }
    }
  },
  created() {
    setTimeout(() => {
      this.scrollMessages();
    }, 100);
    if (JSON.parse(localStorage.getItem("user_chatting")) == true) {
      this.isChatBot = false;
      this.chatting = true;
      this.initiateChat();
      setTimeout(() => {
        this.scrollMessages();
      }, 100);
    } else {
      localStorage.clear();
      this.chatting = false;
    }

    if (localStorage.getItem("agent_currentRoom")) {
      let curRoom = localStorage.getItem("agent_currentRoom");
      this.agentCurRoom = JSON.parse(curRoom);
      let agent = localStorage.getItem("agent");
      this.agent = JSON.parse(agent);

      this.getSocket.emit('userTypingDefault', {
        room: this.agentCurRoom,
        user: this.agent,
        admin: true
      });
    }

    if (this.chatting === false) {
      var randomNumber = Math.floor((Math.random() * 10000) + 1);
      this.username = "User_" + randomNumber;
    }

    this.handleSubmit();

    this.loading = true;
    if (localStorage.getItem("authToken") && _.isEmpty(this.getUserData)) {
      axios
        .get(`/api/user/current`)
        .then((res) => {
          this.$store.dispatch("saveUserData", res.data);
          this.$store.dispatch("toggleAuthState", true);
          this.user = res.data;
          this.loading = false;
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
    } else {
      this.user = this.getUserData;
      this.loading = false;
    }
    /** Socket IO: Received New User Event */
    this.getSocket.on("updateRoomData", (data) => {
      this.client_messages = [];
      data = JSON.parse(data);
      if (data.messages.length > 0) {
        data.messages.forEach((message) => {
          if (message.content) {
            this.client_messages.push(message);
          }
        });
        setTimeout(() => {
          this.scrollMessages();
        }, 100);
      }
      if (data.room) {
        this.room = data.room;
        this.users = data.room.users;
        this.$store.dispatch("saveCurrentRoom", data.room);
      }
    });

    this.getSocket.on("getUserChattingStatus", (data) => {
      console.log("data", data);
      localStorage.setItem("user_chatting", true);
    });
    /** Socket IO: Reconnect User Event */
    this.getSocket.on("reconnect", () => {
      this.usersTyping = [];
      this.getSocket.emit("reconnectUser", {
        room: this.getCurrentRoom,
        user: this.getUserData,
      });
    });
    this.getSocket.on("reconnected", () => {
      console.warn("Reconnected");
    });
    this.getSocket.on("disconnect", () => {
      console.warn("Disconnected");
    });
    /** Socket IO: User Exit Event - Update User List */
    this.getSocket.on("updateUserList", (data) => {
      if (JSON.parse(data).users.length > 0) {
        this.users = JSON.parse(data).users;
      }
    });
    /** Socket IO: User Exit Event - Check other tabs of the same room and redirect */
    this.getSocket.on("receivedUserExit", (room) => {
      this.checkUserTabs(room);
    });

    this.getSocket.on('receivedNewMessage', message => {
      if (JSON.parse(message).content !== null) {
        this.client_messages.push(JSON.parse(message));
        setTimeout(() => {
          this.scrollMessages();
        }, 100);
      }
      this.typingAction = false;
      if (JSON.parse(message).content == "Thank you for contacting us, if you have further questions, please feel free to email us.") {
        this.disabled = true;
        localStorage.setItem("user_chatting", false);
        this.chatting = false;
        this.endedChatting = true;
        this.gotit = true;
      }
      if (JSON.parse(message).content == "Welcome to the Agent Room! How can I help you?") {
        this.Disabled = false;
      }
      setTimeout(() => {
        this.scrollMessages();
      }, 100);
    });
    /** Socket IO: User Typing Event  */
    this.getSocket.on('receivedAgentTyping', data => {
      if (JSON.parse(data)[0] === JSON.parse(localStorage.getItem("room")).display_name) {
        this.typingAction = true;
        this.usersTyping = JSON.parse(data).filter(
          user => user !== this.getUserData.username
        );
        setTimeout(() => {
          this.scrollMessages();
        }, 100);
      }
    });

    this.getSocket.on('receivedUserNotTyping', data => {
      console.log("data", data);
      this.typingAction = false;
    });

  },
  async mounted() {
    // this.getOrCreateRoom();
    this.gotit = true;
    this.messages.push({
      admin: true,
      title: true,
      content: "Hi, thanks for contacting Samsung. I'm Samsung's chat helper.",
      created_at: null,
    });
    setTimeout(() => {
      this.usersTyping.push({
        admin: true,
        content: "",
      }),
        this.usersTyping.pop();
      this.messages.push({
        title: false,
        admin: true,
        content:
          "I'm here to answer your questions &amp;get the right person to help you out.",
        created_at: null,
      });
    }, 500);

    setTimeout(() => {
      this.usersTyping.push({
        admin: true,
        content: "",
      });
    }, 600);

    setTimeout(() => {
      this.usersTyping.pop();
      this.messages.push({
        title: false,
        admin: true,
        content:
          "As I send you messages, you can select a button to reply. Give it a try.",
        created_at: Date.now(),
      });
    }, 700);

    setTimeout(() => {
      this.gotit = false;
    }, 700);
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
              localStorage.setItem("user", JSON.stringify(res.data.user));
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
    },
    neverMind() {
      setTimeout(() => {
        this.messages.push({
          title: false,
          admin: false,
          content: "Never mind, I’m all set",
          created_at: null,
        });
      }, 500);
    },
    startAgain() {
      localStorage.clear();
      this.$router.go();
    },
    clickGotit() {
      this.gotit = true;
      this.Disabled = false;
      this.messages.push({
        title: false,
        admin: false,
        content: "Got it",
        created_at: Date.now(),
      });

      setTimeout(() => {
        this.messages.push({
          title: true,
          admin: true,
          content: "OK",
          created_at: null,
        });
        setTimeout(() => {
          this.scrollMessages();
        }, 100);
      }, 500);
      setTimeout(() => {
        this.messages.push({
          title: false,
          admin: true,
          content: "So, what can I help you with?",
          created_at: Date.now(),
        });
        setTimeout(() => {
          this.scrollMessages();
        }, 100);
      }, 500);
      setTimeout(() => {
        this.scrollMessages();
      }, 100);
    },
    checkLingeringUser(data) {
      for (const room of data) {
        if (room.users.some((room) => room._id === this.getUserData._id)) {
          return true;
        }
      }
      return false;
    },
    initiateChat() {
      // const d = new Date();
      // if (d.getUTCHours() >= 16 && d.getUTCHours() <= 24) {
      this.chatoption = "chat";
      this.Disabled = false;
      this.messages.pop();
      setTimeout(() => {
        // this.usersTyping.pop();
        this.messages.push({
          title: false,
          admin: false,
          content: "Ok, get help through chat",
          created_at: Date.now(),
        });
      }, 400);

      if (JSON.parse(localStorage.getItem("user_chatting")) == true) {
        this.Disabled = false;
      } else {
        this.Disabled = true;
        setTimeout(() => {
          // this.usersTyping.pop();
          this.messages.push({
            title: false,
            admin: false,
            content: "Please wait an agent will connect with you shortly",
            created_at: Date.now(),
          });
        }, 900);
      }

      this.getOrCreateRoom();
      // } else {
      //   this.gotit = true;
      //   this.available = false;
      //   this.isChatBot = true;
      //   this.endChatting = false;
      //   setTimeout(() => {
      //     this.messages.push({
      //       title: true,
      //       admin: true,
      //       content: "Sorry, no agent is available right now!",
      //       created_at: null,
      //     });
      //     setTimeout(() => {
      //       this.scrollMessages();
      //     }, 100);
      //   }, 500);
      // }
    },
    handleCreateRoom() {
      this.loading = true;
      axios
        .post("/api/room/create", {
          room_name: this.user.username,
          // socketId : data.socketId,
        })
        .then((res) => {
          if (res.data.errors) {
            for (const error of res.data.errors) {
              const [value] = Object.values(error);
              this.errors.push(value);
            }
            this.loading = false;
          } else {
            this.$store.dispatch("addRoom", res.data);
            this.room_name = null;
            this.password = null;
            this.getSocket.emit("roomAdded", res.data);
            this.loading = false;
          }
        })
        .catch((err) => {
          console.log(err);
          this.loading = false;
        });
      setTimeout(() => {
        this.errors = [];
      }, 1500);
    },
    receiveMessages(value) {
      if (value && value.length > 0) {
        value.forEach(message => {
          if (message.content) {
            this.messages.push(message);
          }
        })
      }
      setTimeout(() => {
        this.scrollMessages();
      }, 100);
      // this.messages = [...this.messages, value];
    },
    setChatBot(value) {
      this.isChatBot = false;
      console.log(value);
    },
    scrollMessages() {
      var container = this.$refs.messages;
      if (container && container.scrollHeight) {
        container.scrollTop = container.scrollHeight;
      }

    },
    updated() {
      this.scrollMessages();
    },
    getOrCreateRoom() {
      const room = localStorage.getItem('room')
      this.show_client_messages = true;
      if (!room) {
        console.log("THIS USERNAME", this.username);
        //Create New Room, Since User Logged In first Time
        this.loading = true;
        axios
          .post("/api/room/create", {
            display_name: this.username,
            // socketId : data.socketId,
          })
          .then((res) => {
            if (res.data.errors) {
              for (const error of res.data.errors) {
                const [value] = Object.values(error);
                this.errors.push(value);
              }
              this.loading = false;
            } else {
              console.log("Restponse", res);
              localStorage.setItem("room", JSON.stringify(res.data));
              this.loading = false;
              this.$store.dispatch("saveCurrentRoom", res.data);
              this.getSocket.emit("userJoined", {
                room: this.getCurrentRoom,
                user: this.getUserData,
                content: null,
                admin: false,
              });
              this.getSocket.emit("roomAdded", res.data);
            }
          })
          .catch((err) => {
            console.log(err);
            this.loading = false;
          });
        setTimeout(() => {
          this.errors = [];
        }, 1500);
      }
      else {
        let room = localStorage.getItem("room");
        let user = localStorage.getItem('user');
        this.$store.dispatch("saveCurrentRoom", JSON.parse(room));
        this.$store.dispatch('saveUserData', JSON.parse(user));
        this.getSocket.emit("userJoined", {
          room: this.getCurrentRoom,
          user: this.getUserData,
          content: null,
          admin: false,
        });
      }
    },
    appendLocalMessage(value) {
      if (!(_.isEmpty(value))) {
        this.client_messages.push(value);
      }
    }
  },
};
</script>
<style scoped>
.app-transition-container {
  height: 100%;
  width: 100%;
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
  -webkit-flex-wrap: nowrap;
  flex-wrap: nowrap;
}

.chat-scroll-container-outer {
  -webkit-flex-grow: 1;
  flex-grow: 1;
  overflow: hidden;
}

.chat-scroller-chat-scroller {
  overflow-y: auto;
  padding-bottom: 0;
  padding-top: 0;
  -webkit-flex-grow: 1;
  flex-grow: 1;
  will-change: transform;
  background: linear-gradient(135deg, #fff, #f7feff);
  min-width: 300px;
}

.chat-scroller-chat-scroller .chat-scroller-spinner-container {
  padding-top: 0.5rem;
  padding-bottom: 0.5rem;
  background-color: transparent;
  opacity: 0;
  transition: opacity 0.1s linear;
  text-align: center;
  font-size: 0.85rem;
  color: #767676;
}

.chat-scroller-chat-scroller .chat-scroller-spiner-container .chat-scroller-spinner {
  height: 3rem;
  margin-left: auto;
  margin-right: auto;
  display: block;
  margin-bottom: 0.25rem;
}

.spinner-spinner {
  stroke: #36c2b4;
  opacity: 1;
  transition: opacity 0.3s ease-in;
  -webkit-animation: Spinner__message-us-loader-rotator___123N_ 2s linear infinite;
  animation: Spinner__message-us-loader-rotator___123N_ 2s linear infinite;
  -webkit-transform-origin: center;
  transform-origin: center;
}

.spinner-spinner>.spinner-path {
  stroke-dasharray: 180;
  stroke-dashoffset: 220;
  -webkit-transform-origin: center;
  transform-origin: center;
  -webkit-animation: Spinner__message-us-loader-dash___21w-J 2s cubic-bezier(0.39, 0, 0.35, 0.96) 0s infinite;
  animation: Spinner__message-us-loader-dash___21w-J 2s cubic-bezier(0.39, 0, 0.35, 0.96) 0s infinite;
}

.chat-scroller-live-transcript-wrapper {
  display: -webkit-flex;
  display: flex;
  -webkit-flex-direction: column;
  flex-direction: column;
}

.TouchWords__touchword___1A6du {
  white-space: inherit !important;
}
</style>
