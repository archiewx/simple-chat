<!--
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 *  desc: 聊天信息
 -->
<template>
  <div class="exp-show-box">
    <div class="header">
      <p>{{user.name}}</p>
    </div>
    <div class="body" id="body_box">
      <div class="body-item-box">
        <msg-item v-for="item in msgs" :key="item.id" :msg="item"></msg-item>
      </div>
    </div>
  </div>
</template>

<script>
  import MsgItem from './msgitem.vue'
  import { mapGetters } from 'vuex'
  import _ from 'lodash/function'

  export default {
    components: {
      MsgItem
    },
    computed: {
      ...mapGetters({
        msgs: 'getCurrentMsgs',
        user: 'getToUser'
      })
    },
    data () {
      return {
        el: null
      }
    },
    mounted () {
      const el = document.querySelector('#body_box')
      this.$store.dispatch('loadScrollBox', el)
      el && el.addEventListener('scroll', _.debounce(this.handleScroll, 300))
      this.el = el
    },
    methods: {
      handleScroll (ev) {
        const height = document.querySelector('.body-item-box').clientHeight + 32
        const boxHeight = ev.target.clientHeight
        if (height > boxHeight) {
        }
      }
    }
  }
</script>

