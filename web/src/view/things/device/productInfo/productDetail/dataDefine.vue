<template>
  <div>
    <el-table :data="tableData" style="width: 100%">
      <el-table-column prop="name" label="参数名称" width="150" />
      <el-table-column prop="id" label="参数标识符" width="120" />
      <el-table-column label="数据类型" width="120">
        <template #default="scope">
          <el-select v-model="scope.row.dataType.type" class="m-2" placeholder="Select" size="large">
            <el-option key="bool" label="布尔型" value="bool"/>
            <el-option key="int" label="整数型" value="int"/>
            <el-option key="string" label="字符串" value="string"/>
            <el-option key="float" label="浮点型" value="float"/>
            <el-option key="enum" label="枚举" value="enum"/>
            <el-option key="timestamp" label="时间型" value="timestamp"/>
            <el-option key="struct" label="结构体" value="struct"/>
            <el-option key="array" label="数组" value="array"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column prop="dataType" label="数据定义" width="120" >
        <template #default="scope">
          {{getDefine(scope.row.dataType)}}
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button>添加参数</el-button>
  </div>
</template>

<script setup>
import { getDefine } from './templateHandle'

import { defineEmits, defineProps, ref } from 'vue'
import { fmtModel } from './dataDefine'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: null
  },
  funcType: {
    type: String,
    default: 'property'
  }
})
const tableData = ref([{
  name: '',
  id: '',
  dataType: '',
  define: {}
}])
console.log('dataDefine', props.modelValue)
console.log('funcType', props.funcType)
tableData.value = fmtModel(props.funcType, props.modelValue)

const onChange = (e) => {
  console.log('onChange', e)
  emit('update:modelValue', props.modelValue)
}

</script>

