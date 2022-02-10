<template>
  <div>
    <el-form :model="from" label-position="left">
      <el-form-item label="功能名称">
        <el-input v-model="from.name" clearable placeholder="支持中文、英文、数字、下划线的组合，最多不超过20个字符" />
      </el-form-item>
      <el-form-item label="标识符">
        <el-input v-model="from.id" clearable placeholder="第一个字符不能是数字，支持英文、数字、下划线的组合，最多不超过32个字符" />
      </el-form-item>
      <el-form-item label="数据类型">
        <el-radio-group v-model="from.define.type" size="small">
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
        <el-radio-group v-model="from.mode" size="small">
          <el-radio-button label="rw">读写</el-radio-button>
          <el-radio-button label="r">只读</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="from.define.type=='array'" label="元素类型">
        <el-radio-group v-model="from.define.arrayInfo.type" size="small">
          <el-radio-button label="int">整数型</el-radio-button>
          <el-radio-button label="string">字符串</el-radio-button>
          <el-radio-button label="float">浮点型</el-radio-button>
          <el-radio-button label="struct">结构体</el-radio-button>
        </el-radio-group>
      </el-form-item>
      <el-form-item v-if="from.define.type=='bool'||from.define.type=='string'||from.define.type=='enum'||from.define.type=='timestamp'||from.define.type=='struct'||(from.define.type=='array'&&(from.define.arrayInfo.type=='string'||from.define.arrayInfo.type=='struct'))" label="数据定义">
        <dataDefine style="width: 100%" v-if="from.define.type=='struct'" v-model="from.define.specs" func-type="property" />
        <dataDefine style="width: 100%" v-if="from.define.type=='array'" v-model="from.define.arrayInfo" func-type="property" />

        <div v-if="from.define.type=='string'">
          <el-input-number v-model="from.define.max" step-strictly /><span>&#12288;字节</span>
        </div>
        <div v-if="from.define.type=='array' && from.define.arrayInfo.type=='string'">
          <el-input-number v-model="from.define.max" step-strictly /><span>&#12288;字节</span>
        </div>
        <el-row v-if="from.define.type=='bool'">
          <el-col :span="5">
            <el-input v-model="from.define['mapping']['0']" size="mini">
              <template #prepend>0</template>
            </el-input>
          </el-col>
          <el-col :span="5">
            <el-input v-model="from.define['mapping']['1']" size="mini">
              <template #prepend>1</template>
            </el-input>
          </el-col>
          <el-col :span="14" />
        </el-row>
        <span v-if="from.define.type=='timestamp'">INT类型的UTC时间戳（秒）</span>
        <div v-if="from.define.type=='enum'">
          <el-row>
            <el-table :data="from.define.enum">
              <el-table-column label="枚举键值">
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
                <template #default="scope">
                  <el-button @click="deleteDefineRow('enum',scope.$index,scope.row)">删除</el-button>
                </template>
              </el-table-column>
            </el-table>
          </el-row>
          <el-row>
            <el-col>
              <el-button @click="addDefineRow">+添加枚举项</el-button>
            </el-col>
          </el-row>
        </div>
      </el-form-item>
      <el-form-item v-if="from.define.type=='int'||from.define.type=='float'||(from.define.type=='array'&&(from.define.arrayInfo.type=='int'||from.define.arrayInfo.type=='float'))" label="数值范围">
        <el-input-number v-if="from.define.type=='float'" v-model="from.define.min" :precision="3" />
        <el-input-number v-if="from.define.type=='int'" v-model="from.define.min" step-strictly />
        <el-input-number v-if="from.define.type=='array'&&from.define.arrayInfo.type=='int'" v-model="from.define.arrayInfo.min" step-strictly />
        <el-input-number v-if="from.define.type=='array'&&from.define.arrayInfo.type=='float'" v-model="from.define.arrayInfo.min" :precision="3" />
        <span> &#12288;-&#12288; </span>
        <el-input-number v-if="from.define.type=='float'" v-model="from.define.max" :precision="3" />
        <el-input-number v-if="from.define.type=='int'" v-model="from.define.max" step-strictly />
        <el-input-number v-if="from.define.type=='array'&&from.define.arrayInfo.type=='int'" v-model="from.define.arrayInfo.max" step-strictly />
        <el-input-number v-if="from.define.type=='array'&&from.define.arrayInfo.type=='float'" v-model="from.define.arrayInfo.max" :precision="3" />
      </el-form-item>
      <el-form-item v-if="from.define.type=='int'||from.define.type=='float'||(from.define.type=='array'&&(from.define.arrayInfo.type=='int'||from.define.arrayInfo.type=='float'))" label="初始值">
        <el-input-number v-if="from.define.type=='float'" v-model="from.define.start" :precision="3" step-strictly />
        <el-input-number v-if="from.define.type=='int'" v-model="from.define.start" step-strictly />
        <el-input-number v-if="from.define.type=='array'&&from.define.arrayInfo.type=='float'" v-model="from.define.arrayInfo.start" :precision="3" step-strictly />
        <el-input-number v-if="from.define.type=='array'&&from.define.arrayInfo.type=='int'" v-model="from.define.arrayInfo.start" step-strictly />
      </el-form-item>
      <el-form-item v-if="from.define.type=='int'||from.define.type=='float'||(from.define.type=='array'&&(from.define.arrayInfo.type=='int'||from.define.arrayInfo.type=='float'))" label="步长">
        <el-input-number v-if="from.define.type=='float'" v-model="from.define.step" :precision="3" step-strictly />
        <el-input-number v-if="from.define.type=='int'" v-model="from.define.step" step-strictly />
        <el-input-number v-if="from.define.type=='array'&&from.define.arrayInfo.type=='float'" v-model="from.define.arrayInfo.step" :precision="3" step-strictly />
        <el-input-number v-if="from.define.type=='array'&&from.define.arrayInfo.type=='int'" v-model="from.define.arrayInfo.step" step-strictly />
      </el-form-item>
      <el-form-item v-if="from.define.type=='int'||from.define.type=='float'||(from.define.type=='array'&&(from.define.arrayInfo.type=='int'||from.define.arrayInfo.type=='float'))" label="单位">
        <el-input v-if="from.define.type=='array'" v-model="from.define.arrayInfo.unit" clearable placeholder="0-12个字符" />
        <el-input v-else v-model="from.define.unit" clearable placeholder="0-12个字符" />
      </el-form-item>
      <el-form-item label="描述">
        <el-input v-model="from.desc" clearable placeholder="最多不超过80个字符" />
      </el-form-item>
    </el-form>
    <div slot="footer" class="dialog-footer">
      <el-button>取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>

