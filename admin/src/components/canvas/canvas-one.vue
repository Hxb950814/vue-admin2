<template>
  <div>
    <canvas id="canvas" width="1403" height="937"></canvas>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from "vue-property-decorator";
import { canvasFn } from "@/utils/canvas.ts";
@Component({})
export default class extends Vue {
  mounted(): void {
    canvasFn();
  }
}
</script>

<style lang="scss" scoped></style>
