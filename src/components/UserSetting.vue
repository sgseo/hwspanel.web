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
                <a-breadcrumb-item>用户设置</a-breadcrumb-item>
              </a-breadcrumb>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">用户设置</span>
          <div class="mab10">
            <a-button type="primary" class="mar5">添加用户</a-button>
          </div>
          <a-table :scroll="{ x: 1045 }" :columns="columns" :data-source="data" size="small">
            <!-- 其实我觉得下面的这个功能实现的方法不好,但暂时没想到更好的办法 -->
            <!-- 以下代码在多个地方出现了重复 -->
            <div slot="password" slot-scope="text, record">
              <span :id="record.username" v-show="recordKey == record.key">{{ text }}</span>
              <span v-show="recordKey != record.key">***********</span>
              <a-icon
                type="eye-invisible"
                class="mal5"
                v-if="recordKey == record.key"
                @click="() => (recordKey = 0)"
              />
              <a-icon type="eye" class="mal5" v-else @click="() => (recordKey = record.key)" />
              <a-icon
                type="copy"
                class="mal5"
                @click="public_tools_copy_to_clipboard(text, record.username)"
              />
            </div>

            <template slot="operation" slot-scope="text, record">
              <a href="javascript:;" v-on:click="onSetting(record)">修改密码</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="onDelete(record)">删除用户</a>
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
    title: "用户名",
    dataIndex: "username",
    key: "username",
    width: 300,
    ellipsis: true,
    className: "table_title"
  },
  {
    title: "密码",
    dataIndex: "password",
    key: "password",
    width: 300,
    ellipsis: true,
    className: "table_title",
    scopedSlots: { customRender: "password" }
  },
  {
    title: "最后登录IP",
    dataIndex: "lastip",
    key: "lastip",
    width: 300,
    ellipsis: true,
    className: "table_title"
  },
  {
    title: "最后登陆时间",
    dataIndex: "lasttime",
    key: "lasttime",
    ellipsis: true,
    className: "table_title"
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
    width: 145,
    className: "table_title"
  }
];

const data = [
  {
    key: 1,
    username: "testuser1",
    password: "Ff7Zas2asSJPZSs6mxZZzJCiziW",
    lastip: "47.108.50.154",
    lasttime: "2020-08-14 16:04:35"
  },
  {
    key: 2,
    username: "testuser2",
    password: "PZSys6qnxSNusXSPmxZZzJCiziW",
    lastip: "222.209.173.49",
    lasttime: "2020-08-13 09:03:23"
  }
];
export default {
  data() {
    return {
      columns,
      data,
      recordKey: 0
    };
  },
  mounted() {
    setTimeout(() => {
      let load = this.public_msg_loading();
    }, 20);
  },
  methods: {
    onSetting(record) {
      this.public_msg_success(record.username);
    },
    onDelete(record) {
      let vm = this;
      this.public_msg_confirm(
        "删除用户确认",
        "您真的要删除[" + record.username + "]吗?",
        function() {
          vm.public_msg_success("删除成功!");
        }
      );
    }
  }
};
</script>
