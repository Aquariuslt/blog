import { BreadcrumbItem, BreadcrumbList } from '@blog/common/interfaces/routes/breadcrumb';

export const createHomeBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: `Home`, // will ignore baseTitle in breadcrumbs
    position: 1
  };
};

export const createTagsOverviewBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 2
  };
};

export const createCategoriesOverviewBreadcrumbItem = (
  baseUrl: string,
  label: string,
  path: string
): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 2
  };
};

export const createPostsOverviewBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 2
  };
};

export const createTagDetailBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 3
  };
};

export const createCategoryDetailBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 3
  };
};

export const createPostDetailBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 3
  };
};

export const createBreadcrumbList = (items: BreadcrumbItem[]): BreadcrumbList => {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items
  };
};
