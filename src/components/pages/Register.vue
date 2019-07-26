<template>
  <a-row type="flex" justify="center" class="reg-form">
    <a-col :span="7">
      <a-form :form="form" @submit="handleSubmit">
        <a-form-item v-bind="formItemLayout" label="用户名" has-feedback :valid-status="usernameValid">
          <a-input
            size="large"
            v-decorator="[
          'username',
          {
            rules: [{
              required: true, message: '请输入用户名!',
            }, {
              validator: validateUsername,
            }]
          }
        ]"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="密码">
          <a-input
            size="large"
            v-decorator="[
          'password',
          {
            rules: [{
              min: 6, message: '密码长度最少为 6 位!',
            }, {
              required: true, message: '请输入密码!',
            }, {
              validator: validateToNextPassword,
            }],
          }
        ]"
            type="password"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="确认密码">
          <a-input
            size="large"
            v-decorator="[
          'confirm',
          {
            rules: [{
              required: true, message: '请确认密码!',
            }, {
              validator: compareToFirstPassword,
            }],
          }
        ]"
            type="password"
            @blur="handleConfirmBlur"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout">
          <span slot="label">
            <a-tooltip title="填写真实姓名有助于企业更方便地联系~">
              <a-icon type="question-circle-o" />
            </a-tooltip> 真实姓名
          </span>
          <a-input
            size="large"
            v-decorator="[
          'name',
          {
            rules: [{ required: true, message: '请输入姓名!'}]
          }
        ]"
          />
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="手机号码">
          <a-input
            size="large"
            v-decorator="[
          'phone',
          {
            rules: [{ required: true, message: '请输入手机号码!' },
                    { pattern: /1(?:3\d{3}|5[^4\D]\d{2}|8\d{3}|7(?:[01356789]\d{2}|4(?:0\d|1[0-2]|9\d))|9[189]\d{2}|6[567]\d{2}|4[579]\d{2})\d{6}$/, message: '手机号码格式不正确!' }],
          }
        ]"
            style="width: 100%"
          >
          </a-input>
        </a-form-item>

        <a-form-item v-bind="formItemLayout" label="短信验证码" extra="目前仅支持中国大陆手机号码.">
          <a-row :gutter="8">
            <a-col :span="13">
              <a-input
                size="large"
                v-decorator="[
              'captcha',
              { rules: [{ pattern: /^\d{6}$/, message: '验证码格式错误!',}, { required: true, message: '请输入短信验证码!' }]}
            ]"
              />
            </a-col>
            <a-col :span="11">
              <a-button size="large">获取验证码</a-button>
            </a-col>
          </a-row>
        </a-form-item>

        <a-form-item v-bind="tailFormItemLayout">
            注册即表示你已阅读并同意<a href="#">使用协议</a>。
        </a-form-item>

        <a-form-item v-bind="tailFormItemLayout">
          <a-button type="primary" html-type="submit" size="large" :loading="loading" style="float: right">立即注册</a-button>
        </a-form-item>
      </a-form>
    </a-col>
  </a-row>
</template>

<style>
.reg-form .ant-form-item-label {
  letter-spacing: 1pt;
  text-align: right;
}
</style>


<script>
import querystring from 'querystring'
import { registerFetch, userInfoUpdate, checkUsername } from '../util'

export default {
  data() {
    return {
      redirect: decodeURIComponent(this.$route.query.redirect || '/'),
      loading: false,
      confirmDirty: false,
      usernameValid: "",
      autoCompleteResult: [],
      formItemLayout: {
        labelCol: {
          xs: { span: 24 },
          sm: { span: 8 }
        },
        wrapperCol: {
          xs: { span: 24 },
          sm: { span: 16 }
        }
      },
      tailFormItemLayout: {
        wrapperCol: {
          xs: {
            span: 24,
            offset: 0
          },
          sm: {
            span: 16,
            offset: 8
          }
        }
      }
    };
  },
  beforeCreate() {
    this.form = this.$form.createForm(this);
  },
  methods: {
    handleSubmit(e) {
      e.preventDefault();
      this.loading = true;
      this.form.validateFieldsAndScroll(async (err, values) => {
        if (err) { this.loading = false; return; }
        var body = await registerFetch(values);
        if (body.error > 0) {
          this.$message.error(body.errmsg);
          this.loading = false;
          return;
        }
        await userInfoUpdate();
        this.loading = false;
        this.$message.success("注册成功");
        this.$router.push({ path: this.redirect });
      });
    },
    handleConfirmBlur(e) {
      const value = e.target.value;
      this.confirmDirty = this.confirmDirty || !!value;
    },
    compareToFirstPassword(rule, value, callback) {
      const form = this.form;
      if (value && value !== form.getFieldValue("password")) {
        callback("两次密码应相同!");
      } else {
        callback();
      }
    },
    validateToNextPassword(rule, value, callback) {
      const form = this.form;
      if (value && this.confirmDirty) {
        form.validateFields(["confirm"], { force: true });
      }
      callback();
    },
    validateUsername(rule, value, callback) {
      this.usernameValid = "validating";
      checkUsername(value).then(body => {
        if (body.error > 0) {
          this.usernameValid = "warning";
          callback("用户名已被占用，请更换!");
        } else {
          this.usernameValid = "success";
          callback();
        }
      });
    }
  }
};
</script>