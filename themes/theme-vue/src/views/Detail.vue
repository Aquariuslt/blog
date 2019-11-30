<template>
  <div class="detail md-layout md-gutter md-alignment-top-center">
    <breadcrumbs :data="$data.$routeMeta.breadcrumbs" class="md-layout-item md-size-100"></breadcrumbs>
    <article-detail :data="$data.$routeMeta.data" class="md-layout-item md-size-100"></article-detail>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteMixins } from '@theme-vue/mixins/route.mixins';
import Breadcrumbs from '@theme-vue/components/Breadcrumbs.vue';
import ArticleDetail from '@theme-vue/components/ArticleDetail.vue';

@Component({
  components: {
    Breadcrumbs,
    ArticleDetail
  },
  mixins: [RouteMixins]
})
export default class Detail extends Vue {}
</script>

<style scoped lang="less">
.detail {
  margin: 0;
}
</style>
