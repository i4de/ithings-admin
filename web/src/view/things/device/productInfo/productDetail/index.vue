<template>
  <div>
    <el-row>
      <el-col :span="20">
        <el-tabs v-model="activeName" type="border-card" @tab-click="handleClick">
          <el-tab-pane label="物模型" name="first">
            <ProductTemplate />
          </el-tab-pane>
          <el-tab-pane label="设备列表" name="second">
            <DeviceList/>
          </el-tab-pane>
          <el-tab-pane label="设备开发" name="third">
            <DeviceDetail/>
          </el-tab-pane>
        </el-tabs>
      </el-col>
      <el-col :span="4">
          <el-card class="box-card">
            <el-descriptions :column="1" border >
              <template #title>
                宠物定位项圈 开发中
              </template>
              <template #extra>
                <el-button type="primary" size="small">编辑</el-button>
              </template>
              <el-descriptions-item
                label="产品ID"
                label-align="right"
                align="center"
                label-class-name="my-label"
                class-name="my-content"
                width="150px"
              >S244MIRHP6
              </el-descriptions-item>
              <el-descriptions-item
                label="产品品类	"
                label-align="right"
                align="center"
              >	智慧农业-传感器-光照度传感器
              </el-descriptions-item>
              <el-descriptions-item
                label="设备类型"
                label-align="right"
                align="center"
              >设备
              </el-descriptions-item>
              <el-descriptions-item
                label="认证方式	"
                label-align="right"
                align="center"
              >密钥认证
              </el-descriptions-item>
              <el-descriptions-item
                label="通信方式"
                label-align="right"
                align="center"
              >2G/3G/4G
              </el-descriptions-item>
              <el-descriptions-item
                label="数据协议"
                label-align="right"
                align="center"
              >	物模型
              </el-descriptions-item>
              <el-descriptions-item
                label="创建时间"
                label-align="right"
                align="center"
              >	2021-12-06 21:48:45
              </el-descriptions-item>
              <el-descriptions-item
                label="更改时间"
                label-align="right"
                align="center"
              >	2021-12-06 21:48:45
              </el-descriptions-item>
              <el-descriptions-item
                label="产品描述"
                label-align="right"
                align="center"
              >	-
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
          <el-card>
            <el-descriptions :column="1" border >
              <template #title>
                功能定义
              </template>
              <el-descriptions-item
                label="标准功能"
                label-align="right"
                align="center"
                label-class-name="my-label"
                class-name="my-content"
                width="150px"
              >5个
              </el-descriptions-item>
              <el-descriptions-item
                label="自定义功能"
                label-align="right"
                align="center"
              >	1个
              </el-descriptions-item>
            </el-descriptions>
          </el-card>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import ProductTemplate from './ProductTemplate.vue'
import DeviceList from '../../deviceInfo/deviceList.vue'
import DeviceDetail from '../../deviceInfo/deviceDetail/index.vue'
// const activeIndex = ref('1')
// const activeIndex2 = ref('1')
// const handleSelect = (key, keyPath) => {
//   console.log(key, keyPath)
// }
const activeName = ref('first')
const handleClick = (tab, event) => {
  console.log(tab, event)
}
</script>
<script>
export default {
  name: 'ProductDetail'
}
</script>

<style>
.card-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
