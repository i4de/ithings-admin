<template>
  <div>
    <el-form :model="formData" label-position="right" label-width="80px">
      <el-form-item label="设备名称:">
        <el-input v-model="formData.deviceName" clearable placeholder="请输入" />
      </el-form-item>

      <el-form-item label="设备秘钥:">
        <el-input v-model="formData.secret" clearable placeholder="请输入" />
      </el-form-item>

      <el-form-item label="激活时间:">

        <el-date-picker v-model="formData.firstLogin" type="date" placeholder="选择日期" clearable />
      </el-form-item>

      <el-form-item label="最后上线时间:">

        <el-date-picker v-model="formData.lastLogin" type="date" placeholder="选择日期" clearable />
      </el-form-item>

      <el-form-item label="创建时间:">

        <el-date-picker v-model="formData.createdTime" type="date" placeholder="选择日期" clearable />
      </el-form-item>

      <el-form-item label="固件版本:">
        <el-input v-model="formData.version" clearable placeholder="请输入" />
      </el-form-item>

      <el-form-item label="日志级别:">
        <el-input v-model.number="formData.logLevel" clearable placeholder="请输入" />
      </el-form-item>

      <el-form-item label="设备证书:">
        <el-input v-model="formData.cert" clearable placeholder="请输入" />
      </el-form-item>
      <el-form-item>
        <el-button size="mini" type="primary" @click="save">保存</el-button>
        <el-button size="mini" type="primary" @click="back">返回</el-button>
      </el-form-item>
    </el-form>
  </div>
</template>

<script>
import {
  createDeviceInfo,
  updateDeviceInfo,
  findDeviceInfo
} from '@/api/deviceInfo' //  此处请自行替换地址
import infoList from '@/mixins/infoList'
export default {
  name: 'DeviceInfo',
  mixins: [infoList],
  data() {
    return {
      type: '',
      formData: {
        deviceName: '',
        secret: '',
        firstLogin: new Date(),
        lastLogin: new Date(),
        createdTime: new Date(),
        version: '',
        logLevel: 0,
        cert: '',

      }
    }
  },
  async created() {
    // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (this.$route.query.id) {
      const res = await findDeviceInfo({ ID: this.$route.query.id })
      if (res.code === 0) {
        this.formData = res.data.redeviceInfo
        this.type = 'update'
      }
    } else {
      this.type = 'create'
    }
  },
  methods: {
    async save() {
      let res
      switch (this.type) {
        case 'create':
          res = await createDeviceInfo(this.formData)
          break
        case 'update':
          res = await updateDeviceInfo(this.formData)
          break
        default:
          res = await createDeviceInfo(this.formData)
          break
      }
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '创建/更改成功'
        })
      }
    },
    back() {
      this.$router.go(-1)
    }
  }
}
</script>

<style>
</style>
