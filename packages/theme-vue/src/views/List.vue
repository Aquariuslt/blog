<template>
  <div class="list">
    {{ JSON.stringify($data.$meta) }}
  </div>
</template>

<script lang="ts">
import { Component, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { loadApi } from '@theme/api';
import { EmptyRouteMeta, RouteMeta } from '@blog/common/interfaces/routes';

@Component({})
export default class List extends Vue {
  @Prop() apiPath!: string;
  @Provide() $meta: RouteMeta = EmptyRouteMeta;

  @Watch('apiPath', { immediate: true, deep: true })
  async onApiPathUpdate(val) {
    this.$data.$meta = await loadApi(val);
  }

  created() {}
}
</script>
