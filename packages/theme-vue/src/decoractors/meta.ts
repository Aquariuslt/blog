import { createDecorator } from 'vue-class-component';

export const Meta = createDecorator((options, key) => {
  options['metaInfo'] = options.methods && options.methods[key];
});
