<template>
  <div>
    <el-row>
      <el-col>
        <el-card>
          <span class="debug-title">
            {{ deviceData.deviceName }}
          </span>
          <span class="debug-title">调试</span>
          <p class="action">
            下发信息
          </p>

          <el-form ref="elForm" :model="formData" :rules="rules" size="medium" label-width="100px">
            <el-form-item label="Topic" prop="topic">
              <el-row>
                <el-input v-model="formData.topic" placeholder="请输入消息主题" class="form-content" />
              </el-row>
              <el-row>
                <el-select v-model="formData.topic" placeholder="请选择消息主题" clearable :style="{width: '100%'}">
                  <el-option
                    v-for="(item, index) in DeviceTopicOptions"
                    :key="index"
                    :label="item.label"
                    :value="item.label"
                    :disabled="item.disabled"
                  />
                </el-select>
              </el-row>
            </el-form-item>
            <el-form-item label="Qos" prop="qos">
              <el-radio-group v-model="formData.qos" size="medium">
                <el-radio
                  v-for="(item, index) in qosOptions"
                  :key="index"
                  :label="item.value"
                  :disabled="item.disabled"
                >{{ item.label }}</el-radio>
              </el-radio-group>
            </el-form-item>
            <el-form-item label="消息内容" prop="content">
              <el-input v-model="formData.content" type="textarea" :rows="10" placeholder="请输入消息内容" class="form-content" />
            </el-form-item>
            <el-form-item size="large">
              <el-button type="primary" @click="submitForm">提交</el-button>
              <el-button @click="resetForm">重置</el-button>
            </el-form-item>
          </el-form>
        </el-card>

      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, defineExpose } from 'vue'
import { fmtDate } from '../../../js/utils'
import * as vars from '@/view/things/device/vars'
import { ElMessage } from 'element-plus'
import { DeviceDebugPush } from '@/api/things/deviceDebug'

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

const formData = ref({
  topic: '请选择topic',
  qos: 0,
  content: 'hello world'
})

const DeviceTopicOptions = []

const qosOptions = [{
  'label': '0',
  'value': 0
}, {
  'label': '1',
  'value': 1
}]

// $thing/down/property/${productID}/${deviceName}

// $thing/down/event/${productID}/${deviceName}

// $thing/down/action/${productID}/${deviceName}

// $broadcast/rxd/${productID}/${deviceName}

const submitForm = async() => {
  console.log(formData.value)
  var res = await DeviceDebugPush({
    topic: formData.value.topic,
    qos: formData.value.qos,
    content: formData.value.content,
    productID: props.deviceInfo.productID,
    deviceName: props.deviceInfo.deviceName,
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '调用成功'
    })
  }
}

const resetForm = () => {
  formData.value.content = ''
  formData.value.topic = DeviceTopicOptions[0].label
}

const create = () => {
  let index = 0
  const topic1 = '$thing/down/property/' + props.deviceInfo.productID + '/' + props.deviceInfo.deviceName
  const topic2 = '$thing/down/event/' + props.deviceInfo.productID + '/' + props.deviceInfo.deviceName
  const topic3 = '$thing/down/action/' + props.deviceInfo.productID + '/' + props.deviceInfo.deviceName
  const topic4 = '$broadcast/rxd/' + props.deviceInfo.productID + '/' + props.deviceInfo.deviceName
  DeviceTopicOptions.push({
    label: topic1,
    value: index,
  })
  index = index + 1
  DeviceTopicOptions.push({
    label: topic2,
    value: index,
  })
  index = index + 1
  DeviceTopicOptions.push({
    label: topic3,
    value: index,
  })
  index = index + 1
  DeviceTopicOptions.push({
    label: topic4,
    value: index,
  })
  index = index + 1
}

create()

</script>

<style lang="scss" scoped>
.debug-title{
  font-size: 22px;
  color: #343844;
  margin-right: 20px;
}

.action{
  margin-top: 30px;
  font-size: 15px;
  color: #343844;
  margin-right: 20px;
  margin-bottom: 30px;
}

.form-content{
  width: 100%;
}
</style>
