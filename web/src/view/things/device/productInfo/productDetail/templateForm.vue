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
    <tempProperty v-if="propertyForm.funcType=='property'" :temp="propertyForm" @save="save" />

  </div>
</template>

<script setup>
import tempProperty from './templateFormProperty.vue'
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
const propertyForm = ref(props.temp)
const save = (value) => {
  console.log('formsave', value)
}
</script>
