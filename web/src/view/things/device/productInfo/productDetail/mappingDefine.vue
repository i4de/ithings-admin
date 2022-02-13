<template>
  <div>
    <el-row>
      <el-table :data="tableData">
        <el-table-column label="枚举键值" width="200">
          <template #default="scope">
            <el-input-number v-model="scope.row.key" @change="onChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column label="枚举项描述">
          <template #default="scope">
            <el-input v-model="scope.row.value" @change="onChange(scope.row)" />
          </template>
        </el-table-column>
        <el-table-column>
          <template #default="scope2">
            <el-button @click="deleteRow(scope2.$index)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-row>
    <el-row>
      <el-col>
        <el-button @click="addRow()">+添加枚举项</el-button>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import { defineEmits, defineProps, ref, defineExpose } from 'vue'
import { fmtMapping } from './dataDefine'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    // eslint-disable-next-line vue/require-valid-default-prop
    default: null
  }
})
console.log('mappingDefine', props.modelValue)
const tableData = ref([{
  key: 0,
  value: '关'
}, {
  key: 1,
  value: '开'
}])
tableData.value = fmtMapping(props.modelValue)
let max = 0
for (var i in tableData.value) {
  if (tableData.value[i].key > max) {
    max = tableData.value[i].key
  }
}
console.log('max', max)
const addRow = () => {
  max++
  tableData.value.push({ key: max, value: '' })
  props.modelValue[max] = ''
  console.log('addRow', props.modelValue)
  emit('update:modelValue', props.modelValue)
}
const deleteRow = (index) => {
  delete props.modelValue[tableData.value[index].key]
  tableData.value.splice(index, 1)
  console.log('deleteRow', props.modelValue)
  emit('update:modelValue', props.modelValue)
}

const onChange = (e) => {
  console.log('onChange', e)
  props.modelValue[e.key] = e.value
  emit('update:modelValue', props.modelValue)
}

</script>

