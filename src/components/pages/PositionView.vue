<template>
  <a-row type="flex" justify="center">
    <a-spin v-if="updating" />
    <div v-else-if="!isEvaluate && !isSelected">
      <h1>
        啊噢!
        <br />你还没完成技能分析呢!
      </h1>
      <router-link to="tags">
        <a-button type="primary" icon="check" size="large">立即分析</a-button>
      </router-link>
    </div>
    <a-col v-else :span="12">
      <a-row type="flex" justify="center">
        <a-col :span="12">
            <h3 v-if="isEvaluate">经过分析，最适合你的职业是</h3>
            <h3 v-else>你选择的职业是</h3>
            <h1>
              {{curJob.name}}
              <a-tooltip placement="right">
                <template slot="title">
                  <span>{{curJob.name}}_泼水百科</span>
                </template>
                <a
                  :href="'https://baike.baidu.com/search/word?word=' + encodeURIComponent(curJob.name.replace(/ /, ''))"
                  target="_blank"
                  rel="noopener"
                >
                  <a-icon type="question" class="question-tip" />
                </a>
              </a-tooltip>
            </h1>
            <span style="color: #ec407a; font-size: large">{{curJob.score}}% 匹配</span>

            <div v-if="isEvaluate" class="res-control-area">
              不喜欢{{curJob.name}}?
              <router-link class="no-underline" to="/position-all">
                <a-button style="margin-left: 10pt; letter-spacing: 2pt">查看全部</a-button>
              </router-link>
            </div>
            <div class="res-control-area" v-else>
              <router-link class="no-underline" to="/tags">
                <a-button style="margin-right: 4pt">
                  <span>添加技能</span>
                </a-button>
              </router-link>
              <router-link class="no-underline" to="/position-all">
                <a-button>
                  <span>查看全部</span>
                </a-button>
              </router-link>
            </div>

        </a-col>
        <a-col :span="12">
          <v-chart
            v-if="isEvaluate || isSelected"
            :forceFit="true"
            height="220"
            :data="$store.state.analysis.data"
            :padding="chartStyle.pad"
          >
            <v-axis></v-axis>
            <v-legend data-key="type"></v-legend>
            <v-coord type="polar" startAngle="180" endAngle="270"></v-coord>
            <v-stack-interval
              position="name*score"
              :color="chartStyle.color"
              :label="chartStyle.label"
              :style="chartStyle.style"
            ></v-stack-interval>
          </v-chart>
        </a-col>
      </a-row>
      <a-row type="flex" style="padding-top: 50pt">
        <h2>技能比对</h2>
        <span v-if="isEvaluate" style="position: absolute; right: 0; padding: 4pt 0px">有技能忘记填写了? <router-link to="/tags">立即添加</router-link></span>
        <div class="analyse-result-list">
          <BarChart :chartData="jobTagsData" />
        </div>
        <span style="width:100%; text-align: center; line-height: 5">结果已自动保存，也可以点击上方的「查看全部」修改</span>
      </a-row>
    </a-col>
  </a-row>
</template>

<script>
import { userJobFetchUpdate, analysisJobsUpdate, submitUserJob, analysisJobTagsFetch } from "../util";

import BarChart from "../modules/BarChart"

export default {
  components: { BarChart },
  data() {
    return {
      updating: true,
      jobTagsData: null,
      chartStyle: {
        color: ["name", "rgb(236, 64, 122)-rgb(252, 228, 236)"],
        pad: [20, 0, 5, 100],
        style: { lineWidth: 1, stroke: "#fff" }
      }
    };
  },
  beforeRouteEnter (to, from, next) {
    next( async vm => {
      await analysisJobsUpdate(vm.isEvaluate);
      if (vm.isEvaluate) {
        vm.fetchJobTags(vm.$store.state.analysis.data[0].id);
        submitUserJob(vm.$store.state.analysis.data[0]);
      } else {
        await userJobFetchUpdate();
        if (vm.isSelected) {
          vm.fetchJobTags(vm.$store.state.profile.data.selectedJob.id);
        }
      }
      vm.updating = false;
    })
  },
  created: async function() {
    // if (this.isEvaluate){
    //   this.fetchJobTags(this.$store.state.analysis.data[0].id);
    //   submitUserJob(this.$store.state.analysis.data[0]);
    // } else if (this.isSelected){
    //   this.fetchJobTags(this.$store.state.profile.data.selectedJob.id);
    // }
    // this.updating = false;
  },
  methods: {
    fetchJobTags: async function (jobid) {
      var body = await analysisJobTagsFetch(jobid);
      if (body.error == 0)
        this.jobTagsData = body.data;
      else {
        this.$message.error(body.errmsg);
      }
    }
  },
  computed: {
    isEvaluate: function() {
      return this.$route.params.update;
    },
    isEvaluateUpdating: function() {
      return this.$store.state.analysis.updating;
    },
    isSelected: function() {
      return this.$store.state.profile.data.selectedJob;
    },
    curJob: function() {
      return this.isSelected ? this.$store.state.profile.data.selectedJob : this.$store.state.analysis.data[0];
    }
  }
};
</script>

<style>
.question-tip {
  padding: 3pt;
  background: rgba(0, 0, 0, 0.09);
  color: #555657;
  border-radius: 10pt;
  font-size: small;
  transform: translateY(-3pt);
}

.res-control-area {
  padding-top: 40pt; 
  line-height: 3.5; 
  letter-spacing: 0.5pt;
  width: 100%;
}

.analyse-result-list {
  width: 100%;
  margin-top: 16px;
  padding: 32pt 40pt 16px 40pt;
  border-radius: 6px;
  border: 1px solid rgba(0,0,0,0.1);
  background: rgba(255,255,255,0.8);
  min-height: 67pt;
}
</style>
