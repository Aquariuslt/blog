<template>
  <md-chip md-clickable>
    <router-link tag="span" :to="keyword.link">
      {{ keyword.label }}
    </router-link>
  </md-chip>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component({})
export default class Keyword extends Vue {
  @PropSync('data') keyword!: {
    id: string;
    label: string;
    total: string;
    link: string;
  };
}
</script>

<style scoped lang="less"></style>
