<template>
  <el-table :data="tmps" style="width: 100%">
    <el-table-column prop="name" label="功能名称" />
    <el-table-column prop="id" label="标识符" />
    <el-table-column prop="dataType" label="数据类型">
      <template #default="scope">
        {{ getDataType(scope.row.dataType) }}
      </template>
    </el-table-column>
    <el-table-column prop="define" label="数据定义" />
  </el-table>
</template>

<script setup>
import { getDataType } from './templateHandle'

</script>
<script>
export default {
  props: {
    tmps: {
      type: Array,
      require: true
    },
  }
}
</script>
