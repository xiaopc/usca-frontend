<template>
  <a-row type="flex" justify="center">
    <a-col :span="6">
      <img src="static/login_black.svg" style="padding-bottom: 32pt" />
      <a-form
        id="components-form-demo-normal-login"
        :form="form"
        class="login-form"
        @submit="handleSubmit"
      >
        <a-form-item>
          <a-input
            size="large"
            v-decorator="[
          'username',
          { rules: [{ required: true, message: '请输入用户名!' }] }
        ]"
            placeholder="用户名"
          >
            <a-icon slot="prefix" type="user" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-input
            size="large"
            v-decorator="[
          'password',
          { rules: [{ required: true, message: '请输入密码!' }] }
        ]"
            type="password"
            placeholder="密码"
          >
            <a-icon slot="prefix" type="lock" style="color: rgba(0,0,0,.25)" />
          </a-input>
        </a-form-item>
        <a-form-item>
          <a-button size="large" :loading="loading" type="primary" html-type="submit" class="login-form-button">登录</a-button>
          <span>
            没有账号?
            <router-link :to="'/register?redirect=' + $route.query.redirect">立即注册</router-link>
          </span>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<script>
import { loginFetch, userInfoUpdate } from '../util'

export default {
  data () {
    return {
      loading: false,
      redirect: decodeURIComponent(this.$route.query.redirect || '/'),
    }
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFields(async (err, values) => {
        if (err) { this.loading = false; return; }
        var body = await loginFetch(values);
        if (body.error > 0) {
          this.$message.error(body.errmsg);
          this.loading = false;
          return;
        }
        await userInfoUpdate();
        this.loading = false;
        this.$message.success("登录成功");
        this.$router.push({ path: this.redirect });
      });
    }
  }
};
</script>

<style>
#components-form-demo-normal-login .login-form {
  max-width: 300px;
}
#components-form-demo-normal-login .login-form-forgot {
  float: right;
}
#components-form-demo-normal-login .login-form-button {
  float: right;
}
</style>
