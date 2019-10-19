<template>
  <div class="table"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteMixins } from '@theme/mixins/route.mixins';

@Component({
  mixins: [RouteMixins]
})
export default class Table extends Vue {}
</script>
