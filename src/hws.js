export const hws = {
    methods:{
        loadingMsg: function() {
            var load = layer.msg("正在处理,请稍候...",
                {icon: 16, time: 1000, shade: [0.5, "#000"]});
            return load
        },

        successMsg: function(msg) {
            layer.msg(msg, {icon: 1, time: 1000, shade: [0.5, "#000"]});
        },

        errorMsg: function(msg) {
            layer.msg(msg, {icon: 2, shade: [0.5, "#000"]});
        },

        copyToClipboard: function(password, id) {
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

        dragsortToLi: function() {
            $(".dragsort").dragsort({
              dragSelector: "li",
              dragEnd: function() {},
              dragBetween: false,
              scrollContainer: "div",
              placeHolderTemplate: "<li></li>"
            });
        },

        drawTrafficChart: function() {
          let option = {tooltip: {trigger: "axis",axisPointer: {type: "cross"}},xAxis: {type: "category",boundaryGap: false,data: ["13:7:40","13:7:43","13:7:46","13:7:49","13:8:02","13:8:05","13:8:08"],axisLine: {lineStyle: {color: "#666"}}},yAxis: {type: "value",name: "单位：KB/s",boundaryGap: [0, "100%"],min: 0,splitLine: {lineStyle: {color: "#ddd"}},axisLine: {lineStyle: {color: "#666"}}},series: [{name: this.traffic[0].title,type: "line",smooth: true,symbol: "circle",showSymbol: false,symbolSize: 6,sampling: "average",data: this.traffic[0].dataList,circle: "circle",itemStyle: { normal: { color: "#f7b851" } },areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0,0,0,1,[{ offset: 0, color: "rgba(255, 140, 0,0.5)" },{ offset: 1, color: "rgba(255, 140, 0,0.8)" }],false)}},lineStyle: { normal: { width: 1, color: "#aaa" } }},{name: this.traffic[1].title,type: "line",smooth: true,symbol: "circle",showSymbol: false,symbolSize: 6,sampling: "average",data: this.traffic[1].dataList,circle: "circle",itemStyle: { normal: { color: "#52a9ff" } },areaStyle: {normal: {color: new echarts.graphic.LinearGradient(0,0,0,1,[{ offset: 0, color: "rgba(30, 144, 255,0.5)" },{ offset: 1, color: "rgba(30, 144, 255,0.8)" }],false)}},lineStyle: { normal: { width: 1, color: "#aaa" } }}]};
            let trafficChart = echarts.init(document.getElementById("trafficChart"));
            trafficChart.setOption(option);
            window.addEventListener("resize", function() {
                trafficChart.resize();
            });
        },

        handleProgressColor: function(progress) {
            if (progress > 90) { return "#f5222d";}
            else if (progress > 70) { return "#faad14";}
            else { return "#52c41a";}
        },
    }
}
