<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
    v-model="selected"
  >
    <!-- 顶部插槽 -->
    <template v-slot:top>
      <!-- 表格头部区域 -->
      <v-toolbar
        flat
        > 
      <!-- 标题 -->
        <v-toolbar-title>测试记录列表</v-toolbar-title>
        <!-- 标题旁边的垂直分割线 -->
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <!-- 占满剩余空间 -->
        <v-spacer></v-spacer>
         
      </v-toolbar>
    </template >
    <!-- 添加一个报告的插槽 -->
    <template v-slot:[`item.record`]="{item}">
        <!-- <span v-for="i in item.testcases" :key="i.id">{{i.name}}｜</span> -->
        <a :href="item.report" target="_blank">{item.report}</a>

    </template>
    <!-- 操作列插槽 -->
    
    <!-- 无数据插槽 -->
    <template v-slot:no-data>
      <v-btn
        color="primary"
        @click="initialize"
      >
        刷新
      </v-btn>
    </template>
  </v-data-table>
</template>
<script>
  export default {
    data: () => ({
      // 删除弹框是否展示
      dialog: false,
          // 数据表头
      headers: [
        { text: '记录ID',align:'start',sortable:false, value: 'id' },
        { text: '计划ID', value: 'plan_id' },
        { text: '报告地址', value: 'report' },
        { text: '创建时间', value: 'create_time', sortable: false },
      ],
      // 数据源
      desserts: [],
     
    }),
    
  // 生命周期函数
    created () {
      this.initialize()
    },
  // 方法
    methods: {
      // 初始化数据
      initialize () {
        this.$api.record.getRcord().then((result) => {
            console.log("Record.vue页面初始化的result",result)
            // 接口数据赋值给表格
            this.desserts = result.data.data
        }).catch((err) => {
            console.log("Record.vue页面初始化用例error",err)
        });
      },
    },
  }
</script>