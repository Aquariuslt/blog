import { Component, Emit, Prop, Provide, Vue, Watch } from 'vue-property-decorator';
import { EmptyRouteMeta, RouteMeta } from '@blog/common/interfaces/routes';
import { Meta } from '@theme/decoractors/meta';
import { loadApi } from '@theme/api';

const TYPE_JSON_LD = 'application/ld+json';

@Component
export class RouteMixins extends Vue {
  @Prop() apiPath!: string;
  @Provide() $routeMeta: RouteMeta = EmptyRouteMeta;

  @Watch('apiPath', { immediate: true, deep: true })
  async onApiPathUpdate(val) {
    this.$data.$routeMeta = await loadApi(val);
    this.setTitle(this.$data.$routeMeta.title);
  }

  @Meta
  routeMetaInfo() {
    return {
      title: this.$data.$routeMeta.title,
      meta: this.$data.$routeMeta.metas,
      script: [
        {
          type: TYPE_JSON_LD,
          json: this.$data.$routeMeta.breadcrumbs
        }
      ]
    };
  }

  @Emit('update:title')
  setTitle(val) {
    return val;
  }
}
