<!--
 *  creator: zheng
 *  date: 2017/8/26
 *  email: zhenglfsir@gmail.com
 *  desc: oss 上传
 -->
<template>
  <div>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <p>获取上传地址</p>
          <el-form :model="form" labelWidth="120px">
            <el-form-item label="accessKey">
              <el-input v-model="form.ak"></el-input>
            </el-form-item>
            <el-form-item label="bucket 名称">
              <el-input v-model="form.bucket"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="toGetUrl">获 取</el-button>
            </el-form-item>
          </el-form>
          <div>
            <p v-for="(item, idx) in upUrls" :key="idx">
              {{item}}
            </p>
          </div>
        </el-card>
      </el-col>
      <el-col :span="12">
      </el-col>
    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <p>服务器上传</p>
          <el-upload
            action="http://localhost:8080/qiniu/upload"
            :headers="sHeader"
            :accept="sAccept"
            :on-change="sChange"
            :file-list="sfiles">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <p>web直传</p>
          <el-upload
            :before-upload="beforeUpload"
            action="http://up-z1.qiniu.com"
            :data="data"
            :on-change="wChange"
            :file-list="wfiles">
            <el-button size="small" type="primary">点击上传</el-button>
            <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
          </el-upload>
        </el-card>
      </el-col>

    </el-row>
    <el-row :gutter="20">
      <el-col :span="12">
        <el-card>
          <p>获取上传凭证</p>
          <el-input type="textarea" v-model="upToken"></el-input>
          <el-button type="primary" @click="toGetUpSignature" style="margin-top: 16px;">获取</el-button>
        </el-card>
      </el-col>
      <el-col :span="12">
        <el-card>
          <p>获取管理凭证</p>
          <el-form :model="mform" labelWidth="120px">
            <el-form-item label="请求方式">
              <el-select v-model="mform.method" readonly>
                <el-option label="POST" value="POST"></el-option>
                <el-option label="GET" value="GET"></el-option>
              </el-select>
            </el-form-item>
            <el-form-item label="api">
              <el-input v-model="mform.url"></el-input>
            </el-form-item>
            <el-form-item label="管理凭证">
              <el-input type="textarea" v-model="mToken"></el-input>
            </el-form-item>
            <el-form-item>
              <el-button type="primary" @click="toGetMSignature">获取</el-button>
            </el-form-item>
          </el-form>
        </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script>
  import { getQiniuSignature, getUpUrls, getMSignature } from '../../api/qiniu'

  export default {
    components: {},
    data () {
      return {
        sfiles: [],
        wfiles: [],
        sHeader: {},
        data: {
          token: '',
          key: 'random'
        },
        form: {
          ak: '',
          bucket: ''
        },
        sAccept: 'image/jpeg, image/png',
        upUrls: {},
        upToken: '',
        mform: {
          method: 'GET',
          url: ''
        },
        mToken: ''
      }
    },
    mounted () {
      getQiniuSignature().then(res => {
        this.data.token = res.upToken
      })
    },
    methods: {
      beforeUpload (file) {
        this.data.key = file.name
      },
      wChange (files) {
      },
      sChange (files) {
      },
      wUpload (upload) {
      },
      toGetUrl () {
        getUpUrls(this.form).then(res => {
          this.upUrls = res
        })
      },
      toGetUpSignature () {
        getQiniuSignature().then(res => {
          this.upToken = res.upToken
        })
      },
      toGetMSignature () {
        getMSignature({}).then(res => {
        })
      }
    }
  }
</script>