</template>

<script setup>
import dataDefine from './dataDefine.vue'
import { fmtFormDefine } from './dataDefine'
import { defineProps, ref, defineEmits, defineExpose } from 'vue'
const props = defineProps({
  temp: {
    default: function() {
      return {
        funcType: 'property',
        name: '',
        id: '',
        dataType: 'bool',
        mode: 'wr',
        define: {
          type: 'int',
          min: '0',
          max: '100',
          start: '0',
          step: '1',
          unit: '',
          maping: {
            0: '关',
            1: '开'
          },
          arrayInfo: {
            type: 'int',
            min: '0',
            max: '100',
            start: '0',
            step: '1',
            unit: ''
          },
          specs: [
            {
              id: 'longitude',
              name: 'GPS经度',
              dataType: {
                type: 'float',
                min: '-180',
                max: '180',
                start: '0',
                step: '0.001',
                unit: '度'
              }
            }]
        },
        desc: ''
      }
    },
    type: Object
  },
  type: {
    default: function() {
      return 'insert'
    },
    type: String
  }
})

const from = ref(props.temp)
from.value.define = fmtFormDefine(from.value.define)

const deleteDefineRow = (type, index, row) => {
  console.log(type, index, row)
  switch (type) {
    case 'enum':
      from.value.define.enum.splice(index, 1)
  }
}
const addDefineRow = () => {
  if (from.value.define.enum == undefined) {
    from.value.define.enum = []
  }
  from.value.define.enum.push({ key: 1, value: '' })
}
const emit = defineEmits(['save'])
const save = () => {
  console.log('save', from.value)
  emit('save', 'hello world')
}
</script>
