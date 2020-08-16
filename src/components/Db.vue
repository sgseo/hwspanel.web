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
                <a-breadcrumb-item>数据库</a-breadcrumb-item>
              </a-breadcrumb>
              <a-input-search
                style="width: 300px;"
                placeholder="数据库搜索"
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
          <span slot="title">数据库列表</span>
          <div class="mab10">
            <a-button type="primary" class="mar5">添加数据库</a-button>
            <a-button type="dashed">重建所有数据库</a-button>
          </div>
          <a-table :scroll="{ x: 1050 }" :columns="columns" :data-source="data" size="small">
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

            <!-- 其实我觉得下面的这个功能实现的方法不好,但暂时没想到更好的办法 -->
            <div slot="dbPass" slot-scope="text, record">
              <span :id="record.dbUser" v-show="recordKey == record.key">{{ text }}</span>
              <span v-show="recordKey != record.key">***********</span>
              <a-icon
                type="eye-invisible"
                class="mal5"
                v-if="recordKey == record.key"
                @click="() => (recordKey = 0)"
              />
              <a-icon type="eye" class="mal5" v-else @click="() => (recordKey = record.key)" />
              <a-icon type="copy" class="mal5" @click="copyToClipboard(text, record.dbUser)" />
            </div>

            <a-badge slot="status" slot-scope="status, record" :status="status" :text="record.msg" />

            <template slot="operation" slot-scope="text, record">
              <a href="javascript:;" v-on:click="onManage(record)">管理</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="onSetting(record)">设置</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="onRebuild(record.key)">重建</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="onDelete(record.key)">删除</a>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
const data = [
  {
    key: "1",
    status: "success",
    dbName: "www_test1_com",
    dbUser: "www_test1_com",
    dbPass: "ZTDB5QmyaXXXDrXx",
    dbSite: "www.test1.com",
    comment: "测试数据库1,归属网站www.test1.com",
    msg: "正常"
  },
  {
    key: "2",
    status: "success",
    dbName: "www_test2_com",
    dbUser: "www_test2_com",
    dbPass: "QErDWGrRyAxK7aJH",
    dbSite: "www.test2.com",
    comment: "测试数据库2,归属网站www.test2.com",
    msg: "正常"
  },
  {
    key: "3",
    status: "error",
    dbName: "www_test3_com",
    dbUser: "www_test3_com",
    dbPass: "rNCPShNwfjaYpAeX",
    dbSite: "www.test3.com",
    comment: "测试数据库3,归属网站www.test3.com",
    msg: "异常"
  },
  {
    key: "4",
    status: "success",
    dbName: "www_test4_com",
    dbUser: "www_test4_com",
    dbPass: "kmC4Djc54yEjM6jr",
    dbSite: "www.test4.com",
    comment: "测试数据库4,归属网站www.test4.com",
    msg: "正常"
  },
  {
    key: "5",
    status: "success",
    dbName: "www_test5_com",
    dbUser: "www_test5_com",
    dbPass: "yX8YbZkWZPnsej68",
    dbSite: "www.test5.com",
    comment: "测试数据库5,归属网站www.test5.com",
    msg: "正常"
  },
  {
    key: "6",
    status: "success",
    dbName: "www_test6_com",
    dbUser: "www_test6_com",
    dbPass: "fx7X2EzbZQ4HKbXX",
    dbSite: "www.test6.com",
    comment: "测试数据库6,归属网站www.test6.com",
    msg: "正常"
  },
  {
    key: "7",
    status: "error",
    dbName: "www_test7_com",
    dbUser: "www_test7_com",
    dbPass: "wJe4D8Jrra3KzZFz",
    dbSite: "www.test7.com",
    comment: "测试数据库7,归属网站www.test7.com",
    msg: "异常"
  },
  {
    key: "8",
    status: "success",
    dbName: "www_test8_com",
    dbUser: "www_test8_com",
    dbPass: "P2cbYmSYmHTtJKjD",
    dbSite: "www.test8.com",
    comment: "测试数据库8,归属网站www.test8.com",
    msg: "正常"
  },
  {
    key: "9",
    status: "success",
    dbName: "www_test9_com",
    dbUser: "www_test9_com",
    dbPass: "Shx5XPpkmT2kScCW",
    dbSite: "www.test9.com",
    comment: "测试数据库9,归属网站www.test9.com",
    msg: "正常"
  }
];
export default {
  data() {
    return {
      data,
      recordKey: 0,
      searchText: "",
      searchInput: null,
      columns: [
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          ellipsis: true,
          width: 70,
          scopedSlots: { customRender: "status" },
          className: "table_title",
          filters: [
            {
              text: "正常",
              value: "success"
            },
            {
              text: "异常",
              value: "error"
            }
          ],
          onFilter: (value, record) => record.status.indexOf(value) === 0
        },
        {
          title: "数据库名称",
          dataIndex: "dbName",
          key: "dbName",
          ellipsis: true,
          width: 200,
          className: "table_title",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon"
          },
          onFilter: (value, record) =>
            record.dbName
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
          title: "数据库账户",
          dataIndex: "dbUser",
          key: "dbUser",
          ellipsis: true,
          width: 200,
          className: "table_title",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon"
          },
          onFilter: (value, record) =>
            record.dbUser
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
          title: "数据库密码",
          dataIndex: "dbPass",
          key: "dbPass",
          ellipsis: true,
          width: 200,
          className: "table_title",
          scopedSlots: { customRender: "dbPass" }
        },
        {
          title: "归属网站",
          dataIndex: "dbSite",
          key: "dbSite",
          ellipsis: true,
          width: 200,
          className: "table_title",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon"
          },
          onFilter: (value, record) =>
            record.dbSite
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
          title: "备注",
          dataIndex: "comment",
          key: "comment",
          ellipsis: true,
          className: "table_title",
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
          width: 180,
          className: "table_title"
        }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      let load = this.loadingMsg();
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

    onManage(record) {
      this.successMsg(record.dbName);
    },

    onSetting(record) {
      this.successMsg(record.dbName);
    },

    onRebuild(key) {
      this.successMsg(key);
    },

    onDelete(key) {
      this.successMsg(key);
    },

    onSearch(value) {
      this.successMsg(value);
    }
  }
};
</script>
