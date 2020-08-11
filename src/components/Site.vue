<template>
  <div>
    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small" :bordered="false" class="font12px">
          <a-row :gutter="[5,5]">
            <a-col :span="24" class="flex-row-space-between-wrap">
              <a-breadcrumb>
                <a-breadcrumb-item>
                  <a-icon type="home" />
                  <router-link to="/">
                    <span>首页</span>
                  </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>网站管理</a-breadcrumb-item>
              </a-breadcrumb>
              <a-input-search
                  style="width: 300px;"
                  placeholder="域名搜索" enter-button @search="onSearch" />
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">网站列表</span>
          <div class="mab10">
            <a-button type="primary" class="mar5">添加网站</a-button>
            <a-button type="dashed">重建网站</a-button>
          </div>
          <a-table :columns="columns" :data-source="data" bordered size="middle">
            <div
              slot="filterDropdown"
              slot-scope="{ setSelectedKeys, selectedKeys, confirm, clearFilters, column }"
              style="padding: 8px"
            >
              <a-input
                v-ant-ref="c => (searchInput = c)"
                :placeholder="`Search ${column.dataIndex}`"
                :value="selectedKeys[0]"
                style="width: 188px; margin-bottom: 8px; display: block;"
                @change="e => setSelectedKeys(e.target.value ? [e.target.value] : [])"
                @pressEnter="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
              />
              <a-button
                type="primary"
                icon="search"
                size="small"
                style="width: 90px; margin-right: 8px"
                @click="() => handleSearch(selectedKeys, confirm, column.dataIndex)"
              >过滤</a-button>
              <a-button size="small" style="width: 90px" @click="() => handleReset(clearFilters)">重置</a-button>
            </div>
            <a-icon
              slot="filterIcon"
              slot-scope="filtered"
              type="search"
              :style="{ color: filtered ? '#108ee9' : undefined }"
            />

            <template slot="operation" slot-scope="text, record">
              <a class="font12px" href="javascript:;" v-on:click="onSetting(record)">设置</a>
              <a-divider type="vertical" />
              <a class="font12px" href="javascript:;" v-on:click="onDelete(record.key)">删除</a>
            </template>

            <a-tag
              v-if="siteStatus == '运行中'"
              color="green"
              slot="siteStatus"
              slot-scope="siteStatus"
            >{{ siteStatus }}</a-tag>
            <a-tag
              v-else-if="siteStatus == '已暂停'"
              color="orange"
              slot="siteStatus"
              slot-scope="siteStatus"
            >{{ siteStatus }}</a-tag>
            <a-tag
              v-else-if="siteStatus == '异常'"
              color="red"
              slot="siteStatus"
              slot-scope="siteStatus"
            >{{ siteStatus }}</a-tag>

            <a-tag
              v-if="ftpStatus == '已启用'"
              color="green"
              slot="ftpStatus"
              slot-scope="ftpStatus"
            >{{ ftpStatus }}</a-tag>
            <a-tag
              v-else-if="ftpStatus == '已停止'"
              color="orange"
              slot="ftpStatus"
              slot-scope="ftpStatus"
            >{{ ftpStatus }}</a-tag>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const columns = [
  {
    title: "状态",
    dataIndex: "siteStatus",
    key: "siteStatus",
    width: 70,
    scopedSlots: { customRender: "siteStatus" },
    className: "text-center",
    filters: [
      {
        text: "运行中",
        value: "运行中"
      },
      {
        text: "已暂停",
        value: "已暂停"
      },
      {
        text: "异常",
        value: "异常"
      }
    ],
    onFilter: (value, record) => record.siteStatus.indexOf(value) === 0
  },
  {
    title: "网站名称",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    width: 150,
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    },
    onFilter: (value, record) =>
      record.name
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    }
  },
  {
    title: "网站路径",
    dataIndex: "path",
    key: "path",
    ellipsis: true,
    width: 300
  },
  {
    title: "FTP",
    dataIndex: "ftpStatus",
    key: "ftpStatus",
    width: 70,
    scopedSlots: { customRender: "ftpStatus" },
    className: "text-center",
    filters: [
      {
        text: "已启用",
        value: "已启用"
      },
      {
        text: "已停止",
        value: "已停止"
      }
    ],
    onFilter: (value, record) => record.ftpStatus.indexOf(value) === 0
  },
  {
    title: "FTP账户",
    dataIndex: "ftpUser",
    key: "ftpUser",
    ellipsis: true,
    width: 150,
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    },
    onFilter: (value, record) =>
      record.ftpUser
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    }
  },
  {
    title: "FTP密码",
    dataIndex: "ftpPass",
    key: "ftpPass",
    ellipsis: true,
    width: 150
  },
  {
    title: "开通时间",
    dataIndex: "createTime",
    key: "createTime",
    ellipsis: true,
    width: 200,
    sorter: (a, b) => a.createTime > b.createTime,
    defaultSortOrder: "descend"
  },
  {
    title: "备注",
    dataIndex: "comment",
    key: "comment",
    ellipsis: true,
    scopedSlots: {
      filterDropdown: "filterDropdown",
      filterIcon: "filterIcon"
    },
    onFilter: (value, record) =>
      record.comment
        .toString()
        .toLowerCase()
        .includes(value.toLowerCase()),
    onFilterDropdownVisibleChange: visible => {
      if (visible) {
        setTimeout(() => {
          this.searchInput.focus();
        }, 0);
      }
    }
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
    width: 85
  }
];

