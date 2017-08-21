<!--
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 *  desc: 左侧列表
 -->
<template>
  <div class="exp-chat-sidebar">
    <div class="info" v-if="!$exp.isEmptyObject(user)">
      <img :src="user.pic"
           alt="">
      <div class="info-fig">
        <p>{{user.name}}</p>
        <span :class="{'user-status': true, online: user.online}">在线</span>
      </div>
    </div>
    <div class="list">
      <sidebar-item v-for="(friend, idx) in friends" :key="idx" :info="friend"
                    @cancel-selected="cancelSelected"></sidebar-item>
    </div>
  </div>
</template>

<script>
  import SidebarItem from './sidebaritem.vue'
  import { mapGetters } from 'vuex'

  export default {
    components: {
      SidebarItem
    },
    computed: {
      ...mapGetters({
        friends: 'getUsers',
        user: 'getSession'
      })
    },
    data () {
      return {}
    },
    created () {
      if (!this.$exp.isEmptyObject(this.user)) {
        this.$store.dispatch('getUsers')
      }
    },
    methods: {
      cancelSelected () {
        const selected = this.friends.find(cv => cv.selected === true)
        selected && this.$set(selected, 'selected', false)
      }
    }
  }
</script>

