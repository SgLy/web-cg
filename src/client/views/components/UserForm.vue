<template>
  <div style="padding: 1em;">
    <ElForm ref="userForm" :model="user" label-width="70px" label-position="left" :rules="rule">
      <ElFormItem label="手机" prop="phone">
        <ElInput v-model="user.phone"></ElInput>
      </ElFormItem>
      <ElFormItem label="密码" prop="password">
        <ElInput type="password" v-model="user.password"></ElInput>
      </ElFormItem>
      <ElFormItem v-if="type === 'register'" label="确认密码" prop="confirm">
        <ElInput type="password" v-model="user.confirm"></ElInput>
      </ElFormItem>
      <ElFormItem>
        <ElButton type="primary" @click="onLogin">登录</ElButton>
        <ElButton type="" @click="onRegister">注册</ElButton>
      </ElFormItem>
    </ElForm>
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
        type: 'login',
        rule: {
          phone: [{
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入手机号'));
              } else if (!value.match(/^1\d{10}$/)) {
                callback(new Error('请输入正确的手机号'));
              } else callback();
            },
            trigger: 'blur',
          }],
          password: [{
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else if (value.length < 6) {
                callback(new Error('密码长度需要大于六位'));
              } else callback();
            },
            trigger: 'blur',
          }],
          confirm: [{
            validator: (rule, value, callback) => {
              if (this.type === 'login') callback();
              else if (value === '') {
                callback(new Error('请再次输入密码'));
              } else if (value !== this.user.password) {
                callback(new Error('两次输入密码不一致'));
              } else callback();
            },
            trigger: 'blur',
          }],
        },
      };
    },
    computed: {
      ...mapGetters([ 'isLogin' ]),
    },
    methods: {
      async onRegister() {
        const previousState = this.type;
        this.type = 'register';
        if (previousState === 'login') return;
        this.$refs.userForm.validate(async valid => {
          if (valid) {
            const res = await this.register({
              phone: this.user.phone,
              password: this.user.password,
            });
            if (res.data.success) {
              this.$notify({
                title: '注册成功',
                message: `${this.user.phone}，欢迎来到 WebCG！`,
                type: 'success',
              });
            } else {
              this.$notify({
                title: '注册失败',
                message: '请尝试更换手机号！',
                type: 'error',
              });
            }
          } else return false;
        });
      },
      async onLogin() {
        this.type = 'login';
        this.$refs.userForm.validate(async valid => {
          if (!valid) return false;
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
        });
      },
      ...mapActions([ 'login', 'register', 'getUserInfo' ]),
    },
  });
</script>

<style scoped>
.el-form-item:last-child {
  margin-bottom: 0;
}
</style>