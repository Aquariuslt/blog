<template>
  <i :class="iconClass"></i>
</template>

<script lang="ts">
import { Component, PropSync, Vue } from 'vue-property-decorator';

@Component({})
export default class Icon extends Vue {
  @PropSync('value', { type: String }) icon!: string;

  get iconClass() {
    return `mdi mdi-24px mdi-${this.icon}`;
  }
}
</script>
