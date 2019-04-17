<template>
  <LoginGuard>
    <div style="margin-left: 10px; margin-top: 20px;">
      <div class="text">您可以在本页面中修改自己的个人信息</div>
      <ElForm class="form" ref="userForm" :model="user" label-width="100px" label-position="left" :rules="rule">
        <ElFormItem label="用户 ID" prop="id">
          <ElInput disabled v-model="user.id"></ElInput>
        </ElFormItem>
        <ElFormItem label="手机" prop="phone">
          <ElInput disabled v-model="user.phone"></ElInput>
        </ElFormItem>
        <ElFormItem label="昵称" prop="nickname">
          <ElInput type="text" v-model="user.nickname"></ElInput>
        </ElFormItem>
        <ElFormItem label="密码" prop="originalPassword">
          <ElInput type="password" v-model="user.originalPassword"></ElInput>
        </ElFormItem>
        <ElFormItem label="新密码" prop="password">
          <ElInput type="password" v-model="user.password"></ElInput>
        </ElFormItem>
        <ElFormItem v-if="user.password !== ''" label="确认新密码" prop="confirm">
          <ElInput type="password" v-model="user.confirm"></ElInput>
        </ElFormItem>
        <ElFormItem label="学号" prop="student_id">
          <ElInput type="text" v-model="user.student_id"></ElInput>
        </ElFormItem>
        <ElFormItem label="真实姓名" prop="realname">
          <ElInput type="text" v-model="user.realname"></ElInput>
        </ElFormItem>
        <ElFormItem label="性别">
          <ElSelect v-model="user.gender" placeholder="请选择性别">
            <ElOption label="男" value="0"></ElOption>
            <ElOption label="女" value="1"></ElOption>
            <ElOption label="其他" value="2"></ElOption>
          </ElSelect>
        </ElFormItem>
        <ElFormItem>
          <ElButton type="primary" @click="onEdit">修改</ElButton>
        </ElFormItem>
      </ElForm>
    </div>
  </LoginGuard>
</template>

<script lang="ts">
  import Vue from 'vue';
  import LoginGuard from './components/LoginGuard.vue';
  import { mapActions, mapGetters } from 'vuex';

  export default Vue.extend({
    components: {
      LoginGuard,
    },
    data() {
      return {
        editPassword: false,
        user: {
          id: '',
          phone: '',
          originalPassword: '',
          password: '',
          confirm: '',
          student_id: '',
          nickname: '',
          realname: '',
          gender: '0',
        },
        rule: {
          originalPassword: {
            validator: (rule, value, callback) => {
              if (value === '') {
                callback(new Error('请输入密码'));
              } else if (value.length < 6) {
                callback(new Error('密码长度需要大于六位'));
              } else callback();
            },
            required: true,
            trigger: 'blur',
          },
          password: [{
            validator: (rule, value, callback) => {
              if (value === '') {
                callback();
              } else if (value.length < 6) {
                callback(new Error('新密码长度需要大于六位'));
              } else callback();
            },
            trigger: 'blur',
          }],
          confirm: [{
            validator: (rule, value, callback) => {
              if (this.user.password === '') callback();
              else if (value === '') {
                callback(new Error('请再次输入新密码'));
              } else if (value !== this.user.password) {
                callback(new Error('两次输入新密码不一致'));
              } else callback();
            },
            trigger: 'blur',
          }],
          gender: [{
            validator: (rule, value, callback) => {
              if (value === '') callback();
              if (['0', '1', '2'].indexOf(value) === -1) {
                callback(new Error('请选择正确的性别！'));
              }
            },
            trigger: 'blur',
          }],
        },
      };
    },
    computed: {
      ...mapGetters([ 'userInfo' ]),
    },
    watch: {
      userInfo() {
        this.user.id = this.userInfo.id;
        this.user.phone = this.userInfo.phone;
        this.user.student_id = this.userInfo.student_id;
        this.user.nickname = this.userInfo.nickname;
        this.user.realname = this.userInfo.realname;
        this.user.gender = (this.userInfo.gender as number).toString();
      },
    },
    methods: {
      async onEdit() {
        this.$refs.userForm.validate(async valid => {
          if (!valid) return false;
          const res = await this.updateUserInfo(this.user);
          if (res.success === 0) {
            this.$notify({
              title: '修改个人信息失败',
              message: '请检查密码',
              type: 'error',
            });
            return;
          }
          if (res.successInfo === 0 || res.successPassword === 0) {
            this.$notify({
              title: '修改个人信息失败',
              message: '修改个人信息发生错误',
              type: 'error',
            });
          }
          this.$notify({
            title: '修改个人信息成功',
            message: '个人信息已经保存到服务器',
            type: 'success',
          });
        });
      },
      ...mapActions([ 'updateUserInfo' ]),
    },
  });
</script>

<style scoped>
.text {
  font-size: 14px;
  line-height: 1.4;
  margin-bottom: 30px;
}
.form {
  max-width: 400px;
}
</style>