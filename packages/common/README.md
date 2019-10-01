# `@blog/common`

## Articles

## Routes, Breadcrumbs, Navigation & Layouts

We divide our pages into 3 main layouts:

- List
- Detail
- Table

Below are example of layouts

### Layout: List

- :domain
- :domain/posts
- :domain/categories/:category
- :domain/tags/:tag

### Layout: Detail

- :domain/posts/:year/:month/:day/:post-id
- :domain/pages/:page-id

### Layout: Table

- :domain/categories/:category
- :domain/tags/:tag

Then breadcrumbs as navigation data will look like below:

| layout | example url                                      | breadcrumbs example            | remark                |
| ------ | ------------------------------------------------ | ------------------------------ | --------------------- |
| List   | https://example.com                              | `Home` \| null                 | `Home` is i18n value  |
| List   | https://example.com/posts                        | `Home` > `Posts` \| null       | `Posts` is i18n value |
| List   | https://example.com/categories/blog              | `Home` > `Categories` > `Blog` |                       |
| List   | https://example.com/tags/java                    | `Home` > `Tags` > `Java`       |                       |
| Detail | https://example.com/posts/2019/09/20/article-foo | `Home` > `Posts` > `Article`   |                       |
| Detail | https://example.com/pages/about                  | `Home` > `Pages` > `About`     |                       |
| Table  | https://example/categories                       | `Home` > `Categories`          |                       |
| Table  | https://example/tags                             | `Home` > `Tags`                |                       |
