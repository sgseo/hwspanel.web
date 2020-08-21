<template>
  <div>
    <my-topbar title="网站管理" :leftWidth="130" :rightWidth="300">
      <a-input-search slot="right" placeholder="网站搜索,支持模糊匹配" enter-button @search="searchSite" />
    </my-topbar>

    <a-row :gutter="[10,10]">
      <a-col :span="24">
        <a-card size="small">
          <span slot="title">网站列表</span>
          <div>
            <a-button type="primary" class="mar5 mab10">添加网站</a-button>
            <a-button type="dashed"  class="mar5 mab10" @click="rebuildSiteAll">重建网站</a-button>
          </div>
          <a-table
            :scroll="{ x: 1215 }"
            :columns="siteColumns"
            :data-source="siteDatas"
            size="small"
          >
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
              <a href="javascript:;" v-on:click="openSetting(record)">设置</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="rebuildSite(record)">重建</a>
              <a-divider type="vertical" />
              <a href="javascript:;" v-on:click="removeSite(record)">删除</a>
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
            :columns="domainColumns"
            :data-source="domainDatas"
            size="small"
            style="width: 100%;"
          >
            <template slot="operation" slot-scope="text, record">
              <a-button icon="delete" type="dashed" size="small" @click="removeDomainName(record)"></a-button>
            </template>
          </a-table>
        </a-tab-pane>

        <a-tab-pane key="2" tab="运行目录" force-render>
          运行目录
          <a-input class="mal10" addon-before="web" style="width: 300px;" />
          <a-button class="mal10" type="primary">保存</a-button>
          <a-alert
            class="mat10"
            message="部分程序需要指定二级目录作为运行目录，如ThinkPHP5，Laravel"
            type="info"
            show-icon
          />
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
              :columns="subDomainColumns"
              :data-source="subDomainDatas"
              size="small"
              style="width: 100%;"
            >
              <template slot="operation" slot-scope="text, record">
                <a-button
                  icon="delete"
                  type="dashed"
                  size="small"
                  @click="removeDomainName(record)"
                ></a-button>
              </template>
            </a-table>
          </div>
        </a-tab-pane>

        <a-tab-pane key="4" tab="PHP版本">
          PHP版本
          <a-select :default-value="php.current" style="width: 120px;">
            <a-select-option
              v-for="php in php.list"
              :key="php.version"
              :value="php.version"
            >{{ php.version }}</a-select-option>
          </a-select>
          <a-button class="mal10" type="primary">保存</a-button>
          <a-alert
            class="mat10"
            message="请根据您的程序需求选择版本"
            description="若非必要，尽量不要使用PHP5.6以下的版本，这会降低您的服务器安全性；"
            type="info"
            show-icon
          />
        </a-tab-pane>

        <a-tab-pane key="5" tab="SSL绑定">
          <a-tabs default-active-key="1" type="card" @change="onChangeSsl" size="small">
            <a-tab-pane key="1" tab="证书">
              <a-alert class="mab10" message="证书已部署成功,请在证书到期之前更换新的证书" type="success" show-icon>
                <span slot="description">
                  <p>发证机构: Sectigo Limited</p>
                  <p>发证时间: 2020-06-15 00:00:00</p>
                  <p>到期时间: 2021-06-15 23:59:59</p>
                  <p>关联域名: *.61499.com, 61499.com</p>
                </span>
              </a-alert>选择证书
              <a-select :default-value="cert.current" style="width: 200px;">
                <a-select-option
                  v-for="cert in cert.list"
                  :key="cert.id"
                  :value="cert.name"
                >{{ cert.name }}</a-select-option>
              </a-select>
              <a-button class="mal10" type="primary">保存</a-button>
              <p class="font12px mat5 color-info">
                请先在证书夹添加证书,如没有证书可
                <a
                  class="font12px"
                  href="https://www.hws.com/security/ssl.html"
                  target="_blank"
                >点我购买</a>
              </p>
              <p class="font12px mat5 color-info">选择证书点击保存即可部署至网站</p>
              <p class="font12px mat5 color-info">默认情况下,证书将绑定到当前已有的所有域名</p>
              <p class="font12px mat5 color-info">如开启后无法使用HTTPS访问,请检查安全组是否正确放行443端口</p>
            </a-tab-pane>
            <a-tab-pane key="2" tab="证书夹">
              <div class="flex-row-flex-start-nowrap mab10">
                <a-textarea class="mar5" placeholder="证书(PEM格式)" :rows="6" style="width: 240px;" />
                <a-textarea class="mar5" placeholder="密钥(KEY)" :rows="6" style="width: 240px;" />
                <a-button class="mal10" type="primary">添加</a-button>
              </div>
              <a-table
                :scroll="{ x: 360 }"
                :columns="certColumns"
                :data-source="certDatas"
                size="small"
                style="width: 100%;"
              >
                <template slot="operation" slot-scope="text, record">
                  <a-button icon="delete" type="dashed" size="small" @click="removeCert(record)"></a-button>
                </template>
              </a-table>
            </a-tab-pane>
            <div slot="tabBarExtraContent">
              强制https
              <a-switch size="small"></a-switch>
            </div>
          </a-tabs>
        </a-tab-pane>

        <a-tab-pane key="6" tab="配置文件">
          <span class="font12px">提示：Ctrl+F 搜索关键字，Ctrl+H 查找并替换，Alt+G 跳转到指定行的指定字符，Alt+/ 自动补全</span>
          <div class="mab10" style="height: 500px;">
            <codemirror v-model="config.content" :options="config"></codemirror>
          </div>
          <a-alert class="mab10" message="此处为站点主配置文件,若您不了解配置规则,请勿随意修改." type="warning" show-icon />
          <a-button type="primary">保存</a-button>
        </a-tab-pane>

        <a-tab-pane key="7" tab="伪静态">
          <div class="mab10">
            <a-select
              default-value
              style="width: 200px;"
              @change="(value) => (rewrite.content = value)"
            >
              <a-select-option value>模板-空</a-select-option>
              <a-select-option
                v-for="rewrite in rewrite.list"
                :key="rewrite.id"
                :value="rewrite.content"
              >{{ rewrite.name }}</a-select-option>
            </a-select>
            <a-button type="link" @click="loadRewrite">加载当前配置</a-button>
          </div>
          <span class="font12px">提示：Ctrl+F 搜索关键字，Ctrl+H 查找并替换，Alt+G 跳转到指定行的指定字符，Alt+/ 自动补全</span>
          <div class="mab10" style="height: 450px;">
            <codemirror v-model="rewrite.content" :options="rewrite"></codemirror>
          </div>
          <a-alert class="mab10" message="若设置伪静态后，网站无法正常访问，请尝试设置回'模板-空'" type="info" show-icon />
          <a-button type="primary">保存</a-button>
        </a-tab-pane>

        <a-tab-pane key="8" tab="301重定向">
          <div class="flex-row-flex-start-nowrap mab10">
            <div class="text-right mar10" style="width: 60px">访问域名</div>
            <a-select :default-value="rewrite301.current" style="width: 400px;">
              <a-select-option
                v-for="rewrite301 in rewrite301.list"
                :key="rewrite301.id"
                :value="rewrite301.domainname"
              >{{ rewrite301.domainname }}</a-select-option>
            </a-select>
          </div>
          <div class="flex-row-flex-start-nowrap mab10">
            <div class="text-right mar10" style="width: 60px">目标URL</div>
            <a-input addon-before="http://" default-value="www.baidu.com" style="width: 400px;" />
          </div>
          <div class="flex-row-flex-start-nowrap mab10">
            <div class="text-right mar10" style="width: 60px">开关</div>
            <a-switch size="small"></a-switch>
          </div>
          <a-alert class="mab10" message="关闭301重定向后，需清空浏览器缓存才能看到生效结果." type="info" show-icon />
          <a-alert
            class="mab10"
            message="选择[整站跳转]时请不要将目标URL设为同一站点下的域名,否则会出现循环重定向"
            type="warning"
            show-icon
          />
        </a-tab-pane>

        <a-tab-pane key="9" tab="访问限制">
          允许所有,拒绝以下(黑名单)
          <div class="flex-row-flex-start-nowrap mab10 mat10">
            <a-textarea
              placeholder="
