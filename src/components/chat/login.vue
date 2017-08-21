<!--
 *  creator: zheng
 *  date: 2017/8/17
 *  email: zhenglfsir@gmail.com
 *  desc: 登录系统
 -->
<template>
  <div class="login-mask" v-if="$exp.isEmptyObject(user)">
    <div class="login-box">
      <p class="login-tips">提示: 已注册直接填写用户名即可</p>
      <input type="text" v-model="pic" placeholder="您的图像，仅支持网络图片">
      <input type="text" :class="{error: $store.state.chat.error}" v-model="name" placeholder="昵称">
      <button type="button" @click="login">进入</button>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters({
      user: 'getSession'
    }),
    data () {
      return {
        pic: 'http://pic.sc.chinaz.com/files/pic/pic9/201509/apic15069.jpg',
        name: '飞翔的海豚'
      }
    },
    methods: {
      login () {
        if (this.name) {
          this.$store.dispatch('login', {
            pic: this.pic,
            name: this.name
          })
        } else {
          this.$store.state.chat.error = true
        }
      }
    }
  }
</script>

