<template>
  <div class="list md-layout md-gutter md-alignment-top-center">
    <breadcrumbs v-if="$route.path !== '/'" :data="$data.$routeMeta.breadcrumbs"></breadcrumbs>
    <article-card v-for="article in $data.$routeMeta.data" :key="article.id" :data="article"></article-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteMixins } from '@theme/mixins/route.mixins';
import Breadcrumbs from '@theme/components/Breadcrumbs.vue';
import ArticleCard from '@theme/components/ArticleCard.vue';

@Component({
  components: {
    Breadcrumbs,
    ArticleCard
  },
  mixins: [RouteMixins]
})
export default class List extends Vue {}
</script>

<style scoped lang="less">
.list {
  margin: 0;
}
</style>
