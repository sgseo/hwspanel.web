import dayjs from 'dayjs'
export const hws = {
    methods:{
        public_msg_loading: function() {
            var load = layer.msg("正在处理,请稍候...",
                {icon: 16, time: 1000, shade: [0.3, "#000"]});
            return load
        },

        public_msg_success: function(msg) {
            layer.msg(msg, {icon: 1, time: 1000, shade: [0.3, "#000"]});
        },

        public_msg_error: function(msg) {
            layer.msg(msg, {icon: 2, shade: [0.3, "#000"]});
        },

        public_msg_confirm: function(title, msg, func) {
            layer.confirm(
              msg,
              {
                icon: 3,
                btn: ["确定", "取消"],
                closeBtn: 2,
                title: title,
              },
              func
            );
        },

        public_msg_open: function(title, area, btn, content, zIndex, successfunc, yesfunc, cancelfunc, endfunc) {
            var open = layer.open({
              type: 1,
              title: title,
              content: content,
              area: area,
              btn: btn,
              offset: "auto",
              closeBtn: 2,
              shade: [0.3, "#000"],
              shadeClose: false,
              resize: false,
              maxmin: true,
              zIndex: zIndex,
              success: successfunc,
              yes: yesfunc,
              cancel: cancelfunc,
              end: endfunc,
            });
            return open
        },

        public_tools_format_timestamp: function(timestamp) {
            return dayjs(timestamp)
        },

        public_tools_copy_to_clipboard: function(password, id) {
            let clipboard = new ClipboardJS("#" + id);
            clipboard.on("success", function() {
                layer.msg("复制成功", {icon: 1, time: 1000, shade: [0.5, "#000"]});
            });
            clipboard.on("error", function() {
                layer.msg("复制失败,浏览器不兼容!", {icon: 2, shade: [0.5, "#000"]});
            });
            $("#" + id).attr("data-clipboard-text", password);
            $("#" + id).click();
            clipboard.destroy();
        },

        public_tools_dragsort_for_li: function() {
            $(".dragsort").dragsort({
              dragSelector: "li",
              dragEnd: function() {},
              dragBetween: false,
              scrollContainer: "div",
              placeHolderTemplate: "<li></li>"
            });
        },

        public_tools_draw_traffic_chart: function() {
          let option = {tooltip: {trigger: "axis",axisPointer: {type: "cross"}},xAxis: {type: "category",boundaryGap: false,data: ["13:7:40","13:7:43","13:7:46","13:7:49","13:8:02","13:8:05","13:8:08"],axisLine: {lineStyle: {color: "#666"}}},yAxis: {type: "value",name: "单位：KB/s",boundaryGap: [0, "100%"],min: 0,splitLine: {lineStyle: {color: "#ddd"}},axisLine: {lineStyle: {color: "#666"}}},series: [{name: this.traffic[0].title,type: "line",smooth: true,symbol: "circle",showSymbol: false,symbolSize: 6,sampling: "average",data: this.traffic[0].dataList,circle: "circle",itemStyle: { normal: { color: "#f7b851" } },areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0,0,0,1,[{ offset: 0, color: "rgba(255, 140, 0,0.5)" },{ offset: 1, color: "rgba(255, 140, 0,0.8)" }],false)}},lineStyle: { normal: { width: 1, color: "#aaa" } }},{name: this.traffic[1].title,type: "line",smooth: true,symbol: "circle",showSymbol: false,symbolSize: 6,sampling: "average",data: this.traffic[1].dataList,circle: "circle",itemStyle: { normal: { color: "#52a9ff" } },areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0,0,0,1,[{ offset: 0, color: "rgba(30, 144, 255,0.5)" },{ offset: 1, color: "rgba(30, 144, 255,0.8)" }],false)}},lineStyle: { normal: { width: 1, color: "#aaa" } }}]};
            let trafficChart = echarts.init(document.getElementById("trafficChart"));
            trafficChart.setOption(option);
            window.addEventListener("resize", function() {
                trafficChart.resize();
            });
        },
    }
}
