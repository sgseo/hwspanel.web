<template>
  <div>
    <my-topbar title="数据库" :leftWidth="115" :rightWidth="300">
      <a-input-search
        slot="right"
        placeholder="数据库搜索,支持模糊匹配"
        enter-button
        @search="searchDatabase"
      />
    </my-topbar>

    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">数据库列表</span>
          <div class="mab10">
            <a-button type="primary" class="mar5">添加数据库</a-button>
            <a-button type="dashed" @click="rebuildDatabaseAll">重建所有数据库</a-button>
          </div>
          <a-table
            :scroll="{ x: 1050 }"
            :columns="databaseColumns"
            :data-source="databaseDatas"
            size="small"
          >
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
              <a-icon
                type="copy"
                class="mal5"
                @click="public_tools_copy_to_clipboard(text, record.dbUser)"
              />
            </div>

            <a-badge slot="status" slot-scope="status, record" :status="status" :text="record.msg" />

            <template slot="operation" slot-scope="text, record">
              <a href="javascript:;" v-on:click="openManage(record)">管理</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="openSetting(record)">设置</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="rebuildDatabase(record)">重建</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="removeDatabase(record)">删除</a>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

    <div id="setting" class="left-tabs-container" v-if="visibleSetting" v-show="false">
      <a-tabs
        default-active-key="1"
        size="small"
        tab-position="left"
        type="card"
        :tabBarGutter="0"
        @change="onChangeSetting"
      >
        <a-tab-pane key="1" tab="修改密码">
          <div class="mab10">
            <a-input
              addon-before="数据库用户"
              default-value="www_test1_com"
              disabled
              style="width: 300px"
            />
          </div>
          <div class="mab10">
            <a-input-password
              addon-before="数据库密码"
              default-value="xMxeekHnDjxH4npj"
              style="width: 300px"
            />
            <a-button type="link">随机生成</a-button>
          </div>
          <a-button type="primary">保存</a-button>
        </a-tab-pane>
        <a-tab-pane key="2" tab="归属网站">
          关联至网站
          <a-select :default-value="dbSite.current" style="width: 310px;" class="mab10">
            <a-select-option
              v-for="site in dbSite.list"
              :key="site.id"
              :value="site.name"
            >{{ site.name }}</a-select-option>
          </a-select>
          <p class="color-info mab10">设置关联网站不仅方便记忆,还可以与其进行一些联动操作</p>
          <div>
            <a-button type="primary">保存</a-button>
          </div>
        </a-tab-pane>
        <a-tab-pane key="3" tab="备份导入">
          <a-button class="mar5" type="primary">立即备份</a-button>
          <a-upload
            name="backupfile"
            :multiple="true"
            action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
          >
            <a-button>
              <a-icon type="upload" />从本地上传
            </a-button>
          </a-upload>
          <a-divider class="ma0 mat10 mab10" />
          <a-table
            :scroll="{ x: 300 }"
            :columns="backupColumns"
            :data-source="backupDatas"
            size="small"
            style="width: 100%;"
          >
            <template slot="operation" slot-scope="text, record">
              <a-tooltip>
                <template slot="title">导入数据库</template>
                <a-button
                  class="mar5"
                  icon="import"
                  type="dashed"
                  size="small"
                  @click="importBackup(record)"
                ></a-button>
              </a-tooltip>
              <a-tooltip>
                <template slot="title">下载备份文件</template>
                <a-button
                  class="mar5"
                  icon="download"
                  type="dashed"
                  size="small"
                  @click="downloadBackup(record)"
                ></a-button>
              </a-tooltip>
              <a-tooltip>
                <template slot="title">删除备份文件</template>
                <a-button icon="delete" type="dashed" size="small" @click="removeBackup(record)"></a-button>
              </a-tooltip>
            </template>
          </a-table>
        </a-tab-pane>
        <a-tab-pane key="4" tab="访问权限">敬请期待</a-tab-pane>
      </a-tabs>
    </div>
  </div>
</template>

