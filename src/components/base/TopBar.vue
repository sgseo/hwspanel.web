<template>
  <a-row :gutter="[10,10]">
    <a-col :span="24">
      <a-card size="small" :bordered="false" class="font12px">
        <a-row :gutter="[5,5]" class="flex-row-flex-start-wrap">
          <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="4">
            <slot name="col1">
              <a-breadcrumb>
                <a-breadcrumb-item>
                  <a-icon type="home" />
                  <router-link to="/">首页</router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>{{ title }}</a-breadcrumb-item>
              </a-breadcrumb>
            </slot>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="5" :xl="4">
            <slot name="col2"></slot>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="6" :xl="10">
            <slot name="col3"></slot>
          </a-col>
          <a-col :xs="24" :sm="24" :md="24" :lg="7" :xl="6">
            <slot name="col4"></slot>
          </a-col>
        </a-row>
      </a-card>
    </a-col>
  </a-row>
</template>


<script>
export default {
  props: {
    title: {
      type: String
    }
  }
};
</script>
