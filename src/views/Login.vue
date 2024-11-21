<template>
<v-app id="login">
  <v-container class="login">
    <v-row>
      <!--xs:超小；sm：小；md：中等；lg：大 -->
      <v-col cols="12" sm="8">

          <v-form
            ref="form"
            v-model="valid"
            lazy-validation
          >
          <h1>登录</h1>
            <v-text-field
              v-model="name"
              :counter="10"
              :rules="nameRules"
              label="账号"
              required
              @keyup.enter="login"
            ></v-text-field>

            <v-text-field
              v-model="password"
              :append-icon="show1 ? 'mdi-eye' : 'mdi-eye-off'"
              :rules="passwordRules"
              :type="show1 ? 'text' : 'password'"
              name="input-10-1"
              label="密码"
              hint="最少三个字符"
              counter
              @click:append="show1 = !show1"
              @keyup.enter="login"
            ></v-text-field>

            <v-btn
              :disabled="!valid"
              color="success"
              class="mr-4"
              @click="login"
            >
              登录
            </v-btn>

            <v-btn
              color="primary"
              class="mr-4"
              @click="register"
            >
              注册
            </v-btn>

          </v-form>

      </v-col>
    </v-row>
  </v-container>
 
</v-app>
</template>

<script>
  export default {
    data: () => ({
      show1: false,
      valid: true,
      name: '',
      nameRules: [
        v => !!v || '账号不能为空',
        v => (v && v.length <= 10) || '你输入的账号格式不正确',
      ],
      password: '',
      passwordRules: [
        v => !!v || '密码不能为空',
        v => (v && v.length >= 3) || '你输入的密码格式不正确',
      ],
    }),

    methods: {
      login () {
        //请求参数
        this.$api.user.login({
          
            "username": this.name,
            "password": this.password
        }).then((result) => {
          //打印响应
          console.log('Login.vue页面打印响应结果'+result)
          //当Http响应状态码为200的时候，再进行业务状态码判断
          if(200===result.status){
            //打印业务状态码
            console.log('Login.vue页面打印业务状态码'+result.data.code)
            if(0 == result.data.code){//业务状态码为0代表登录成功
              //打印token信息
              console.log(result.data.data.token)
              //1.把token信息放在本地
              localStorage.setItem('token', result.data.data.token)
              //2.页面跳转到首页
              this.$router.push('/layout/case')
            }else if(40013 == result.data.code){
              window.alert("用户未注册")
            }else if(40014 == result.data.code){
              window.alert("密码错误")
            }else{
              window.alert("登录失败")
            }
          }else{
             window.alert('login failler')
          }
        }).catch((err) => {
          console.log(err)
        });
        
      },
      register () {    
          //页面跳转到登录页面
        this.$router.push('/register');
      },
      resetValidation () {
        this.$refs.form.resetValidation()
      },
    },
  }
</script>

<style scoped>
.login {
  width: 500px;
  margin: auto;
  text-align: center;
}
</style>