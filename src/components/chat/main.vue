<!--
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 *  desc: 主容器
 -->
<template>
  <div class="exp-chat">
    <login></login>
    <div class="left">
      <sidebar></sidebar>
    </div>
    <div class="center">
      <div class="center-top">
        <show-box v-if="!$exp.isEmptyObject(user)"></show-box>
      </div>
      <div class="center-center">
        <input-bar></input-bar>
      </div>
      <div class="center-bottom">
        <input-box v-if="!$exp.isEmptyObject(user)"></input-box>
      </div>
    </div>
    <div class="right">
      <info-box></info-box>
    </div>
  </div>
</template>

<script>
  import InfoBox from './infobox.vue'
  import InputBox from './inputbox.vue'
  import Sidebar from './sidebar.vue'
  import ShowBox from './showbox.vue'
  import InputBar from './inputbar.vue'
  import Login from './login.vue'

  import { mapGetters } from 'vuex'

  export default {
    components: {
      InputBar,
      InfoBox,
      InputBox,
      Sidebar,
      ShowBox,
      Login
    },
    computed: mapGetters({
      user: 'getToUser'
    })
  }
</script>