每行填写一个IP或域名
单个IP: 192.168.1.1
支持网段: 192.168.1.0/24
域名: www.domain.com
              "
              :rows="6"
              style="width: 300px;"
            />
            <a-button class="mal10" type="primary">保存</a-button>
          </div>拒绝所有,允许以下(白名单)
          <div class="flex-row-flex-start-nowrap mab10 mat10">
            <a-textarea
              placeholder="
每行填写一个IP或域名
单个IP: 192.168.1.1
支持网段: 192.168.1.0/24
域名: www.domain.com
              "
              :rows="6"
              style="width: 300px;"
            />
            <a-button class="mal10" type="primary">保存</a-button>
          </div>
          <a-alert class="mab10" message="以上两种情况只有一种会生效,以最后一次设置为准" type="info" show-icon />
        </a-tab-pane>

        <a-tab-pane key="10" tab="流量限制">敬请期待</a-tab-pane>
        <a-tab-pane key="11" tab="FTP设置">
          开关
          <a-switch class="mal5" size="small"></a-switch>
          <div class="mat10">
            <a-input
              addon-before="FTP用户"
              default-value="www_test1_com"
              disabled
              style="width: 300px"
            />
          </div>
          <div class="mat10">
            <a-input-password
              addon-before="FTP密码"
              default-value="xMxeekHnDjxH4npj"
              style="width: 300px"
            />
            <a-button type="link">随机生成</a-button>
          </div>
          <div class="mat10">
            <a-input
              addon-before="FTP容量"
              addon-after="单位(MB)"
              default-value="10"
              style="width: 300px"
            />
          </div>
          <a-alert class="mat10" message="每个网站都会关联一个FTP,您可以在此处开启或关闭它" type="info" show-icon />
          <a-button class="mat10" type="primary">保存</a-button>
        </a-tab-pane>

        <a-tab-pane key="12" tab="备份与解压">
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
                <template slot="title">在线解压</template>
                <a-button
                  class="mar5"
                  icon="file-zip"
                  type="dashed"
                  size="small"
                  @click="openUnzipBackup(record)"
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

        <a-tab-pane key="13" tab="网站日志">
          <div class="flex-row-space-between-wrap">
            <div>
              <a-button type="dashed" class="font12px" size="small">重新获取</a-button>
              <span class="mal5 font12px color-info">这将会重新获取网站的最新日志</span>
            </div>
            <div class="font12px">
              每秒获取一次
              <a-switch size="small"></a-switch>
            </div>
          </div>
          <a-divider class="ma0 mab10 mat10" />
          <div class="mab10 color-primary font12px">
            响应日志
            <a-textarea
              :defaultValue="log.accessLog"
              :readOnly="true"
              :rows="14"
              class="color-terminal font12px"
            />
          </div>
          <div class="color-error font12px">
            错误日志
            <a-textarea
              :defaultValue="log.errorLog"
              :readOnly="true"
              :rows="14"
              class="color-terminal font12px"
            />
          </div>
        </a-tab-pane>
      </a-tabs>
    </div>

    <!-- unzip layer -->
    <div id="unzip" class="pd15" v-if="visibleUnzip" v-show="false">
      <a-checkbox class="mab10">先清空web目录再解压</a-checkbox>
      <div class="flex-row-space-between-nowrap">
        <div style="width: 50px">解压到</div>
        <a-input addon-before="web" default-value="/" />
      </div>
    </div>
  </div>
