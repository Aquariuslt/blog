<template>
  <div class="list"></div>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';
import { RouteMixins } from '@theme/mixins/route.mixins';

@Component({
  mixins: [RouteMixins]
})
export default class List extends Vue {}
</script>
