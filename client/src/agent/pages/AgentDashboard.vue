
<template>
	<div class="container-fluid" style="background: #FDFEFF;font-family: Amazon Ember,Arial,sans-serif;">
		<div class="min-w-full border rounded lg:grid lg:grid-cols-7" style="height: 100vh;overflow-y: scroll;">
			<div class="border-r border-gray-300 lg:col-span-2">
				<div class="">
					<div class="ChatInput__chatInputRow___1HmKN" style="border-bottom: 1px solid #eaeded;height: 7vh;">
						<form class="">
							<div class="ChatInput__textInputContainer___1Em-l"><textarea type="text"
									placeholder="Search" rows="1" maxlength="5000" class=""></textarea><textarea
									readonly="" class="ChatInput__invisibleSibling___1eapz" rows="1"
									style="width: 406.453px;"></textarea></div>
							<div class="ChatInput__buttonContainer___3DxRc"><button
									class="ChatInput__sendButton___iTKUO">Search</button></div>
						</form>
					</div>
				</div>

				<ul class="overflow-auto h-[32rem]">
					<h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats</h2>
					<li v-if="!loading">
						<template v-for="(current_room, index) in current_rooms">
							<a :key="`${index}-current-room`"
								class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
								:class="agentCurRoom && current_room.display_name == agentCurRoom.display_name ? 'activeRoom' : ''"
								@click="changeCurrentRoom(current_room)" v-if="current_rooms.length > 0">
								<img class="object-cover w-10 h-10 rounded-full" src="../../assets/avatar.png"
									alt="username">
								<div class="w-full pb-2">
									<div class="flex justify-between items-center">
										<span class="block ml-2 font-semibold text-gray-600">{{
												current_room.display_name
										}}</span>
										<span class="block ml-2 text-sm text-gray-600">
											<button
												class="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded-full"
												@click.prevent="endChatting(current_room)">
												{{ current_room.status | capitalize }}
											</button>
										</span>
									</div>
								</div>
							</a>
						</template>
					</li>
				</ul>
			</div>
			<div class="lg:col-span-3 lg:block">
				<div class="w-full">
					<div class="relative flex items-center p-3 border-b border-gray-300" style="height: 7vh;"
						v-if="current_room">
						<img class="object-cover w-10 h-10 rounded-full" src="../../assets/avatar.png" alt="username">
						<span class="block ml-2 font-bold text-gray-600">{{ current_room ? current_room.display_name :
								''
						}}</span>
					</div>
					<div class="relative w-full overflow-y-auto h-[40rem]" style="height: 93vh;">
						<div class="App__transitionGroup___2QTyy">
							<div class="ChatRoller__outerContainer___ImPO2">
								<div class="ChatRoller__chatRoller___SwO92" style="height: 100%;" ref="messages">
									<div v-if="loading" class="ChatRoller__spinnerContainer___1926B"
										style="opacity: 0;"><svg viewBox="0 0 66 66" xmlns="http://www.w3.org/2000/svg"
											class="ChatRoller__spinner___3tsX8">
											<g class="Spinner__spinner___3C2E-" viewBox="0 0 66 66">
												<circle class="Spinner__path___2tz_N" fill="none" stroke-width="6"
													stroke-linecap="round" cx="33" cy="33" r="30"></circle>
											</g>
										</svg><span>Loading previous messages...</span></div>
									<div v-else class="ChatRoller__liveTranscriptWrapper___JJkDd" style="height: 100%;">
										<template v-for="(message, index) in client_messages">
											<div :key="`${index}-general`"
												class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU"
												v-if="false">
												<div class="Message__messageBody___3G5M0">
													<div class="Message__contentWrapper___C8jyb"><span
															class="Message__textContent___ugH_K">{{
																	message.content
															}}</span>
													</div>
												</div><span class="Message__timeStamp___1WvX7">{{
														moment(message.created_at).fromNow()
												}}</span>
											</div>
											<div :key="`${index}-support`"
												class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU"
												v-else-if="!message.admin && message.content">
												<span class="Message__messageDisplayName___1U_jv">{{
														current_room ? current_room.display_name : ''
															| capitalize
												}}</span>
												<div class="Message__messageBody___3G5M0">
													<div class="Message__contentWrapper___C8jyb"><span
															class="Message__textContent___ugH_K">{{
																	message.content
															}}</span>
													</div>
												</div>
												<div class="AgentAvatar__agentAvatar___2jl2R Message__avatar___1w-7K">
													<svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet">
														<circle class="AgentAvatar__agentInitialBackground___1Q5am"
															r="630" cx="630" cy="630">
														</circle>
													</svg><span class="AgentAvatar__agentInitial___2K5jw">S</span>
												</div>
												<span class="Message__timeStamp___1WvX7">{{
														moment(message.created_at).fromNow()
												}}</span>
											</div>
											<div :key="`${index}-consumer`"
												class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU"
												v-if="message.admin && message.content">
												<div class="Message__messageBody___3G5M0">
													<div class="Message__contentWrapper___C8jyb"><span
															class="Message__textContent___ugH_K">{{
																	message.content
															}}</span>
													</div>
												</div><span class="Message__timeStamp___1WvX7">{{
														moment(message.created_at).fromNow()
												}}</span>
											</div>
										</template>
										<!-- Typing Start -->
										<div v-if="typingAction"
											class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No typingIndicatorMessage Message__animated___KeDYU">
											<span class="Message__messageDisplayName___1U_jv">Messaging Assistant |
												Customer Service</span>
											<div class="Message__messageBody___3G5M0">
												<div class="Message__contentWrapper___C8jyb"><svg
														class="TypingIndicator__typingIndicator___22Pa8"
														viewBox="0 0 8 2">
														<g class="TypingIndicator__circleGroup___J7zB3">
															<circle cx="1" cy="1" r="0.66"></circle>
															<circle cx="4" cy="1" r="0.66"></circle>
															<circle cx="7" cy="1" r="0.66"></circle>
														</g>
													</svg></div>
											</div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet"
												class="Message__avatar___1w-7K
                                    Message__typingIndicatorAvatar___2eJeC">
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
							<div class="ChatInput__chatInputRow___1HmKN">
								<form class="">
									<div class="ChatInput__textInputContainer___1Em-l"><textarea type="text"
											placeholder="Write a message..." rows="1" maxlength="5000" class=""
											v-model.trim="content" v-on:keyup.prevent="triggerMessageSend"
											data-gramm_editor="false">
                                </textarea><textarea readonly="" class="ChatInput__invisibleSibling___1eapz" rows="1"
											style="width: 406.453px;"></textarea></div>
									<div class="ChatInput__buttonContainer___3DxRc">
										<button class="ChatInput__sendButton___iTKUO"
											@click.prevent="sendMessage">Send</button>
									</div>
								</form>
							</div>
							<div class="LiveHelpOverlay__liveHelpOverlayContainer___12w7a" style="flex-basis: 0px;">
							</div>
						</div>
					</div>


				</div>
			</div>
			<div class="border-l border-gray-300 lg:col-span-2">
				<div class="">
					<div class="ChatInput__chatInputRow___1HmKN"
						style="/* border-bottom: 1px solid #eaeded; */border-bottom: 1px solid #eaeded;height: 7vh;">
						<form class="">
							<div class="ChatInput__textInputContainer___1Em-l"><textarea type="text"
									placeholder="Search" rows="1" maxlength="5000" class=""></textarea><textarea
									readonly="" class="ChatInput__invisibleSibling___1eapz" rows="1"
									style="width: 406.453px;"></textarea></div>
							<div class="ChatInput__buttonContainer___3DxRc"><button
									class="ChatInput__sendButton___iTKUO">Search</button></div>
						</form>
					</div>
				</div>

				<ul class="overflow-auto h-100">
					<h2 class="my-2 mb-2 ml-2 text-lg text-gray-600">Chats In Queue</h2>
					<li v-if="!loading">
						<template v-for="(room, index) in rooms.filter(room => room.display_name !== 'Hello World')">
							<a :key="`${index}-room`"
								class="flex items-center px-3 py-2 text-sm transition duration-150 ease-in-out border-b border-gray-300 cursor-pointer hover:bg-gray-100 focus:outline-none"
								v-if="rooms.length > 0">
								<img class="object-cover w-10 h-10 rounded-full" src="../../assets/avatar.png"
									alt="username">
								<div class="w-full pb-2">
									<div class="flex justify-between items-center">
										<span class="block ml-2 font-semibold text-gray-600">{{ room.display_name }}
											<span v-if="unreadMessages.filter(msg => room._id == msg.room).length > 0"
												class="block ml-2 font-semibold text-red-600">
												Missed: {{ unreadMessages.filter(msg => room._id == msg.room).length }}
											</span>
										</span>
										<span class="block ml-2 text-sm text-gray-600">
											<button class="text-white font-bold py-2 px-4 rounded-full"
												:class="{ 'bg-green-500 hover:bg-green-700': room.status === 'accept', 'bg-red-500 hover:bg-red-700': room.status === 'rejoin', 'bg-blue-500 hover:bg-blue-700 cursor-not-allowed focus:outline-none disabled:opacity-50': room.status === 'chatting' }"
												:disabled="room.status === 'chatting'"
												@click.prevent="changeStatus(room)">
												{{ room.status | capitalize }}
											</button>
										</span>
									</div>
								</div>
							</a>
						</template>
					</li>
				</ul>
			</div>
		</div>
	</div>
