<template>
  <div>
    <el-row>
      <el-col>
        <el-date-picker
            v-model="timeRange"
            type="datetimerange"
            range-separator="To"
            start-placeholder="Start date"
            end-placeholder="End date"
        >
        </el-date-picker>
      </el-col>
    </el-row>
    <el-row>
      <el-col>
        <el-table :data="tableData" border style="width: 100%">
          <el-table-column prop="time" label="时间" width="180" />
          <el-table-column prop="action" label="操作类型" width="180" />
          <el-table-column prop="requestID" label="RequestID" />
          <el-table-column prop="payload" label="内容" />
          <el-table-column prop="result" label="结果" />
        </el-table>
      </el-col>
    </el-row>
  </div>
</template>
<script setup>
import { ref } from 'vue'
const timeRange = ref([
  new Date(2000, 10, 10, 10, 10),
  new Date(2000, 10, 11, 10, 10),
])
const tableData = ref('')
</script>

<script>
export default {
  name: 'ListHubLog'
}
</script>
