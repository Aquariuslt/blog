<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <div class="breadcrumbs">
      <span v-for="(item, index) in breadcrumbs.itemListElement" :key="index">
        <router-link class="breadcrumbs-item" :to="toInternalLink(item.item)" exact> {{ item.name }}</router-link>
        <span v-if="index !== breadcrumbs.itemListElement.length - 1">></span>
      </span>
    </div>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component
export default class Breadcrumbs extends Vue {
  @PropSync('data') breadcrumbs;

  toInternalLink(url: string) {
    return new URL(url).pathname;
  }
}
</script>

<style scoped lang="less">
.breadcrumbs {
  width: 100%;
  max-width: 800px;

  margin: 4px;

  .breadcrumbs-item {
    margin: 4px;
    color: #5f6368;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;

    &:hover {
      text-decoration: none !important;
    }
  }
}
</style>