const data = [
  {
    key: "1",
    siteStatus: "运行中",
    name: "www.hws.com",
    path: "/hwsmaster/wwwroot/www.hws.com",
    ftpStatus: "已启用",
    ftpUser: "www_hws_com",
    ftpPass: "8xn45345ZMGi6Ejs",
    createTime: "2020-8-9 12:06:27",
    comment: "测试网站1"
  },
  {
    key: "2",
    siteStatus: "已暂停",
    name: "www.test1.com",
    path: "/hwsmaster/wwwroot/www.test1.com",
    ftpStatus: "已启用",
    ftpUser: "www_test1_com",
    ftpPass: "xMxeekHnDjxH4npj",
    createTime: "2020-8-9 12:06:35",
    comment: "测试网站2"
  },
  {
    key: "3",
    siteStatus: "运行中",
    name: "www.test2.com",
    path: "/hwsmaster/wwwroot/www.test2.com",
    ftpStatus: "已停止",
    ftpUser: "www_test2_com",
    ftpPass: "PfTD5DskQihXi25B",
    createTime: "2020-8-9 12:06:40",
    comment: "测试网站3"
  },
  {
    key: "4",
    siteStatus: "异常",
    name: "www.test3.com",
    path: "/hwsmaster/wwwroot/www.test3.com",
    ftpStatus: "已启用",
    ftpUser: "www_test3_com",
    ftpPass: "CjKdxtS3AjxMn4Wd",
    createTime: "2020-8-9 12:06:52",
    comment: "测试网站4"
  },
  {
    key: "5",
    siteStatus: "已暂停",
    name: "www.test4.com",
    path: "/hwsmaster/wwwroot/www.test4.com",
    ftpStatus: "已停止",
    ftpUser: "www_test4_com",
    ftpPass: "ThAGzt5NxPN2naGs",
    createTime: "2020-8-9 12:12:53",
    comment: "测试网站5"
  },
  {
    key: "6",
    siteStatus: "已暂停",
    name: "www.test5.com",
    path: "/hwsmaster/wwwroot/www.test5.com",
    ftpStatus: "已启用",
    ftpUser: "www_test5_com",
    ftpPass: "ss8SthfT5r8xmat5",
    createTime: "2020-8-9 12:13:23",
    comment: "测试网站6"
  },
  {
    key: "7",
    siteStatus: "运行中",
    name: "www.test6.com",
    path: "/hwsmaster/wwwroot/www.test6.com",
    ftpStatus: "已启用",
    ftpUser: "www_test6_com",
    ftpPass: "pKSa7z4ECt5SyMGT",
    createTime: "2020-8-9 12:23:39",
    comment: "测试网站7"
  },
  {
    key: "8",
    siteStatus: "运行中",
    name: "www.test7.com",
    path: "/hwsmaster/wwwroot/www.test7.com",
    ftpStatus: "已启用",
    ftpUser: "www_test7_com",
    ftpPass: "bJDbDPGEG4YhzXd7",
    createTime: "2020-8-9 12:33:39",
    comment: "测试网站8"
  },
  {
    key: "9",
    siteStatus: "运行中",
    name: "www.test8.com",
    path: "/hwsmaster/wwwroot/www.test8.com",
    ftpStatus: "已启用",
    ftpUser: "www_test8_com",
    ftpPass: "wZaTBQmf6wRarffF",
    createTime: "2020-8-9 12:34:50",
    comment: "测试网站9"
  },
  {
    key: "10",
    siteStatus: "运行中",
    name: "www.test9.com",
    path: "/hwsmaster/wwwroot/www.test9.com",
    ftpStatus: "已启用",
    ftpUser: "www_test9_com",
    ftpPass: "Wx7scX4WeZiy8eJm",
    createTime: "2020-8-9 12:36:48",
    comment: "测试网站10"
  }
];

export default {
  data() {
    return {
      columns,
      data,
      searchInput: null
    };
  },
  mounted() {
    setTimeout(() => {
      let load = layer.msg("正在处理,请稍候...", {
        icon: 16,
        time: 2000,
        shade: [0.5, "#000"]
      });
    }, 20);
  },
  methods: {
    handleSearch(selectedKeys, confirm, dataIndex) {
      confirm();
      this.searchText = selectedKeys[0];
    },

    handleReset(clearFilters) {
      clearFilters();
      this.searchText = "";
    },

    onSetting(record) {
      layer.msg(record.comment, { icon: 1 });
    },

    onDelete(key) {
      layer.msg(key, { icon: 1 });
    },

    onSearch(value) {
      layer.msg(value, { icon: 1 });
    },
  }
};
</script>>
