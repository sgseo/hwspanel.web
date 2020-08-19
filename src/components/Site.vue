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
                <a-breadcrumb-item>网站管理</a-breadcrumb-item>
              </a-breadcrumb>
              <a-input-search
                style="width: 300px;"
                placeholder="域名搜索"
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
          <span slot="title">网站列表</span>
          <div class="mab10">
            <a-button type="primary" class="mar5">添加网站</a-button>
            <a-button type="dashed" @click="onRebuildAll">重建所有网站</a-button>
          </div>
          <a-table
            :scroll="{ x: 1215 }"
            :columns="sitesColumns"
            :data-source="sitesData"
            size="small"
          >
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
            <div slot="ftpPass" slot-scope="text, record">
              <span :id="record.ftpUser" v-show="recordKey == record.key">{{ text }}</span>
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
                @click="public_tools_copy_to_clipboard(text, record.ftpUser)"
              />
            </div>

            <a-badge
              slot="siteStatus"
              slot-scope="text, record"
              :status="text"
              :text="record.siteMsg"
            />
            <a-badge
              slot="ftpStatus"
              slot-scope="text, record"
              :status="text"
              :text="record.ftpMsg"
            />

            <template slot="operation" slot-scope="text, record">
              <a href="javascript:;" v-on:click="onSetting(record)">设置</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="onRebuild(record)">重建</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="onDelete(record)">删除</a>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

    <div id="setting" class="left-tabs-container" v-show="false">
      <a-tabs
        default-active-key="1"
        size="small"
        tab-position="left"
        type="card"
        :tabBarGutter="0"
        @change="callback"
      >
        <a-tab-pane key="1" tab="域名管理">
          <div class="flex-row-space-between-wrap mab10">
            <a-textarea
              placeholder="
每行填写一个域名，默认端口为80
泛解析添加方法 *.domain.com
如需另加端口，格式为 www.domain.com:8080"
              :rows="5"
              style="width: 400px;"
            />
            <a-button type="primary">添加</a-button>
          </div>
          <a-table
            :scroll="{ x: 160 }"
            :columns="domainsColumns"
            :data-source="domainsData"
            size="small"
            style="width: 100%;"
          >
            <template slot="operation" slot-scope="text, record">
              <a-button
                icon="delete"
                type="dashed"
                size="small"
                @click="onDeleteDomainName(record)"
              ></a-button>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="2" tab="运行目录" force-render>
          <a-alert
            class="mab10"
            message="部分程序需要指定二级目录作为运行目录，如ThinkPHP5，Laravel"
            type="info"
            show-icon
            banner
          />运行目录
          <a-input class="mal10" addon-before="web" style="width: 300px;" />
          <a-button class="mal10" type="primary">保存</a-button>
        </a-tab-pane>
        <a-tab-pane key="3" tab="子目录绑定">
          <div class="flex-row-flex-start-nowrap mab10">
            目录路径
            <a-input class="mal10" addon-before="web" style="width: 400px;" />
          </div>
          <div class="flex-row-flex-start-nowrap mab10">
            绑定域名
            <a-textarea
              class="mal10"
              placeholder="
每行填写一个域名，默认端口为80
泛解析添加方法 *.domain.com
如需另加端口，格式为 www.domain.com:8080"
              :rows="5"
              style="width: 325px;"
            />
            <a-button class="mal10" type="primary">添加</a-button>
          </div>
          <div>
            <a-table
              :scroll="{ x: 360 }"
              :columns="subDomainsColumns"
              :data-source="subDomainsData"
              size="small"
              style="width: 100%;"
            >
              <template slot="operation" slot-scope="text, record">
                <a-button
                  icon="delete"
                  type="dashed"
                  size="small"
                  @click="onDeleteDomainName(record)"
                ></a-button>
              </template>
            </a-table>
          </div>
        </a-tab-pane>
        <a-tab-pane key="4" tab="配置文件">
          <span class="font12px">提示：Ctrl+F 搜索关键字，Ctrl+H 查找并替换，Alt+G 跳转到指定行的指定字符</span>
          <div style="height: 500px;">
            <codemirror v-model="config"></codemirror>
          </div>
        </a-tab-pane>
        <a-tab-pane key="5" tab="SSL绑定">Content of Tab Pane 5</a-tab-pane>
        <a-tab-pane key="6" tab="伪静态">Content of Tab Pane 6</a-tab-pane>
        <a-tab-pane key="7" tab="PHP版本">Content of Tab Pane 7</a-tab-pane>
        <a-tab-pane key="8" tab="IP黑名单">Content of Tab Pane 8</a-tab-pane>
        <a-tab-pane key="9" tab="IP白名单">Content of Tab Pane 9</a-tab-pane>
        <a-tab-pane key="10" tab="带宽限制">Content of Tab Pane 10</a-tab-pane>
        <a-tab-pane key="11" tab="FTP设置">Content of Tab Pane 11</a-tab-pane>
        <a-tab-pane key="12" tab="压缩解压缩">Content of Tab Pane 12</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
