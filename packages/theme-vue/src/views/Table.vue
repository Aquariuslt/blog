<template>
  <div class="table"></div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { EmptyRouteMeta, RouteMeta } from '@blog/common/interfaces/routes';
import { loadApi } from '@theme/api';

@Component({})
export default class Table extends Vue {
  @Prop() apiPath!: string;
  @Provide() $meta: RouteMeta = EmptyRouteMeta;

  @Watch('apiPath', { immediate: true, deep: true })
  async onApiPathUpdate(val) {
    this.$data.$meta = await loadApi(val);
  }
}
</script>
