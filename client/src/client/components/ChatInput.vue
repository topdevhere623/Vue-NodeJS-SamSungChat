<template>
  <div class="ChatInput__chatInputRow___1HmKN">
    <form class="" @submit.prevent="sendMessage">
      <div class="ChatInput__textInputContainer___1Em-l">
        <textarea type="text" placeholder="Write a message..." rows="1" maxlength="5000" class="" v-model.trim="content"
          v-on:keyup.prevent="triggerMessageSend" data-gramm_editor="false" :disabled="Disabled">
            </textarea><textarea readonly="" class="ChatInput__invisibleSibling___1eapz" rows="1"
          style="width: 406.453px"></textarea>
      </div>
      <div class="ChatInput__buttonContainer___3DxRc">
        <button class="ChatInput__sendButton___iTKUO" :disabled="Disabled">
          Send
        </button>
      </div>
      <div class="ChatInput__buttonContainer___3DxRc">
        <button type="button" class="ChatInput__sendButton___iTKUO" @click.prevent="startAgain">
          End Chat
        </button>
      </div>
    </form>
  </div>
</template>
<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
  name: "ChatInput",
  props: ['isChatBot', 'Disabled'],
  data() {
    return {
      content: '',
    };
  },
  created() {
    setTimeout(() => {
      this.scrollMessages();
    }, 100);
  },
  computed: {
    ...mapGetters(["getUserData", "getSocket", "getCurrentRoom"]),
    current_room: {
      get() {
        return this.getCurrentRoom;
      },
      set(current_room) {
        this.$store.dispatch('addCurrentRoom', current_room);
      }

    },
  },
  methods: {
    ...mapActions(['saveUserData', 'toggleAuthState']),

    sendUserTyping() {
      this.getSocket.emit("userTyping", {
        room: this.getCurrentRoom,
        user: this.getUserData,
        admin: false,
      });
    },
    startAgain() {
      if (localStorage.getItem("room")) {
        let room = JSON.parse(localStorage.getItem("room"));
        console.log("ROOM ;;;;;", room);

        let query1 = axios.delete(`/api/user/delete/${room.display_name}`);
        let query2 = axios.delete(`/api/room/delete/${room._id}`);
        let query3 = axios.delete(`/api/messages/delete/${room._id}`);

        Promise.all([query1, query2, query3])
          .then(res => {
            console.log("Promise console", res);
            this.getSocket.emit("userRestartedChatting", {
              room: this.getCurrentRoom,
              user: this.getUserData,
              admin: false,
              content: "The End User has left the Room!",
            });


          })
          .catch(err => {
            console.log("Promise error", err);
          })
      }

      localStorage.clear();
      this.$router.go();

      //   // await axios
      //   //   .delete(`/api/user/delete/${room.display_name}`)
      //   //   .then(res => {
      //   //     console.log("UserDelete", res)
      //   //   })
      //   //   .catch(err => {
      //   //     if (err.response.status === 404) {
      //   //       console.log("err", err)
      //   //       this.$router.push({
      //   //         name: 'RoomList',
      //   //         params: { message: 'This room does not exist or has been deleted' }
      //   //       });
      //   //     }
      //   //   });
      //   // await axios
      //   //   .delete(`/api/room/delete/${room._id}`)
      //   //   .then(res => {
      //   //     console.log("Deleted Room Data", res.data);
      //   //     this.deleteRoom(res.data)
      //   //     this.deleteCurrentRoom(res.data)
      //   //     localStorage.removeItem("agent_currentRoom");

      //   //   })
      //   //   .catch(err => {
      //   //     if (err.response.status === 404) {
      //   //       console.log("err", err)
      //   //       this.$router.push({
      //   //         name: 'RoomList',
      //   //         params: { message: 'This room does not exist or has been deleted' }
      //   //       });
      //   //     }
      //   //   });

      //   // await axios
      //   //   .delete(`/api/messages/delete/${room._id}`)
      //   //   .then(res => {
      //   //     console.log("res////", res)
      //   //     this.client_messages = [];
      //   //     // this.deleteRoom(res.data)
      //   //     // this.deleteCurrentRoom(res.data)

      //   //   })
      //   //   .catch(err => {
      //   //     if (err.response.status === 404) {
      //   //       console.log("err", err)
      //   //       this.$router.push({
      //   //         name: 'RoomList',
      //   //         params: { message: 'This room does not exist or has been deleted' }
      //   //       });
      //   //     }
      //   //   });

      //   // localStorage.clear();
      //   // this.$router.go();
    },
    sendUserNotTyping() {
      this.getSocket.emit("removeUserTyping", {
        room: this.getCurrentRoom,
        user: this.getUserData,
        admin: false,
      });
    },
    triggerMessageSend(e) {
      console.log("Action of Key", e);
      e.preventDefault();
      if (e.keyCode === 13 && !e.shiftKey) {
        if (this.content !== "") {
          this.sendMessage();
          setTimeout(() => {
            this.scrollMessages();
          }, 100);
        }
      } else {
        if (this.content !== "") {
          this.sendUserTyping();
        } else {
          this.sendUserNotTyping();
        }
      }
    },
    sendMessage() {
      console.log("ISCHATBOT", this.isChatBot);
      if (this.isChatBot) {
        this.checkBotChat();
        setTimeout(() => {
          this.scrollMessages();
        }, 100);
      } else {
        if (this.content !== null) {
          this.getSocket.emit("newMessage", {
            room: this.getCurrentRoom,
            user: this.getUserData,
            content: this.content,
            admin: false,
          });
          this.content = null;
          this.sendUserNotTyping();
          setTimeout(() => {
            this.scrollMessages();
          }, 100);
        }
      }
    },
    async checkBotChat() {
      try {
        let self = this;
        let xhttp = new XMLHttpRequest(),
          _this = this;
        xhttp.open(
          "POST",
          "https://prod-43.westus.logic.azure.com/workflows/b808e491c1d14d24a944fb54b3be7d95/triggers/manual/paths/invoke?api-version=2016-06-01&sp=%2Ftriggers%2Fmanual%2Frun&sv=1.0&sig=mZ5dYy3VSZy-p4vupyUJA__V9xgZ4MUNtnlkhvUUbko",
          true
        );
        xhttp.setRequestHeader("Content-Type", "application/json");
        let data = { text: this.content };
        xhttp.send(JSON.stringify(data));
        xhttp.onreadystatechange = function () {
          if (this.readyState == 4 && this.status == 200) {
            const response = JSON.parse(this.response)
            if (
              response.message.data.answer.text !=
              "Query not supported in system yet, please contact IT/respective department.!"
            ) {
              console.log("@ response");
              if (response.message.data.answer.text) {
                self.$emit('emitMessages', [
                  { admin: false, content: _this.content, created_at: new Date() },
                  { admin: true, content: response.message.data.answer.text, created_at: new Date() }
                ]);
                _this.content = null;
              } else {
                self.$emit('emitMessages', [
                  { admin: false, content: _this.content, created_at: new Date() }
                ]);
                _this.content = null;
              }
            } else {
              console.log("! response");
              _this.$emit('emitMessages', [
                { admin: false, title: false, content: _this.content, created_at: new Date() },
              ]);
              _this.$emit("setChatBot", false);

              _this.content = null;
            }
          }
        };
      } catch (err) {
        console.log("43344444", err);
      }
    },
    scrollMessages() {
      var container = this.$parent.$refs.messages;
      if (container && container.scrollHeight) {
        container.scrollTop = container.scrollHeight;
      }
    },
  },
};
</script>
<style scoped>
</style>
