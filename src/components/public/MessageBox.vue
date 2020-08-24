<template>
  <div class="left-tabs-container" v-show="false">
    <a-tabs
      default-active-key="1"
      size="small"
      tab-position="left"
      type="card"
      :tabBarGutter="0"
      @change="onChangeSetting"
    >
      <a-tab-pane key="1" :tab="taskList">
        <div v-if="taskNumber != 0">
          <a-table
            :scroll="{ x: 100 }"
            :columns="handleTaskColumns"
            :data-source="handleTaskDatas"
            :pagination="{defaultPageSize: 3, hideOnSinglePage: true}"
            size="small"
            class="mab5"
          >
            <a-badge slot="name" slot-scope="text, record" :status="record.status" :text="text" />
            <span slot="status" slot-scope="text, record" class="font12px color-info">
              <a-icon v-if="record.status == 'processing'" type="loading" />
              {{ record.msg }}
            </span>
          </a-table>
          <a-textarea
            :defaultValue="taskDetails"
            :readOnly="true"
            :rows="10"
            class="color-terminal font12px mab5"
          />
          <a-table
            :scroll="{ x: 150 }"
            :columns="unHandleTaskColumns"
            :data-source="unHandleTaskDatas"
            :pagination="{defaultPageSize: 3, hideOnSinglePage: true}"
            size="small"
          >
            <a-badge slot="name" slot-scope="text, record" :status="record.status" :text="text" />
            <span slot="status" slot-scope="text, record" class="font12px color-info">
              {{ record.msg }}
              <a-icon type="ellipsis" />
            </span>
            <template slot="operation" slot-scope="text, record">
              <a-button icon="delete" type="dashed" size="small" @click="removeTask(record)"></a-button>
            </template>
          </a-table>
        </div>
        <div v-else class="font12px">当前没有任务!</div>
      </a-tab-pane>
      <a-tab-pane key="2" :tab="taskLog">
        <a-table
          :scroll="{ x: 150 }"
          :columns="taskLogColumns"
          :data-source="taskLogDatas"
          :pagination="{defaultPageSize: 15, hideOnSinglePage: true}"
          size="small"
          class="mab5"
        >
          <a-badge
            slot="status"
            slot-scope="text, record"
            :status="record.status"
            :text="record.msg"
            class="font12px color-info"
          />
        </a-table>
      </a-tab-pane>
      <a-tab-pane key="3" tab="执行日志">
        <a-textarea
          :defaultValue="taskDetails"
          :readOnly="true"
          :rows="34"
          class="color-terminal font12px"
        />
      </a-tab-pane>
    </a-tabs>
  </div>
</template>

<script>
const handleTaskDatas = [
  {
    key: 1,
    name: "安装MySQL 5.7.29",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 2,
    name: "安装MySQL 5.6.40",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 3,
    name: "安装MySQL 8.0.19",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 4,
    name: "安装MySQL 5.5.38",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 5,
    name: "安装PureFTPd",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 6,
    name: "安装Redis",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 7,
    name: "安装 PHP 5.4.45",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 8,
    name: "安装 PHP 5.6.40",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 9,
    name: "安装 PHP 7.2.27",
    status: "success",
    msg: "安装成功"
  },
  {
    key: 10,
    name: "安装phpMyAdmin",
    status: "error",
    msg: "安装失败"
  },
  {
    key: 11,
    name: "安装Apache",
    status: "processing",
    msg: "正在安装"
  }
];

const unHandleTaskDatas = [
  {
    key: 1,
    name: "安装Nginx",
    status: "default",
    msg: "等待中"
  }
];

const handleTaskColumns = [
  {
    title: "已处理的任务",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    scopedSlots: { customRender: "name" },
    className: "table_title"
  },
  {
    title: "消息",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    scopedSlots: { customRender: "status" },
    className: "table_title",
    align: "right",
    width: 100
  }
];

const unHandleTaskColumns = [
  {
    title: "等待中的任务",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    scopedSlots: { customRender: "name" },
    className: "table_title"
  },
  {
    title: "消息",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    scopedSlots: { customRender: "status" },
    className: "table_title",
    width: 100
  },
  {
    title: "操作",
    dataIndex: "operation",
    key: "operation",
    scopedSlots: { customRender: "operation" },
    className: "table_title",
    width: 50
  }
];

const taskLogColumns = [
  {
    title: "任务名",
    dataIndex: "name",
    key: "name",
    ellipsis: true,
    className: "table_title"
  },
  {
    title: "状态",
    dataIndex: "status",
    key: "status",
    ellipsis: true,
    width: 100,
    scopedSlots: { customRender: "status" },
    className: "table_title"
  },
  {
    title: "时间",
    dataIndex: "time",
    key: "time",
    ellipsis: true,
    width: 150,
    className: "table_title"
  }
];

const taskLogDatas = [
  {
    key: 1,
    name: "安装Apache",
    status: "success",
    msg: "安装成功",
    time: "2020-08-24 12:26:23"
  }
];

export default {
  data() {
    return {
      unHandleTaskColumns,
      handleTaskColumns,
      taskLogColumns,
      // 下面三个属性要从外部传入
      unHandleTaskDatas,
      handleTaskDatas,
      taskLogDatas
    };
  },
  computed: {
    taskList: function() {
      return "任务列表(" + this.taskNumber + ")";
    },
    taskLog: function() {
      return "消息列表(" + this.logNumber + ")";
    }
  },
  methods: {
    onChangeSetting(key) {
      this.public_msg_loading();
    },
    removeTask(record) {
      this.public_msg_loading();
      this.public_msg_success("删除成功!");
    }
  },
  props: {
    taskDetails: {
      type: String,
      default: ""
    },
    taskNumber: {
      type: Number,
      default: 0
    },
    logNumber: {
      type: Number,
      default: 0
    }
  }
};
</script>
