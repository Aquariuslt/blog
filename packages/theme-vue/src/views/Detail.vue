<template>
  <div class="detail md-layout md-gutter md-alignment-top-center">
    <breadcrumbs :data="$data.$routeMeta.breadcrumbs"></breadcrumbs>
    <article-detail :data="$data.$routeMeta.data"></article-detail>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteMixins } from '@theme/mixins/route.mixins';
import Breadcrumbs from '@theme/components/Breadcrumbs.vue';
import ArticleDetail from '@theme/components/ArticleDetail.vue';

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
