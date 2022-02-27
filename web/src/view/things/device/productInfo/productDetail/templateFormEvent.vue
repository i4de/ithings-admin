<template>
  <div>
    <el-form :model="tableData" label-position="left">
      <el-form-item label="功能名称">
        <el-input v-model="tableData.name" clearable placeholder="支持中文、英文、数字、下划线的组合，最多不超过20个字符" @change="onChange('name')" />
      </el-form-item>
      <el-form-item label="标识符">
        <el-input v-model="tableData.id" clearable placeholder="第一个字符不能是数字，支持英文、数字、下划线的组合，最多不超过32个字符" @change="onChange('id')" />
      </el-form-item>
      <el-form-item>
        <el-radio-group v-model="tableData.type" size="small" @change="onChange('type')">
          <el-radio-button label="alert">告警</el-radio-button>
          <el-radio-button label="fault">故障</el-radio-button>
          <el-radio-button label="info">信息</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="事件参数">
        <dataDefine v-model="tableData.params" style="width: 100%" define-type="define" @change="onChange('params')" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="tableData.desc" clearable placeholder="最多不超过80个字符" @change="onChange('desc')" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import dataDefine from './dataDefine.vue'
import { defineProps, ref, defineEmits, defineExpose } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: function() {
      return {
        name: '',
        id: '',
        desc: '',
        type: 'info',
        params: []
      }
    }
  },
  type: {
    default: function() {
      return 'insert'
    },
    type: String
  }
})

const tableData = ref(JSON.parse(JSON.stringify(props.modelValue)))
console.log('formEvent form', tableData.value)

const onChange = (type) => {
  console.log('templateFormEvent onChange', type, tableData.value[type])
  if (tableData.value[type] !== undefined) {
    props.modelValue[type] = tableData.value[type]
  } else {
    alert('templateFormEvent err:' + type)
  }
  emit('update:modelValue', props.modelValue)
}

</script>
