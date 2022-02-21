<template>
  <div>
    <el-form :modal="propertyForm">
      <el-form-item label="功能类型123">
        <el-radio-group v-model="propertyForm.funcType" size="small" @Change="handleRadio">
          <el-radio-button label="property">属性</el-radio-button>
          <el-radio-button label="event">事件</el-radio-button>
          <el-radio-button label="action">行为</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <tempProperty v-if="propertyForm.funcType==='property'" v-model="property" @save="(value)=>save('property',value)" @cancel="cancel" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup>
import tempProperty from './templateFormProperty.vue'
import { defineProps, ref, defineEmits, defineExpose, watch } from 'vue'
import { onUpdated } from 'vue'
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
          min: 0,
          max: 100,
          start: 0,
          step: 1,
          unit: '',
          maping: {
            0: '关',
            1: '开'
          }
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
console.log('templateForm', props.type, props.temp)
const propertyForm = ref({})
switch (props.type) {
  case 'update':
    propertyForm.value = props.temp
    break
  case 'insert':
    propertyForm.value = {
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
        }
      },
      desc: ''
    }
}
const emit = defineEmits(['save', 'cancel'])
const property = ref(propertyForm)

const save = (type, value) => {
  // todo 这里需要对数据进行校验
  console.log('templateForm save', type, value)
  emit('save', value)
}
const cancel = () => {
  console.log('templateForm cancel')
  emit('cancel')
}

const handleRadio = (value) => {
  console.log('value888', value)
}

</script>
