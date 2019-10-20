<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <md-card class="article-card">
      <md-card-media class="article-cover">
        <img :src="article.cover" alt="cover" />
      </md-card-media>
      <md-card-header>
        <div class="md-title">{{ article.title }}</div>
        <div class="md-subhead">{{ formatDate(article.created) }}</div>
      </md-card-header>

      <md-card-content>
        {{ article.summary }}
      </md-card-content>

      <md-card-actions>
        <md-button :to="article['link']">More</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { format, parseISO } from 'date-fns';

@Component
export default class ArticleCard extends Vue {
  @PropSync('data') article!: Partial<ArticleContext>;

  formatDate(date) {
    return format(parseISO(date), 'yyyy-MM-dd');
  }
}
</script>

<style lang="less" scoped>
.article-card {
  max-width: 800px;
  margin: 8px;

  .article-cover {
    img {
      object-fit: cover;
      max-height: 300px;
      max-width: 800px;
    }
  }
}
</style>
