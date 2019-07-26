<template>
  <div class="home-1-bg">
    <a-row type="flex" justify="center">
      <a-col :span="6" class="home-1-intro">
        <div style="width: 100%">
          <object data="/static/homepage_1_title.svg" type="image/svg+xml" style="margin-bottom: 36pt"></object>
        </div>
        <div style="margin-top: 20pt">
          <router-link class="no-underline" to="/tags">
            <a-button id="try-btn" size="large" ghost>
              <span>立即体验</span>
            </a-button>
          </router-link>
          <object data="/static/homepage_1_comment.svg" type="image/svg+xml" style="display: block; margin-top: 12pt; margin-bottom: 58pt"></object>
        </div>
      </a-col>
      <a-col :span="8" class="home-1-card">
        <object data="/static/homepage_1_card.svg" type="image/svg+xml" style=""></object>
      </a-col>
    </a-row>
  </div>
</template>
<style>
.home-1-bg {
  background: url("/static/homepage_1_bg.svg");
  background-size: cover;
}
.home-1-bg .ant-row-flex {
  height: calc(100vh - 85px);
}
.home-1-intro {
  margin: auto 0;
}
.home-1-card {
  margin: auto 0;
  /* background: url("/static/homepage_1_card.svg");
  background-size: contain;
  background-position: center;
  background-repeat: no-repeat; */
}

#try-btn {
  border-color: rgba(255,255,255,0.8);
  color: rgba(255,255,255,0.8);
}
#try-btn:hover, #try-btn:focus {
  border-color: rgba(255,255,255,0.9);
  color: rgba(255,255,255,0.9);
  background: rgba(255,255,255,0.1) !important;
}
</style>
