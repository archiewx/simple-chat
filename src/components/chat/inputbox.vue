<!--
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 *  desc: 输入区域
 -->
<template>
  <div class="chat-input-box">
    <textarea v-model="$store.state.chat.message" @keyup.enter="keyEnter"></textarea>
    <div class="bottom-bar">
      <button type="button" @click="$store.dispatch('sendMessage')">发送</button>
    </div>
  </div>
</template>

<script>
  export default {
    components: {},
    methods: {
      keyEnter () {
        this.$store.dispatch('sendMessage')
      }
    }
  }
</script>

