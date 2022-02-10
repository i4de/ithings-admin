<template>
  <div>
    <el-table :data="tableData" >
      <el-table-column  label="参数名称" width="150" >
        <template #default="scope">
          <el-input v-model="scope.row.name" />
        </template>
      </el-table-column>
      <el-table-column  label="参数标识符" width="150" >
        <template #default="scope">
          <el-input v-model="scope.row.id" />
        </template>
      </el-table-column>
      <el-table-column label="数据类型" width="120">
        <template #default="scope">
          <el-select v-model="scope.row.define.type" class="m-2" placeholder="Select" size="large">
            <el-option key="bool" label="布尔型" value="bool"/>
            <el-option key="int" label="整数型" value="int"/>
            <el-option key="string" label="字符串" value="string"/>
            <el-option key="float" label="浮点型" value="float"/>
            <el-option key="enum" label="枚举" value="enum"/>
            <el-option key="timestamp" label="时间型" value="timestamp"/>
            <el-option key="struct" label="结构体" value="struct"/>
          </el-select>
        </template>
      </el-table-column>
      <el-table-column label="数据定义" width="450">
        <template #default="scope">
          <el-row v-if="scope.row.define.type=='bool'">
            <el-col :span="12">
              <el-input v-model="scope.row.define['mapping']['0']" size="mini">
                <template #prepend>0</template>
              </el-input>
            </el-col>
            <el-col :span="12">
              <el-input v-model="scope.row.define['mapping']['1']" size="mini">
                <template #prepend>1</template>
              </el-input>
            </el-col>
          </el-row>
          <div v-if="scope.row.define.type=='string'">
            <el-input-number v-model="scope.row.define.max" step-strictly /><span>&#12288;字节</span>
          </div>
          <span v-if="scope.row.define.type=='timestamp'">INT类型的UTC时间戳（秒）</span>
          <div v-if="scope.row.define.type=='enum'">
            <el-row>
              <el-table :data="scope.row.define.enum">
                <el-table-column label="枚举键值" width="200">
                  <template #default="scope">
                    <el-input-number v-model="scope.row.key" />
                  </template>
                </el-table-column>
                <el-table-column label="枚举项描述">
                  <template #default="scope">
                    <el-input v-model="scope.row.value" />
                  </template>
                </el-table-column>
                <el-table-column>
                  <template #default="scope2">
                    <el-button @click="deleteDefineRow(scope.row,'enum',scope2.$index,scope2.row)">删除</el-button>
                  </template>
                </el-table-column>
              </el-table>
            </el-row>
            <el-row>
              <el-col>
                <el-button @click="()=>addDefineRow(scope.row)">+添加枚举项</el-button>
              </el-col>
            </el-row>
          </div>
          <el-form-item v-if="scope.row.define.type=='int'||scope.row.define.type=='float'||(scope.row.define.type=='array'&&(scope.row.define.arrayInfo.type=='int'||scope.row.define.arrayInfo.type=='float'))" label="数值范围">
            <el-input-number v-if="scope.row.define.type=='float'" v-model="scope.row.define.min" :precision="3" />
            <el-input-number v-if="scope.row.define.type=='int'" v-model="scope.row.define.min" step-strictly />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='int'" v-model="scope.row.define.arrayInfo.min" step-strictly />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='float'" v-model="scope.row.define.arrayInfo.min" :precision="3" />
            <span> &#12288;-&#12288; </span>
            <el-input-number v-if="scope.row.define.type=='float'" v-model="scope.row.define.max" :precision="3" />
            <el-input-number v-if="scope.row.define.type=='int'" v-model="scope.row.define.max" step-strictly />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='int'" v-model="scope.row.define.arrayInfo.max" step-strictly />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='float'" v-model="scope.row.define.arrayInfo.max" :precision="3" />
          </el-form-item>
          <el-form-item v-if="scope.row.define.type=='int'||scope.row.define.type=='float'||(scope.row.define.type=='array'&&(scope.row.define.arrayInfo.type=='int'||scope.row.define.arrayInfo.type=='float'))" label="初始值">
            <el-input-number v-if="scope.row.define.type=='float'" v-model="scope.row.define.start" :precision="3" step-strictly />
            <el-input-number v-if="scope.row.define.type=='int'" v-model="scope.row.define.start" step-strictly />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='float'" v-model="scope.row.define.arrayInfo.start" :precision="3" step-strictly />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='int'" v-model="scope.row.define.arrayInfo.start" step-strictly />
          </el-form-item>
          <el-form-item v-if="scope.row.define.type=='int'||scope.row.define.type=='float'||(scope.row.define.type=='array'&&(scope.row.define.arrayInfo.type=='int'||scope.row.define.arrayInfo.type=='float'))" label="步长">
            <el-input-number v-if="scope.row.define.type=='float'" v-model="scope.row.define.step" :precision="3" step-strictly />
            <el-input-number v-if="scope.row.define.type=='int'" v-model="scope.row.define.step" step-strictly />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='float'" v-model="scope.row.define.arrayInfo.step" :precision="3" step-strictly />
            <el-input-number v-if="scope.row.define.type=='array'&&scope.row.define.arrayInfo.type=='int'" v-model="scope.row.define.arrayInfo.step" step-strictly />
          </el-form-item>
          <el-form-item v-if="scope.row.define.type=='int'||scope.row.define.type=='float'||(scope.row.define.type=='array'&&(scope.row.define.arrayInfo.type=='int'||scope.row.define.arrayInfo.type=='float'))" label="单位">
            <el-input v-if="scope.row.define.type=='array'" v-model="scope.row.define.arrayInfo.unit" clearable placeholder="0-12个字符" />
            <el-input v-else v-model="scope.row.define.unit" clearable placeholder="0-12个字符" />
          </el-form-item>
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
  define: {}
}])
console.log('dataDefine', props.modelValue)
console.log('funcType', props.funcType)
tableData.value = fmtModel(props.funcType, props.modelValue)
console.log('tableData', tableData.value)
const onChange = (e) => {
  console.log('onChange', e)
  emit('update:modelValue', props.modelValue)
}
const addDefineRow = (data) => {
  if (data.define.enum == undefined) {
    data.define.enum = []
  }
  data.define.enum.push({ key: 1, value: '' })
}
const deleteDefineRow = (data,type, index, row) => {
  console.log(type, index, row)
  switch (type) {
    case 'enum':
      data.define.enum.splice(index, 1)
  }
}
</script>

