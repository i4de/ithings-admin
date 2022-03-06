<template>
  <div>
    <el-row>
      <el-col>
        <el-descriptions
          class="margin-top"
          title="设备信息"
          :column="2"
          size="large"
          border
        >
          <el-descriptions-item label="设备名称">
            {{ deviceData.deviceName }}
          </el-descriptions-item>
          <el-descriptions-item label="所属产品" >
            {{productData.productName}}
          </el-descriptions-item>
          <el-descriptions-item label="设备创建时间">
            {{ fmtDate(deviceData.createdTime) }}
          </el-descriptions-item>
          <el-descriptions-item label="设备秘钥">
            {{ deviceData.secret }}
          </el-descriptions-item>
          <el-descriptions-item label="产品ID">
            {{ deviceData.productID }}
          </el-descriptions-item>
          <el-descriptions-item label="日志级别">
            {{ LogLevelArr[deviceData.logLevel] }}
          </el-descriptions-item>
          <el-descriptions-item label="激活时间">
            {{ fmtDate(deviceData.firstLogin) }}
          </el-descriptions-item>
          <el-descriptions-item label="最后上线时间">
            {{ fmtDate(deviceData.lastLogin) }}

          </el-descriptions-item>
          <el-descriptions-item label="固件版本">
            {{ deviceData.version }}

          </el-descriptions-item>
        </el-descriptions>

      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, defineExpose } from 'vue'
import { fmtDate } from '../../../js/utils'
import * as vars from '@/view/things/device/vars'

const props = defineProps({
  productInfo: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {
      authMode: 1,
      autoRegister: 2,
      categoryID: 0,
      createdTime: '1636121040',
      dataProto: 2,
      description: '',
      deviceType: 2,
      netType: 3,
      productID: '22BIUqIZSve',
      productName: '杨磊测试'
    }
  },
  deviceInfo: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: {
      createdTime: '1636121619',
      deviceName: 'drfadf',
      firstLogin: '1638277768',
      lastLogin: '1638277768',
      logLevel: 1,
      productID: '22BIUqIZSve',
      secret: '0vYKdFqSpfA8wQK8WFoYNxwQWqU=',
      version: 'ewf' }
  }
})
console.log('deviceInfo', props.deviceInfo)
const deviceData = ref(props.deviceInfo)
const productData = ref(props.productInfo)
const LogLevelArr = ref(vars.LogLevel)

</script>
