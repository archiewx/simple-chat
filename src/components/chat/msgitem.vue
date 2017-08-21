<!--
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 *  desc: 消息条目
 -->
<template>
  <div class="exp-msg-item">
    <div v-if="left" class="item-left">
      <img :src="msg.from.pic" alt="">
      <div class="msg-item-body">
        <p class="name">{{msg.from.name}} <span class="time"></span></p>
        <p class="content">{{msg.content}}</p>
      </div>
    </div>
    <div v-else class="item-right">
      <img :src="msg.from.pic" alt="">
      <div class="msg-item-body">
        <p class="name"><span class="time"></span>{{msg.from.name}} </p>
        <p class="content">{{msg.content}}</p>
      </div>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    props: {
      msg: {
        type: Object,
        default () {
          return {}
        },
        required: true
      }
    },
    computed: {
      left () {
        return this.msg.from.uid !== this.user.uid
      },
      ...mapGetters({
        user: 'getSession'
      })
    },
    methods: {}
  }
</script>

