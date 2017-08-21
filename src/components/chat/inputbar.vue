<!--
 *  creator: zheng
 *  date: 2017/8/14
 *  email: zhenglfsir@gmail.com
 *  desc: 输入工具条
 -->
<template>
  <div class="exp-chat-bar">
    <a href="javascript:;" v-for="(item, idx) in bars" :title="item.name" @click="item.click">
      <icon :name="item.icon" :scale="item.scale"></icon>
    </a>
  </div>
</template>

<script>
  export default {
    components: {},
    data () {
      return {
        bars: [
          {
            icon: 'image',
            name: '上传图片',
            click: () => {},
            scale: 1.1
          }
        ]
      }
    },
    methods: {}
  }
</script>

