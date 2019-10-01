import * as matter from 'gray-matter';

export const metadata = (md: string) => matter(md).data;
export const source = (md: string) => matter(md).content;
