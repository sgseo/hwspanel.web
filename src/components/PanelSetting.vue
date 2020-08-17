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
                <a-breadcrumb-item>面板设置</a-breadcrumb-item>
              </a-breadcrumb>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">面板设置</span>
          <a-table :scroll="{ x: 500 }" :columns="columns" :data-source="data" size="small">
            <template slot="input" slot-scope="text, record">
              <a-input
                class="mar5"
                style="width: 275px"
                v-model="record.value"
                :disabled="record.disabled"
              ></a-input>
            </template>
            <template slot="operation" slot-scope="text, record">
              <a-button
                v-if="record.disabled"
                size="small"
                type="primary"
                @click="onToogle(record)"
              >修改</a-button>
              <a-button
                v-else-if="!record.disabled"
                size="small"
                style="background: #87d068; border-color: #87d068; color: #fff;"
                @click="onHandle(record)"
              >确认</a-button>
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
    title: "项目名称",
    dataIndex: "name",
    key: "name",
    width: 130,
    ellipsis: true,
    align: "right",
    className: "table_title"
  },
  {
    title: "内容",
    dataIndex: "input",
    key: "input",
    width: 300,
    ellipsis: true,
    className: "table_title",
    scopedSlots: { customRender: "input" }
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    width: 70,
    ellipsis: true,
    className: "table_title",
    scopedSlots: { customRender: "operation" }
  },
  {
    title: "描述",
    dataIndex: "description",
    key: "description",
    ellipsis: true,
    className: "table_title"
  }
];
const data = [
  {
    key: 1,
    name: "面板端口",
    description:
      "端口范围1024 - 65535，注意：有安全组的服务器请提前在安全组放行新端口，如端口被占用，请通过命令行重新设置端口",
    value: "6588",
    disabled: true
  },
  {
    key: 2,
    name: "面板安全入口",
    description:
      "面板的入口,设置后只能通过指定安全入口登录面板,出于安全角度考虑,请保持安全入口的设置",
    value: "ia2z",
    disabled: true
  },
  {
    key: 3,
    name: "默认建站路径",
    description: "新创建的站点,默认将保存到该目录的下级目录!",
    value: "/hwsmaster/wwwroot",
    disabled: true
  },
  {
    key: 4,
    name: "默认首页顺序",
    description:
      "默认首页的优先级，越靠后的优先级越低，可自定义默认首页文件名，多个以' '空格，分隔",
    value:
      "index.php default.php index.html index.htm default.html default.htm start.html",
    disabled: true
  },
  {
    key: 5,
    name: "服务器IP",
    description:
      "影响phpMyAdmin打开等其他操作，默认为外网IP,若您在本地虚拟机测试,请填写虚拟机内网IP!",
    value: "222.209.173.49",
    disabled: true
  },
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
    onToogle(record) {
      record.disabled = !record.disabled;
    },
    onHandle(record) {
      this.public_msg_loading();
      this.onToogle(record);
    },
  }
};
</script>
