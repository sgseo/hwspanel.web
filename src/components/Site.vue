<template>
  <div>
    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small" :bordered="false" class="font12px">
          <a-row :gutter="[5,5]">
            <a-col :xs="24" :sm="12" :md="12" :lg="6" :xl="6">
              <a-breadcrumb>
                <a-breadcrumb-item>
                  <a-icon type="home"/>
                  <router-link to="/">
                    <span>首页</span>
                  </router-link>
                </a-breadcrumb-item>
                <a-breadcrumb-item>
                  网站管理
                </a-breadcrumb-item>
              </a-breadcrumb>
            </a-col>
          </a-row>
        </a-card>
      </a-col>
    </a-row>

    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">
            <a-icon class="ma5 color-primary" type="global" />网站列表
          </span>
          <div class="mab10">
          <a-button type="primary" class="mar5">添加网站</a-button>
          <a-button type="dashed">重建网站</a-button>
          </div>
          <a-table :columns="columns" :data-source="data" bordered size="middle">
            <a-tag color="green" slot="siteStatus" slot-scope="siteStatus">
              {{ siteStatus }}
            </a-tag>
            <a-tag color="green" slot="ftpStatus" slot-scope="ftpStatus">
              {{ ftpStatus }}
            </a-tag>
          </a-table>
        </a-card>
      </a-col>
    </a-row>

  </div>
</template>

<script>
const columns = [
  {
    title: '状态',
    dataIndex: 'siteStatus',
    key: 'siteStatus',
    width: 70,
    scopedSlots: { customRender: 'siteStatus' },
    className:'text-center',
  },
  {
    title: '网站名称',
    dataIndex: 'name',
    key: 'name',
    ellipsis: true,
    width: 150,
  },
  {
    title: '网站路径',
    dataIndex: 'path',
    key: 'path',
    ellipsis: true,
    width: 300,
  },
  {
    title: 'FTP',
    dataIndex: 'ftpStatus',
    key: 'ftpStatus',
    width: 70,
    scopedSlots: { customRender: 'ftpStatus' },
    className:'text-center',
  },
  {
    title: 'FTP账户',
    dataIndex: 'ftpUser',
    key: 'ftpUser',
    ellipsis: true,
    width: 150,
  },
  {
    title: 'FTP密码',
    dataIndex: 'ftpPass',
    key: 'ftpPass',
    ellipsis: true,
    width: 150,
  },
  {
    title: '开通时间',
    dataIndex: 'createTime',
    key: 'createTime',
    ellipsis: true,
    width: 200,
    sorter: (a, b) => a.createTime > b.createTime,
    defaultSortOrder: "descend",
  },
  {
    title: '备注',
    dataIndex: 'comment',
    key: 'comment',
    ellipsis: true,
  },
];

const data = [
  {
    key: '1',
    siteStatus: '运行中',
    name: 'www.hws.com',
    path: '/hwsmaster/wwwroot/www.hws.com',
    ftpStatus: '已启用',
    ftpUser: 'www_hws_com',
    ftpPass: '8xn45345ZMGi6Ejs',
    createTime: '2020-8-9 12:6:27',
    comment: '测试网站1',
  },
  {
    key: '2',
    siteStatus: '运行中',
    name: 'www.test1.com',
    path: '/hwsmaster/wwwroot/www.test1.com',
    ftpStatus: '已启用',
    ftpUser: 'www_test1_com',
    ftpPass: 'xMxeekHnDjxH4npj',
    createTime: '2020-8-9 12:6:35',
    comment: '测试网站2',
  },
  {
    key: '3',
    siteStatus: '运行中',
    name: 'www.test2.com',
    path: '/hwsmaster/wwwroot/www.test2.com',
    ftpStatus: '已启用',
    ftpUser: 'www_test2_com',
    ftpPass: 'PfTD5DskQihXi25B',
    createTime: '2020-8-9 12:6:40',
    comment: '测试网站3',
  },
  {
    key: '4',
    siteStatus: '运行中',
    name: 'www.test3.com',
    path: '/hwsmaster/wwwroot/www.test3.com',
    ftpStatus: '已启用',
    ftpUser: 'www_test3_com',
    ftpPass: 'CjKdxtS3AjxMn4Wd',
    createTime: '2020-8-9 12:6:52',
    comment: '测试网站4',
  },
];


export default {
    data() {
        return {
            columns,
            data,
        }
    },
    mounted() {
        setTimeout(() => {
            let load = layer.msg('正在处理,请稍候...',{icon: 16, time: 2000, shade:[0.5, '#000']});
        }, 20);
    }
}
</script>>
