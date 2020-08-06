<template>
  <div>
    <a-row :gutter="[16,16]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="dashboard" />系统资源
          </span>
          <a-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
            <ul style="display: flex; justify-content: space-between; flex-wrap: wrap;">
              <li class="text-center">
                <h4 class="color777 ma5">系统负载</h4>
                <a-progress
                  type="dashboard"
                  :percent="avgLoad"
                  :strokeColor="strokeColor(avgLoad)"
                />
                <h4 class="color888 ma5">{{ avgStr }}</h4>
              </li>
              <li class="text-center">
                <h4 class="color777 ma5">CPU使用率</h4>
                <a-progress
                  type="dashboard"
                  :percent="cpuUsage"
                  :strokeColor="strokeColor(cpuUsage)"
                />
                <h4 class="color888 ma5">{{ cpuStr }}</h4>
              </li>
              <li class="text-center">
                <h4 class="color777 ma5">内存使用率</h4>
                <a-progress
                  type="dashboard"
                  :percent="memUsage"
                  :strokeColor="strokeColor(memUsage)"
                />
                <h4 class="color888 ma5">{{ memStr }}</h4>
              </li>
              <li class="text-center">
                <h4 class="color777 ma5">/</h4>
                <a-progress
                  type="dashboard"
                  :percent="rootUsage"
                  :strokeColor="strokeColor(rootUsage)"
                />
                <h4 class="color888 ma5">{{ rootStr }}</h4>
              </li>
            </ul>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="tag" />数据概览
          </span>
          <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
            <a href="#">
              <a-card class="bgf8 text-center hover" :bordered="false">
                <p>
                  <a-icon class="ma5" type="global" />网站
                </p>
                <p class="font22px color-primary">0</p>
              </a-card>
            </a>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
            <a href="#">
              <a-card class="bgf8 text-center hover" :bordered="false">
                <p>
                  <a-icon class="ma5" type="database" />数据库
                </p>
                <p class="font22px color-primary">0</p>
              </a-card>
            </a>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
            <a href="#">
              <a-card class="bgf8 text-center hover" :bordered="false">
                <p>
                  <a-icon class="ma5" type="file-protect" />SSL
                </p>
                <p class="font22px color-primary">0</p>
              </a-card>
            </a>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]">
      <a-col :span="12">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="link" />快捷操作
          </span>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="area-chart" />实时流量
          </span>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="customer-service" />技术支持
          </span>
          <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
            <a href="http://t.hws.com" target="_blank">
              <a-card class="bgf8 text-left hover" :bordered="false">
                <p>
                  <a-icon type="message" />论坛
                </p>
                <p class="color-primary font12px">有任何问题，请上论坛发帖求助。</p>
              </a-card>
            </a>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
            <a href="https://www.hws.com" target="_blank">
              <a-card class="bgf8 text-left hover" :bordered="false">
                <p>
                  <a-icon type="star" />官网
                </p>
                <p class="color-error font12px">服务器安全，认准护卫神。</p>
              </a-card>
            </a>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
            <a-card class="bgf8 text-left hover" :bordered="false">
              <p>
                <a-icon type="qq" />QQ：
                <a href="#" target="_blank">800181978</a>
              </p>
              <p class="color-success font12px">客服QQ，24小时在线为您服务。</p>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
            <a-card class="bgf8 text-left hover" :bordered="false">
              <p>
                <a-icon type="phone" />电话：
                <a href="#" target="_blank">028-89549999</a>
              </p>
              <p class="color-warning font12px">电话沟通，更方便，更快捷。</p>
            </a-card>
          </a-col>
          <a-col :xs="24" :sm="24" :md="12" :lg="6" :xl="4">
            <a href="https://www.hws.com/help/linuxmaster/" target="_blank">
              <a-card class="bgf8 text-left hover" :bordered="false">
                <p>
                  <a-icon type="solution" />帮助
                </p>
                <p class="color-primary font12px">帮助文档、教程、知识分享。</p>
              </a-card>
            </a>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      avgLoad: 0,
      avgStr: "",
      cpuUsage: 0,
      cpuStr: "",
      memUsage: 0,
      memStr: "",
      rootUsage: 0,
      rootStr: ""
    };
  },
  methods: {
    strokeColor: function(progress) {
      if (progress > 90) {
        return "#f5222d";
      } else if (progress > 70) {
        return "#faad14";
      } else {
        return "#52c41a";
      }
    }
  }
};
</script>

<style scoped>
.hover:hover {
  background-color: #ededed;
}
</style>
