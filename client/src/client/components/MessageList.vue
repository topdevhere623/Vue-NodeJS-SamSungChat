<template>
    <div>
        <template v-for="(message, index) in messages">
              <!-- <div
                :key="`${index}-message-general`"
                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU"
                v-if="
                  !message.admin &&
                  message.user &&
                  message.user._id === user._id
                "
              >
                <div class="Message__messageBody___3G5M0">
                  <div class="Message__contentWrapper___C8jyb">
                    <span class="Message__textContent___ugH_K">{{
                      message.content
                    }}</span>
                  </div>
                </div>
                <span
                  class="Message__timeStamp___1WvX7"
                  v-if="message.created_at"
                  >{{ moment(message.created_at).fromNow() }}</span
                >
              </div> -->

              <div
                :key="`${index}-message-support`"
                class="Message__message___1YUAv Message__agentVariant___2NLqJ Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU"
                v-if="message.admin"
              >
                <span
                  class="Message__messageDisplayName___1U_jv"
                  v-if="message.title"
                >
                  Messaging Assistant | Customer
                </span>
                <div
                  class="Message__messageBody___3G5M0"
                  style="max-width: 25rem"
                >
                  <div class="Message__contentWrapper___C8jyb">
                    <span
                      class="Message__textContent___ugH_K"
                      v-html="message.content"
                    ></span>
                  </div>
                </div>
                <div
                  class="AgentAvatar__agentAvatar___2jl2R Message__avatar___1w-7K"
                >
                  <svg
                    viewBox="0 0 1260 1260"
                    preserveAspectRatio="xMidYMid meet"
                  >
                    <circle
                      class="AgentAvatar__agentInitialBackground___1Q5am"
                      r="630"
                      cx="630"
                      cy="630"
                    ></circle></svg
                  ><span class="AgentAvatar__agentInitial___2K5jw">S</span>
                </div>
                <span
                  class="Message__timeStamp___1WvX7"
                  v-if="message.created_at"
                  >{{ moment(message.created_at).fromNow() }}</span
                >
              </div>
              <div
                :key="`${index}-message-consumer`"
                class="Message__message___1YUAv Message__customerVariant___2VbBu Message__firstOfGroup___2HSh- Message__lastOfGroup___3j-No Message__animated___KeDYU"
                v-if="!message.admin"
              >
                <div
                  class="Message__messageBody___3G5M0"
                  style="max-width: 25rem"
                >
                  <div class="Message__contentWrapper___C8jyb">
                    <span class="Message__textContent___ugH_K">{{
                      message.content
                    }}</span>
                  </div>
                </div>
                <span
                  class="Message__timeStamp___1WvX7"
                  v-if="message.created_at"
                  >{{ moment(message.created_at).fromNow() }}</span
                >
              </div>
              <!-- <div v-html="message.description" :key="index"></div> -->
              <!-- {{message}} -->
            </template>
    </div>
</template>
<script>
// import { mapActions, mapGetters } from 'vuex';

export default {
  name: "MessageList",
  props: ['messages'],
  data() {
    return {

    };
  },
    computed: {

    },
    methods: {
    },
};
</script>
<style scoped>
</style>
