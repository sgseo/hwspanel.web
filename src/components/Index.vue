<template>
  <div>
    <a-row :gutter="[16,16]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="dashboard" />系统资源
          </span>
          <a-col :span="14">
            <ul style="display: flex; justify-content: space-between;">
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
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
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
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
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
li {
  display: inline-block;
}
</style>
