<template>
  <a-row type="flex" justify="center">
    <a-spin v-if="$store.state.profile.updating"/>
    <a-col :span="12" v-else>
      <h1>添加你的技能🌲</h1>
      <a-form @submit="handleSubmit">
        <a-auto-complete
          size="large"
          style="width: 100%"
          @select="handleChange"
          @search="fetchTag"
          :autoFocus="true"
          optionLabelProp="dull"
          allowClear
          placeholder="搜索技能..."
        >
          <template slot="dataSource">
            <a-select-option v-if="data.length == 0" key="-1" dull="" :disabled="true">{{seraching ? '搜索中...' : '暂无匹配'}}</a-select-option>
            <a-select-option v-for="item in data" :key="item.id" dull="">{{item.name}}</a-select-option>
          </template>
        </a-auto-complete> 

        <div class="search-result-list">
          <span v-if="value.length == 0"><img src="static/hint.png" style="padding: 26pt 0; max-width: 90%"/></span>
          <template v-else v-for="(item, index) in value">
            <a-form-item v-bind="formItemLayout" :key="item.id" class="tags-star" :class="(item.level == undefined) ? 'has-error' : ''">
              <span slot="label" class="list-item">
                <a-icon class="btn-rm" type="minus-circle" @click="value.splice(index, 1)"/>{{item.name}}
              </span>
              <a-rate :allowClear="false" v-model="value[index].level" />
            </a-form-item>
          </template>
        </div>
        <div class="search-control-area">
          <a-button type="primary" size="large" html-type="submit" :loading="loading" v-if="value.length != 0">开始分析<a-icon type="right" /></a-button>
        </div>
      </a-form>
    </a-col>
  </a-row>
</template>
<style>
.not-found input, .not-found input:hover {
  border-color: #faad14;
}

.search-result-list {
  margin-top: 16px;
  border-radius: 6px;
  background-color: rgba(0,0,0,0.04);
  min-height: 67pt;
  text-align: center;
  padding: 10pt;
}

.search-result-list .ant-form-item {
  margin: 4pt 0;
  padding: 4pt 0;
  letter-spacing: 1pt;
  transition: 0.05s all;
}
.search-result-list .ant-form-item:hover {
  background: rgba(0,0,0,0.03);
  border-radius: 4pt;
}

.list-item {
  font-size: 12pt;
}

.btn-rm {
  color: rgba(255,0,0,0.72);
  font-size: 12pt;
  cursor: pointer;
  margin: 0 4pt;
  opacity: 0;
  transition: 0.2s all;
}
.search-result-list .ant-form-item:hover .btn-rm {
  opacity: 1;
}

.tags-star.has-error .ant-rate-star-second {
  color: rgba(255,0,0,0.1);
}
.tags-star.has-error li[aria-checked="true"] .ant-rate-star-second {
  color: inherit;
}

.search-control-area {
  padding: 2em 0;
  text-align: right;
}
</style>
<script>
import debounce from "lodash/debounce";
import { tagsUpdate, submitTags, fetchTagSuggest } from '../util'

export default {
  data() {
    this.lastFetchId = 0;
    this.fetchTag = debounce(this.fetchTag, 800);
    return {
      data: [],
      value: [],
      loading: false,
      seraching: false,
      formItemLayout: {
        labelCol: { span: 17 },
        wrapperCol: { span: 7 }
      }
    };
  },
  async mounted () {
    await tagsUpdate();
    this.value = this.$store.state.profile.data.tags;
  },
  methods: {
    fetchTag: function (value) {
      if (value == '') {
        this.data = [];
        return;
      }
      this.seraching = true;
      this.lastFetchId += 1;
      const fetchId = this.lastFetchId;
      fetchTagSuggest(value).then(body => {
        if (fetchId !== this.lastFetchId) {
          this.seraching = false;
          return;
        }
        const data = body.data.map(el => ({
          name: el.name,
          id: el.id.toString(),
          level: undefined,
          dull: '',
        }));
        this.data = data.filter(el => 
          this.value.findIndex(el_ => el.id == el_.id) < 0
        );
        this.seraching = false;
      });
    },
    handleChange: function (value) {
      this.value.push(this.data.find(el => el.id == value));
      this.data = [];
    },
    handleSubmit: function (e) {
      e.preventDefault();
      var err = false;
      this.value.forEach(v => {
        if (v.level == undefined) {
          this.$message.warn("请选择完毕后提交");
          err = true;
        }
      })
      if (!err) {
        this.loading = true;
        var submit = this.value.map(el => {
          return {id: el.id, level: el.level};
        });
        submitTags(submit).then(body => {
          if (body.error == 0) {
            this.$message.success("保存成功");
            this.$router.push({ path: '/position/true' });
          } else {
            this.$message.error(body.errmsg);
          }
          this.loading = false;
        });
      }

    }
  }
};
</script>