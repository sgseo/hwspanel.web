<template>
  <div>
    <my-topbar title="日志" :leftWidth="100" :rightWidth="300">
      <a-input-search slot="right" placeholder="日志详情搜索，支持模糊匹配" enter-button @search="searchLog" />
    </my-topbar>

    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">日志列表</span>
          <a-alert
            class="ma5"
            message="面板出于安全角度考虑，并没有提供日志删除功能，如需删除日志，请查看官网教程"
            type="info"
            show-icon
          />
          <div class="mab10">
            <div id="0" class="btn active" @click="findTag('#0')">全部</div>
            <div id="1" class="btn" @click="findTag('#1')">用户登录</div>
            <div id="2" class="btn" @click="findTag('#2')">面板设置</div>
            <div id="3" class="btn" @click="findTag('#3')">网站设置</div>
            <div id="4" class="btn" @click="findTag('#4')">数据库设置</div>
            <div id="5" class="btn" @click="findTag('#5')">添加网站</div>
            <div id="6" class="btn" @click="findTag('#6')">删除网站</div>
            <div id="7" class="btn" @click="findTag('#7')">添加数据库</div>
            <div id="8" class="btn" @click="findTag('#8')">删除数据库</div>
            <div id="9" class="btn" @click="findTag('#9')">软件设置</div>
            <div id="10" class="btn" @click="findTag('#10')">软件安装</div>
            <div id="11" class="btn" @click="findTag('#11')">软件卸载</div>
            <div id="12" class="btn" @click="findTag('#12')">停止相关</div>
            <div id="13" class="btn" @click="findTag('#13')">重启相关</div>
          </div>
          <a-table :scroll="{ x: 600 }" :columns="columns" :data-source="data" size="small"></a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    title: "用户",
    dataIndex: "name",
    key: "name",
    width: 150,
    ellipsis: true,
    className: "table_title",
    scopedSlots: { customRender: "username" }
  },
  {
    title: "详情",
    dataIndex: "details",
    key: "details",
    ellipsis: true,
    className: "table_title"
  },
  {
    title: "操作IP",
    dataIndex: "ip",
    key: "ip",
    width: 150,
    ellipsis: true,
    className: "table_title"
  },
  {
    title: "操作时间",
    dataIndex: "time",
    key: "time",
    width: 200,
    ellipsis: true,
    className: "table_title"
  },
  {
    title: "日志类型",
    dataIndex: "type",
    key: "type",
    width: 100,
    ellipsis: true,
    className: "table_title"
  }
];
const data = [
  {
    key: "1",
    name: "testuser1",
    details: "登录成功,帐号:testuser1,登录IP:192.168.0.1",
    ip: "192.168.0.1",
    time: "2020-08-13 23:53:50",
    type: "用户登录"
  },
  {
    key: "2",
    name: "testuser1",
    details: "安装phpMyAdmin成功,操作帐号:testuser1,操作IP:192.168.0.1",
    ip: "192.168.0.1",
    time: "2020-08-13 23:53:52",
    type: "软件安装"
  },
  {
    key: "3",
    name: "testuser1",
    details: "添加网站www_test1_com,操作帐号:testuser1,操作IP:192.168.0.1",
    ip: "192.168.0.1",
    time: "2020-08-13 23:55:13",
    type: "添加网站"
  },
  {
    key: "4",
    name: "testuser2",
    details: "登录成功,帐号:testuser2,登录IP:10.35.10.2",
    ip: "10.35.10.2",
    time: "2020-08-13 23:58:32",
    type: "用户登录"
  },
  {
    key: "5",
    name: "testuser2",
    details: "添加数据库www_test1_com,操作帐号:testuser2,操作IP:10.35.10.2",
    ip: "10.35.10.2",
    time: "2020-08-13 23:58:40",
    type: "添加数据库"
  },
  {
    key: "6",
    name: "testuser2",
    details: "删除网站www_test1_com,操作帐号:testuser2,操作IP:10.35.10.2",
    ip: "10.35.10.2",
    time: "2020-08-13 00:00:32",
    type: "删除网站"
  },
  {
    key: "7",
    name: "testuser1",
    details: "添加网站www_test2_com,操作帐号:testuser1,操作IP:192.168.0.1",
    ip: "192.168.0.1",
    time: "2020-08-13 00:02:41",
    type: "添加网站"
  },
  {
    key: "8",
    name: "testuser1",
    details: "添加数据库www_test2_com,操作帐号:testuser1,操作IP:192.168.0.1",
    ip: "192.168.0.1",
    time: "2020-08-13 00:02:41",
    type: "添加数据库"
  },
  {
    key: "9",
    name: "testuser1",
    details: "安装PHP 7.1.33,操作帐号:testuser1,操作IP:192.168.0.1",
    ip: "192.168.0.1",
    time: "2020-08-13 00:05:26",
    type: "软件安装"
  },
  {
    key: "10",
    name: "testuser1",
    details: "安装PHP 7.2.27,操作帐号:testuser1,操作IP:192.168.0.1",
    ip: "192.168.0.1",
    time: "2020-08-13 00:06:11",
    type: "软件安装"
  },
  {
    key: "11",
    name: "testuser1",
    details: "安装MySQL 5.7.29,操作帐号:testuser1,操作IP:192.168.0.1",
    ip: "192.168.0.1",
    time: "2020-08-13 00:08:03",
    type: "软件安装"
  }
];
export default {
  data() {
    return {
      columns,
      data
    };
  },
  mounted() {
    setTimeout(() => {
      let load = this.public_msg_loading();
    }, 20);
  },
  methods: {
    searchLog(value) {
      this.public_msg_success(value);
    },

    findTag(btnId) {
      this.public_msg_loading();
      $(btnId)
        .addClass("active")
        .siblings()
        .removeClass("active");
    }
  }
};
</script>>

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
