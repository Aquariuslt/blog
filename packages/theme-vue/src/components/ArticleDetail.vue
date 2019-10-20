<template>
  <md-card class="article-detail" v-if="article">
    <md-card-media class="article-cover">
      <img :src="article.cover" alt="cover" />
    </md-card-media>

    <md-card-content v-html="article.html"> </md-card-content>

    <md-card-content>
      <keyword v-for="item in article.tags" :key="item.id" :data="item"></keyword>
    </md-card-content>
  </md-card>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { format, parseISO } from 'date-fns';
import Keyword from '@theme/components/Keyword.vue';
import '@theme/markdown.css';

@Component({
  components: {
    Keyword
  }
})
export default class ArticleDetail extends Vue {
  @PropSync('data') article!: Partial<ArticleContext>;

  formatDate(date) {
    return format(parseISO(date), 'yyyy-MM-dd');
  }
}
</script>

<style scoped lang="less">
.article-detail {
  max-width: 800px;
  margin: 8px;

  .article-cover {
  }
}
</style>
