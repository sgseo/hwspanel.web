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
                <a-breadcrumb-item>日志</a-breadcrumb-item>
              </a-breadcrumb>
              <a-input-search
                style="width: 300px;"
                placeholder="日志搜索"
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
          <span slot="title">日志列表</span>
          <div class="mab10">
            <!-- 是否要给日志清空功能,需要考虑
            <a-button type="dashed">清空日志</a-button>
            -->
          </div>
          <a-table
            :scroll="{ x: 800 }"
            :columns="columns"
            :data-source="data"
            bordered
            size="middle"
          >
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
    onSearch(value) {
      this.successMsg(value);
    }
  }
};
</script>>
