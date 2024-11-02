<template>
<v-app id="login">
  <v-container class="login">
    <v-row>
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
        v => (v && v.length >= 10) || '你输入的密码格式不正确',
      ],
    }),

    methods: {
      login () {
        
      },
      register () {

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