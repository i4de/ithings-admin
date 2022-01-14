<template>
  <div>
    <el-card class="box-card">
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
  </div>
</template>

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

</style>
