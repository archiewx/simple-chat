<!--
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 *  desc:
 -->
<template>
  <div class="exp-main">
    <div class="exp-left">
      <p>示例代码</p>
      <ul>
        <li v-for="(menu, idx) in menus" :key="idx">
          <router-link :to="menu.path">{{menu.name}}</router-link>
        </li>
      </ul>
    </div>
    <div class="exp-right">
      <p class="title">{{title}}</p>
      <router-view></router-view>
    </div>
  </div>
</template>

<script>
  import { mapGetters } from 'vuex'

  export default {
    computed: mapGetters({
      menus: 'getMenus'
    }),
    watch: {
      $route () {
        this.title = this.$route.meta.title
      }
    },
    data () {
      return {
        title: this.$route.meta.title
      }
    },
    methods: {}
  }
</script>

