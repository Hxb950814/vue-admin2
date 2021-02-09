<template>
  <div>
    <div class="page-cap-title">
      会员分析
      <small
        >-通过会员的性别、转化、年龄、区域、来源、质量进行统计，了解客户基本情况</small
      >
    </div>
    <div class="hbb-memb-group">
      <div class="o">
        <SexView />
      </div>
      <div class="o">
        <ConversionView />
      </div>
    </div>
    <div class="hbb-memb-group">
      <div class="o">
        <AgeView />
      </div>
      <div class="o">
        <AreaView />
      </div>
    </div>
    <div class="hbb-memb-group">
      <div class="o">
        <SoureView />
      </div>
      <div class="o">
        <QalityView />
      </div>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import SexView from "./viewPage/sexView.vue";
import ConversionView from "./viewPage/conversionView.vue";
import AgeView from "./viewPage/ageView.vue";
import AreaView from "./viewPage/areaView.vue";
import SoureView from "./viewPage/soureView.vue";
import QalityView from "./viewPage/qualityView.vue";
import admin from "@/utils/index.ts";
@Component({
  components: {
    SexView,
    ConversionView,
    AgeView,
    AreaView,
    SoureView,
    QalityView
  }
})
export default class extends Vue {
  mounted() {}
  add() {}
}
</script>

<style lang="scss" scoped>
.hbb-memb-group {
  display: flex;
  width: 100%;
  justify-content: space-between;
  padding: $x20 0;
  border: 1px solid #ddd;
  margin-bottom: $x20;
  .o {
    width: 50%;
    padding: 0 $x20;
    &:nth-of-type(1) {
      border-right: 1px solid #ddd;
    }
  }
}
</style>
