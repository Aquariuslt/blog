<template>
  <div class="profile">
    <md-card>
      <md-card-header>
        <md-avatar>
          <img :src="data.logo.url" alt="Avatar" />
        </md-avatar>
        <div class="md-title">{{ data.name }}</div>
        <div class="md-subhead">{{ data.email }}</div>
      </md-card-header>
    </md-card>
  </div>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import { Profile } from '@blog/common/interfaces/profile';
@Component({})
export default class About extends Vue {
  @Prop() data!: Profile;
}
</script>

<style scoped>
.profile {
  width: 100%;
}
</style>
