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
          </div>
          <a-table
            :scroll="{ x: 800 }"
            :columns="columns"
            :data-source="data"
            bordered
            size="middle"
          >
            <template slot="operation" slot-scope="text, record">
              <a class="font12px" href="javascript:;" v-on:click="onInstall(record)">安装</a>
              <a-divider type="vertical" />
              <a class="font12px" href="javascript:;" v-on:click="onSetting(record)">设置</a>
              <a-divider type="vertical" />
              <a class="font12px" href="javascript:;" v-on:click="onDelete(record.key)">卸载</a>
            </template>
          </a-table>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>

<script>
export default {
  data() {
    return {
      columns: [],
      data: [],
    };
  },
  mounted() {
    setTimeout(() => {
      let load = this.loadingMsg();
    }, 20);
  },
  methods: {
    onInstall(record) {},
    onSetting(record) {},
    onDelete(key) {},
    onSearch(value) {
      this.successMsg(value);
    }
  }
};
</script>>