const domainsData = [
  {
    key: 1,
    domainName: "www.test1.com",
    port: "80"
  }
];

const subDomainsData = [
  {
    key: 1,
    domainName: "www.subtest1.com",
    port: "80",
    path: "/static"
  }
];

const sitesData = [
  {
    key: "1",
    siteStatus: "success",
    siteMsg: "正常",
    siteName: "www.hws.com",
    sitePath: "/hwsmaster/wwwroot/www.hws.com",
    ftpStatus: "success",
    ftpMsg: "正常",
    ftpUser: "www_hws_com",
    ftpPass: "8xn45345ZMGi6Ejs",
    createTime: "2020-8-9 12:06:27",
    comment: "测试网站1"
  },
  {
    key: "2",
    siteStatus: "warning",
    siteMsg: "暂停",
    siteName: "www.test1.com",
    sitePath: "/hwsmaster/wwwroot/www.test1.com",
    ftpStatus: "success",
    ftpMsg: "正常",
    ftpUser: "www_test1_com",
    ftpPass: "xMxeekHnDjxH4npj",
    createTime: "2020-8-9 12:06:35",
    comment: "测试网站2"
  },
  {
    key: "3",
    siteStatus: "success",
    siteMsg: "正常",
    siteName: "www.test2.com",
    sitePath: "/hwsmaster/wwwroot/www.test2.com",
    ftpStatus: "warning",
    ftpMsg: "停止",
    ftpUser: "www_test2_com",
    ftpPass: "PfTD5DskQihXi25B",
    createTime: "2020-8-9 12:06:40",
    comment: "测试网站3"
  },
  {
    key: "4",
    siteStatus: "error",
    siteMsg: "异常",
    siteName: "www.test3.com",
    sitePath: "/hwsmaster/wwwroot/www.test3.com",
    ftpStatus: "success",
    ftpMsg: "正常",
    ftpUser: "www_test3_com",
    ftpPass: "CjKdxtS3AjxMn4Wd",
    createTime: "2020-8-9 12:06:52",
    comment: "测试网站4"
  },
  {
    key: "5",
    siteStatus: "warning",
    siteMsg: "暂停",
    siteName: "www.test4.com",
    sitePath: "/hwsmaster/wwwroot/www.test4.com",
    ftpStatus: "warning",
    ftpMsg: "停止",
    ftpUser: "www_test4_com",
    ftpPass: "ThAGzt5NxPN2naGs",
    createTime: "2020-8-9 12:12:53",
    comment: "测试网站5"
  },
  {
    key: "6",
    siteStatus: "warning",
    siteMsg: "暂停",
    siteName: "www.test5.com",
    sitePath: "/hwsmaster/wwwroot/www.test5.com",
    ftpStatus: "success",
    ftpMsg: "正常",
    ftpUser: "www_test5_com",
    ftpPass: "ss8SthfT5r8xmat5",
    createTime: "2020-8-9 12:13:23",
    comment: "测试网站6"
  },
  {
    key: "7",
    siteStatus: "success",
    siteMsg: "正常",
    siteName: "www.test6.com",
    sitePath: "/hwsmaster/wwwroot/www.test6.com",
    ftpStatus: "success",
    ftpMsg: "正常",
    ftpUser: "www_test6_com",
    ftpPass: "pKSa7z4ECt5SyMGT",
    createTime: "2020-8-9 12:23:39",
    comment: "测试网站7"
  },
  {
    key: "8",
    siteStatus: "success",
    siteMsg: "正常",
    siteName: "www.test7.com",
    sitePath: "/hwsmaster/wwwroot/www.test7.com",
    ftpStatus: "success",
    ftpMsg: "正常",
    ftpUser: "www_test7_com",
    ftpPass: "bJDbDPGEG4YhzXd7",
    createTime: "2020-8-9 12:33:39",
    comment: "测试网站8"
  },
  {
    key: "9",
    siteStatus: "success",
    siteMsg: "正常",
    siteName: "www.test8.com",
    sitePath: "/hwsmaster/wwwroot/www.test8.com",
    ftpStatus: "success",
    ftpMsg: "正常",
    ftpUser: "www_test8_com",
    ftpPass: "wZaTBQmf6wRarffF",
    createTime: "2020-8-9 12:34:50",
    comment: "测试网站9"
  },
  {
    key: "10",
    siteStatus: "success",
    siteMsg: "正常",
    siteName: "www.test9.com",
    sitePath: "/hwsmaster/wwwroot/www.test9.com",
    ftpStatus: "success",
    ftpMsg: "正常",
    ftpUser: "www_test9_com",
    ftpPass: "Wx7scX4WeZiy8eJm",
    createTime: "2020-8-9 12:36:48",
    comment: "测试网站10"
  }
];

