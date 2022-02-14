<template>
  <div>
    <el-form>
      <el-form-item label="功能类型">
        <el-radio-group v-model="propertyForm.funcType" size="small">
          <el-radio-button label="property">属性</el-radio-button>
          <el-radio-button label="event">事件</el-radio-button>
          <el-radio-button label="action">行为</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <tempProperty v-show="propertyForm.funcType=='property'" :temp="propertyForm" @save="(value)=>save('property',value)" @cancel="cancel" />

  </div>
</template>

<script setup>
import tempProperty from './templateFormProperty.vue'
import { defineProps, ref, defineEmits, defineExpose } from 'vue'
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
          min: '0',
          max: '100',
          start: '0',
          step: '1',
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
console.log('templateForm', props.temp)
const propertyForm = ref(JSON.parse(JSON.stringify(props.temp)))
const emit = defineEmits(['save', 'cancel'])
const save = (type, value) => {
  console.log('templateForm save', type, value)
  emit('save', value)
}
const cancel = () => {
  console.log('templateForm cancel')
  emit('cancel')
}
onUpdated(() => {
  console.log('templateForm updated', props.temp)
  propertyForm.value = JSON.parse(JSON.stringify(props.temp))
})
</script>
