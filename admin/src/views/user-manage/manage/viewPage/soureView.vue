<template>
  <div class="hbb-six">
    <h2>
      会员来源
      <el-popover
        placement="bottom-start"
        width="360"
        popper-class="hbb-popover"
        trigger="hover"
      >
        <div class="hbb-tip">
          <p>1、会员来源分为：好友推荐、自主注册</p>
          <p>2、统计各来源的占比=相关人数/注册总人数</p>
        </div>
        <el-button slot="reference" class="svgBtn" style="width: 20px">
          <svg
            viewBox="0, 0, 1024, 1024"
            class="ih5-icon"
            stroke-width="1"
            style="height: 20px; width: 20px;margin-left: 5px"
          >
            <path
              d="M704 767.392A318.016 318.016 0 0 1 512 832a318.016 318.016 0 0 1-192-64.608C242.464 708.928 192 616.384 192 512c0-176.448 143.552-320 320-320s320 143.552 320 320c0 104.384-50.464 196.928-128 255.392M512 128C300.256 128 128 300.256 128 512c0 141.76 77.408 265.504 192 332.032A381.312 381.312 0 0 0 511.936 896h0.128A381.312 381.312 0 0 0 704 844.032c114.592-66.528 192-190.272 192-332.032 0-211.744-172.256-384-384-384 M639.936 403.84C639.936 339.904 582.528 288 512 288c-70.592 0-128 51.936-128 115.84v15.52a32 32 0 1 0 64 0v-15.552c0-28.576 28.736-51.808 64-51.808 35.296 0 64 23.232 64 51.84v49.152c0.064 1.536-0.544 31.616-39.808 59.008a169.44 169.44 0 0 1-32.16 17.6 31.584 31.584 0 0 0-24 30.4v37.184a32 32 0 0 0 64 0v-15.488c41.952-20.672 65.696-46.464 79.04-69.696 18.56-32.512 16.992-59.84 16.896-60.64V403.84zM512 672a32 32 0 1 0 0 64 32 32 0 0 0 0-64"
              style="fill: rgb(153, 153, 153);"
            />
          </svg>
        </el-button>
      </el-popover>
    </h2>
    <div style="display: flex;width: 100%;justify-content: flex-end">
      <el-select
        v-model="day"
        style="width: 130px;float: right"
        clearable
        placeholder="请选择"
        @change="timeChange"
      >
        <el-option
          v-for="item in dayList"
          :key="item.day"
          :label="item.title"
          :value="item.day"
        />
      </el-select>
    </div>
    <div class="charts" style="position:relative;">
      <!-- 统计图部分 -->
      <!--            <div v-if="nearData.length === 0" class="hbb-noData">-->
      <!--                暂无数据-->
      <!--            </div>-->
      <template>
        <div id="chart1" ref="chart1" class="chart-map" />
      </template>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import * as echarts from "echarts";
let chart: any | undefined; // 图表
@Component({
  components: {}
})
export default class extends Vue {
  dataList: any[] = [
    { value: 335, name: "自主注册" },
    { value: 300, name: "好友推荐" }
  ];

  day = 15;

  dayList: any[] = [
    { title: "近15天", day: 15 },
    { title: "近30天", day: 30 }
  ];

  mounted() {
    this.init();
  }

  timeChange() {}

  init() {
    // 近7天
    // 取得选项列表  跟父元素的按钮配置数据相同
    const chart1Dom = document.getElementById("chart1");
    if (!chart1Dom) {
      throw new Error("选择器 #chart1 对应的dom不存在");
    }
    const width = getComputedStyle(chart1Dom).width;
    const size = {
      width: parseFloat(width),
      height: 320
    };
    chart = echarts.init(
      this.$refs.chart1 as HTMLCanvasElement,
      undefined,
      size
    ); // 表格初始化
    this.getData();
  }

  getData() {
    const option = {
      title: {
        text: ""
      },
      tooltip: {
        trigger: "item",
        formatter: "{a} <br/>{b} : {c} ({d}%)"
      },
      grid: {
        left: "3%",
        right: "4%",
        bottom: "0%",
        containLabel: true
      },
      xAxis: [
        {
          type: "category",
          boundaryGap: true,
          show: false,
          data: []
        }
      ],
      series: [
        {
          name: "来源",
          type: "pie",
          data: this.dataList,
          radius: ["50%", "70%"],
          avoidLabelOverlap: false,
          label: {
            show: true,
            position: "inside"
          },
          itemStyle: {
            normal: {
              color(params: any) {
                // 自定义颜色
                const colorList = ["#66ABFF", "#FF8FBF"];
                return colorList[params.dataIndex];
              }
            }
          },
          emphasis: {
            label: {
              show: true,
              fontSize: "30",
              fontWeight: "bold"
            }
          },
          labelLine: {
            show: false
          }
        }
      ]
    };
    chart && chart.setOption(option as any); // 绘制
  }
}
</script>

<style lang="scss" scoped>
.hbb-six {
  display: flex;
  width: 100%;
  flex-direction: column;
  h2 {
    display: flex;
    align-items: center;
    font-size: $x15;
    color: #333;
    position: relative;
    span {
      width: $x20 !important;
      display: flex;
      align-items: center;
    }
    .svgBtn {
      border: none;
      height: $x20;
      display: flex;
      width: $x20 !important;
      padding: 0;
      span {
        line-height: 0;
      }
    }
  }
  .charts {
    margin-top: $x20;
  }
}
</style>
