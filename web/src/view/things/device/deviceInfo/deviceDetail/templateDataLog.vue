<template>
  <div class="templateDataLog">
    <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
    />
    <el-table :data="tableData" border style="width: 100%">
      <el-table-column prop="dataID" label="属性标识符" />
      <el-table-column prop="dataName" label="属性名称" />
      <el-table-column prop="dataType" label="数据类型" />
      <el-table-column prop="timestamp" label="更新时间" />
      <el-table-column prop="getValue" label="最新值" />
    </el-table>
  </div>
</template>
<script setup>
import {
  getDeviceData
} from '@/api/things/deviceInfo'
import {
  getProductTemplate,
} from '@/api/things/productInfo'
import cloneDeep from 'lodash/cloneDeep'

import { defineEmits, defineProps, ref, defineExpose } from 'vue'
import { fmtDate } from '../../../js/utils'
import { formatJson } from '../../../js/json'
import { parseModelTemplate } from '../../productInfo/productDetail/templateHandle'
import { fmtPropertyTemplateData } from './handle'
const timeRange = ref([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const tableData = ref([])
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
      version: 'ewf'
    }
  }
})

const productTemplate = ref({})
// 查询
const getTemplateData = async() => {
  const table = await getProductTemplate({ productID: props.deviceInfo.productID })
  console.log('获取到:', table)
  if (table.code === 0) {
    productTemplate.value = JSON.parse(table.data.template)
    console.log('getTemplateData', productTemplate.value.properties)
    GetDeviceData()
  }
}
const deviceData = ref([])
const GetDeviceData = async() => {
  const table = await getDeviceData({
    method: 'property',
    productID: props.deviceInfo.productID,
    deviceName: props.deviceInfo.deviceName
  })
  if (table.code === 0) {
    deviceData.value = table.data.list
    tableData.value = table.data.list
    console.log('GetDeviceData', deviceData.value)

      const data = fmtPropertyTemplateData(productTemplate.value, deviceData.value)
      tableData.value = cloneDeep(data)
  }
}
getTemplateData()

//
// console.log( '1', data )
//
// tableData.value = JSON.parse(JSON.stringify(productTemplate.value))
//
// console.log('get template table data', tableData.value)
</script>

<script>
export default {
  name: 'TemplateDataLog'
}
</script>
