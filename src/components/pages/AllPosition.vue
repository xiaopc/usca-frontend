<template>
  <a-row type="flex" justify="center">
    <a-col :span="12">
      <a-collapse class="jobs-list" :bordered="false" @change="handleChange" v-model="current" accordion>
        <template v-for="(item, index) in $store.state.analysis.data">
          <a-collapse-panel :key="index.toString()">
            <template slot="header">
              <h2>{{item.name}}
                <a-tooltip placement="right">
                  <template slot="title">
                    <span>{{item.name}}_泼水百科</span>
                  </template>
                  <a :href="'https://baike.baidu.com/search/word?word=' + encodeURIComponent(item.name.replace(/ /, ''))" target="_blank" rel="noopener">
                    <a-icon type="question" class="question-tip" />
                  </a>
                </a-tooltip>
              </h2>
              <span class="match-rate">{{item.score}}% 匹配</span>
            </template>
            <div class="panel-content">
              <a-skeleton :loading="updating" :paragraph="{rows: 10}" active>
                <BarChart :chartData="jobTagsData" />
              </a-skeleton>
            </div>
          </a-collapse-panel>
        </template>
      </a-collapse>
      <div class="search-control-area">
        <a-button type="primary" size="large" :loading="loading" :disabled="current == null" @click="handleSave"><a-icon type="save" />保存</a-button>
      </div>
    </a-col>
  </a-row>
</template>

<script>
import { analysisJobsUpdate, submitUserJob, analysisJobTagsFetch } from "../util";

import BarChart from "../modules/BarChart";

export default {
  components: { BarChart },
  data() {
    return {
      current: null,
      updating: false,
      jobTagsData: null,
      loading: false,
    };
  },
  async beforeRouteEnter(to, from, next) {
    await analysisJobsUpdate(false);
    next(vm => {});
  },
  methods: {
    fetchJobTags: async function(jobid) {
      var body = await analysisJobTagsFetch(jobid);
      if (body.error == 0) this.jobTagsData = body.data;
      else {
        this.$message.error(body.errmsg);
      }
    },
    handleChange: async function (key) {
      if (key != undefined) {
        var jobid = this.$store.state.analysis.data[key].id;
        this.updating = true;
        await this.fetchJobTags(jobid);
        this.updating = false;
      }
    },
    handleSave: function () {
      this.loading = true;
      submitUserJob(this.$store.state.analysis.data[this.current])
        .then(body => {
          if (body.error == 0) {
            this.$message.success("保存成功");
            this.$router.push({ path: '/position' });
          } else {
            this.$message.error(body.errmsg);
          }
          this.loading = false;
        })
    }
  },
  computed: {
  }
};
</script>

<style>
.jobs-list {
  padding: 32pt 40pt;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.8);
}

.jobs-list h2 {
  margin: 0;
  letter-spacing: 0.8pt;
  line-height: 1.8em;
}
.jobs-list .match-rate {
  position: absolute;
  color: rgb(236, 64, 122);
  right: 0;
  top: 16pt;
}
.jobs-list .ant-collapse-item:last-child {
  border-bottom: none;
}

.question-tip {
  padding: 2pt;
  background: rgba(0, 0, 0, 0.09);
  color: #555657;
  border-radius: 10pt;
  font-size: small;
  transform: translateY(-3pt);
}

.panel-content {
  min-height: 360px;
}

.search-control-area {
  padding: 2em 0;
  text-align: right;
}
</style>
