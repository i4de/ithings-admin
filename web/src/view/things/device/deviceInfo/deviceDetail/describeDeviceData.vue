<template>
  <div>
    <el-row>
      <el-col>
        <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="timestamp" label="时间" width="180" >
            <template #default="scope">{{ fmtDate(scope.row.timestamp/1000) }}</template>
          </el-table-column>
          <el-table-column prop="action" label="操作类型" width="180" />
          <el-table-column prop="requestID" label="设备端token" />
          <el-table-column prop="tranceID" label="服务器端tid" />
          <el-table-column prop="topic" label="主题" />
          <el-table-column prop="content" label="详情" />
          <el-table-column prop="resultType" label="结果" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {
  getDeviceDescribeLog
} from '@/api/things/deviceInfo'
import { defineEmits, defineProps, ref, defineExpose } from 'vue'
import { fmtDate } from '../../../js/utils'
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
      version: 'ewf' }
  }
})
const getTableData = async() => {
  const table = await getDeviceDescribeLog({
    productID: props.deviceInfo.productID,
    deviceName: props.deviceInfo.deviceName,
    // timeStart:timeStart,
    // timeEnd:xx,
    limit:20})
  if (table.code === 0) {
    tableData.value = table.data.list
    // total.value = table.data.total
    // page.value = table.data.page
    // pageSize.value = table.data.pageSize
  }
}
getTableData()
</script>
