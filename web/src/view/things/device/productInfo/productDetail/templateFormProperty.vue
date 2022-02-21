<template>
  <div>
    <el-form :model="tableData" label-position="left">
      <el-form-item label="功能名称">
        <el-input v-model="tableData.name" clearable placeholder="支持中文、英文、数字、下划线的组合，最多不超过20个字符" @change="onChange('name')" />
      </el-form-item>
      <el-form-item label="标识符">
        <el-input v-model="tableData.id" clearable placeholder="第一个字符不能是数字，支持英文、数字、下划线的组合，最多不超过32个字符" @change="onChange('id')" />
      </el-form-item>
      <el-form-item label="数据类型">
        <el-radio-group v-model="tableData.define.type" size="small" @change="onChange('type')">
          <el-radio-button label="bool">布尔型</el-radio-button>
          <el-radio-button label="int">整数型</el-radio-button>
          <el-radio-button label="string">字符串</el-radio-button>
          <el-radio-button label="float">浮点型</el-radio-button>
          <el-radio-button label="enum">枚举</el-radio-button>
          <el-radio-button label="timestamp">时间型</el-radio-button>
          <el-radio-button label="struct">结构体</el-radio-button>
          <el-radio-button label="array">数组</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item label="读写类型">
        <el-radio-group v-model="tableData.mode" size="small" @change="onChange('mode')">
          <el-radio-button label="rw">读写</el-radio-button>
          <el-radio-button label="r">只读</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="tableData.define.type=='array'" label="元素类型">
        <el-radio-group v-model="tableData.define.arrayInfo.type" size="small" @change="onChange('arrayInfo.type')">
          <el-radio-button label="int">整数型</el-radio-button>
          <el-radio-button label="string">字符串</el-radio-button>
          <el-radio-button label="float">浮点型</el-radio-button>
          <el-radio-button label="struct">结构体</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="['bool', 'string','enum','timestamp','struct'].includes(tableData.define.type) ||(tableData.define.type=='array'&&['string','struct'].includes(tableData.define.arrayInfo.type))" label="数据定义">
        <dataDefine v-if="tableData.define.type=='struct'" v-model="tableData.define.specs" style="width: 100%" define-type="dataType" @change="onChange('specs')" />
        <dataDefine v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='struct'" v-model="tableData.define.arrayInfo.specs" style="width: 100%" has-struct="true" @change="onChange('arrayInfo')" />

        <div v-if="tableData.define.type=='string'">
          <el-input-number v-model="tableData.define.max" step-strictly @change="onChange('max')" /><span>&#12288;字节</span>
        </div>
        <div v-if="tableData.define.type=='array' && tableData.define.arrayInfo.type=='string'">
          <el-input-number v-model="tableData.define.max" step-strictly @change="onChange('max')" /><span>&#12288;字节</span>
        </div>
        <el-row v-if="tableData.define.type=='bool'">
          <el-col :span="5">
            <el-input v-model="tableData.define['mapping'][0]" size="mini" @change="onChange('mapping')">
              <template #prepend>0</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="tableData.define['mapping'][1]" size="mini" @change="onChange('mapping')">
              <template #prepend>1</template>
            </el-input>
          </el-col>
          <el-col :span="14" />
        </el-row>
        <span v-if="tableData.define.type=='timestamp'">INT类型的UTC时间戳（秒）</span>
        <mappingDefine v-if="tableData.define.type=='enum'" v-model="tableData.define.mapping" @change="onChange('mapping')" />
      </el-form-item>
      <el-form-item v-if="['int', 'float'].includes(tableData.define.type)||(tableData.define.type=='array'&&['int', 'float'].includes(tableData.define.arrayInfo.type))" label="数值范围">
        <el-input-number v-if="tableData.define.type=='float'" v-model="tableData.define.min" :precision="3" @change="onChange('min')" />
        <el-input-number v-if="tableData.define.type=='int'" v-model="tableData.define.min" step-strictly @change="onChange('min')" />
        <el-input-number v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='int'" v-model="tableData.define.arrayInfo.min" step-strictly @change="onChange('min')" />
        <el-input-number v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='float'" v-model="tableData.define.arrayInfo.min" :precision="3" @change="onChange('min')" />
        <span> &#12288;-&#12288; </span>
        <el-input-number v-if="tableData.define.type=='float'" v-model="tableData.define.max" :precision="3" @change="onChange('max')" />
        <el-input-number v-if="tableData.define.type=='int'" v-model="tableData.define.max" step-strictly @change="onChange('max')" />
        <el-input-number v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='int'" v-model="tableData.define.arrayInfo.max" step-strictly @change="onChange('max')" />
        <el-input-number v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='float'" v-model="tableData.define.arrayInfo.max" :precision="3" @change="onChange('max')" />
      </el-form-item>
      <el-form-item v-if="['int', 'float'].includes(tableData.define.type)||(tableData.define.type=='array'&&['int', 'float'].includes(tableData.define.arrayInfo.type))" label="初始值">
        <el-input-number v-if="tableData.define.type=='float'" v-model="tableData.define.start" :precision="3" step-strictly @change="onChange('start')" />
        <el-input-number v-if="tableData.define.type=='int'" v-model="tableData.define.start" step-strictly @change="onChange('start')" />
        <el-input-number v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='float'" v-model="tableData.define.arrayInfo.start" :precision="3" step-strictly @change="onChange('start')" />
        <el-input-number v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='int'" v-model="tableData.define.arrayInfo.start" step-strictly @change="onChange('start')" />
      </el-form-item>
      <el-form-item v-if="['int', 'float'].includes(tableData.define.type)||(tableData.define.type=='array'&&['int', 'float'].includes(tableData.define.arrayInfo.type))" label="步长">
        <el-input-number v-if="tableData.define.type=='float'" v-model="tableData.define.step" :precision="3" step-strictly @change="onChange('step')" />
        <el-input-number v-if="tableData.define.type=='int'" v-model="tableData.define.step" step-strictly @change="onChange('step')" />
        <el-input-number v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='float'" v-model="tableData.define.arrayInfo.step" :precision="3" step-strictly @change="onChange('step')" />
        <el-input-number v-if="tableData.define.type=='array'&&tableData.define.arrayInfo.type=='int'" v-model="tableData.define.arrayInfo.step" step-strictly @change="onChange('step')" />
      </el-form-item>
      <el-form-item v-if="['int', 'float'].includes(tableData.define.type)||(tableData.define.type=='array'&&['int', 'float'].includes(tableData.define.arrayInfo.type))" label="单位">
        <el-input v-if="tableData.define.type=='array'" v-model="tableData.define.arrayInfo.unit" clearable placeholder="0-12个字符" @change="onChange('unit')" />
        <el-input v-else v-model="tableData.define.unit" clearable placeholder="0-12个字符" @change="onChange('unit')" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="tableData.desc" clearable placeholder="最多不超过80个字符" @change="onChange('desc')" />
      </el-form-item>
    </el-form>
  </div>
