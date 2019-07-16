import store from '../store';
import routes from './routes';

import categoryStore from './stores/category.store';
import tagStore from './stores/tag.store';
import postStore from './stores/post.store';
import pageStore from './stores/page.store';
import linkStore from './stores/link.store';
import { registerRoutes } from '../router';

registerRoutes(routes);

store.registerStore('categoryStore', categoryStore);
store.registerStore('tagStore', tagStore);
store.registerStore('postStore', postStore);
store.registerStore('pageStore', pageStore);
store.registerStore('link', linkStore);

categoryStore.loadCategories();
tagStore.loadTags();
pageStore.loadPages();
linkStore.registerLinks();
