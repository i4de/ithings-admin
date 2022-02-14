<template>
  <div>
    <el-row>
      <el-col>
        <el-button type="primary" @click="ModifyTemplateVisible">导入物模型</el-button><el-button @click="CheckTemplateVisible">查看物模型JSON</el-button>
      </el-col>
      <el-dialog v-model="dialogTempCheckVisible" :before-close="closeCheckDialog" title="查看物模型JSON">
        <el-row>
          <el-col :span="18">
            <p>下方是为标准功能和自定义功能自动生成的JSON格式协议</p>
          </el-col>
          <el-col :span="6">
            <el-button type="success" round @click="copyTemplate">复制</el-button>
          </el-col>
        </el-row>
        <el-row>
          <el-col style="border: 1px solid gray">
            <el-input
              v-model="templateStr"
              readonly="true"
              :rows="20"
              type="textarea"
            />
          </el-col>
        </el-row>

      </el-dialog>
      <el-dialog v-model="dialogTempModifyVisible" :before-close="closeModifyDialog" title="导入物模型">
        <el-row style="    background: #d5e7ff;color: #002da0;">
          <el-col>
            <p>注意：导入新的JSON后原产品的物模型将会被覆盖</p>
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-input
              v-model="templateStrInput"
              :rows="20"
              type="textarea"
              placeholder="请将要导入的物模型对应的JSON粘贴到此文本框"
            />
          </el-col>
        </el-row>
        <el-row>
          <el-col>
            <el-button type="primary" @click="ModifyTemplate">导入</el-button><el-button @click="closeModifyDialog">取消</el-button>
          </el-col>
        </el-row>

      </el-dialog>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-card v-if="false" class="box-card">
          <template #header>
            <div class="card-header">
              <h1>标准功能</h1>
              <el-button type="primary" size="small">新建标准功能</el-button>
            </div>
          </template>
          <el-table :data="tableData" style="width: 100%">
            <el-table-column type="expand">
              <template #default="props">
                <el-card class="box-card" style="width: 80%">
                  <templateDetail :tmps="props.row.tmps" />
                </el-card>
              </template>
            </el-table-column>
            <el-table-column prop="funcType" label="功能类型" />
            <el-table-column prop="name" label="功能名称">
              <template #default="scope">
                {{ scope.row.name }}
                <el-tag size="small">可选</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="标识符" />
            <el-table-column prop="type" label="数据类型" />
            <el-table-column prop="mode" label="读写类型" />
            <el-table-column prop="define" label="数据定义" />
            <el-table-column label="编辑">
              <template #default="scope">
                <el-button
                  size="small"
                >编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
        <el-divider />
        <el-card class="box-card">
          <template #header>
            <div class="card-header">
              <h1>自定义功能</h1>
              <el-button type="primary" size="small">新建自定义功能</el-button>
            </div>
          </template>
          <el-table
            :data="metaTemplate"
            :tree-props="{ children: 'detail', hasChildren: 'hasDetail' }"
            style="width: 100%;"
          >
            <el-table-column type="expand">
              <template #default="props">
                <el-card class="box-card" style="width: 80%">
                  <templateDetail :tmps="props.row.detail" />
                </el-card>
              </template>
            </el-table-column>
            <el-table-column prop="funcType" label="功能类型">
              <template #default="scope">
                {{ getFuncTypeName(scope.row.funcType) }}
              </template>
            </el-table-column>
            <el-table-column prop="name" label="功能名称">
              <template #default="scope">
                {{ scope.row.name }}
                <el-tag size="small">可选</el-tag>
              </template>
            </el-table-column>
            <el-table-column prop="id" label="标识符" />
            <el-table-column label="数据类型">
              <template #default="scope">
                {{ getDataType(scope.row.dataType) }}
              </template>
            </el-table-column>
            <el-table-column prop="mode" label="读写类型">
              <template #default="scope">
                {{ getMode(scope.row.mode) }}
              </template>
            </el-table-column>
            <el-table-column prop="define" label="数据定义" style="word-break:break-all;" />
            <el-table-column label="编辑">
              <template #default="scope">
                <el-button
                  size="small"
                  @click="edit(scope.row)"
                >编辑</el-button>
                <el-button
                  size="small"
                  type="danger"
                >删除</el-button>
              </template>
            </el-table-column>
          </el-table>
        </el-card>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-dialog v-model="dialogFromCustom" title="修改自定义功能" width="80%" :before-close="()=>closeDialog(1)">
          <templateFrom :temp="propertyForm" @save="dialogSave" @cancel="dialogCancel" />
        </el-dialog>
      </el-col>
    </el-row>
  </div>
</template>

