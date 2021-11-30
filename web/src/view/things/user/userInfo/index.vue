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

<script>
import {
  getUserCoreList,
  getUserInfos
} from '@/api/things/userInfo'
import { formatTimeToStr } from '@/utils/date'
import infoList from '@/mixins/infoList'
import * as vars from '@/view/things/device/vars'
export default {
  name: 'UserInfo',
  filters: {
    formatDate: function(time) {
      if (time !== null && time !== '') {
        var date = new Date(time)
        return formatTimeToStr(date, 'yyyy-MM-dd hh:mm:ss')
      } else {
        return ''
      }
    },
    formatBoolean: function(bool) {
      if (bool != null) {
        return bool ? '是' : '否'
      } else {
        return ''
      }
    }
  },
  mixins: [infoList],
  data() {
    return {
      listApi: getUserCoreList,
      formData: {
        uid: '',
        userName: '',
        password: '',
        email: '',
        phone: '',
        wechat: '',
        lastIP: '',
        regIP: '',
        createdTime: '',
        status: 0,
      }
    }
  },
  async created() {
    await this.getTableData()
    this.fmtAllData()
  },
  beforeCreate() {
    console.log('beforeCreate')
  },
  methods: {
    fmtAllData() {
      this.AutoRegister = this.fmtData(vars.AutoRegister)
      this.DataProto = this.fmtData(vars.DataProto)
      this.NetType = this.fmtData(vars.NetType)
      this.DeviceType = this.fmtData(vars.DeviceType)
      this.AuthMode = this.fmtData(vars.AuthMode)

      this.AutoRegisterArr = vars.AutoRegister
      this.DataProtoArr = vars.DataProto
      this.NetTypeArr = vars.NetType
      this.DeviceTypeArr = vars.DeviceType
      this.AuthModeArr = vars.AuthMode
    },
    fmtData(values) {
      var ret = []
      for (var k = 1, length = values.length; k < length; k++) {
        ret.push({
          value: k,
          label: values[k]
        })
      }
      return ret
    },
    fmtDate(time) {
      var unixTimestamp = new Date(time * 1000)
      return unixTimestamp.toLocaleString()
    },
    async expandChange(row, expanded) {
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
    },
    async getUserInfos(uid) {
      const data = {
        uid: [uid]
      }
      const resp = await getUserInfos(data)
      console.log(resp)
      return resp.data
    },
    onSubmit() { // 条件搜索前端看此方法
      this.page = 1
      this.pageSize = 10
      this.getTableData()
    },
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    async onDelete() {
      console.log('onDelete')
    },
  }
}
</script>

<style>
</style>
