<template>
  <div class="md-layout md-gutter md-alignment-top-center">
    <md-card class="article-detail" v-if="article">
      <md-card-media class="article-cover">
        <img :src="article.cover" alt="cover" />
      </md-card-media>

      <md-card-content v-html="article.html" class="markdown-body"> </md-card-content>

      <md-card-content>
        <keyword v-for="item in article.tags" :key="item.id" :data="item"></keyword>
      </md-card-content>

      <md-card-content>
        <comment :data="article['disqus']"></comment>
      </md-card-content>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';
import { ArticleContext } from '@blog/common/interfaces/articles/article-context';
import { format, parseISO } from 'date-fns';
import Keyword from '@theme-vue/components/Keyword.vue';
import Comment from '@theme-vue/components/Comment.vue';
import '@theme-vue/markdown.css';

@Component({
  components: {
    Keyword,
    Comment
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
  width: 100%;
  max-width: 800px;
  margin: 0px;
}
</style>
