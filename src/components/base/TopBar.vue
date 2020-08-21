<template>
  <a-row :gutter="[10,10]">
    <a-col :span="24">
      <a-table
        :scroll="{ x: tableMinWidth }"
        :columns="columns"
        :data-source="datas"
        :showHeader="false"
        :pagination="false"
        size="small"
        class="bg-white"
      >
        <span slot="left">
          <slot name="left">
            <a-breadcrumb>
              <a-breadcrumb-item>
                <a-icon type="home" />
                <router-link to="/">首页</router-link>
              </a-breadcrumb-item>
              <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
            </a-breadcrumb>
          </slot>
        </span>
        <span slot="center">
          <slot name="center"></slot>
        </span>
        <span slot="right">
          <slot name="right"></slot>
        </span>
      </a-table>
    </a-col>
  </a-row>
</template>


<script>
const datas = [
  {
    key: 1,
    left: "",
    center: "",
    right: ""
  }
];

export default {
  data() {
    return {
      columns: [
        {
          key: "left",
          title: "left",
          dataIndex: "left",
          className: "table_title font12px",
          ellipsis: true,
          width: this.leftWidth,
          scopedSlots: { customRender: "left" }
        },
        {
          key: "center",
          title: "center",
          dataIndex: "center",
          className: "table_title font12px",
          ellipsis: true,
          scopedSlots: { customRender: "center" }
        },
        {
          key: "right",
          title: "right",
          dataIndex: "right",
          className: "table_title font12px",
          ellipsis: true,
          width: this.rightWidth,
          scopedSlots: { customRender: "right" }
        }
      ],

      datas
    };
  },
  computed: {
    tableMinWidth: function() {
      return this.leftWidth + this.rightWidth;
    }
  },
  props: {
    title: {
      type: String,
      default: "用title替换这里"
    },
    leftWidth: {
      type: [String, Number]
    },
    rightWidth: {
      type: [String, Number]
    }
  }
};
</script>
