<template>
  <div>
    <div class="search-term">
      <el-form :inline="true" :model="searchInfo" class="demo-form-inline">
        <el-form-item>
          <el-button size="mini" type="primary" icon="el-icon-search" @click="onSubmit">查询</el-button>
          <el-button size="mini" type="primary" icon="el-icon-plus" @click="openDialog">新增</el-button>
          <el-popover v-model="deleteVisible" placement="top" width="160">
            <p>确定要删除吗？</p>
            <div style="text-align: right; margin: 0">
              <el-button size="mini" type="text" @click="deleteVisible = false">取消</el-button>
              <el-button size="mini" type="primary" @click="onDelete">确定</el-button>
            </div>
          </el-popover>
        </el-form-item>
      </el-form>
    </div>
    <el-table
      ref="multipleTable"
      border
      stripe
      style="width: 100%"
      tooltip-effect="dark"
      :data="tableData"
      @selection-change="handleSelectionChange"
    >
      <el-table-column label="产品名称" prop="productName" width="120">
        <template #default="scope">
          <el-button :plain="true" type="text" @click="goInProduct(scope.row)">{{ scope.row.productName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="产品ID" prop="productID" width="120" />
      <el-table-column label="认证方式" width="120">
        <template #default="scope">{{ AuthModeArr[scope.row.authMode] }}</template>
      </el-table-column>
      <el-table-column label="设备类型" prop="deviceType" width="120">
        <template #default="scope">{{ DeviceTypeArr[scope.row.deviceType] }}</template>
      </el-table-column>
      <el-table-column label="产品品类" prop="categoryID" width="120" />
      <el-table-column label="通讯方式" width="120">
        <template #default="scope">{{ NetTypeArr[scope.row.netType] }}</template>
      </el-table-column>
      <el-table-column label="数据协议" width="120">
        <template #default="scope">{{ DataProtoArr[scope.row.dataProto] }}</template>
      </el-table-column>
      <el-table-column label="动态注册" width="120">
        <template #default="scope">{{ AutoRegisterArr[scope.row.autoRegister] }}</template>
      </el-table-column>
      <el-table-column label="描述" prop="description" width="120" />
      <el-table-column label="创建日期" width="180">
        <template #default="scope">{{ fmtDate(scope.row.createdTime) }}</template>
      </el-table-column>
      <el-table-column label="按钮组">
        <template #default="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" class="table-button" @click="updateProductInfo(scope.row)">变更</el-button>
          <el-button type="danger" icon="el-icon-delete" size="mini" @click="deleteRow(scope.row)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
    <el-pagination
      layout="total, sizes, prev, pager, next, jumper"
      :current-page="page"
      :page-size="pageSize"
      :page-sizes="[10, 30, 50, 100]"
      :style="{float:'right',padding:'20px'}"
      :total="total"
      @current-change="handleCurrentChange"
      @size-change="handleSizeChange"
    />
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="新增/修改">
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="产品名称:">
          <el-input v-model="formData.productName" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="认证方式:">
          <el-select v-model="formData.authMode" placeholder="请选择">
            <el-option
              v-for="item in AuthMode"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="设备类型:">
          <el-select v-model="formData.deviceType" placeholder="请选择">
            <el-option
              v-for="item in DeviceType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="产品品类:">
          <el-input v-model.number="formData.categoryID" clearable placeholder="请输入" />
        </el-form-item>
        <el-form-item label="通讯方式:">
          <el-select v-model="formData.netType" placeholder="请选择">
            <el-option
              v-for="item in NetType"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="数据协议:">
          <el-select v-model="formData.dataProto" placeholder="请选择">
            <el-option
              v-for="item in DataProto"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="动态注册:">
          <el-select v-model="formData.autoRegister" placeholder="请选择">
            <el-option
              v-for="item in AutoRegister"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
        </el-form-item>
        <el-form-item label="描述:">
          <el-input v-model="formData.description" clearable placeholder="请输入" />
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="closeDialog">取 消</el-button>
        <el-button type="primary" @click="enterDialog">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script setup>
import {  useRouter } from 'vue-router'
import {ElMessage, ElMessageBox} from 'element-plus'
import {fmtDate} from "../../js/utils";
import * as vars from '@/view/things/device/vars'
import {
  manageProductInfo,
  findProductInfo,
  getProductInfoList
} from '@/api/things/productInfo'
import { ref } from 'vue'
const formData = ref({
  productName: '',
  authMode: 1,
  deviceType: 1,
  categoryID: '',
  netType: 1,
  dataProto: 1,
  autoRegister: 1,
  secret: '',
  description: ''
})
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const searchInfo = ref({})
// 搜索
const onSubmit = () => {
  page.value = 1
  pageSize.value = 10
  getTableData()
}
// 分页
const handleSizeChange = (val) => {
  pageSize.value = val
  getTableData()
}

// 修改页面容量
const handleCurrentChange = (val) => {
  page.value = val
  getTableData()
}
// 查询
const getTableData = async() => {
  const table = await getProductInfoList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}
getTableData()

// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')

const AutoRegisterArr=ref(vars.AutoRegister)
const AutoRegister= ref(vars.fmtData(vars.AutoRegister))
const DataProtoArr= ref(vars.DataProto)
const   DataProto=ref(vars.fmtData(vars.DataProto))
const  NetTypeArr= ref(vars.NetType)
const   NetType=ref(vars.fmtData(vars.NetType))
const   DeviceTypeArr= ref(vars.DeviceType)
const  DeviceType=ref(vars.fmtData(vars.DeviceType))
const   AuthModeArr=ref(vars.AuthMode)
const  AuthMode=ref(vars.fmtData(vars.AuthMode))


const multipleSelection=ref([])
const handleSelectionChange= (val)=> {
  multipleSelection.value = val
}
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    this.deleteProductInfo(row)
  })
}
const onDelete = async()=> {
  console.log('onDelete')
}
const router = useRouter()
const goInProduct= async(proeduct)=> {
  console.log('productID=' + proeduct.productID)
  const productInfo = JSON.stringify(proeduct)
  await router.push({ name: 'productDetail', query: { productInfo: productInfo }})
}

// 弹窗控制标记
const dialogFormVisible = ref(false)
const updateProductInfo= async(row)=> {
  const res = await findProductInfo({ productID: row.productID })
  type.value = vars.UPDATE
  if (res.code === 0) {
    formData.value = res.data.productInfo
    dialogFormVisible.value = true
  }
}
const closeDialog=()=> {
  dialogFormVisible.value = false
  formData.value = {
    productName: '',
    productID: '',
    authMode: 0,
    deviceType: 0,
    categoryID: 0,
    netType: 0,
    dataProto: 0,
    autoRegister: 0,
    secret: '',
    description: ''
  }
}
const deleteProductInfo= async(row)=> {
  console.log('deleteProductInfo')
  var res = await manageProductInfo({
    opt: vars.DELETE,
    info: row
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '创建/更改成功'
    })
    getTableData()
  }
}
const enterDialog=async()=> {
  var res = await manageProductInfo({
    opt: type.value,
    info: formData.value
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '创建/更改成功'
    })
    closeDialog()
    getTableData()
  }
}
const openDialog=()=> {
  type.value = vars.INSERT
  dialogFormVisible.value = true
}


</script>

<script>
export default {
  name: 'ProductInfo'
}
</script>

<style>
</style>