<script>
const databaseDatas = [
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

const backupDatas = [
  {
    key: 1,
    name: "www.test1.com_20200820_112640.zip",
    size: "21M",
    time: "2020-08-20 11:26:40"
  },
  {
    key: 2,
    name: "www.test2.com_20200820_121840.zip",
    size: "30M",
    time: "2020-08-20 12:18:40"
  }
];

export default {
  data() {
    return {
      recordKey: 0,
      searchText: "",
      searchInput: null,
      visibleSetting: false,

      dbSite: {
        current: "www.test1.com",
        list: [
          { id: 1, name: "www.test1.com" },
          { id: 2, name: "www.test2.com" },
          { id: 3, name: "www.test3.com" },
          { id: 4, name: "www.test4.com" },
          { id: 5, name: "www.test5.com" },
          { id: 6, name: "www.test6.com" },
          { id: 7, name: "www.test7.com" },
          { id: 8, name: "www.test8.com" },
          { id: 9, name: "www.test9.com" }
        ]
      },

      databaseDatas,
      databaseColumns: [
        {
          title: "状态",
          dataIndex: "status",
          key: "status",
          ellipsis: true,
          width: 70,
          scopedSlots: { customRender: "status" },
          className: "table_title"
        },
        {
          title: "数据库名称",
          dataIndex: "dbName",
          key: "dbName",
          ellipsis: true,
          width: 200,
          className: "table_title"
        },
        {
          title: "数据库账户",
          dataIndex: "dbUser",
          key: "dbUser",
          ellipsis: true,
          width: 200,
          className: "table_title"
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
          className: "table_title"
        },
        {
          title: "备注",
          dataIndex: "comment",
          key: "comment",
          ellipsis: true,
          className: "table_title"
        },
        {
          title: "操作",
          dataIndex: "operation",
          key: "operation",
          scopedSlots: { customRender: "operation" },
          width: 180,
          className: "table_title"
        }
      ],

      backupDatas,
      backupColumns: [
        {
          title: "文件名称",
          dataIndex: "name",
          key: "name",
          className: "table_title",
          ellipsis: true
        },
        {
          title: "文件大小",
          dataIndex: "size",
          key: "size",
          ellipsis: true,
          width: 100,
          className: "table_title"
        },
        {
          title: "备份时间",
          dataIndex: "time",
          key: "time",
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
          width: 100
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
    openManage(record) {
      this.public_msg_success(record.dbName);
    },

    openSetting(record) {
      var vm = this;
      var load = this.public_msg_loading();
      layer.close(load);
      this.visibleSetting = true;
      setTimeout(function() {
        vm.public_msg_open(
          "数据库设置[" + record.dbName + "]--归属网站[" + record.dbSite + "]",
          ["700px", "700px"],
          null,
          $("#setting"),
          -1,
          null,
          null,
          null,
          function() {
            vm.visibleSetting = false;
          }
        );
      }, 150);
    },

    onChangeSetting(key) {
      this.public_msg_loading();
    },

    rebuildDatabase(record) {
      let vm = this;
      this.public_msg_confirm(
        "重建数据库确认",
        "您真的要重建[" + record.dbName + "]吗?",
        function() {
          vm.public_msg_success("重建成功!");
        }
      );
    },

    rebuildDatabaseAll() {
      let vm = this;
      this.public_msg_confirm(
        "重建数据库确认",
        "您真的要重建所有数据库吗?",
        function() {
          vm.public_msg_success("重建成功!");
        }
      );
    },

    removeDatabase(record) {
      let vm = this;
      this.public_msg_confirm(
        "删除数据库确认",
        "您真的要删除[" + record.dbName + "]吗?",
        function() {
          vm.public_msg_success("删除成功!");
        }
      );
    },

    searchDatabase(value) {
      this.public_msg_success(value);
    },

    importBackup(record) {
      let vm = this;
      this.public_msg_confirm(
        "导入备份确认",
        "您真的要导入[" + record.name + "]吗?",
        function() {
          vm.public_msg_success("导入成功!");
        }
      );
    },

    downloadBackup(record) {
      this.public_msg_success("下载[" + record.name + "]成功");
    },

    removeBackup(record) {
      let vm = this;
      this.public_msg_confirm(
        "删除备份确认",
        "您真的要删除[" + record.name + "]吗?",
        function() {
          vm.public_msg_success("删除成功");
        }
      );
    }
  }
};
</script>
