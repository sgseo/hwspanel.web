<template>
  <a-config-provider :locale="zhCN">
    <div id="app">
      <a-layout id="components-layout-demo-custom-trigger" style="height: 100%;">
        <a-layout-sider v-model="collapsed" :trigger="collapsed" collapsible>
          <div
            class="logo text-center font22px color-white"
            style="
                border-radius: 5px;
                background: #108ee9;
                cursor: pointer;
                overflow: hidden;"
            @click="openTask"
          >
            <span style="line-height: 32px;">护卫神.主机大师</span>
          </div>
          <a-menu
            theme="dark"
            mode="inline"
            :default-selected-keys="[$route.path]"
            :selectedKeys="[$route.path]"
          >
            <a-menu-item key="/index">
              <router-link to="/index">
                <a-icon type="home" />
                <span>首页</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="/site">
              <router-link to="/site">
                <a-icon type="global" />
                <span>网站管理</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="/db">
              <router-link to="/db">
                <a-icon type="database" />
                <span>数据库</span>
              </router-link>
            </a-menu-item>
            <a-menu-item key="/appstore">
              <router-link to="/appstore">
                <a-icon type="appstore" />
                <span>应用商店</span>
                <a-badge
                  show-zero
                  count="3"
                  :number-style="{ boxShadow: 'none', borderRadius: '5px' }"
                  title="任务数"
                ></a-badge>
              </router-link>
            </a-menu-item>
            <a-menu-item key="/log">
              <router-link to="/log">
                <a-icon type="snippets" />
                <span>查看日志</span>
              </router-link>
            </a-menu-item>
            <a-sub-menu key="sub1">
              <span slot="title">
                <a-icon type="setting" />
                <span>全局设置</span>
              </span>
              <a-menu-item key="/panel_setting">
                <router-link to="/panel_setting">面板设置</router-link>
              </a-menu-item>
              <a-menu-item key="/user_setting">
                <router-link to="/user_setting">用户设置</router-link>
              </a-menu-item>
            </a-sub-menu>
            <a-menu-item key="7" @click="exitPanel">
              <a-icon type="logout" />
              <span>退出</span>
            </a-menu-item>
          </a-menu>
        </a-layout-sider>
        <a-layout>
          <a-layout-content
            :style="{ margin: '10px', minHeight: '280px' }"
            class="flex-column-space-between"
          >
            <router-view />

            <a-layout-footer class="mat5 bg-white pd14 text-center font12px">
              <a class="color333" href="https://www.hws.com" target="_blank">版权所有 © 护卫神-服务器安全专家</a>
            </a-layout-footer>
          </a-layout-content>
        </a-layout>
      </a-layout>
      <my-messagebox id="taskbox" v-if="visibleTaskBox"></my-messagebox>
    </div>
  </a-config-provider>
</template>

<script>
import zhCN from "ant-design-vue/es/locale-provider/zh_CN";
export default {
  data() {
    return {
      zhCN,
      collapsed: false,
      visibleTaskBox: false,
    };
  },
  methods: {
    openTask() {
      var vm = this;
      var load = this.public_msg_loading();
      layer.close(load);
      this.visibleTaskBox = true;
      setTimeout(function() {
        vm.public_msg_open(
          "消息盒子",
          ["700px", "700px"],
          null,
          $("#taskbox"),
          -1,
          null,
          null,
          null,
          function() {
            vm.visibleTaskBox = false;
          }
        );
      }, 150);
    },

    exitPanel() {
      let vm = this;
      this.public_msg_confirm(
        "退出登录确认",
        "您真的要退出登录吗?",
        function() {
          vm.public_msg_success("退出成功!");
        }
      );
    }
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
