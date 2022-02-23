<template>
  <div>
    <el-form :modal="propertyForm">
      <el-form-item label="功能类型123">
        <el-radio-group v-model="propertyForm.funcType" size="small" @Change="handleRadio">
          <el-radio-button label="properties">属性</el-radio-button>
          <el-radio-button label="events">事件</el-radio-button>
          <el-radio-button label="actions">行为</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <tempProperty v-if="propertyForm.funcType==='properties'" v-model="property" @save="(value)=>save('properties',value)" @cancel="cancel" />
    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup>
import tempProperty from './templateFormProperty.vue'
import {
  manageProductTemplate
} from '@/api/things/productInfo'
import { defineProps, ref, defineEmits, defineExpose, watch } from 'vue'
import { fmtTemplateModel, checkTemplateModel } from './dataDefine'
import { onUpdated } from 'vue'
import { ElMessage } from 'element-plus'
const props = defineProps({
  templateModel: {
    type: Object,
    default: function() {
      return {
        version: '1.0',
        properties: [],
        events: [],
        actions: [],
        profile: {
          ProductId: '',
          CategoryId: ''
        }
      }
    }
  },
  temp: {
    default: function() {
      return {
        funcType: 'properties',
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
  },
  productID: {
    type: String
  }
})
const templateModel = ref(JSON.parse(JSON.stringify(props.templateModel)))
console.log('templateForm', props.type, props.productID, props.temp, templateModel.value)
const propertyForm = ref({})
const defaultForm = {
  funcType: 'properties',
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
switch (props.type) {
  case 'update':
    propertyForm.value = JSON.parse(JSON.stringify(props.temp))
    break
  case 'insert':
    propertyForm.value = defaultForm
}
const emit = defineEmits(['save', 'cancel'])
const property = ref(propertyForm)

const save = async(type, value) => {
  console.log('templateForm save', props.templateModel, templateModel.value)
  const id = ''
  if (props.type == 'update') {
    id = props.temp.id
  }
  const err = checkTemplateModel(templateModel.value, propertyForm.value, id)
  if (err != undefined) {
    ElMessage({
      type: 'error',
      message: err
    })
    return
  }

  templateModel.value = fmtTemplateModel(templateModel.value, propertyForm.value, id)
  const templateStrInput = JSON.stringify(templateModel.value)
  console.log('templateForm save', type, value, templateStrInput)
  var res = await manageProductTemplate({
    info: {
      productID: props.productID,
      template: templateStrInput
    }
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
  }
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
