<template>
  <div id="app">
    <a-layout id="components-layout-demo-custom-trigger" style="height: 100%;">
      <a-layout-sider v-model="collapsed" :trigger="null" collapsible>
        <div class="logo text-center" style="overflow: hidden;">
            <span class="font22px" style="color: #DDD">护卫神·主机大师</span>
        </div>
        <a-menu theme="dark" mode="inline" :default-selected-keys="['1']">
          <a-menu-item key="1">
            <a-icon type="home" />
            <span>首页</span>
          </a-menu-item>
          <a-menu-item key="2">
            <a-icon type="global" />
            <span>网站管理</span>
          </a-menu-item>
          <a-menu-item key="3">
            <a-icon type="database" />
            <span>数据库</span>
          </a-menu-item>
          <a-menu-item key="4">
            <a-icon type="appstore" />
            <span>应用商店</span>
          </a-menu-item>
          <a-menu-item key="5">
            <a-icon type="setting" />
            <span>面板设置</span>
          </a-menu-item>
          <a-menu-item key="6">
            <a-icon type="snippets" />
            <span>查看日志</span>
          </a-menu-item>
          <a-menu-item key="7">
            <a-icon type="logout" />
            <span>退出</span>
          </a-menu-item>
        </a-menu>
      </a-layout-sider>
      <a-layout>
        <a-layout-header class="bg-white pd0">
          <a-icon
            class="trigger"
            :type="collapsed ? 'menu-unfold' : 'menu-fold'"
            @click="() => (collapsed = !collapsed)"
          />
        </a-layout-header>
        <a-layout-content
          :style="{ margin: '16px', minHeight: '280px' }"
        >
          <router-view />
        </a-layout-content>
        <a-layout-footer class="bg-white pd20 text-center">
            <a class="color888" href="https://www.hws.com" target="_blank">
                版权所有 © 护卫神-服务器安全专家
            </a>
        </a-layout-footer>
      </a-layout>
    </a-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      collapsed: false
    };
  }
};
</script>

<style>
#components-layout-demo-custom-trigger .trigger {
  font-size: 18px;
  line-height: 64px;
  padding: 0 24px;
  cursor: pointer;
  transition: color 0.3s;
}

#components-layout-demo-custom-trigger .trigger:hover {
  color: #1890ff;
}

#components-layout-demo-custom-trigger .logo {
  height: 32px;
  background: rgba(255, 255, 255, 0.2);
  margin: 16px;
}
</style>
