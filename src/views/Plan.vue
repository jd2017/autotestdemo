<template>
<div>
    <!-- 添加一个新的弹框 -->
 <v-dialog
      v-model="dialog"
      width="500"
    >
    <!-- 添加一个表格 -->
    <v-data-table
    :headers="recordHeaders"
    :items="recordDesserts"
    :items-per-page="5"
    class="elevation-1"
  ></v-data-table>
      
    </v-dialog>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <!-- 顶部插槽 -->
    <template v-slot:top>
      <!-- 表格头部区域 -->
      <v-toolbar
        flat
        > 
      <!-- 标题 -->
        <v-toolbar-title>测试计划列表</v-toolbar-title>
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
    <!-- 添加一个关联用例的插槽 -->
    <template v-slot:[`item.testcases`]="{item}">

        [<span v-for="i in item.testcases" :key="i.id">
          {{i.name}}
          <span v-if="index !== item.testcases.length-1">,</span>
        </span>
        ]

    </template>
    <!-- 操作列插槽 -->
    <template v-slot:[`item.actions`]="{ item }">
        <!-- 修改 -->
        <v-btn small color="success" class="mr-2" @click="buildPlan(item)">执行记录</v-btn>
        <v-btn small color="primary" class="mr-2" @click="getRecord(item)">历史记录</v-btn>
        <v-btn small color="warning" class="mr-2" @click="deletePlan(item)">删除记录</v-btn>

    </template>
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
  </div>
</template>
<script>
  export default {
    data: () => ({
      // 删除弹框是否展示
      dialog: false,
       // 数据表头
      recordHeaders: [
        { text: '记录ID',align:'start',sortable:false, value: 'id' },
        { text: '报告地址', value: 'report' },
        { text: '创建时间', value: 'create_time', sortable: false },
      ],
      // 数据源
      recordDesserts: [],

        // 数据表头
      headers: [
        { text: '计划ID',align:'start',sortable:false, value: 'id' },
        { text: '计划名称', value: 'name' },
        { text: '关联用例', value: 'testcases' },
        { text: '操作', value: 'actions', sortable: false },
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
        this.$api.plan.getPlan().then((result) => {
            console.log("Plan.vue页面初始化的result",result)
            // 接口数据赋值给表格
            this.desserts = result.data.data
        }).catch((err) => {
            console.log("Plan.vue页面初始化用例error",err)
        });
      },
      buildPlan(item){
        this.$api.record.addRecord({'plan_id':item.id}).then((result) => {
            console.log("Plan.vue页面执行计划",result.data)
        }).catch((err) => {
            console.log("Plan.vue页面异常处理",err)
        });
      },
      getRecord(item){
        this.$api.record.getRecord({'plan_id':item.id}).then((result) => {
            console.log("Plan.vue页面获取记录的result",result)
            // 接口数据赋值给表格
            this.recordDesserts = result.data.data
        }).catch((err) => {
            console.log("Plan.vue页面初始化用例error",err)
        });
        this.dialog = true;
      },
      deletePlan(item){
        this.$api.plan.deletePlan({'id':item.id}).then((result) => {
            console.log("Plan.vue页面删除后result",result)
            // 删除后的初始化操作
            if(result.data.code===0){
                this.initialize
            }
        }).catch((err) => {
            console.log("Plan.vue页面初始化用例error",err)
        });
        this.dialog = true;
      }
    },
  }
</script>