</template>

<script>
const domainDatas = [
  {
    key: 1,
    name: "www.test1.com",
    port: "80"
  }
];

const subDomainDatas = [
  {
    key: 1,
    name: "www.subtest1.com",
    port: "80",
    path: "/static"
  }
];

const certDatas = [
  {
    key: 1,
    name: "*.61499.com",
    organization: "Sectigo Limited",
    time: "2020-06-15 00:00:00",
    expires: "2021-06-15 23:59:59"
  }
];

const backupDatas = [
  {
    key: 1,
    name: "www.test1.com_20200820_112640.zip",
    size: "21M",
    time: "2020-08-20 11:26:40"
  }
];

const siteDatas = [
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
      visibleSetting: false,
      visibleUnzip: false,

      php: {
        current: "7.3.14",
        list: [
          { version: "纯静态" },
          { version: "5.3.29" },
          { version: "5.4.45" },
          { version: "5.5.38" },
          { version: "5.6.40" },
          { version: "7.0.33" },
          { version: "7.1.33" },
          { version: "7.2.27" },
          { version: "7.3.14" }
        ]
      },

      rewrite301: {
        current: "整站跳转",
        list: [
          { id: 1, domainname: "整站跳转" },
          { id: 2, domainname: "www.test1.com" },
          { id: 3, domainname: "bbs.test1.com" }
        ]
      },

      cert: {
        current: "测试证书1",
        list: [
          { id: 1, name: "测试证书1" },
          { id: 2, name: "测试证书2" },
          { id: 3, name: "测试证书3" },
          { id: 4, name: "测试证书4" },
          { id: 5, name: "测试证书5" },
          { id: 6, name: "测试证书6" }
        ]
      },

      log: {
        accessLog: "当前没有日志",
        errorLog: "当前没有日志"
      },

      rewrite: {
        mode: "text/x-sh",
        content:
          "<IfModule mod_rewrite.c>\n" +
          "    RewriteEngine on\n" +
          "    RewriteBase /\n" +
          "    RewriteCond %{REQUEST_FILENAME} !-d\n" +
          "    RewriteCond %{REQUEST_FILENAME} !-f\n" +
          "    RewriteRule ^(.*)$ index.php?s=/$1 [QSA,PT,L]\n" +
          "</IfModule>\n",
        list: [
          {
            id: 1,
            name: "模板-wordpress",
            content:
              "location /\n" +
              "{\n" +
              "    try_files $uri $uri/ /index.php?$args;\n" +
              "}\n" +
              "rewrite /wp-admin$ $scheme://$host$uri/ permanent;"
          },
          {
            id: 2,
            name: "模板-phpwind",
            content:
              "location / {\n" +
              "    rewrite ^(.*)-htm-(.*)$ $1.php?$2 last;\n" +
              "    rewrite ^(.*)/simple/([a-z0-9_]+.html)$ $1/simple/index.php?$2 last;\n" +
              "}"
          },
          {
            id: 3,
            name: "模板-shopex",
            content:
              "location / {\n" +
              "    if (!-e $request_filename) {\n" +
              "        rewrite ^/(.+.(html|xml|json|htm|php|jsp|asp|shtml))$ /index.php?$1 last;\n" +
              "    }\n" +
              "}"
          }
        ]
      },

      config: {
        mode: "text/x-nginx-conf",
        content:
          "server\n" +
          "{\n" +
          "    listen 80;\n" +
          "    server_name tp.com;\n" +
          "    index index.php index.html index.htm default.php default.htm default.html;\n" +
          "    root /www/wwwroot/tp6/public;\n" +
          "\n" +
          "    #SSL-START SSL相关配置，请勿删除或修改下一行带注释的404规则\n" +
          "    #error_page 404/404.html;\n" +
          "    limit_conn perserver 300;\n" +
          "    limit_conn perip 25;\n" +
          "    limit_rate 512k;\n" +
          "    #SSL-END\n" +
          "\n" +
          "    #ERROR-PAGE-START  错误页配置，可以注释、删除或修改\n" +
          "    #error_page 404 /404.html;\n" +
          "    #error_page 502 /502.html;\n" +
          "    #ERROR-PAGE-END\n" +
          "\n" +
          "    #PHP-INFO-START  PHP引用配置，可以注释或修改\n" +
          "    include enable-php-73.conf;\n" +
          "    #PHP-INFO-END\n" +
          "\n" +
          "    #REWRITE-START URL重写规则引用,修改后将导致面板设置的伪静态规则失效\n" +
          "    include /www/server/panel/vhost/rewrite/tp.com.conf;\n" +
          "    #REWRITE-END\n" +
          "\n" +
          "    #禁止访问的文件或目录\n" +
          "    location ~ ^/(.user.ini|.htaccess|.git|.svn|.project|LICENSE|README.md)\n" +
          "    {\n" +
          "        return 404;\n" +
          "    }\n" +
          "\n" +
          "    #一键申请SSL证书验证目录相关设置\n" +
          "    location ~ .well-known{\n" +
          "        allow all;\n" +
          "    }\n" +
          "\n" +
          "    location ~ .*.(gif|jpg|jpeg|png|bmp|swf)$\n" +
          "    {\n" +
          "        expires      30d;\n" +
          "        error_log off;\n" +
          "        access_log /dev/null;\n" +
          "    }\n" +
          "\n" +
          "    location ~ .*.(js|css)?$\n" +
          "    {\n" +
          "        expires      12h;\n" +
          "        error_log off;\n" +
          "        access_log /dev/null;\n" +
          "    }\n" +
          "    access_log  /www/wwwlogs/tp.com.log;\n" +
          "    error_log  /www/wwwlogs/tp.com.error.log;\n" +
          "}\n"
      },

      siteDatas,
      siteColumns: [
        {
          title: "状态",
          dataIndex: "siteStatus",
          key: "siteStatus",
          width: 70,
          className: "table_title",
          scopedSlots: { customRender: "siteStatus" }
        },
        {
          title: "网站名称",
          dataIndex: "siteName",
          key: "siteName",
          ellipsis: true,
          width: 150,
          className: "table_title"
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
          scopedSlots: { customRender: "ftpStatus" }
        },
        {
          title: "FTP账户",
          dataIndex: "ftpUser",
          key: "ftpUser",
          ellipsis: true,
          width: 150,
          className: "table_title"
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
          className: "table_title"
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

      domainDatas,
      domainColumns: [
        {
          title: "域名",
          dataIndex: "name",
          key: "name",
          className: "table_title",
          ellipsis: true
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

      subDomainDatas,
      subDomainColumns: [
        {
          title: "域名",
          dataIndex: "name",
          key: "name",
          className: "table_title",
          ellipsis: true
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
      ],

      certDatas,
      certColumns: [
        {
          title: "关联域名",
          dataIndex: "name",
          key: "name",
          className: "table_title",
          ellipsis: true
        },
        {
          title: "发证机构",
          dataIndex: "organization",
          key: "organization",
          ellipsis: true,
          width: 100,
          className: "table_title"
        },
        {
          title: "发证时间",
          dataIndex: "time",
          key: "time",
          ellipsis: true,
          width: 100,
          className: "table_title"
        },
        {
          title: "到期时间",
          dataIndex: "expires",
          key: "expires",
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
    searchSite(value) {
      this.public_msg_success(value);
    },

    rebuildSite(record) {
      let vm = this;
      this.public_msg_confirm(
        "重建网站确认",
        "您真的要重建[" + record.siteName + "]吗?",
        function() {
          vm.public_msg_success("重建成功!");
        }
      );
    },

    rebuildSiteAll() {
      let vm = this;
      this.public_msg_confirm(
        "重建网站确认",
        "您真的要重建所有网站吗?",
        function() {
          vm.public_msg_success("重建完毕!");
        }
      );
    },

    openSetting(record) {
      var vm = this;
      var load = this.public_msg_loading();
      layer.close(load);
      this.visibleSetting = true;
      setTimeout(function() {
        vm.public_msg_open(
          "网站设置[" +
            record.siteName +
            "]--开通时间[" +
            record.createTime +
            "]",
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

    removeSite(record) {
      let vm = this;
      this.public_msg_confirm(
        "删除网站确认",
        "您真的要删除[" + record.siteName + "]吗?",
        function() {
          vm.public_msg_success("删除成功!");
        }
      );
    },

    removeDomainName(record) {
      let vm = this;
      this.public_msg_confirm(
        "删除域名确认",
        "您真的要删除[" + record.name + "]吗?",
        function() {
          vm.public_msg_error("最后一个域名不能删除!");
        }
      );
    },

    onChangeSsl(key) {
      this.public_msg_loading();
    },

    removeCert(record) {
      let vm = this;
      this.public_msg_confirm(
        "删除证书确认",
        "您真的要删除[" + record.name + "]吗?",
        function() {
          vm.public_msg_success("删除成功");
        }
      );
    },

    loadRewrite() {
      var load = this.public_msg_loading();
      this.rewrite.content =
        "<IfModule mod_rewrite.c>\n" +
        "    RewriteEngine on\n" +
        "    RewriteBase /\n" +
        "    RewriteCond %{REQUEST_FILENAME} !-d\n" +
        "    RewriteCond %{REQUEST_FILENAME} !-f\n" +
        "    RewriteRule ^(.*)$ index.php?s=/$1 [QSA,PT,L]\n" +
        "</IfModule>\n";
      layer.close(load);
    },

    openUnzipBackup(record) {
      var vm = this;
      var load = this.public_msg_loading();
      layer.close(load);
      this.visibleUnzip = true;
      setTimeout(function() {
        var index = vm.public_msg_open(
          "在线解压",
          ["400px", "190px"],
          ["确定", "取消"],
          $("#unzip"),
          -1,
          null,
          function() {
            vm.public_msg_success("解压成功");
            layer.close(index);
          },
          null,
          function() {
            vm.visibleUnzip = false;
          }
        );
      }, 150);
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
