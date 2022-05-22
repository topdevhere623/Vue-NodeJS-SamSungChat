// import { io } from 'socket.io-client';

// class SocketioService {
//   socket;
//   constructor() {
//     this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT)
//   }

//   setupSocketConnection() {
//     this.socket = io(process.env.VUE_APP_SOCKET_ENDPOINT);
//   }
//   disconnect() {
//     if (this.socket) {
//         this.socket.disconnect();
//     }
//   }
//   sendMessage(message){
//     this.socket.emit('client-message', message);
//   }
//   agentReceiveMessage(){

//     this.socket.on("agent-receieve-message", function (arg) {
//         console.log(arg); // "world"
//       });
//   }
// }

// export default new SocketioService();