</template>

<script setup>
import dataDefine from './dataDefine.vue'
import mappingDefine from './mappingDefine.vue'
import { fmtFormDefine } from './dataDefine'
import { defineProps, ref, defineEmits, defineExpose } from 'vue'
import { onUpdated } from 'vue'
const emit = defineEmits(['update:modelValue'])
const props = defineProps({
  modelValue: {
    type: Object,
    default: function() {
      return {
        funcType: 'property',
        name: '',
        id: '',
        dataType: 'bool',
        mode: 'wr',
        define: {
          type: 'int',
          min: 0,
          max: 100,
          start: 0,
          step: 1,
          unit: '',
          maping: {
            0: '关',
            1: '开'
          },
          arrayInfo: {
            type: 'int',
            min: 0,
            max: 100,
            start: 0,
            step: 1,
            unit: '',
            specs: []
          },
          specs: [
            {
              id: 'longitude',
              name: 'GPS经度',
              dataType: {
                type: 'float',
                min: -180,
                max: 180,
                start: 0,
                step: 0.001,
                unit: '度'
              }
            }]
        },
        desc: ''
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

const tableData = ref(props.modelValue)
tableData.value.define = fmtFormDefine(tableData.value.define)
console.log('formProperty form', tableData.value)

const onChange = (type) => {
  console.log('templateFormProperty onChange', type, tableData.value[type])
  if (tableData.value[type] !== undefined) {
    // 这些都是define 以外的
    props.modelValue = tableData.value[type]
  } else {
    switch (type) {
      case 'type':
        onTypeChange(tableData.value.define.type)
        break
      default:
        onDefineChange(type)
    }
  }
  emit('update:modelValue', props.modelValue)
}

const onDefineChange = (type) => {
  console.log('templateFormProperty onDefineChange', type, tableData.value.define[type])
  if (tableData.value[type] !== undefined) {
    // 这些都是define 以外的
    props.modelValue = tableData.value.define[type]
  } else {
    switch (type) {
      case 'arrayInfo.type':
        props.modelValue.define.arrayInfo = tableData.value.define.arrayInfo
    }
  }
}

const onTypeChange = (type) => {
  console.log('templateFormProperty onTypeChange', type, tableData.value)
  switch (type) {
    case 'array':
      tableData.value.define.arrayInfo = fmtFormDefine(tableData.value.define.arrayInfo)
      break
  }
}
</script>
