import { BreadcrumbItem } from '@blog/common/interfaces/routes/breadcrumb';

export const createHomeBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 1
  };
};

export const createTagListBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 2
  };
};

export const createCategoryListBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
  return {
    '@type': 'ListItem',
    item: baseUrl + path,
    name: label,
    position: 2
  };
};

export const createPostListBreadcrumbItem = (baseUrl: string, label: string, path: string): BreadcrumbItem => {
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
