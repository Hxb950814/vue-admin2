<template>
  <div id="app">
    <router-view />
  </div>
</template>

<script lang="ts">
import { Component, Watch, Vue } from "vue-property-decorator";

@Component({
  components: {},
  mixins: []
})
export default class extends Vue {}
</script>
