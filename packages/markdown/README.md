# `@blog/markdown`

Including a set of markdown processor base on `markdown-it` and `gray-matter`


## Conduct

The target is to read and parse data from markdown file as article.
So the input params is a markdown file (file content / the absolute path with filename),
and the output should be parsing data, including:

- Metadata: describe the metadata of this article, like title, created, updated, category, tags, permalink, cover images...
- Source Text: the markdown source content without `YFM`
- Html Content: the rendered html content (render after markdown plugin process chains)
- Medias: the medias in article, images (with srcset urls), videos
- Summary: the summary of article in shortcut


## Metadata Definition

In `v5.x`, I've built a process flow with markdown chains.

In `v6.x`, the target is to process article with more standard way. 

There are some google recommended standard formatting guides, which inspired me:

- Matching `structued-data` requirement by [Google Data Types Definitions](https://developers.google.com/search/docs/data-types/article),
- Matching `amp-story` by [AMP Project](https://amp.dev/documentation/components/amp-story/?referrer=ampproject.org)


### Metadata Changes

> Metadata type add/update compare to `v5.x`

#### Updated Metadata 

- Update `caregroy: string` to `categories: string[]`, this behavior will show like [Front Matter - Hexo](https://hexo.io/zh-cn/docs/front-matter)


#### New Metadata

- Add `permalink: string` instead of filename detecting (to simplify markdown processing chain, no need to add filename detection)
- Add `description: string` as html metas
- Add optional attribute `layout`, we can maintain a different layout for each page (like should show comments)


