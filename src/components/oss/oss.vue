<!--
 *  creator: zheng
 *  date: 2017/8/26
 *  email: zhenglfsir@gmail.com
 *  desc: oss 上传
 -->
<template>
  <div>
    <el-card>
      <p>私有bucket</p>
      <el-upload
        action="http://wxd-private.oss-cn-hangzhou.aliyuncs.com"
        :http-request="pvUpload"
        :headers="privateHeader"
        :accept="privateAccept"
        :on-change="privateChange"
        :file-list="privateList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-card>

    <el-card>
      <p>公共bucket</p>
      <el-upload
        action="http://wxd-public.oss-cn-hangzhou.aliyuncs.com"
        :on-change="publicChange"
        :file-list="publicList">
        <el-button size="small" type="primary">点击上传</el-button>
        <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
      </el-upload>
    </el-card>
  </div>
</template>

<script>
  import api from '../../api'

  export default {
    components: {},
    data () {
      return {
        privateList: [],
        publicList: [],
        privateHeader: {},
        privateAccept: 'image/jpeg, image/png',
        config: {
          id: 'LTAIfgmlXhG201N8',
          key: 'JRf704OYAa2RyaTvVzTt7rcpt5RB7k',
          host: 'http://wxd-private.oss-cn-beijing.aliyuncs.com',
          dir: 'test/'
        }
      }
    },
    mounted () {
      this.$confirm('未开发。请返回')
        .then(() => {
          this.$router.go(-1)
        })
        .catch(() => {
          this.$router.go(-1)
        })
      api.ossApi.getSignature().then(res => {
        console.log(res)
      })
    },
    methods: {
      privateChange () {

      },
      publicChange () {

      },
      pvUpload (file) {
      }
    }
  }
</script>


