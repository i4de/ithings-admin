<template>
  <div>
    <el-row>
      <el-col>
        设备名称:{{ deviceInfo.deviceName }}
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="设备信息" name="first">
            <DeviceInfo :device-info="deviceInfo" :product-info="productInfo" />
          </el-tab-pane>
          <el-tab-pane label="设备云端日志" name="second">
            <DescribeDeviceData :device-info="deviceInfo" :product-info="productInfo" />
          </el-tab-pane>
          <el-tab-pane label="物模型数据" name="third">
            <TemplateDataLog />
          </el-tab-pane>
        </el-tabs>
      </el-col>
    </el-row>

  </div>
</template>

<script setup>
import DeviceInfo from './deviceInfo.vue'
import TemplateDataLog from './templateDataLog.vue'
import DescribeDeviceData from './describeDeviceData.vue'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
const activeName = ref('first')
const handleClick = (tab, event) => {
  console.log(tab, event)
}
console.log('deviceDetail')
const route = useRoute()
const productInfo = ref(JSON.parse(route.query.productInfo))
const deviceInfo = ref(JSON.parse(route.query.deviceInfo))
</script>

<script>
export default {
  name: 'DeviceDetail'
}
</script>

<style scoped>

</style>
