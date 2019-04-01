<template>
  <div>
    <div v-if="!isLogin">
      <el-form ref="form" :model="user" label-width="50px">
        <el-form-item label="手机">
          <el-input v-model="user.phone"></el-input>
        </el-form-item>
        <el-form-item label="密码">
          <el-input type="password" v-model="user.password"></el-input>
        </el-form-item>
        <el-form-item v-if="showConfirm" label="确认密码">
          <el-input v-model="user.confirm"></el-input>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onLogin">登录</el-button>
          <el-button type="" @click="onRegister">注册</el-button>
        </el-form-item>
      </el-form>
    </div>
    <div v-else>
    </div>
  </div>
</template>

<script lang="ts">
  import Vue from 'vue';
  import { mapGetters, mapActions } from 'vuex';

  export default Vue.extend({
    data() {
      return {
        user: {
          phone: '',
          password: '',
          confirm: '',
        },
        showConfirm: false,
      };
    },
    computed: {
      ...mapGetters([ 'isLogin' ]),
    },
    async mounted() {
      if (this.isLogin) {
        const user = await this.getUserInfo();
        if (user.success === 1) {
          this.$notify({
            title: '浏览器 Cookies 登录成功',
            message: `欢迎您回来，${user.nickname}`,
            type: 'success',
          });
        } else {
          this.$notify({
            title: '浏览器 Cookies 过期',
            message: '请重新通过右上角用户窗口登录！',
            type: 'error',
          });
        }
      }
    },
    methods: {
      onRegister() {},
      async onLogin() {
        const res = await this.login({
          phone: this.user.phone,
          password: this.user.password,
        });
        if (res.data.success) {
          this.$notify({
            title: '登录成功',
            message: `欢迎您回来，${res.data.nickname}`,
            type: 'success',
          });
        } else {
          this.$notify({
            title: '登录失败',
            message: '请检查手机号码和密码！',
            type: 'error',
          });
        }
      },
      ...mapActions([ 'login', 'getUserInfo' ]),
    },
  });
</script>

<style scoped>
</style>