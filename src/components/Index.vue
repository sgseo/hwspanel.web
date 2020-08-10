<template>
  <div>
    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="dashboard" />系统资源
          </span>
          <a-col :xs="24" :sm="22" :md="20" :lg="18" :xl="16">
            <ul
              class="dragsort"
              style="display: flex; justify-content: space-between; flex-wrap: wrap;"
            >
              <li v-for="item in systemResource" :key="item.title" class="text-center">
                <h4 class="color444 ma5">{{ item.title}}</h4>
                <a-progress
                  type="dashboard"
                  :percent="item.data"
                  :strokeColor="progressColor(item.data)"
                />
                <h4 class="color888 ma5">{{ item.info }}</h4>
              </li>
            </ul>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="tag" />数据概览
          </span>
          <a-col
            v-for="item in dataOverview"
            :key="item.title"
            :xs="24"
            :sm="24"
            :md="12"
            :lg="6"
            :xl="4"
          >
            <a :href="item.url">
              <a-card class="bgf8 text-center hover" :bordered="false">
                <p>
                  <a-icon class="ma5" :type="item.class" />
                  {{ item.title}}
                </p>
                <p class="font22px color-primary">{{ item.data }}</p>
              </a-card>
            </a>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[10,10]">
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <a-card size="small" style="height: 400px; overflow: auto;">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="link" />快捷操作
          </span>
          <ul class="dragsort">
            <li v-for="item in quickOperation" :key="item.id" class="ma5 text-center">
              <a-card class="bgf8 text-left hover" :bordered="false">
                <p>{{ item.name }}</p>
                <p class="color-primary font12px">{{ item.description }}</p>
              </a-card>
            </li>
          </ul>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="12" :lg="12" :xl="12">
        <a-card size="small" style="height: 400px;">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="area-chart" />实时流量
          </span>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="customer-service" />技术支持
          </span>
          <a-col
            v-for="item in technicalSupport"
            :key="item.title"
            :xs="24"
            :sm="24"
            :md="12"
            :lg="6"
            :xl="4"
          >
            <a :href="item.url" :target="item.target">
              <a-card class="bgf8 text-left hover" :bordered="false">
                <p>
                  <a-icon class="mar5" type="message" />
                  {{ item.title }}
                </p>
                <p class="color-primary font12px">{{ item.description }}</p>
              </a-card>
            </a>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const technicalSupport = [
  {
    title: "论坛",
    url: "http://t.hws.com",
    target: "_blank",
    description: "有问题，上论坛发帖求助。"
  },
  {
    title: "官网",
    url: "https://www.hws.com",
    target: "_blank",
    description: "服务器安全，认准护卫神。"
  },
  {
    title: "800181978",
    url: "#",
    target: "_self",
    description: "在线沟通更流畅、更便利。"
  },
  {
    title: "028-89549999",
    url: "#",
    target: "_self",
    description: "电话沟通更准确，更效率。"
  },
  {
    title: "帮助",
    url: "https://www.hws.com/help/LinuxMaster",
    target: "_blank",
    description: "帮助文档、教程、和知识。"
  }
];
export default {
  data() {
    return {
      systemResource: [
        { data: 30, title: "平均负载", info: "" },
        { data: 93, title: "CPU使用率", info: "" },
        { data: 72, title: "内存使用率", info: "" },
        { data: 14, title: "/", info: "" }
      ],
      dataOverview: [
        { title: "网站", url: "#", class: "global", data: 0 },
        { title: "数据库", url: "#", class: "database", data: 0 },
        { title: "SSL", url: "#", class: "file-protect", data: 0 }
      ],
      quickOperation: [
        { name: "Apache", description: "使用人数最多的Web服务器" },
        { name: "Nginx", description: "小巧精悍的反向代理服务器" },
        { name: "PHP53", description: "PHP是世界上最好的语言" },
        { name: "PHP54", description: "PHP是世界上最好的语言" },
        { name: "PHP56", description: "PHP是世界上最好的语言" },
        { name: "PHP70", description: "PHP是世界上最好的语言" },
        { name: "PHP55", description: "PHP是世界上最好的语言" },
        { name: "PHP71", description: "PHP是世界上最好的语言" },
        { name: "PHP72", description: "PHP是世界上最好的语言" },
        { name: "PHP73", description: "PHP是世界上最好的语言" },
        { name: "PureFTPd", description: "一款主打安全的FTP服务器" },
        { name: "Redis", description: "内存型数据库" }
      ],
      technicalSupport
    };
  },
  mounted() {
    $(".dragsort").dragsort({
      dragSelector: "li",
      dragEnd: function() {},
      dragBetween: false,
      placeHolderTemplate: "<li></li>"
    });
  },
  methods: {
    progressColor: function(progress) {
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
