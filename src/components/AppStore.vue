<template>
  <div>
    <!-- 以下代码在多个地方出现了重复 -->
    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small" :bordered="false" class="font12px">
          <a-row :gutter="[5,5]">
            <a-col :span="24" class="flex-row-space-between-wrap">
              <a-breadcrumb>
                <a-breadcrumb-item>
                  <a-icon type="home" />
                  <router-link to="/">首页</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>应用商店</a-breadcrumb-item>
              </a-breadcrumb>
              <a-input-search
                style="width: 300px;"
                placeholder="应用搜索"
                enter-button
                @search="onSearch"
              />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">应用列表</span>
          <div class="mab10">
            <a-button type="dashed">更新应用列表</a-button>
            <div id="0" class="btn btnGroup active" @click="onFilter('#0')">全部</div>
            <div id="1" class="btn btnGroup" @click="onFilter('#1')">运行环境</div>
            <div id="2" class="btn btnGroup" @click="onFilter('#2')">服务</div>
          </div>
          <a-table :scroll="{ x: 445 }" :columns="columns" :data-source="data" size="small">
            <span
              slot="name"
              slot-scope="name, record"
              style="display: flex; justify-content: flex-start; align-items: center"
            >
              <div
                :style="record.icon"
                style="width: 25px; height: 25px; background-size: 25px 25px;"
              ></div>
              <span>{{ name }}</span>
            </span>

            <a-badge slot="status" slot-scope="status, record" :status="status" :text="record.msg" />

            <a-switch
              v-if="record.status != 'error'"
              slot="index"
              slot-scope="index, record"
              size="small"
              :checked="index"
              @change="onChange"
            />

            <template slot="operation" slot-scope="text, record">
              <span v-if="record.status == 'error'">
                <a href="javascript:;" v-on:click="onInstall(record)">安装</a>
              </span>

              <span v-if="record.status != 'error'">
                <a href="javascript:;" v-on:click="onSetting(record)">设置</a>
                <a-divider type="vertical" />
                <a href="javascript:;" v-on:click="onDelete(record.key)">卸载</a>
              </span>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    title: "软件名称",
    dataIndex: "name",
    key: "name",
    width: 200,
    ellipsis: true,
    className: "table_title",
    scopedSlots: { customRender: "name" }
  },
  {
    title: "软件说明",
    dataIndex: "description",
    key: "description",
    className: "table_title",
    ellipsis: true
  },
  {
    title: "分类",
    dataIndex: "class",
    key: "class",
    width: 100,
    ellipsis: true,
    className: "table_title",
    scopedSlots: { customRender: "class" }
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    width: 80,
    ellipsis: true,
    className: "table_title",
    scopedSlots: { customRender: "status" }
  },
  {
    title: "首页显示",
    dataIndex: "index",
    key: "index",
    scopedSlots: { customRender: "index" },
    className: "text-center table_title",
    width: 75
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    className: "table_title",
    scopedSlots: { customRender: "operation" },
    width: 90
  }
];

const data = [
  {
    key: "1",
    name: "Nginx",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-nginx.png')" },
    description: "高性能的反向代理服务器",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "2",
    name: "Apache",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-apache.png')" },
    description: "世界使用排名第一的Web服务器软件",
    class: "运行环境",
    status: "warning",
    msg: "已停止",
    index: true
  },
  {
    key: "3",
    name: "MySQL 5.7.29",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-mysql.png')" },
    description: "MYSQL是一款关系型数据库",
    class: "运行环境",
    status: "error",
    msg: "未安装",
    index: false
  },
  {
    key: "4",
    name: "MySQL 5.6.40",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-mysql.png')" },
    description: "MYSQL是一款关系型数据库",
    class: "运行环境",
    status: "error",
    msg: "未安装",
    index: false
  },
  {
    key: "5",
    name: "MySQL 5.5.38",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-mysql.png')" },
    description: "MYSQL是一款关系型数据库",
    class: "运行环境",
    status: "error",
    msg: "未安装",
    index: false
  },
  {
    key: "6",
    name: "MySQL 8.0.19",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-mysql.png')" },
    description: "MYSQL是一款关系型数据库",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "7",
    name: "PureFTPd",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-pureftpd.png')" },
    description: "PureFTPd是一款主打安全的FTP服务器软件",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "8",
    name: "Redis",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-redis.png')" },
    description: "内存型数据库,一般用于缓存数据",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "9",
    name: "phpMyAdmin",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-phpmyadmin.png')" },
    description: "phpMyAdmin是一款(PHP写的)基于Web的MySQL数据库管理工具",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "10",
    name: "PHP 5.4.45",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
    description: "PHP是世界上最好的编程语言",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "11",
    name: "PHP 5.5.38",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
    description: "PHP是世界上最好的编程语言",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "12",
    name: "PHP 5.6.40",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
    description: "PHP是世界上最好的编程语言",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "13",
    name: "PHP 7.0.33",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
    description: "PHP是世界上最好的编程语言",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "14",
    name: "PHP 7.1.33",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
    description: "PHP是世界上最好的编程语言",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "15",
    name: "PHP 7.2.27",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
    description: "PHP是世界上最好的编程语言",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "16",
    name: "PHP 7.3.14",
    icon: { backgroundImage: "url('/static/img/soft_ico/ico-php.png')" },
    description: "PHP是世界上最好的编程语言",
    class: "运行环境",
    status: "success",
    msg: "运行中",
    index: true
  },
  {
    key: "17",
    name: "护卫神.高级安全防护",
    icon: { backgroundImage: "url('/static/img/logo_50x50.png')" },
    description: "入侵防护系统，人工安全加固，网站安全策略，网页木马审计",
    class: "服务",
    status: "error",
    msg: "未部署",
    index: false
  },
  {
    key: "18",
    name: "护卫神.网站挂码清理",
    icon: { backgroundImage: "url('/static/img/logo_50x50.png')" },
    description: "由我司安全工程师人工清理网站中的挂马代码",
    class: "服务",
    status: "error",
    msg: "未部署",
    index: false
  },
  {
    key: "19",
    name: "护卫神.网页木马审计",
    icon: { backgroundImage: "url('/static/img/logo_50x50.png')" },
    description: "由我司安全工程师人工找出网站中的网页木马文件",
    class: "服务",
    status: "error",
    msg: "未部署",
    index: false
  },
  {
    key: "20",
    name: "护卫神.故障应急响应",
    icon: { backgroundImage: "url('/static/img/logo_50x50.png')" },
    description:
      "排查各种系统故障，如：MySQL不稳定、PHP错误、网站打不开等，能解决才收费。",
    class: "服务",
    status: "error",
    msg: "未部署",
    index: false
  }
];

export default {
  data() {
    return {
      columns,
      data,
    };
  },
  mounted() {
    setTimeout(() => {
      let load = this.loadingMsg();
    }, 20);
  },
  methods: {
    onInstall(record) {
      this.successMsg(record.name);
    },
    onSetting(record) {
      this.successMsg(record.name);
    },
    onDelete(key) {
      this.successMsg(key);
    },
    onSearch(value) {
      this.successMsg(value);
    },
    onChange(value) {
      console.log(value);
    },
    onFilter(btnId) {
      this.loadingMsg();
      $(".btnGroup").removeClass("active");
      $(btnId).addClass("active");
    }
  }
};
</script>

<style scoped>
.btn {
  width: 80px;
  height: 30px;
  background: #ededed;
  display: inline-block;
  padding: 5px;
  margin: 5px;
  cursor: pointer;
  text-align: center;
}
.active {
  background: #108ee9 !important;
  color: #fff;
}
</style>
