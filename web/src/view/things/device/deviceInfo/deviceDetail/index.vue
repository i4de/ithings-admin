<template>
<div>
  <el-row>
    <el-col>
      设备名称:fwefwe
    </el-col>
  </el-row>
  <el-row>
    <el-col>
      <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
        <el-tab-pane label="设备信息" name="first">
          <DeviceInfo/>
        </el-tab-pane>
        <el-tab-pane label="云端诊断日志" name="second">
          <ListHubLog/>
        </el-tab-pane>
        <el-tab-pane label="设备云端日志" name="third">
          <DescribeDeviceData/>
        </el-tab-pane>
      </el-tabs>
    </el-col>
  </el-row>

</div>
</template>

<script setup>
import DeviceInfo from './deviceInfo.vue'
import ListHubLog from './listHubLog.vue'
import DescribeDeviceData from './describeDeviceData.vue'
import { ref } from 'vue'
const activeName = ref('first')
const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>

<script>
export default {
  name: 'DeviceDetail'
}
</script>

<style scoped>

</style>