<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
    v-model="selected"
    show-select
  >
    <!-- 顶部插槽 -->
    <template v-slot:top>
      <!-- 表格头部区域 -->
      <v-toolbar
        flat
      > 
      <!-- 标题 -->
        <v-toolbar-title>测试用例列表</v-toolbar-title>
        <!-- 标题旁边的垂直分割线 -->
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <!-- 占满剩余空间 -->
        <v-spacer></v-spacer>
         <!-- 创建计划计划弹框 -->
        <v-dialog
          v-model="dialogPlan"
          max-width="500px"
        >
        <!-- 右侧按钮区域 -->
          <template v-slot:activator="{ on, attrs }">
            <!-- 修改color颜色 和 添加右边距 mr-2 -->
            <v-btn
              color="success"
              dark
              class="mb-2 mr-2"
              v-bind="attrs"
              v-on="on"
            >
              创建计划
            </v-btn>
          </template>
          <!-- 新增修改的卡片 -->
          <v-card>
            <!-- 卡片标题 -->
            <v-card-title>
              <span class="text-h5">创建计划名称</span>
            </v-card-title>
            <!-- 卡片输入框 -->
            <v-card-text>
              <v-container>
                <v-text-field v-model="planName" label=" 创建计划内容"></v-text-field>
              </v-container>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="savePlan"
              >
                保存测试计划
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- 新增修改弹框 -->
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
        <!-- 右侧按钮区域 -->
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              dark
              class="mb-2"
              v-bind="attrs"
              v-on="on"
            >
              新增用例
            </v-btn>
          </template>
          <!-- 新增修改的卡片 -->
          <v-card>
            <!-- 卡片标题 -->
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>
            <!-- 卡片内容区 -->
            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                  <!-- 卡片输入框 -->
                    <v-text-field disabled v-if="editedItem.id"
                      v-model="editedItem.id"
                      label="ID"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.caseTitle"
                      label="用例名称"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.method"
                      label="方法"
                    ></v-text-field>
                  </v-col>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.step"
                      label="步骤"
                    ></v-text-field>
                  </v-col>

                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.path"
                      label="路径"
                    ></v-text-field>
                  </v-col>
                
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
                      v-model="editedItem.remark"
                      label="备注"
                    ></v-text-field>
                  </v-col>
                </v-row>
              </v-container>
            </v-card-text>
            <!-- 卡片操作 -->
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn
                color="blue darken-1"
                text
                @click="close"
              >
                取消
              </v-btn>
              <v-btn
                color="blue darken-1"
                text
                @click="save"
              >
                保存
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
        <!-- 删除弹框 -->
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <!-- 删除卡片标题 -->
            <v-card-title class="text-h5">你确定要删除这一行吗?</v-card-title>
            <v-card-actions>
              <!-- 弹框下面取消和确定按钮，左侧铺满 -->
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <!-- 操作列插槽 -->
    <template v-slot:[`item.actions`]="{ item }">
      <!-- 修改 -->
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <!-- 删除 -->
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
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
</template>
<script>
  export default {
    data: () => ({
      // 新增修改弹框是否展示
      dialog: false,
      // 新增删除弹框是否展示
      dialogDelete: false,
      //创建计划名称
       dialogPlan: false,
      //创建计划名称
      planName: '',
      // 勾选的用例
      selected:[],
      // 数据表头
      headers: [
        {
          text: 'ID',
          align: 'start',
          sortable: false,
          value: 'id',
        },
        { text: '标题', value: 'caseTitle' },
        { text: '方法', value: 'method' },
        { text: '步骤', value: 'step' },
        { text: '路径', value: 'path' },
        { text: '备注', value: 'remark' },
        { text: '操作', value: 'actions', sortable: false },
      ],
      // 数据源
      desserts: [],
      // 弹框类型
      editedIndex: -1,
      // 修改表单数据
      editedItem: {
        id: '',
        caseTitle: '',
        method:'',
        step:'',
        path:'',
        remark: ''
      },
      // 默认表单数据
      defaultItem: {
        id: '',
        caseTitle: '',
        method:'',
        step:'',
        path:'',
        remark: ''
      },
    }),
    // 计算属性
    computed: {
      formTitle () {
        // 三元表达判断弹框类型
        return this.editedIndex === -1 ? '新增用例' : '编辑用例'
      },
    },
    // 侦听器
    watch: {
      dialog (val) {
        // 侦听新增修改弹框，为真时展开弹框，否则关闭
        val || this.close()
      },
      // 侦听删除修改弹框，为真时展开弹框，否则关闭
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },
  // 生命周期函数
    created () {
      this.initialize()
    },
  // 方法
    methods: {
      // 初始化数据
      initialize () {
        this.$api.testcase.getTestCase().then((result) => {
            console.log("TestCase.vue页面初始化的result",result)
            this.desserts = result.data.data
        }).catch((err) => {
            console.log("TaseCase.vue页面初始化用例error",err)
        });
      },
      // 编辑列表项
      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },
      // 删除列表项
      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },
      // 删除弹框确认操作
      deleteItemConfirm () {
        // this.desserts.splice(this.editedIndex, 1)
        console.log("ID",this.editedItem.id)
        this.$api.testcase.deleteTestCase({
            'id':this.editedItem.id
            }).then((result) => {
                console.log('删除返回结果：',result)
                if (result.data.code === 0) {
                    this.initialize()
                } else {
                    console.log("用例删除失败",result)
                }
        }).catch((err) => {
                console.log("用例删除err",err)
        });
        this.closeDelete()
      },
      // 关闭新增用例修改弹框
      close () {
        this.dialog = false
        // 等待vue实例更新视图后在执行
        this.$nextTick(() => {
          // 表单数据初始化
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },
    // 关闭删除用例弹框
      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
            console.log('点击修改用例编辑')
        //   Object.assign(this.desserts[this.editedIndex], this.editedItem)
          this.$api.testcase.updateTestCase(this.editedItem).then((result) => {
            if(result.data.code === 0){
                this.initialize()
            }else{
                console.log("updatecase返回",result)
            }
          }).catch((err) => {
            console.log("用例更新err",err)
          });
        } else {
            console.log("点击用例新增操作");
             //新增用例
            //  const valuesArray = Object.values(data)
            // 结构赋值
            const {id,...newEditedItem } = this.editedItem
          this.$api.testcase.addTestCase(newEditedItem).then((result) => {
            if(result.data.code == 0){
                this.initialize()
            }else{
                console.log("用例新增返回失败",result)
            }
          }).catch((err) => {
            console.log("用例新增失败err",err)
          });
        }
        this.close()
      },
      savePlan(){
        console.log('this.selected',this.selected)
        const ids =this.selected.map( (item) => item.id)
        this.$api.plan.addPlan({'name':this.planName,'testcase_ids':ids}).then((result) => {
            if(result.data.code === 0){
                console.log('新增计划result：',result.data)
            }else{
                console.log("updatecase返回",result)
            }
          }).catch((err) => {
            console.log("用例更新err",err)
          })
          // 新增完成后初始化操作
          this.planName='';
          this.selected=[];
          this.dialogPlan=false;


      }
    },
  }
</script>