export default {
  data() {
    return {
      recordKey: 0,
      searchText: "",
      searchInput: null,
      config: "iptables -L -n",

      sitesData,
      sitesColumns: [
        {
          title: "状态",
          dataIndex: "siteStatus",
          key: "siteStatus",
          width: 70,
          className: "table_title",
          scopedSlots: { customRender: "siteStatus" },
          filters: [
            {
              text: "正常",
              value: "success"
            },
            {
              text: "暂停",
              value: "warning"
            },
            {
              text: "异常",
              value: "error"
            }
          ],
          onFilter: (value, record) => record.siteStatus.indexOf(value) === 0
        },
        {
          title: "网站名称",
          dataIndex: "siteName",
          key: "siteName",
          ellipsis: true,
          width: 150,
          className: "table_title",
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon"
          },
          onFilter: (value, record) =>
            record.siteName
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
          dataIndex: "sitePath",
          key: "sitePath",
          ellipsis: true,
          className: "table_title",
          width: 300
        },
        {
          title: "FTP",
          dataIndex: "ftpStatus",
          key: "ftpStatus",
          width: 70,
          className: "table_title",
          scopedSlots: { customRender: "ftpStatus" },
          filters: [
            {
              text: "正常",
              value: "success"
            },
            {
              text: "停止",
              value: "warning"
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
          className: "table_title",
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
          width: 190,
          className: "table_title",
          scopedSlots: { customRender: "ftpPass" }
        },
        {
          title: "开通时间",
          dataIndex: "createTime",
          key: "createTime",
          ellipsis: true,
          width: 150,
          sorter: (a, b) => a.createTime > b.createTime,
          className: "table_title",
          defaultSortOrder: "descend"
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
          className: "table_title",
          width: 135
        }
      ],

      domainsData,
      domainsColumns: [
        {
          title: "域名",
          dataIndex: "domainName",
          key: "domainName",
          className: "table_title",
          ellipsis: true,
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "domains"
          },
          onFilter: (value, record) =>
            record.domainName
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
          title: "端口",
          dataIndex: "port",
          key: "port",
          ellipsis: true,
          width: 100,
          className: "table_title"
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          scopedSlots: { customRender: "operation" },
          className: "table_title",
          width: 60
        }
      ],

      subDomainsData,
      subDomainsColumns: [
        {
          title: "域名",
          dataIndex: "domainName",
          key: "domainName",
          className: "table_title",
          ellipsis: true,
          scopedSlots: {
            filterDropdown: "filterDropdown",
            filterIcon: "filterIcon",
            customRender: "domains"
          },
          onFilter: (value, record) =>
            record.domainName
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
          title: "端口",
          dataIndex: "port",
          key: "port",
          ellipsis: true,
          width: 100,
          className: "table_title"
        },
        {
          title: "子目录",
          dataIndex: "path",
          key: "path",
          ellipsis: true,
          width: 200,
          className: "table_title"
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          scopedSlots: { customRender: "operation" },
          className: "table_title",
          width: 60
        }
      ]
    };
  },
  mounted() {
    setTimeout(() => {
      let load = this.public_msg_loading();
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

    onRebuildAll() {
      let vm = this;
      this.public_msg_confirm(
        "重建网站确认",
        "您真的要重建所有网站吗?",
        function() {
          vm.public_msg_success("重建完毕!");
        }
      );
    },

    onRebuild(record) {
      let vm = this;
      this.public_msg_confirm(
        "重建网站确认",
        "您真的要重建[" + record.siteName + "]吗?",
        function() {
          vm.public_msg_success("重建成功!");
        }
      );
    },

    onSetting(record) {
      this.public_msg_loading();
      this.public_msg_open("编辑网站", ["700px", "700px"], $("#setting"));
    },

    onDelete(record) {
      let vm = this;
      this.public_msg_confirm(
        "删除网站确认",
        "您真的要删除[" + record.siteName + "]吗?",
        function() {
          vm.public_msg_success("删除成功!");
        }
      );
    },

    onSearch(value) {
      this.public_msg_success(value);
    },

    callback(key) {
      this.public_msg_loading();
    },

    onDeleteDomainName(record) {
      let vm = this;
      this.public_msg_confirm(
        "删除域名确认",
        "您真的要删除[" + record.domainName + "]吗?",
        function() {
          vm.public_msg_error("最后一个域名不能删除!");
        }
      );
    }
  }
};
</script>
