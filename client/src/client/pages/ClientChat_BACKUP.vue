<template>
        <div style="height:100vh">
            <div class="app-transition-container">
                <div class="chat-scroll-container-outer">
                    <div class="chat-scroller-chat-scroller" style="height: 100%;">
                        <div class="chat-scroller-spinner-container" style="opacity: 0;"><svg viewBox="0 0 66 66"
                                xmlns="http://www.w3.org/2000/svg" class="chat-scroller-spinner">
                                <g class="spinnner-spinner" viewBox="0 0 66 66">
                                    <circle class="spinner-path" fill="none" stroke-width="6"
                                        stroke-linecap="round" cx="33" cy="33" r="30"></circle>
                                </g>
                            </svg><span>Loading previous messages...</span></div>
                        <div class="chat-scroller-live-transcript-wrapper" style="height: 100%;">
                            <div
                            v-html="initial_message"
                            ></div>    
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Got it</span></div>
                                </div><span class="Message__timeStamp___1WvX7">21:46</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__animated___KeDYU">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">OK</span></div>
                                </div>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No Message__animated___KeDYU">
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
                                </svg><span class="Message__timeStamp___1WvX7">21:47</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Help with a Kindle, Fire, or Amazon
                                            device</span></div>
                                </div><span class="Message__timeStamp___1WvX7">21:47</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Do you need help with your order status
                                            or assistance using your device?</span></div>
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
                                </svg><span class="Message__timeStamp___1WvX7">21:47</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Device help</span></div>
                                </div><span class="Message__timeStamp___1WvX7">21:48</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__animated___KeDYU">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Let's see. Could you select the item
                                            you're looking for from your device list below?</span></div>
                                </div>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Sorry, I’m not finding any recent
                                            orders.</span></div>
                                </div>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">To let us know which item you need help
                                            with, hit the round live help button below and type a little about
                                            it.</span></div>
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
                                </svg><span class="Message__timeStamp___1WvX7">21:48</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Need a Customer Service
                                            Associate</span></div>
                                </div><span class="Message__timeStamp___1WvX7">21:48</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__animated___KeDYU">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Ok, you can chat with an associate now
                                            or request a call back.</span></div>
                                </div>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">You can also go to your Customer
                                            Service hub to fix most things or to search help pages. What do you
                                            prefer?</span></div>
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
                                </svg><span class="Message__timeStamp___1WvX7">21:48</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Chat with an associate now</span></div>
                                </div><span class="Message__timeStamp___1WvX7">21:48</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__animated___KeDYU">
                                <span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer
                                    Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">If you have details you think would
                                            help the associate, type them here.</span></div>
                                </div>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__lastOfGroup___3j-No Message__animated___KeDYU">
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
                                </svg><span class="Message__timeStamp___1WvX7">21:48</span>
                            </div>
                            <div class="SystemMessage__systemMessage___3u5N2">
                                <div class="AgentAvatar__agentAvatar___2jl2R SystemMessage__avatar___Tx_FE"><svg
                                        viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet">
                                        <circle class="AgentAvatar__agentInitialBackground___1Q5am" r="630" cx="630"
                                            cy="630"></circle>
                                    </svg><span class="AgentAvatar__agentInitial___2K5jw">S</span></div><span
                                    class="SystemMessage__messageBody___3zi_y">Shubham has joined &amp; will be ready to
                                    chat in just a minute.</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <span class="Message__messageDisplayName___1U_jv">Shubham | Customer Service</span>
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;&ZeroWidthSpace;Hey
                                            Faisal, I&ZeroWidthSpace;&ZeroWidthSpace; am S&ZeroWidthSpace;hubham from
                                            Specialty team, How may I help you?
                                        </span></div>
                                </div>
                                <div class="AgentAvatar__agentAvatar___2jl2R Message__avatar___1w-7K"><svg
                                        viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet">
                                        <circle class="AgentAvatar__agentInitialBackground___1Q5am" r="630" cx="630"
                                            cy="630"></circle>
                                    </svg><span class="AgentAvatar__agentInitial___2K5jw">S</span></div><span
                                    class="Message__timeStamp___1WvX7">21:49</span>
                            </div>
                            <div
                                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU">
                                <div class="Message__messageBody___3G5M0">
                                    <div class="Message__contentWrapper___C8jyb"><span
                                            class="Message__textContent___ugH_K">Hello</span></div>
                                </div><span class="Message__timeStamp___1WvX7">21:49</span>
                            </div>
                            <div class="TouchWords__touchWordsGroup___DJHDV TouchWords__touchWordsWrapped___dc9GR">
                                <button class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj">An item I
                                    ordered</button><button
                                    class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj">Managing my
                                    payment, Prime, or account</button><button
                                    class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj">Help with a
                                    Kindle, Fire, or Amazon device</button><button
                                    class="TouchWords__touchword___1A6du TouchWords__fade_in___2yrkj">Music, eBooks,
                                    Prime Video, etc.</button></div>
                        </div>
                    </div>
                </div>
                <div class="Overlay__overlayParent___2Jsj7"></div>
                <div class="ChatInput__chatInputRow___1HmKN">
                    <form class="">
                        <div class="ChatInput__textInputContainer___1Em-l"><textarea type="text"
                                placeholder="Write a message..." rows="1" maxlength="5000" class=""></textarea><textarea
                                readonly="" class="ChatInput__invisibleSibling___1eapz" rows="1"
                                style="width: 406.453px;"></textarea></div>
                        <div class="ChatInput__buttonContainer___3DxRc"><button
                                class="ChatInput__sendButton___iTKUO">Send</button></div>
                    </form>
                </div>
                <!-- Typing Start -->
                <div class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No typingIndicatorMessage Message__animated___KeDYU"><span class="Message__messageDisplayName___1U_jv">Messaging Assistant | Customer Service</span><div class="Message__messageBody___3G5M0"><div class="Message__contentWrapper___C8jyb"><svg class="TypingIndicator__typingIndicator___22Pa8" viewBox="0 0 8 2"><g class="TypingIndicator__circleGroup___J7zB3"><circle cx="1" cy="1" r="0.66"></circle><circle cx="4" cy="1" r="0.66"></circle><circle cx="7" cy="1" r="0.66"></circle></g></svg></div></div><svg viewBox="0 0 1260 1260" preserveAspectRatio="xMidYMid meet" class="Message__avatar___1w-7K
         Message__typingIndicatorAvatar___2eJeC"><circle r="630" fill="#333" cx="630" cy="630"></circle><g id="layer1" fill="#f3f3f3" stroke="none"><path d="M507 790 c-74 -13 -185 -49 -247 -80 -75 -38 -180 -117 -180 -135 0 -20 -1 -20 77 19 258 130 570 150 837 56 170 -60 120 21 -56 90 -132 52 -302 71 -431 50z"></path><path d="M1100 741 c0 -5 7 -28 15 -51 31 -89 16 -107 -82 -95 -44 5 -54 4 -51 -7 10 -31 107 -56 172 -44 34 7 36 9 36 47 0 46 -22 104 -52 136 -22 24 -38 30 -38 14z"></path></g></svg></div>
                <!-- Typing End -->
                <!-- Chat Icon -->
                    <div class="ChatInput__chatInputRow___1HmKN"><form class="ChatInput__centeringButton___24jrv"><div class="ChatInput__buttonContainer___3DxRc ChatInput__centered___3OoyM"><button class="ChatInput__liveHelpButton___1IN0t"><img src="https://m.media-amazon.com/images/G/01/x-locale/cs/chat/images/live-help-icon._CB485947991_.svg"></button></div></form></div>
                <!--Chat Icon -->
                <!-- Chat Icon Options -->
                <div class="LiveHelpOverlay__liveHelpOverlayContainer___12w7a" style="flex-basis: 121px;"><div class="LiveHelpOverlay__liveHelpOverlay___hmBRq"><span class="LiveHelpOverlay__liveHelpPrompt___3Av6F">Do you want to discuss this with an associate?</span><button>Yes</button><button>No</button></div></div>
                <!-- Chat Icon Option -->


                <div class="LiveHelpOverlay__liveHelpOverlayContainer___12w7a" style="flex-basis: 0px;"></div>
            </div>
        </div>
</template>
<script>
export default {
  name: "ClientChat",
  data() {
    return {
        chat_bot:true,
        initial_message:`                            <div
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
                                </svg><span class="Message__timeStamp___1WvX7">21:42</span>
                            </div>`
    };
  },
  methods: {
    loginUser(){

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
