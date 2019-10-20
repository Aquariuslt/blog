<template>
  <div class="table md-layout md-gutter md-alignment-top-center">
    <breadcrumbs :data="$data.$routeMeta.breadcrumbs"></breadcrumbs>

    <md-table md-card class="table-card">
      <md-table-row>
        <md-table-head>Name</md-table-head>
        <md-table-head md-numeric>Total</md-table-head>
      </md-table-row>
      <md-table-row v-for="item in $data.$routeMeta.data" :key="item.id">
        <md-table-cell>{{ item.label }}</md-table-cell>
        <md-table-cell md-numeric>
          <router-link :to="item.link"> {{ item.total }}</router-link>
        </md-table-cell>
      </md-table-row>
    </md-table>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';
import { RouteMixins } from '@theme/mixins/route.mixins';
import Breadcrumbs from '@theme/components/Breadcrumbs.vue';

@Component({
  components: {
    Breadcrumbs
  },
  mixins: [RouteMixins]
})
export default class Table extends Vue {}
</script>

<style scoped lang="less">
.table {
  margin: 0;

  .table-card {
    width: 800px;
    max-width: 800px;
  }
}
</style>
