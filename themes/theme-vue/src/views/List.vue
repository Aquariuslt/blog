<template>
  <div class="list md-layout md-gutter md-alignment-top-center">
    <breadcrumbs
      v-if="$route.path !== '/'"
      :data="$data.$routeMeta.breadcrumbs"
      class="md-layout-item md-size-100"
    ></breadcrumbs>
    <article-card
      v-for="article in $data.$routeMeta.data"
      :key="article.id"
      :data="article"
      class="md-layout-item md-size-100"
    ></article-card>
  </div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteMixins } from '@theme-vue/mixins/route.mixins';
import Breadcrumbs from '@theme-vue/components/Breadcrumbs.vue';
import ArticleCard from '@theme-vue/components/ArticleCard.vue';

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
