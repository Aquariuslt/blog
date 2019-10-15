<template>
  <div class="table"></div>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';
import { loadApi } from '@theme/api';
import { RouteMeta } from '@blog/common/interfaces/routes';

@Component({})
export default class Table extends Vue {
  @Prop() apiPath!: string;
  @Prop() meta!: RouteMeta;

  @Watch('apiPath', { immediate: true, deep: true })
  async onApiPathUpdate(val) {
    this.meta = await loadApi(val);
  }
}
</script>
