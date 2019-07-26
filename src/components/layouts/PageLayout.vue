<template>
  <a-layout id="components-layout-demo-top" class="layout">
    <HeaderNavi />
    <a-layout-content>
      <div :class="pageStyle">
        <router-view />
      </div>
    </a-layout-content>
    <a-layout-footer
      style="text-align: center; background: transparent; color: rgba(255,255,255,0.618)"
    >
      © 2019 <br>
      <a href="https://fxy.one/">FXY.ONE</a> <a href="https://xiaopc.org/">xiaopc.org</a>
    </a-layout-footer>
  </a-layout>
</template>

<script>
import HeaderNavi from '../modules/HeaderNavi'

export default {
  components: {
    HeaderNavi
  },
  data () {
    return {
    }
  },
  methods: {
  },
  computed: {
    pageStyle: function () {
      return (this.$route.path == '/') ? "index-layout" : "pages-layout";
    }
  }
}
</script>

<style>
.layout {
  background: transparent;
}
.pages-layout {
  background: #f6fafb;
  padding: 72pt 24pt;
  min-height: 280px;
  max-width: 1024pt;
  margin: 0 auto;
  border-radius: 5px;
  box-shadow: 2px 2px 100px rgba(0,0,0,0.3);
}
</style>
