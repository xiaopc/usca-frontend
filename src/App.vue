<template>
  <div id="app">
    <PageLayout />
  </div>
</template>

<script>
import PageLayout from "./components/layouts/PageLayout.vue";

export default {
  name: "app",
  components: {
    PageLayout
  },
};
</script>

<style>
body {
  overflow-y: scroll;
  background: #00bcd4;
  overflow-y: scroll;
}
a {
  color: #00acc1;
}
::-webkit-scrollbar {
  width: 6px;
  height: 6px;
  background-color: transparent;
}
::-webkit-scrollbar-track {
  border-radius: 10px;
  background-color: transparent;
}
::-webkit-scrollbar-thumb {
  border-radius: 10px;
  box-shadow: inset 0 0 6px rgba(0, 0, 0, 0.3);
  background-color: rgba(0, 0, 0, 0.16);
}

.ant-form-item {
  margin-bottom: 32px;
}

.ant-form-item-label {
  text-align: left;
}
.ant-form-item-label label {
    color: rgba(0, 0, 0, 0.64);
}
.ant-form-item-label label:after {
  content: "";
}

.ant-input {
  background: transparent;
}

.ant-input:hover,
.ant-input:focus,
.ant-select-auto-complete.ant-select-lg .ant-input:focus,
.ant-select-auto-complete.ant-select .ant-input:focus,
.ant-select-auto-complete.ant-select .ant-input:hover,
.ant-input-affix-wrapper:hover .ant-input:not(.ant-input-disabled) {
  box-shadow: none;
  -webkit-box-shadow: none;
  border: 1px solid #00bcd4;
}

.ant-form-item-required:before {
  content: '';
}

.ant-form-item-with-help {
  margin-bottom: 0;
}
.ant-form-explain {
  line-height: 34px;
}

.ant-rate-star-first,
.ant-rate-star-second {
  color: rgba(0, 0, 0, 0.1);
}

.ant-btn:hover,
.ant-btn:focus {
  color: #00bcd4;
  border-color: #00bcd4;
}
.ant-btn:active {
  color: #008ba3;
  border-color: #008ba3;
}
.ant-btn.ant-btn-primary:not([disabled]) {
  background-color: #ec407a;
  border-color: #ec407a;
}
.ant-btn.ant-btn-primary:not([disabled]):hover,
.ant-btn.ant-btn-primary:not([disabled]):focus {
  background-color: #f06292;
  border-color: #f06292;
  color: white;
}
.ant-btn.ant-btn-primary:not([disabled]):active {
  background-color: #e91e63;
  border-color: #e91e63;
  color: white;
}

</style>
