<template>
  <div>
    <div class="search-term">
      <el-row justify="center">
        <el-col :span="12">
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
        </el-col>
        <el-col :span="4">产品名称:{{productInfo.productName}}</el-col>
        <el-col :span="4">产品ID:{{productInfo.productID}}</el-col>
        <el-col :span="4"></el-col>
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
      <el-table-column label="设备名称" prop="deviceName" width="120" />
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

<script>
import {
  findDeviceInfo,
  getDeviceInfoList,
  manageDeviceInfo
} from '@/api/things/deviceInfo' //  此处请自行替换地址
import { formatTimeToStr } from '@/utils/date'
import infoList from '@/mixins/infoList'
import * as vars from '@/view/things/device/vars'
export default {
  name: 'DeviceInfo',
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
      listApi: getDeviceInfoList,
      dialogFormVisible: false,
      type: '',
      deleteVisible: false,
      multipleSelection: [],
      productInfo: {},
      LogLevelArr: [],
      LogLevel: [{
        value: 0,
        label: '不修改'
      }],
      formData: {
        deviceName: '',
        version: '',
        logLevel: 0
      }
    }
  },
  async created() {
    console.log('created deviceInfo')
    this.productInfo = JSON.parse(decodeURIComponent(this.$route.query.productInfo))
    console.log(this.productInfo)
    this.searchInfo.productID = this.productInfo.productID
    await this.getTableData()
    this.fmtAllData()
  },
  methods: {
    // 条件搜索前端看此方法
    onSubmit() {
      this.page = 1
      this.pageSize = 10
      this.getTableData()
    },
    fmtAllData() {
      this.LogLevel = this.fmtData(vars.LogLevel)
      this.LogLevelArr = vars.LogLevel
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
    handleSelectionChange(val) {
      this.multipleSelection = val
    },
    deleteRow(row) {
      this.$confirm('确定要删除吗?', '提示', {
        confirmButtonText: '确定',
        cancelButtonText: '取消',
        type: 'warning'
      }).then(() => {
        this.deleteDeviceInfo(row)
      })
    },
    async onDelete() {
      console.log('onDelete')
    },
    async updateDeviceInfo(row) {
      const res = await findDeviceInfo({ productID: row.productID, deviceName: row.deviceName })
      this.type = vars.UPDATE
      if (res.code === 0) {
        this.formData = res.data.deviceInfo
        this.dialogFormVisible = true
      }
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.formData = {
        productID: '',
        deviceName: '',
        version: '',
        logLevel: 0
      }
    },
    async deleteDeviceInfo(row) {
      console.log('deleteDeviceInfo')
      var res = await manageDeviceInfo({
        opt: vars.DELETE,
        info: row
      })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '删除成功'
        })
        this.getTableData()
      }
    },
    async enterDialog() {
      this.formData.productID = this.productInfo.productID
      if (this.formData.logLevel === '') {
        this.formData.logLevel = 0
      }
      var res = await manageDeviceInfo({
        opt: this.type,
        info: this.formData
      })
      if (res.code === 0) {
        this.$message({
          type: 'success',
          message: '创建/更改成功'
        })
        this.closeDialog()
        this.getTableData()
      }
    },
    openDialog() {
      this.type = 'create'
      this.dialogFormVisible = true
    },
    fmtDate(time) {
      if (time === '0') {
        return ''
      }
      var unixTimestamp = new Date(time * 1000)
      return unixTimestamp.toLocaleString()
    }
  }
}
</script>

<style>
</style>
