<!--
 *  creator: zheng
 *  date: 2017/8/15
 *  email: zhenglfsir@gmail.com
 *  desc: 侧边栏项
 -->
<template>
  <div :class="{'sidebar-item': true, selected: info.selected}" @click="handleSelected(info)" :title="info.lastMsg">
    <img :src="info.pic" :class="{online: info.online}"/>
    <div class="item-box">
      <p class="nick">{{info.name}}</p>
      <p class="msg">{{info.lastMsg}}</p>
    </div>
  </div>
</template>

<script>
  export default {
    props: {
      info: {
        type: Object,
        default () {
          return {}
        },
        required: true
      }
    },
    components: {},
    data () {
      return {}
    },
    methods: {
      handleSelected (info) {
        this.$emit('cancel-selected')
        this.$store.dispatch('changeFriend', info.uid)
        this.$nextTick(() => {
          this.$set(this.info, 'selected', true)
        })
      }
    }
  }
</script>
