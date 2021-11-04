<template>
  <div>
    <el-form :model="formData" label-position="right" label-width="80px">
      <el-form-item label="产品名称:">
    <el-input v-model="formData.productName" clearable placeholder="请输入" />
    </el-form-item>
    
      <el-form-item label="认证方式:">
    <el-input v-model.number="formData.authMode" clearable placeholder="请输入"/>
    </el-form-item>
    
      <el-form-item label="设备类型:">
    <el-input v-model.number="formData.deviceType" clearable placeholder="请输入"/>
    </el-form-item>
    
      <el-form-item label="产品品类:">
    <el-input v-model.number="formData.categoryID" clearable placeholder="请输入"/>
    </el-form-item>
    
      <el-form-item label="通讯方式:">
    <el-input v-model.number="formData.netType" clearable placeholder="请输入"/>
    </el-form-item>
    
      <el-form-item label="数据协议:">
    <el-input v-model.number="formData.dataProto" clearable placeholder="请输入"/>
    </el-form-item>
    
      <el-form-item label="动态注册:">
    <el-input v-model.number="formData.autoRegister" clearable placeholder="请输入"/>
    </el-form-item>
    
      <el-form-item label="动态注册产品秘钥:">
    <el-input v-model="formData.secret" clearable placeholder="请输入" />
    </el-form-item>
    
      <el-form-item label="描述:">
    <el-input v-model="formData.description" clearable placeholder="请输入" />
    </el-form-item>
    
      <el-form-item label="createdTime字段:">
    
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.createdTime" clearable></el-date-picker>
    </el-form-item>
    
      <el-form-item label="updatedTime字段:">
    
      <el-date-picker type="date" placeholder="选择日期" v-model="formData.updatedTime" clearable></el-date-picker>
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
  createProductInfo,
  updateProductInfo,
  findProductInfo
} from '@/api/productInfo' //  此处请自行替换地址
import infoList from '@/mixins/infoList'
export default {
  name: 'ProductInfo',
  mixins: [infoList],
  data() {
    return {
      type: '',
      formData: {
            productName: '',
            authMode: 0,
            deviceType: 0,
            categoryID: 0,
            netType: 0,
            dataProto: 0,
            autoRegister: 0,
            secret: '',
            description: '',
            createdTime: new Date(),
            updatedTime: new Date(),
            
      }
    }
  },
  async created() {
    // 建议通过url传参获取目标数据ID 调用 find方法进行查询数据操作 从而决定本页面是create还是update 以下为id作为url参数示例
    if (this.$route.query.id) {
      const res = await findProductInfo({ ID: this.$route.query.id })
      if (res.code === 0) {
        this.formData = res.data.reproductInfo
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
          res = await createProductInfo(this.formData)
          break
        case 'update':
          res = await updateProductInfo(this.formData)
          break
        default:
          res = await createProductInfo(this.formData)
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