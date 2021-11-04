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

<script>
import {
  manageProductInfo,
  findProductInfo,
  getProductInfoList
} from '@/api/things/productInfo'
import { formatTimeToStr } from '@/utils/date'
import infoList from '@/mixins/infoList'
import * as vars from '@/view/things/device/vars'
export default {
  name: 'ProductInfo',
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
      listApi: getProductInfoList,
      dialogFormVisible: false,
      type: '',
      deleteVisible: false,
      multipleSelection: [],
      AutoRegisterArr: [],
      AutoRegister: [{
        value: 0,
        label: '未定义'
      }],
      DataProtoArr: [],
      DataProto: [{
        value: 0,
        label: '未定义'
      }],
      NetTypeArr: [],
      NetType: [{
        value: 0,
        label: '未定义'
      }],
      DeviceTypeArr: [],
      DeviceType: [{
        value: 0,
        label: '未定义'
      }],
      AuthModeArr: [],
      AuthMode: [{
        value: 0,
        label: '未定义'
      }],
      formData: {
        productName: '',
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
      console.log(values)
      var ret = []
      for (var k = 1, length = values.length; k < length; k++) {
        ret.push({
          value: k,
          label: values[k]
        })
      }
      console.log(ret)
      return ret
    },
    fmtDate(time) {
      var unixTimestamp = new Date(time * 1000)
      return unixTimestamp.toLocaleString()
    },
    onSubmit() { // 条件搜索前端看此方法
      this.page = 1
      this.pageSize = 10
      this.getTableData()
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
        this.deleteProductInfo(row)
      })
    },
    async onDelete() {
      console.log('onDelete')
    },
    async goInProduct(proeduct) {
      console.log('productID=' + proeduct.productID)
      const productInfo = encodeURIComponent(JSON.stringify(proeduct))
      await this.$router.push({ name: 'deviceInfo', query: { productInfo: productInfo }})
    },
    async updateProductInfo(row) {
      const res = await findProductInfo({ productID: row.productID })
      this.type = vars.UPDATE
      if (res.code === 0) {
        this.formData = res.data.productInfo
        this.dialogFormVisible = true
      }
    },
    closeDialog() {
      this.dialogFormVisible = false
      this.formData = {
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
    },
    async deleteProductInfo(row) {
      console.log('deleteProductInfo')
      var res = await manageProductInfo({
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
      var res = await manageProductInfo({
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
      this.type = vars.INSERT
      this.dialogFormVisible = true
    }
  }
}
</script>

<style>
</style>
