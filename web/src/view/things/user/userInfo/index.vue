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
      @expand-change="expandChange"
    >
      <el-table-column type="expand">
        <template #default="props">
          <p>昵称:{{ props.row.userInfo.nickName }}</p>
          <p>国家:{{ props.row.userInfo.country }}</p>
          <p>城市:{{ props.row.userInfo.city }}</p>
          <p>省份:{{ props.row.userInfo.province }}</p>
          <p>邀请码:{{ props.row.userInfo.inviterId }}</p>
          <p>邀请人id:{{ props.row.userInfo.inviterUid }}</p>
          <p>语言:{{ props.row.userInfo.language }}</p>
          <p>性别:{{ props.row.userInfo.sex }}</p>
        </template>
      </el-table-column>
      <el-table-column label="用户ID" prop="uid" width="120" />
      <el-table-column label="用户名" prop="userName" width="120" />
      <el-table-column label="邮箱" prop="email" width="120" />
      <el-table-column label="手机号" prop="phone" width="120" />
      <el-table-column label="微信unionID" prop="wechat" width="120" />
      <el-table-column label="最近登录ip" prop="lastIP" width="120" />
      <el-table-column label="注册ip" prop="regIP" width="120" />
      <el-table-column label="用户状态" prop="status" width="120" />
      <el-table-column label="创建日期" width="180">
        <template #default="scope">{{ fmtDate(scope.row.createdTime) }}</template>
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
  </div>
</template>

<script setup>
import {
  getUserCoreList,
  getUserInfos
} from '@/api/things/userInfo'
// import * as vars from '@/view/things/device/vars'
// import { useRoute } from 'vue-router'
// import { ElMessage, ElMessageBox } from 'element-plus'
import { fmtDate } from '../../js/utils'
import { ref } from 'vue'
// const formData = ref({
//   uid: '',
//   userName: '',
//   email: '',
//   phone: '',
//   wechat: '',
//   lastIP: '',
//   regIP: '',
//   country: '',
//   city: '',
//   createdTime: '',
//   status: '',
// })
const page = ref(1)
const total = ref(0)
const pageSize = ref(10)
const tableData = ref([])

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
const onDelete = async() => {
  console.log('onDelete')
}

const expandChange = async(row, expanded) => {
  console.log('expandChange|row=' + row.uid + '|expanded=' + expanded.length)
  if (expanded.length === 0 || row.userInfo) {
    return
  }
  const data = {
    uid: [row.uid]
  }
  const resp = await getUserInfos(data)
  if (resp.code !== 0) {
    return
  }
  row.userInfo = resp.data.list[0]
}

// 查询
const getTableData = async() => {
  const table = await getUserCoreList({ page: page.value, pageSize: pageSize.value })
  if (table.code === 0) {
    tableData.value = table.data.list
    total.value = table.data.total
    page.value = table.data.page
    pageSize.value = table.data.pageSize
  }
}
getTableData()

</script>

<script>
export default {
  name: 'UserInfo'
}
</script>

<style>
</style>