</template>
<script>
import axios from 'axios';
import { mapActions, mapGetters } from 'vuex';

export default {
	name: "AgentDashboard",
	data() {
		return {
			Loader: false,
			room: {},
			users: {},
			usersTyping: [],
			client_messages: [],
			content: "",
			room_name: null,
			privateRoomName: null,
			password: null,
			privateRoomPassword: null,
			searchInput: '',
			errorMessage: this.message,
			errors: [],
			chat_bot: true,
			gotit: false,
			chatoption: '',
			newMessage: null,
			messages: [],
			typing: false,
			username: null,
			ready: false,
			info: [],
			connections: 0,
			chatrooms: [],
			unreadMessages: [],
			agentCurRoom: null,
			typingAction: false,
			initial_message:
				`<div
						class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh-">
						<span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
								Service</span>
						<div class="Message__messageBody___3G5M0">
								<div class="Message__contentWrapper___C8jyb"><span
										class="Message__textContent___ugH_K">Hi, thanks for contacting Samsung. I'm
										Samsung's chat helper.</span>
								</div>
						</div>
				</div>
				<div class="Message__message___1YUAv Message__agentVariant___2NLqJ">
						<div class="Message__messageBody___3G5M0">
								<div class="Message__contentWrapper___C8jyb"><span
										class="Message__textContent___ugH_K">I'm here to answer your questions &amp;
										get the right person to help you out.</span>
								</div>
						</div>
				</div>
				<div
						class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No">
						<div class="Message__messageBody___3G5M0">
								<div class="Message__contentWrapper___C8jyb"><span
										class="Message__textContent___ugH_K">As I send you messages, you can select
										a button to reply. Give it a try.</span>
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
						</svg><span class="Message__timeStamp___1WvX7">${Date.now()}</span>
				</div>`
		};
	},
	filters: {
		capitalize: function (value) {
			if (!value) return ''
			value = value.toString()
			return value.charAt(0).toUpperCase() + value.slice(1)
		}
	},
	async created() {
		this.loading = true;
		console.log("Created LOADING", this.loading);

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

			axios
				.put(`/api/room/setBackStatus/${this.agent._id}`)
				.then(res => {
					console.log("Room Response", res);
				})
				.catch(err => {
					if (err.response.status === 404) {
						console.log("Page err", err);
					}
				});
		}

		axios
			.get(`/api/messages/unreadMessages/list`)
			.then(res => {
				this.unreadMessages = res.data;
			})
			.catch(err => {
				console.log(err);
				this.loading = false
			});

		this.fetchRoomData();

		this.getSocket.on('roomAdded', data => {
			console.log("Room was created or added", data)
			this.rooms.unshift(JSON.parse(data));
		});

		this.getSocket.on('roomHasDeleted', data => {
			let filteredRooms = this.rooms.filter(room_old => room_old._id !== JSON.parse(data)._id);
			this.rooms = filteredRooms;
			this.$store.dispatch('updateRoomData', this.rooms);
		});

		this.getSocket.on('receivedUserRestartedChatting', data => {
			let receivedData = JSON.parse(data);
			this.deleteRoom(receivedData.room);
			console.log("!!!!!", receivedData.room);
			this.deleteCurrentRoom(receivedData.room);
			if (receivedData.room._id == JSON.parse(localStorage.getItem("agent_currentRoom"))._id) {
				this.client_messages.push(receivedData);
				setTimeout(() => {
					this.scrollMessages();
				}, 100);
			}
			setTimeout(() => {
				this.scrollMessages();
			}, 100);
			console.log("%%%%%%%%", this.client_messages);
		});

		this.getSocket.on('updateRoomData', data => {
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

		this.getSocket.on('receivedUserNotTyping', data => {
			console.log("data", data);
			this.typingAction = false;
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
			this.users = JSON.parse(data).users;
		});
		/** Socket IO: User Exit Event - Check other tabs of the same room and redirect */
		this.getSocket.on('receivedUserExit', room => {
			this.checkUserTabs(room);
		});
		/** Socket IO: New Messaage Event - Append the new message to the messages array */
		this.getSocket.on('receivedNewMessage', message => {
			console.log("LOADING", this.loading);
			this.loading = false;
			console.log("NEW MESSAGES ARRIVED", message);

			axios
				.get(`/api/messages/unreadMessages/list`)
				.then(res => {
					this.unreadMessages = res.data;
					console.log("UNREADMSG", this.unreadMessages);
				})
				.catch(err => {
					console.log(err);
					this.loading = false
				});
			if (this.rooms.length == 0) {
				this.client_messages = [];
			}
			if (JSON.parse(message).room == JSON.parse(localStorage.getItem("agent_currentRoom"))._id) {
				this.client_messages.push(JSON.parse(message));
				setTimeout(() => {
					this.scrollMessages();
				}, 100);
			}
		});

		this.getSocket.on('changedRoomStatus', room => {
			const changedRoom = JSON.parse(room);
			this.rooms = this.rooms.map(r => r._id === changedRoom._id ? changedRoom : r);
			// // this.room = room;
		});
		/** Socket IO: User Typing Event  */
		this.getSocket.on('receivedUserTyping', data => {
			console.log('asdfasdfsdf', JSON.parse(data)[0] == JSON.parse(localStorage.getItem("agent_currentRoom")))
			if (JSON.parse(data)[0] == JSON.parse(localStorage.getItem("agent_currentRoom")).display_name) {
				this.typingAction = true;
				this.usersTyping = JSON.parse(data).filter(
					user => user !== this.getUserData.username
				);
				setTimeout(() => {
					this.scrollMessages();
				}, 100);
			}
		});
		this.getSocket.on('roomUpdated', data => {
			this.room = JSON.parse(data).room;
			this.$store.dispatch('saveCurrentRoom', JSON.parse(data).room);
		});
	},
	mounted() {
		this.scrollMessages();
		this.messages.push(
			{
				description:
					`<div
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
			description:
				`<div class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No typingIndicatorMessage Message__animated___KeDYU"><div class="Message__messageBody___3G5M0"><div class="Message__contentWrapper___C8jyb"><svg class="TypingIndicator__typingIndicator___22Pa8" viewBox="0 0 8 2"><g class="TypingIndicator__circleGroup___J7zB3"><circle cx="1" cy="1" r="0.66"></circle><circle cx="4" cy="1" r="0.66"></circle><circle cx="7" cy="1" r="0.66"></circle></g></svg></div></div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet" class="Message__avatar___1w-7K Message__typingIndicatorAvatar___2eJeC"><circle r="630" fill="#333" cx="630" cy="630"></circle><g id="layer1" fill="#f3f3f3" stroke="none"><path d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z"></path><path d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z"></path></g></svg></div>`
		})
		setTimeout(() => {
			this.messages.pop()
			this.messages.push({
				description:
					`<div class="Message__message___1YUAv Message__agentVariant___2NLqJ">
							<div class="Message__messageBody___3G5M0">
									<div class="Message__contentWrapper___C8jyb"><span
											class="Message__textContent___ugH_K">I'm here to answer your questions &amp;get the right person to help you out.</span>
									</div>
							</div>
					</div>`
			})
		}, 500);
		setTimeout(() => {
			this.messages.push({
				description:
					`<div
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
							</svg><span class="Message__timeStamp___1WvX7">${new Date().getHours()} : ${new Date().getMinutes()}</span>
					</div>`
			})
		}, 1000);
	},
	computed: {
		...mapGetters(['getUserData', 'getRoomData', 'getSocket', 'getCurrentRoomData', 'getCurrentRoom']),
		rooms: {
			get() {
				return this.getRoomData;
			},
			set(room) {
				this.$store.dispatch('updateRoomData', room);
			}
		},
		current_rooms: {
			get() {
				return this.getCurrentRoomData;
			},
			set(current_rooms) {
				this.$store.dispatch('updateCurrentRoomData', current_rooms);
			}
		},
		current_room: {
			get() {
				return this.getCurrentRoom;
			},
			set(current_room) {
				this.$store.dispatch('addCurrentRoom', current_room);
			}

		},
		loading: {
			get() {
				return this.Loader;
			},
			set(value) {
				this.Loader = value;
			}
		},
		getPrivateRooms() {
			return this.rooms.filter(room => room.access === false);
		},
		getPublicRooms() {
			return this.rooms.filter(room => room.access === true);
		},
		filteredRooms() {
			if (this.searchInput.toLowerCase() === 'my_rooms') {
				return this.rooms.filter(room => room.user._id === this.getUserData._id);
			} else {
				return this.rooms
					.slice()
					.sort(this.sortAlphabetical)
					.filter(room =>
						room.display_name.toLowerCase().includes(this.searchInput.toLowerCase())
					);
			}
		}
	},
	methods: {
		...mapActions(['updateRoomData', 'addRoom', 'deleteRoom', 'saveCurrentRoom', 'addCurrentRoom', 'deleteCurrentRoom']),
		checkLingeringUser(data) {
			for (const room of data) {
				if (room.users.some(room => room._id === this.getUserData._id)) {
					return true;
				}
			}
			return false;
		},
		checkUnreadMessages(room) {
			console.log("unreadMessages", room);
			axios
				.get(`/api/messages/${room._id}`)
				.then(res => {
					this.unreadMessages = res.data.filter(checkMessages)
					function checkMessages(msg) {
						return msg.status == false;
					}
				})
				.catch(err => {
					console.log(err);
					this.loading = false
				});
		},
		checkUserTabs(room) {
			if (
				room &&
				room.users.findIndex(user => user.lookup._id === this.getUserData._id) === -1
			) {
				this.$router.push({ name: 'RoomList' });
			}
		},
		fetchRoomData() {
			axios
				.get('/api/room')
				.then(res => {
					if (this.checkLingeringUser(res.data)) {
						let user_id = axios.put(`/api/room/remove/users/all`, {
							user_id: this.getUserData._id
						});
						this.loading = false
						return user_id;

					} else {
						this.$store.dispatch('updateRoomData', res.data);
						this.rooms = res.data;
						this.loading = false
					}
				})
				.then(res => {
					if (res && res.data) {
						this.rooms = res.data;
					}
					this.loading = false
				})
				.catch(err => {
					console.log(err);
					this.loading = false
				});
		},
		endChatting(room) {
			console.log("))))))))))", this.getCurrentRoom);
			this.getSocket.emit('newMessage', {
				room: this.getCurrentRoom,
				agentRoom: room,
				user: this.getUserData,
				content: "Thank you for contacting us, if you have further questions, please feel free to email us.",
				admin: true
			});
			axios
				.delete(`/api/user/delete/${room.display_name}`)
				.then(res => {
					console.log("UserDelete", res)
				})
				.catch(err => {
					if (err.response.status === 404) {
						console.log("err", err)
						// this.$router.push({
						// 	name: 'RoomList',
						// 	params: { message: 'This room does not exist or has been deleted' }
						// });
					}
				});
			axios
				.delete(`/api/room/delete/${room._id}`)
				.then(res => {
					console.log("Deleted Room Data", res.data);
					this.deleteRoom(res.data)
					this.deleteCurrentRoom(res.data)
					localStorage.removeItem("agent_currentRoom");

				})
				.catch(err => {
					if (err.response.status === 404) {
						console.log("err", err)
						// this.$router.push({
						// 	name: 'RoomList',
						// 	params: { message: 'This room does not exist or has been deleted' }
						// });
					}
				});

			axios
				.delete(`/api/messages/delete/${room._id}`)
				.then(res => {
					console.log("res////", res)
					this.client_messages = [];
					// this.deleteRoom(res.data)
					// this.deleteCurrentRoom(res.data)

				})
				.catch(err => {
					if (err.response.status === 404) {
						console.log("err", err)
						// this.$router.push({
						// 	name: 'RoomList',
						// 	params: { message: 'This room does not exist or has been deleted' }
						// });
					}
				});

			this.getSocket.emit("roomWasDeleted", room);
			console.log("?????????", this.rooms);
			this.content = '';
			// this.sendUserNotTyping();
			setTimeout(() => {
				this.scrollMessages();
			}, 100);

		},
		changeStatus(room) {
			console.log("agentCurRoom", this.agentCurRoom);
			this.loading = true;
			localStorage.setItem("agent_currentRoom", JSON.stringify(room));
			let agent = localStorage.getItem("agent");
			let agent_id = JSON.parse(agent)._id;
			this.agentCurRoom = room;
			let room_index = this.rooms.findIndex(room_old => room_old._id === room._id);
			this.rooms[room_index].status = 'chatting';
			this.$store.dispatch('updateRoomData', this.rooms);
			let current_room = Object.assign({}, room);
			current_room.status = 'end';
			this.$store.dispatch('addCurrentRoom', current_room);
			this.$store.dispatch('saveCurrentRoom', current_room);
			this.getSocket.emit('userChattingStatus', {
				room: room
			})

			axios
				.get(`/api/messages/unreadMessages/list`)
				.then(res => {
					this.unreadMessages = res.data;
					console.log("UNREADMSG", this.unreadMessages);
				})
				.catch(err => {
					console.log(err);
					this.loading = false
				});

			axios
				.get(`/api/room/${room._id}`)
				.then(res => {
					this.room = res.data;
					this.users = res.data.users;
					this.$store.dispatch('saveCurrentRoom', res.data);
					this.loading = false;

					axios
						.post(`/api/messages/quickCheck`, {
							room_id: room._id,
							content: `Welcome to the Agent Room! How can I help you?`
						})
						.then(res => {
							console.log("res", res)
							if (res.data > 0) {
								this.getSocket.emit('userAccepted', {
									room: this.getCurrentRoom,
									user: this.getUserData,
									content: `I'm back!`,
									admin: true
								})
							} else {
								this.getSocket.emit('userAccepted', {
									room: this.getCurrentRoom,
									user: this.getUserData,
									content: `Welcome to the Agent Room! How can I help you?`,
									admin: true
								})
							}
							this.loading = false;
						})
						.catch(err => {
							if (err.response.status === 404) {
								console.log("err", err)
							}
						});
				})
				.catch(err => {
					if (err.response.status === 404) {
						// this.$router.push({
						// 	name: 'RoomList',
						// 	params: { message: 'This room does not exist or has been deleted' }
						// });
					}
				});

			axios
				.post(`/api/room/changeStatus`, {
					room_id: room._id,
					agent_id: agent_id
				})
				.then(res => {
					console.log("Room Response", res);
					this.room = res.data;
					this.users = res.data.users;
					this.loading = false;

					this.getSocket.emit('changeRoomStatus', {
						room: this.room,
						admin: true
					});

				})
				.catch(err => {
					if (err.response.status === 404) {
						console.log("err", err)
					}
				});

			axios
				.put(`/api/user/changeRoomStatus`, {
					userData: this.getUserData,
					currentRoomId: current_room._id
				})
				.then(res => {
					console.log(res);
					this.loading = false;
				});

			axios
				.put(`/api/user/changeUserStatus/${room.display_name}`)
				.then(res => {
					console.log(res);
					this.loading = false;
				});

			axios
				.put(`/api/messages/changeStatus/${room._id}`)
				.then(res => {
					console.log("Message Response", res);
					this.loading = false;
				})
				.catch(err => {
					if (err.response.status === 404) {
						console.log("err", err)
					}
				});

		},
		changeCurrentRoom(current_room) {
			localStorage.setItem("agent_currentRoom", JSON.stringify(current_room));
			this.$store.dispatch('saveCurrentRoom', current_room);
			this.agentCurRoom = current_room;

			axios
				.get(`/api/messages/unreadMessages/list`)
				.then(res => {
					this.unreadMessages = res.data;
					console.log("UNREADMSG", this.unreadMessages);
				})
				.catch(err => {
					console.log(err);
					this.loading = false
				});
			axios
				.get(`/api/room/${current_room._id}`)
				.then(res => {
					console.log(res);
					this.room = res.data;
					this.users = res.data.users;
					this.$store.dispatch('saveCurrentRoom', res.data);
					/** Socket IO: User join event, get latest messages from room */
					this.getSocket.emit('userJoined', {
						room: this.getCurrentRoom,
						user: this.getUserData,
						content: null,
						admin: true
					});

					this.loading = false;
				});

			axios
				.put(`/api/user/changeRoomStatus`, {
					userData: this.getUserData,
					currentRoomId: current_room._id
				})
				.then(res => {
					console.log(res);
					this.loading = false;
				});

			axios
				.put(`/api/messages/changeStatus/${current_room._id}`)
				.then(res => {
					console.log("Message Response", res);
					this.loading = false;

				})
				.catch(err => {
					if (err.response.status === 404) {
						console.log("err", err)
					}
				});
		},
		sendUserTyping() {
			console.log("getCurrentRoom", this.getCurrentRoom);
			console.log("getUserData", this.getUserData);
			let agent_currentRoom = JSON.parse(localStorage.getItem("agent_currentRoom"));
			this.getSocket.emit('agentTyping', {
				room: agent_currentRoom,
				user: this.getUserData,
				admin: true
			});
		},
		sendUserNotTyping() {
			this.getSocket.emit('removeUserTyping', {
				room: this.getCurrentRoom,
				user: this.getUserData,
				admin: true
			});
		},
		triggerMessageSend(e) {
			e.preventDefault();
			if (e.keyCode === 13 && !e.shiftKey) {
				this.sendMessage();
			} else {
				if (this.content.length !== 0) {
					this.sendUserTyping();
				} else {
					this.sendUserNotTyping();
				}
			}
		},
		sendMessage() {
			if (this.content.length !== 0) {
				this.getSocket.emit('newMessage', {
					room: this.getCurrentRoom,
					user: this.getUserData,
					content: this.content,
					admin: true,
					current_room: this.current_room._id
				});
				this.content = '';
				this.sendUserNotTyping();
				setTimeout(() => {
					this.scrollMessages();
				}, 100);
			}
		},
		scrollMessages() {
			var container = this.$refs.messages;
			container.scrollTop = container.scrollHeight;
		},
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
	transition: opacity .1s linear;
	text-align: center;
	font-size: .85rem;
	color: #767676
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
	transition: opacity .3s ease-in;
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
	-webkit-animation: Spinner__message-us-loader-dash___21w-J 2s cubic-bezier(.39, 0, .35, .96) 0s infinite;
	animation: Spinner__message-us-loader-dash___21w-J 2s cubic-bezier(.39, 0, .35, .96) 0s infinite;
}

.chat-scroller-live-transcript-wrapper {
	display: -webkit-flex;
	display: flex;
	-webkit-flex-direction: column;
	flex-direction: column;
}

.activeRoom {
	background-color: #dbdbdb;
}
</style>
