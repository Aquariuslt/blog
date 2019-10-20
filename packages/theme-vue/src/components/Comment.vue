<template>
  <div class="comment" v-if="options">
    <vue-disqus :shortname="options.shortname" :identifier="options.identifier" :url="options.url"></vue-disqus>
  </div>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component({})
export default class Comment extends Vue {
  @PropSync('data') options!: {
    shortname: string;
    identifier: string;
    url: string;
  };
}
</script>

<style scoped lang="less">
.comment {
}
</style>
