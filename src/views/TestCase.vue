<template>
  <v-data-table
    :headers="headers"
    :items="desserts"
    sort-by="calories"
    class="elevation-1"
  >
    <template v-slot:top>
      <v-toolbar
        flat
      >
        <v-toolbar-title>测试用例列表</v-toolbar-title>
        <v-divider
          class="mx-4"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog
          v-model="dialog"
          max-width="500px"
        >
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
          <v-card>
            <v-card-title>
              <span class="text-h5">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container>
                <v-row>
                  <v-col
                    cols="12"
                    sm="6"
                    md="4"
                  >
                    <v-text-field
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
        <v-dialog v-model="dialogDelete" max-width="500px">
          <v-card>
            <v-card-title class="text-h5">你确定要删除这一行吗?</v-card-title>
            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="blue darken-1" text @click="closeDelete">取消</v-btn>
              <v-btn color="blue darken-1" text @click="deleteItemConfirm">确定</v-btn>
              <v-spacer></v-spacer>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-toolbar>
    </template>
    <template v-slot:[`item.actions`]="{ item }">
      <v-icon
        small
        class="mr-2"
        @click="editItem(item)"
      >
        mdi-pencil
      </v-icon>
      <v-icon
        small
        @click="deleteItem(item)"
      >
        mdi-delete
      </v-icon>
    </template>
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
      dialog: false,
      dialogDelete: false,
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
      desserts: [],
      editedIndex: -1,
      editedItem: {
        id: '0',
        caseTitle: '',
        method:'',
        step:'',
        path:'',
        remark: ''
      },
      defaultItem: {
        id: '0',
        caseTitle: '',
        method:'',
        step:'',
        path:'',
        remark: ''
      },
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? '新增用例' : '编辑用例'
      },
    },

    watch: {
      dialog (val) {
        val || this.close()
      },
      dialogDelete (val) {
        val || this.closeDelete()
      },
    },

    created () {
      this.initialize()
    },

    methods: {
      initialize () {
        this.$api.testcase.getTestCase().then((result) => {
            console.log("TestCase.vue页面初始化的result",result)
            this.desserts = result.data.data
        }).catch((err) => {
            console.log("TaseCase.vue页面初始化用例error",err)
        });
      },

      editItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        this.editedIndex = this.desserts.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialogDelete = true
      },

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

      close () {
        this.dialog = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      closeDelete () {
        this.dialogDelete = false
        this.$nextTick(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        })
      },

      save () {
        if (this.editedIndex > -1) {
            console.log('用例编辑')
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
            console.log("用例新增");
             //新增用例
            //  const valuesArray = Object.values(data)
          this.$api.testcase.addTestCase(this.editedItem).then((result) => {
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
    },
  }
</script>