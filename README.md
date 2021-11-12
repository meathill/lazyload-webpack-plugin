lazyload-webpack-plugin
=======================

![Workflow status](https://github.com/meathill/lazyload-webpack-plugin/actions/workflows/node.js.yml/badge.svg)

A webpack plugin for adding `loading="lazy"`into all `<img>` and `<iframe>` in
HtmlWebpackPlugin pages. If **NOT** all of the target browsers supports
`loading` attribute, then fallback to [lazysizes](https://github.com/aFarkas/lazysizes).

**Note:** This is an extension plugin for [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin),
and only work with html-webpack-plugin@5+.


Usage
--------

First, install this package as a dependency in your package.json:

```bash
$ npm i -D lazyload-webpack-plugin
```

Next, use it in your Webpack config:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LazyLoadWebpackPlugin = require('lazyload-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new LazyLoadWebpackPlugin({
      // you can use other lazyload library which support the same API
      lazyloadLib: 'https://LIB_URL',
    }),
  ],
}
```

You can avoid adding `loading="lazy"` to all `<img>` and `<iframe>` by
specifically adding `loading` to the `<img>` and `<iframe>` tag you don't want
to.

Pre-requisites
--------------

This module requires Webpack@5+, and html-webpack-plugin@5+.


Introduction
------------

As @addyosmani said in his twitter,

> Native <img> lazy-loading is coming to the web! [https://t.co/LgF7F1iMgR](https://t.co/LgF7F1iMgR") <img loading=lazy> defers offscreen images until the user scrolls near them. Shipping in Chrome ~75 [https://t.co/4gR7lvx4zx](https://t.co/4gR7lvx4zx)

> [![Native img lazy-load](https://pbs.twimg.com/media/D3h8TW4UwAAj1jX?format=png&name=medium)](https://pic.twitter.com/luCHEfLkKD)

> &mdash; Addy Osmani (@addyosmani) [April 7, 2019](https://t/witter.com/addyosmani/status/1114777583302799360?ref_src=twsrc%5Etfw)

Chrome/Edge/Firefox support `loading="lazy"` in `<img>` and `<iframe>`
to turn on native lazy-load.

Then I think I can do this via a webpack plugin, adding this attribute to all
`<img>`s and `<iframe>`s.



TODO
--------

1. ~~Add support for other lazy-loading methods.~~
2. Support customization lazyload fallback function


Author
--------

Meathill (Lujia Zhai) <[meathill@gmail.com](mailto:meathill@gmail.com)>

I'm a developer live in Guangzhou, China.


License
--------

[MIT](https://opensource.org/licenses/MIT)
