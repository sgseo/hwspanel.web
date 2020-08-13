<template>
  <div>
    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small" :bordered="false" class="font12px">
          <a-row :gutter="[5,5]">
            <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
              <a-icon type="tags" class="mar5" />
              <span>系统：{{ topBar.osName }}</span>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
              <span>{{ topBar.upTime }}</span>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="12">
              <a class="color-warning" :href="topBar.adv.url" target="_blank">
                <a-icon class="mar5" type="notification" />
                {{ topBar.adv.info }}
              </a>
            </a-col>
            <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="4">
              <a-badge dot class="font12px">
                <a href="https://github.com/Wjinlei/hwspanel" target="_blank" class="color666">
                  <a-icon type="github" />
                </a>
                版本：{{ topBar.curVer }}
              </a-badge>
              <a href="#" class="mal10">更新</a>
              <a href="#" class="mal5">其他</a>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>
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
                <h4 class="color-title ma5">{{ item.title}}</h4>
                <a-progress
                  type="circle"
                  :percent="item.data"
                  :strokeColor="handleProgressColor(item.data)"
                />
                <h4 class="color777 ma5 font12px">{{ item.info }}</h4>
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
            <router-link :to="item.url">
              <a-card class="bgf8 text-center hover" :bordered="false">
                <p>
                  <a-icon class="ma5" :type="item.class" />
                  {{ item.title}}
                </p>
                <p class="font22px color-primary">{{ item.data }}</p>
              </a-card>
            </router-link>
          </a-col>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[10,10]">
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <a-card size="small" style="height: 550px; overflow: auto;">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="link" />快捷操作
          </span>
          <ul class="dragsort">
            <li v-for="item in quickOperation" :key="item.id" class="ma5 text-center">
              <a-card class="bgf8 text-left hover" :bordered="false">
                <div class="flex">
                  <div
                    :style="item.icon"
                    style="
                      background-repeat: no-repeat;
                      display: inline-block;
                      width: 50px;
                      height: 50px;">
                  </div>
                  <div style="display: inline-block;">
                    <p class="font14px">{{ item.name }}</p>
                    <p class="color-primary font12px">{{ item.description }}</p>
                  </div>
                </div>
              </a-card>
            </li>
          </ul>
        </a-card>
      </a-col>
      <a-col :xs="24" :sm="24" :md="24" :lg="24" :xl="12">
        <a-card size="small" style="min-height: 550px;">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="area-chart" />实时流量
          </span>
          <ul class="dragsort flex-row-space-between-wrap">
            <li
              class="font12px color888 text-center"
              style="width: 140px; padding: 25px 15px 0px;"
              v-for="item in traffic"
              :key="item.title"
            >
              <p>
                <span :class="item.class"></span>
                {{ item.title }}
              </p>
              <span>{{ item.data }}</span>
            </li>
          </ul>
          <div id="trafficChart" style="width: 100%; height: 400px;"></div>
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
                  <a-icon class="mar5" :type="item.iconType" />
                  {{ item.title }}
                </p>
                <p :class="item.class">{{ item.description }}</p>
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
    iconType: "message",
    class: "color-success",
    description: "有问题，上论坛发帖求助。"
  },
  {
    title: "官网",
    url: "https://www.hws.com",
    target: "_blank",
    iconType: "star",
    class: "color-error",
    description: "服务器安全，认准护卫神。"
  },
  {
    title: "800181978",
    url: "#",
    target: "_self",
    iconType: "qq",
    class: "color-primary",
    description: "在线沟通更流畅、更便利。"
  },
  {
    title: "028-89549999",
    url: "#",
    target: "_self",
    iconType: "phone",
    class: "color-warning",
    description: "电话沟通更准确，更效率。"
  },
  {
    title: "帮助",
    url: "https://www.hws.com/help/LinuxMaster",
    target: "_blank",
    iconType: "solution",
    class: "color-success",
    description: "帮助文档、教程、和知识。"
  }
];
export default {
  data() {
    return {
      topBar: {
        osName: "centos 8.2.2004",
        upTime: "已不间断运行: 6天",
        curVer: "v1.0.0",
        adv: {
          info: "如何让服务器更安全？",
          url: "https://www.hws.com/security"
        }
      },
      systemResource: [
        { data: 81, title: "平均负载", info: "运行缓慢" },
        { data: 93, title: "CPU使用率", info: "2核心" },
        { data: 30, title: "内存使用率", info: "546.02(MB)/1.78(GB)" },
        { data: 14, title: "/", info: "14.51(GB)/39.99(GB)" }
      ],
      dataOverview: [
        { title: "网站", url: "/site", class: "global", data: 10 },
        { title: "数据库", url: "/db", class: "database", data: 9 },
        { title: "日志条数", url: "/log", class: "snippets", data: 11 }
      ],
      traffic: [
        {
          title: "上行",
          class: "trafficIcon bg-warning",
          data: 23,
          dataList: [12, 20, 10, 13, 15, 14, 11]
        },
        {
          title: "下行",
          class: "trafficIcon bg-primary",
          data: 240,
          dataList: [10, 25, 12, 10, 20, 12, 10]
        },
        { title: "总发送", class: "", data: 12 },
        { title: "总接收", class: "", data: 24 }
      ],
      quickOperation: [
        {
            name: "Apache",
            description: "使用人数最多的Web服务器",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-apache.png')" },
        },
        {
            name: "Nginx",
            description: "小巧精悍的反向代理服务器",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-nginx.png')" },
        },
        {
            name: "MySQL 8.0.19",
            description: "MYSQL是一款关系型数据库",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-mysql.png')" },
        },
        {
            name: "PureFTPd",
            description: "PureFTPd是一款主打安全的FTP服务器软件",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-pureftpd.png')" },
        },
        {
            name: "Redis",
            description: "内存型数据库,一般用于缓存数据",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-redis.png')" },
        },
        {
            name: "PHP53",
            description: "PHP是世界上最好的语言",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
        },
        {
            name: "PHP54",
            description: "PHP是世界上最好的语言",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
        },
        {
            name: "PHP55",
            description: "PHP是世界上最好的语言",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
        },
        {
            name: "PHP56",
            description: "PHP是世界上最好的语言",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
        },
        {
            name: "PHP70",
            description: "PHP是世界上最好的语言",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
        },
        {
            name: "PHP71",
            description: "PHP是世界上最好的语言",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
        },
        {
            name: "PHP72",
            description: "PHP是世界上最好的语言",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
        },
        {
            name: "PHP73",
            description: "PHP是世界上最好的语言",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
        },
        {
            name: "phpMyAdmin",
            description: "phpMyAdmin是一款(PHP写的)基于Web的MySQL数据库管理工具",
            icon: { backgroundImage: "url('/static/img/soft_ico/ico-phpmyadmin.png')" },
        },
      ],
      technicalSupport
    };
  },
  mounted() {
    this.dragsortToLi();
    setTimeout(() => {
      let load = this.loadingMsg();
      this.drawTrafficChart();
    }, 20);
  }
};
</script>

<style scoped>
.hover:hover {
  background-color: #ededed;
}

.trafficIcon {
  width: 14px;
  height: 8px;
  display: inline-block;
  margin-right: 3px;
}

.flex {
    display: flex;
    align-items: center;
    justify-content: flex-start;
}
</style>
