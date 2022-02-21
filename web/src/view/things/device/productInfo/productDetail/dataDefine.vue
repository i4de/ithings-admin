<template>
  <div>
    <el-table :data="tableData">
      <el-table-column label="参数名称" width="150">
        <template #default="scope">
          <el-input v-model="scope.row.name" minlength="1" @change="onChange(scope.$index)" />
        </template>
      </el-table-column>
      <el-table-column label="参数标识符" width="150">
        <template #default="scope">
          <el-input v-model="scope.row.id" minlength="1" @change="onChange(scope.$index)" />
        </template>
      </el-table-column>
      <el-table-column label="数据类型" width="120">
        <template #default="scope">
          <el-select v-model="scope.row.define.type" class="m-2" placeholder="Select" size="large" @change="onChange(scope.$index)">
            <el-option key="bool" label="布尔型" value="bool" />
            <el-option key="int" label="整数型" value="int" />
            <el-option key="string" label="字符串" value="string" />
            <el-option key="float" label="浮点型" value="float" />
            <el-option key="enum" label="枚举" value="enum" />
            <el-option key="timestamp" label="时间型" value="timestamp" />
            <el-option v-if="props.hasStruct==true" key="struct" label="结构体" value="struct" />
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="数据定义" width="450">
        <template #default="scope">
          <el-row v-if="scope.row.define.type=='bool'">
            <el-col :span="12">
              <el-input v-model="scope.row.define['mapping'][0]" size="mini" @change="onChange(scope.$index)">
                <template #prepend>0</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model="scope.row.define['mapping'][1]" size="mini" @change="onChange(scope.$index)">
                <template #prepend>1</template>
              </el-input>
            </el-col>
          </el-row>
          <div v-if="scope.row.define.type=='string'">
            <el-input-number v-model="scope.row.define.max" step-strictly @change="onChange(scope.$index)" /><span>&#12288;字节</span>
          </div>
          <span v-if="scope.row.define.type=='timestamp'">INT类型的UTC时间戳（秒）</span>
          <mappingDefine v-if="scope.row.define.type=='enum'" v-model="scope.row.define.mapping" />
          <el-form-item v-if="['int', 'float'].includes(scope.row.define.type) || (scope.row.define.type=='array'&&['int', 'float'].includes(scope.row.define.arrayInfo.type))" label="数值范围">
            <el-input-number v-if="scope.row.define.type=='float'" v-model="scope.row.define.min" :precision="3" @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='int'" v-model="scope.row.define.min" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='int'" v-model="scope.row.define.arrayInfo.min" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='float'" v-model="scope.row.define.arrayInfo.min" :precision="3" @change="onChange(scope.$index)" />
            <span> &#12288;-&#12288; </span>
            <el-input-number v-if="scope.row.define.type=='float'" v-model="scope.row.define.max" :precision="3" @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='int'" v-model="scope.row.define.max" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='int'" v-model="scope.row.define.arrayInfo.max" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='float'" v-model="scope.row.define.arrayInfo.max" :precision="3" @change="onChange(scope.$index)" />
          </el-form-item>
          <el-form-item v-if="['int', 'float'].includes(scope.row.define.type)||(scope.row.define.type=='array'&&(['int', 'float'].includes(scope.row.define.arrayInfo.type)))" label="初始值">
            <el-input-number v-if="scope.row.define.type=='float'" v-model="scope.row.define.start" :precision="3" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='int'" v-model="scope.row.define.start" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='float'" v-model="scope.row.define.arrayInfo.start" :precision="3" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='int'" v-model="scope.row.define.arrayInfo.start" step-strictly @change="onChange(scope.$index)" />
          </el-form-item>
          <el-form-item v-if="['int', 'float'].includes(scope.row.define.type)||(scope.row.define.type=='array'&&(['int', 'float'].includes(scope.row.define.arrayInfo.type)))" label="步长">
            <el-input-number v-if="scope.row.define.type=='float'" v-model="scope.row.define.step" :precision="3" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='int'" v-model="scope.row.define.step" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='float'" v-model="scope.row.define.arrayInfo.step" :precision="3" step-strictly @change="onChange(scope.$index)" />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='int'" v-model="scope.row.define.arrayInfo.step" step-strictly @change="onChange(scope.$index)" />
          </el-form-item>
          <el-form-item v-if="['int', 'float'].includes(scope.row.define.type)||(scope.row.define.type=='array'&&(['int', 'float'].includes(scope.row.define.arrayInfo.type)))" label="单位">
            <el-input v-if="scope.row.define.type=='array'" v-model="scope.row.define.arrayInfo.unit" clearable placeholder="0-12个字符" @change="onChange(scope.$index)" />
            <el-input v-else v-model="scope.row.define.unit" clearable placeholder="0-12个字符" @change="onChange(scope.$index)" />
          </el-form-item>
        </template>
      </el-table-column>
      <el-table-column label="操作" width="120">
        <template #default="scope">
          <el-button
            type="text"
            size="small"
            @click="deleteRow(scope.$index)"
          >删除
          </el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-button @click="addRow">添加参数</el-button>
  </div>
</template>

<script setup>
import { getDefine } from './templateHandle'
import mappingDefine from './mappingDefine.vue'

import { defineEmits, defineProps, ref } from 'vue'
import { fmtModel, defultDefine, fmtModelOut, fmtFormDefine } from './dataDefine'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Array,
    default: [],
  },
  hasStruct: {
    type: Boolean,
    default: false
  },
  defineType: {
    type: String,
    default: 'define'
  }
})
const tableData = ref([{
  name: '',
  id: '',
  define: {}
}])
console.log('dataDefine', props.modelValue)
tableData.value = fmtModel(props.modelValue)
console.log('tableData', tableData.value)

const onChange = (index) => {
  console.log('datadefine onChange', index)
  const get = fmtModelOut(tableData.value[index], props.defineType)
  console.log('onChange', props.modelValue, get)
  props.modelValue[index] = get
  emit('update:modelValue', props.modelValue)
}
const deleteRow = (index) => {
  tableData.value.splice(index, 1)
  props.modelValue.splice(index, 1)
  emit('update:modelValue', props.modelValue)
}
const addRow = () => {
  const getOne = JSON.parse(JSON.stringify(defultDefine))
  console.log(getOne)
  tableData.value.push(getOne)
  props.modelValue.push(fmtModelOut(getOne, props.defineType))
  emit('update:modelValue', props.modelValue)
}
</script>

