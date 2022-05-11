<template>
  <div>
    <el-form :modal="formfuncType">
      <el-form-item label="功能类型123">
        <el-radio-group v-model="formfuncType" size="small" @Change="handleRadio">
          <el-radio-button label="properties">属性</el-radio-button>
          <el-radio-button label="events">事件</el-radio-button>
          <el-radio-button label="actions">行为</el-radio-button>
        </el-radio-group>
      </el-form-item>
    </el-form>
    <tempProperty v-if="formfuncType==='properties'" v-model="property" @save="(value)=>save('properties',value)" @cancel="cancel" />
    <tempAction v-if="formfuncType==='actions'" v-model="action" @save="(value)=>save('actions',value)" @cancel="cancel" />
    <tempEvent v-if="formfuncType==='events'" v-model="event" @save="(value)=>save('events',value)" @cancel="cancel" />

    <div slot="footer" class="dialog-footer">
      <el-button @click="cancel">取消</el-button>
      <el-button type="primary" @click="save">保存</el-button>
    </div>
  </div>
</template>

<script setup>
import tempProperty from './templateFormProperty.vue'
import tempAction from './templateFormAction.vue'
import tempEvent from './templateFormEvent.vue'

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
  funcType: {
    type: String,
    default: function() {
      return 'properties'
    }
  },
  temp: {
    default: function() {
      return {
        name: '',
        id: '',
        dataType: 'bool',
        mode: 'rw',
        define: {
          type: 'int',
          min: '0',
          max: '100',
          start: '0',
          step: '1',
          unit: '',
          mapping: {
            '0': '关',
            '1': '开'
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
const defaultProperty = {
  name: '',
  id: '',
  mode: 'rw',
  define: {
    type: 'int',
    min: '0',
    max: '100',
    start: '0',
    step: '1',
    unit: '',
    mapping: {
      '0': '关',
      '1': '开'
    }
  },
  desc: ''
}
const defaultAction = {
  name: '',
  id: '',
  desc: '',
  mode: 'rw',
  input: [],
  output: []
}

const defaultEvent = {
  name: '',
  id: '',
  desc: '',
  type: 'info',
  params: []
}

const formfuncType = ref(props.funcType)
const property = ref(defaultProperty)
const action = ref(defaultAction)
const event = ref(defaultEvent)
if (props.type === 'update') {
  switch (props.funcType) {
    case 'properties':
      property.value = JSON.parse(JSON.stringify(props.temp))
      break
    case 'actions':
      action.value = JSON.parse(JSON.stringify(props.temp))
      break
    case 'events':
      event.value = JSON.parse(JSON.stringify(props.temp))
  }
}
const emit = defineEmits(['save', 'cancel'])

const save = async() => {
  console.log('templateForm save', props.templateModel, templateModel.value)
  let form = {}
  switch (formfuncType.value) {
    case 'properties':
      form = property.value
      break
    case 'actions':
      form = action.value
      break
    case 'events':
      form = event.value
      break
  }

  let id = ''
  if (props.type == 'update') {
    id = props.temp.id
  }
  const err = checkTemplateModel(formfuncType.value, templateModel.value, form, id)
  if (err != undefined) {
    ElMessage({
      type: 'error',
      message: err
    })
    return
  }

  templateModel.value = fmtTemplateModel(formfuncType.value, templateModel.value, form, id)
  const templateStrInput = JSON.stringify(templateModel.value)
  console.log('templateForm save', templateStrInput)
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
  emit('save', true)
}
const cancel = () => {
  console.log('templateForm cancel')
  emit('cancel')
}

const handleRadio = (value) => {
  console.log('handleRadio', value)
}

</script>
