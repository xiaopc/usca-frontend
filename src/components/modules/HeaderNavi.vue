<template>
  <a-layout-header>
    <img src="static/logo.svg" style="float: left; padding: 16pt 24pt" />
    <a-menu
      theme="dark"
      mode="horizontal"
      :selectedKeys="$route.path.match(/^\/\w*/)"
      :style="{ lineHeight: '64px', background: 'transparent' }"
    >
      <template v-for="item in list">
        <a-menu-item :key="item.ref">
          <router-link :to="item.ref">
            <a-icon :type="item.icon" />
            <span>{{item.title}}</span>
          </router-link>
        </a-menu-item>
      </template>
    </a-menu>

      <a-button-group v-if="$store.state.user.data.userType < 0" class="user-btngrp">
        <a-button>
          <router-link class="no-underline" to="/login">
            <a-icon type="login" />
            <span>登录</span>
          </router-link>
        </a-button>
        <a-button>
          <router-link class="no-underline" to="/register">
            <a-icon type="user-add" />
            <span>注册</span>
          </router-link>
        </a-button>
      </a-button-group>

      <div v-else class="user-btngrp">
        <span class="user-name">欢迎， {{$store.state.user.data.name}}</span>
        <a-button @click="handleLogout">
          <a-icon type="logout" />
          <span>退出</span>
        </a-button>
      </div>

  </a-layout-header>
</template>

<script>
import { logoutFetch } from '../util'

export default {
  components: {},
  data() {
    return {
      collapsed: false,
      list: [
        {
          title: "首页",
          icon: "home",
          ref: "/"
        },
        {
          title: "技能分析",
          icon: "database",
          ref: "/tags"
        },
        {
          title: "职位推荐",
          icon: "like",
          ref: "/position"
        }
      ]
    };
  },
  methods: {
    toggleCollapsed() {
      this.collapsed = !this.collapsed;
    },
    async handleLogout() {
      await logoutFetch();
      this.$store.commit('logoutUser');
      this.$router.push({ path: '/' });
      this.$message.success("已退出");
    },
  }
};
</script>

<style>
.ant-layout-header {
  position: relative;
  background: transparent;
  padding: 0;
  max-width: 1024pt;
  margin: 16pt auto;
  width: 100%;
  
}
.ant-menu {
  font-size: 12pt;
}

.ant-menu.ant-menu-dark .ant-menu-item-selected,
.ant-menu-submenu-popup.ant-menu-dark .ant-menu-item-selected {
  background-color: transparent;
}

.user-btngrp {
  position: absolute;
  right: 24pt;
  top: 0;
}
.user-btngrp button {
  background: rgba(255, 255, 255, 0.2);
  border: none;
  color: rgba(255, 255, 255, 0.8);
}
.user-btngrp button:hover {
  background: rgba(255, 255, 255, 0.3);
  color: rgba(255, 255, 255, 0.9);
}
.user-btngrp .user-name {
  color: rgba(255,255,255,0.8);
  margin: 0 15pt;
}

.no-underline {
  text-decoration: none !important;
}
</style>
