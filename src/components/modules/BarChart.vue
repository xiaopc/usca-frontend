<template>
  <div class="barchart">
    <div class="bar-sample">
      拥有 <a-progress :percent="60" :successPercent="100" :showInfo="false" :strokeWidth="10"/> 期望
      <a-tooltip placement="top">
        <template slot="title">
          「期望」值表示这一技能对职业方向的重要程度，不完全反映能力要求。
        </template>
        <a-icon type="question" class="question-tip" style="transform: scale(0.8)" />
      </a-tooltip>
    </div>
    <template v-for="item in chartData">
      <a-form-item v-bind="formItemLayout" :key="item.id">
        <span slot="label" class="list-item">
          {{item.name}}
        </span>
        <a-progress :percent="item.level * 20" :successPercent="item.expected" :showInfo="false" :strokeWidth="10"/>
      </a-form-item>
    </template>
  </div>
</template>

<script>

export default {
  components: {
  },
  props: ['chartData'],
  data () {
    return {
      formItemLayout: {
        labelCol: { span: 24 },
        wrapperCol: { span: 24 }
      }
    }
  },
  mounted: function () {
  },
  methods: {
  },
}
</script>

<style>
.barchart .list-item {
  font-size: larger;
  color: rgba(0, 0, 0, 0.65);
  letter-spacing: 0.5pt;
  font-weight: normal;
}

.bar-sample {
  text-align: right;
}
.bar-sample .ant-progress-line {
  width: 30pt;
}

.barchart .ant-col-24.ant-form-item-label, .barchart .ant-form-item-control {
  line-height: 1;
  padding: 2pt;
}

.barchart .ant-form-item {
  margin-bottom: 18pt;
}

.ant-progress-success-bg, .ant-progress-bg {
  background: #26c6da;
}
.ant-progress-success-bg {
  background: rgba(0, 0, 0, 0.1);
}
.ant-progress-status-success .ant-progress-bg {
  background: #26c6da;
}
</style>