<script setup>
import {
  getProductTemplate,
  manageProductTemplate
} from '@/api/things/productInfo'
import templateFrom from './templateForm.vue'
import { getDataType, getFuncTypeName, getMode, parseModelTemplate } from './templateHandle'
import { formatJson } from '../../../js/json'
import { ref } from 'vue'
import { useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import useClipboard from 'vue-clipboard3'
const route = useRoute()
const productInfo = ref(JSON.parse(route.query.productInfo))
const searchInfo = ref({ productID: productInfo.value.productID })
const metaTemplate = ref([
  {
    modelType: 'property',
    name: '蜂鸣',
    id: 'buzzing',
    dataType: 'int',
    mode: 'r',
    define: '',
    detail: {}
  }
])
const templateStr = ref('')

const dialogFromCustom = ref(false)
const closeDialog = (typ) => {
  console.log('closeDialog', typ)
  if (typ === 1) {
    dialogFromCustom.value = false
  }
}
const dialogSave = (value) => {
  console.log('dialogSave', 'old:', propertyForm.value, 'new:', value)
  dialogFromCustom.value = false
}
const dialogCancel = () => {
  console.log('dialogCancel')
  dialogFromCustom.value = false
}
const edit = (column) => {
  console.log('edit', column, metaTemplate.value)
  propertyForm.value = column.meta
  propertyForm.value.funcType = column.funcType
  console.log('edit init end', propertyForm.value)
  dialogFromCustom.value = true
}

const propertyForm = ref({
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
})

const dialogTempCheckVisible = ref(false)
const closeCheckDialog = () => {
  dialogTempCheckVisible.value = false
}
const CheckTemplateVisible = () => {
  dialogTempCheckVisible.value = true
}
const { toClipboard } = useClipboard()
const copyTemplate = async() => {
  try {
    await toClipboard(templateStr.value)
    ElMessage({
      type: 'success',
      message: '复制成功'
    })
  } catch (e) {
    console.error(e)
  }
}

const dialogTempModifyVisible = ref(false)
const closeModifyDialog = () => {
  dialogTempModifyVisible.value = false
  templateStrInput.value = ''
}
const ModifyTemplateVisible = () => {
  dialogTempModifyVisible.value = true
}

const templateStrInput = ref('')
const ModifyTemplate = async() => {
  console.log('ModifyTemplate')
  var res = await manageProductTemplate({
    info: {
      productID: productInfo.value.productID,
      template: templateStrInput.value
    }
  })
  templateStrInput.value = ''
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '修改成功'
    })
    getTableData()
  }
}

// 查询
const getTableData = async() => {
  const table = await getProductTemplate({ ...searchInfo.value })
  console.log('获取到:', table)
  if (table.code === 0) {
    templateStr.value = formatJson(table.data.template)
    metaTemplate.value = parseModelTemplate(JSON.parse(table.data.template))
    console.log('格式化后:', metaTemplate.value)
  }
}
getTableData()

</script>

<script>
import templateDetail from './TemplateDetail.vue'
export default {
  name: 'ProductTemplate',
  components: {
    templateDetail,
  },
  data() {
    return {
      tableData: [
        {
          funcType: '属性',
          name: 'Tom',
          id: 'fe',
          type: '字符串',
          mode: '读写',
          define: '字符串长度：0 - 2048个字符',
          tmps: [
            {
              name: 'Tom',
              id: 'fe',
              type: '字符串',
              define: '字符串长度：0 - 2048个字符',
            },
            {
              name: 'Tom',
              id: 'fe',
              type: '字符串',
              define: '字符串长度：0 - 2048个字符',
            }
          ]
        },
        {
          funcType: '属性',
          name: 'Tom',
          id: 'fe',
          type: '字符串',
          mode: '读写',
          define: '字符串长度：0 - 2048个字符',
          tmps: [
            {
              name: 'Tom',
              id: 'fe',
              type: '字符串',
              define: '字符串长度：0 - 2048个字符',
            },
            {
              name: 'Tom',
              id: 'fe',
              type: '字符串',
              define: '字符串长度：0 - 2048个字符',
            }
          ]
        },
        {
          funcType: '属性',
          name: 'Tom',
          id: 'fe',
          type: '字符串',
          mode: '读写',
          define: '字符串长度：0 - 2048个字符',
          tmps: [
            {
              name: 'Tom',
              id: 'fe',
              type: '字符串',
              define: '字符串长度：0 - 2048个字符',
            },
            {
              name: 'Tom',
              id: 'fe',
              type: '字符串',
              define: '字符串长度：0 - 2048个字符',
            }
          ]
        },
        {
          funcType: '属性',
          name: 'Tom',
          id: 'fe',
          type: '字符串',
          mode: '读写',
          define: '字符串长度：0 - 2048个字符',
          tmps: [
            {
              name: 'Tom',
              id: 'fe',
              type: '字符串',
              define: '字符串长度：0 - 2048个字符',
            },
            {
              name: 'Tom',
              id: 'fe',
              type: '字符串',
              define: '字符串长度：0 - 2048个字符',
            }
          ]
        }
      ],
    }
  },
}
</script>

<style>
.tempJson{
  font-family: SFMono-Regular,Consolas,"Liberation Mono",Menlo,Courier,monospace;
/*letter-spacing:5px;*/
  line-height: 20pt;
white-space: pre-wrap

}
</style>
