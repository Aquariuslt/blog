<template>
  <div class="table md-layout md-gutter md-alignment-top-center">
    <breadcrumbs :data="$data.$routeMeta.breadcrumbs" class="md-layout-item md-size-100"></breadcrumbs>

    <div class="md-layout-item md-size-100">
      <div class="md-layout md-gutter md-alignment-top-center">
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
    </div>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';
import { RouteMixins } from '@theme-vue/mixins/route.mixins';
import Breadcrumbs from '@theme-vue/components/Breadcrumbs.vue';

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
