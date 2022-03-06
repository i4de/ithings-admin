<template>
  <div>
    <div class="search-term">
      <el-row justify="">
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
              <el-button slot="reference" icon="el-icon-delete" size="mini" type="danger" style="margin-left: 10px;">批量删除</el-button>
            </el-popover>
          </el-form-item>
        </el-form>
      </el-row>

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
      <el-table-column label="设备名称" prop="deviceName" width="120">
        <template #default="scope">
          <el-button :plain="true" type="text" @click="goInDevice(scope.row)">{{ scope.row.deviceName }}</el-button>
        </template>
      </el-table-column>
      <el-table-column label="设备秘钥" prop="secret" width="120" />
      <el-table-column label="固件版本" prop="version" width="120" />
      <el-table-column label="日志级别" width="120">
        <template #default="scope">{{ LogLevelArr[scope.row.logLevel] }}</template>
      </el-table-column>
      <el-table-column label="激活时间" prop="firstLogin" width="120">
        <template #default="scope">{{ fmtDate(scope.row.firstLogin) }}</template>
      </el-table-column>
      <el-table-column label="最后上线时间" prop="lastLogin" width="120">
        <template #default="scope">{{ fmtDate(scope.row.lastLogin) }}</template>
      </el-table-column>
      <el-table-column label="创建时间" prop="createdTime" width="120">
        <template #default="scope">{{ fmtDate(scope.row.createdTime) }}</template>
      </el-table-column>
      <el-table-column label="按钮组">
        <template #default="scope">
          <el-button size="small" type="primary" icon="el-icon-edit" class="table-button" @click="updateDeviceInfo(scope.row)">变更</el-button>
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
    <el-dialog v-model="dialogFormVisible" :before-close="closeDialog" title="弹窗操作">
      <el-form :model="formData" label-position="right" label-width="80px">
        <el-form-item label="设备名称:">
          <el-input v-model="formData.deviceName" />
        </el-form-item>
        <el-form-item label="固件版本:">

          <el-input v-model="formData.version" clearable placeholder="请输入" />
        </el-form-item>

        <el-form-item label="日志级别:">
          <el-select v-model="formData.logLevel" placeholder="请选择" clearable="true">
            <el-option
              v-for="item in LogLevel"
              :key="item.value"
              :label="item.label"
              :value="item.value"
            />
          </el-select>
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
import {
  findDeviceInfo,
  getDeviceInfoList,
  manageDeviceInfo
} from '@/api/things/deviceInfo' //  此处请自行替换地址
import * as vars from '@/view/things/device/vars'
import { useRoute, useRouter } from 'vue-router'
import { ElMessage, ElMessageBox } from 'element-plus'
import { fmtDate } from '../../js/utils'
import { ref } from 'vue'
const formData = ref({
  deviceName: '',
  version: '',
  logLevel: ''
})
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])
const route = useRoute()
const productInfo = ref(JSON.parse(route.query.productInfo))
console.log(productInfo)
const searchInfo = ref({ productID: productInfo.value.productID })
const LogLevelArr = ref(vars.LogLevel)
const LogLevel = ref(vars.fmtData(vars.LogLevel))
// 行为控制标记（弹窗内部需要增还是改）
const type = ref('')
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
const multipleSelection = ref([])
const handleSelectionChange = (val) => {
  multipleSelection.value = val
}
const deleteRow = (row) => {
  ElMessageBox.confirm('确定要删除吗?', '提示', {
    confirmButtonText: '确定',
    cancelButtonText: '取消',
    type: 'warning'
  }).then(() => {
    deleteDeviceInfo(row)
  })
}

const onDelete = async() => {
  console.log('onDelete')
}

// 弹窗控制标记
const dialogFormVisible = ref(false)
const updateDeviceInfo = async(row) => {
  const res = await findDeviceInfo({ productID: row.productID,
    deviceName: row.deviceName })
  type.value = vars.UPDATE
  if (res.code === 0) {
    formData.value = res.data.deviceInfo
    dialogFormVisible.value = true
  }
}
const closeDialog = () => {
  dialogFormVisible.value = false
  formData.value = {
    productID: '',
    deviceName: '',
    version: '',
    logLevel: 0
  }
}
const deleteDeviceInfo = async(row) => {
  console.log('deleteDeviceInfo')
  var res = await manageDeviceInfo({
    opt: vars.DELETE,
    info: row
  })
  if (res.code === 0) {
    ElMessage({
      type: 'success',
      message: '删除成功'
    })
    getTableData()
  }
}
const enterDialog = async() => {
  formData.value.productID = productInfo.value.productID
  if (formData.logLevel === '') {
    formData.value.logLevel = 0
  }
  var res = await manageDeviceInfo({
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
const openDialog = () => {
  type.value = vars.INSERT
  dialogFormVisible.value = true
}

// 查询
const getTableData = async() => {
  const table = await getDeviceInfoList({ page: page.value, pageSize: pageSize.value, ...searchInfo.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}
const router = useRouter()
const goInDevice = async(device) => {
  console.log('goInDevice', device)
  const deviceInfo = JSON.stringify(device)
  await router.push({ name: 'deviceDetail',
    query: { productInfo: route.query.productInfo, deviceInfo: deviceInfo }})
}

getTableData()

</script>
<style>
</style>
