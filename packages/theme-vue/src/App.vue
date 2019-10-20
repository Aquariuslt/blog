<template>
  <div id="app">
    <md-app md-waterfall md-mode="fixed">
      <md-app-toolbar class="md-primary">
        <div class="md-toolbar-row">
          <md-button class="md-icon-button" @click="menuVisible = !menuVisible">
            <icon value="menu"></icon>
          </md-button>
          <span class="md-title">{{ $data.$title }}</span>
        </div>
      </md-app-toolbar>

      <md-app-drawer :md-active.sync="menuVisible">
        <about :data="$data.$profile"></about>

        <md-list>
          <md-list-item v-for="item in $data.$navigation" :key="item.id" :to="item.link" exact>
            <icon :value="item.icon"></icon>
            <span class="md-list-item-text">{{ item.label }}</span>
          </md-list-item>
        </md-list>
      </md-app-drawer>

      <!-- main content as router-view -->
      <md-app-content>
        <router-view @update:title="updateTitle"> </router-view>
      </md-app-content>
    </md-app>
  </div>
</template>

<script lang="ts">
import { Vue, Component, Provide } from 'vue-property-decorator';
import { NavigationItem } from '@blog/common/interfaces/navigation';
import { RoutePathPrefix } from '@blog/common/interfaces/routes';
import { EmptyProfile, Profile } from '@blog/common/interfaces/profile';
import { buildURLPath } from '@blog/common/utils/path.util';
import { loadApi } from '@theme-vue/api';
import Icon from '@theme-vue/components/Icon.vue';
import About from '@theme-vue/components/About.vue';

@Component({
  components: {
    Icon,
    About
  }
})
export default class App extends Vue {
  @Provide() $title: string = '';
  @Provide() $navigation: NavigationItem[] = [];
  @Provide() $profile: Profile = EmptyProfile;
  @Provide() menuVisible = false;

  async loadNavigation() {
    const navigation = await loadApi(buildURLPath(RoutePathPrefix.NAVIGATION));
    this.$data.$navigation = navigation.data;
  }

  async loadProfile() {
    const profile = await loadApi(`/profile`);
    this.$data.$profile = profile.data;
  }

  mounted() {
    this.loadNavigation();
    this.loadProfile();
  }

  updateTitle(val) {
    this.$data.$title = val;
  }
}
</script>

<style scoped lang="less">
.md-app {
  height: 100vh;

  .md-app-content {
    margin: 0;
    padding: 4px;
  }
}

.md-list-item-content > .mdi:first-child {
  margin-right: 32px;
}
</style>
