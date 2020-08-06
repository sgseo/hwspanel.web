<template>
  <div>
    <a-row :gutter="[16,16]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="dashboard" />系统资源
          </span>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="tag" />数据概览
          </span>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]">
      <a-col :span="12">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="link" />快捷操作
          </span>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
      <a-col :span="12">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="area-chart" />实时流量
          </span>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
    <a-row :gutter="[16,16]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="customer-service" />技术支持
          </span>
          <p>card content</p>
          <p>card content</p>
          <p>card content</p>
        </a-card>
      </a-col>
    </a-row>
  </div>
</template>
