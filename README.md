lazyload-webpack-plugin
========

A webpack plugin for adding `loading="lazy"`into all `&lt;img>` in HtmlWebpackPlugin pages.

Currently it **DOES NOT** support any other lazyload methods. I will add them in the future. 

Note: This is an extension plugin for [html-webpack-plugin](https://github.com/ampedandwired/html-webpack-plugin),
and only work with html-webpack-plugin@4+.

Introduction
--------

As @addyosmani said in his twitter,

> Native &lt;img&gt; lazy-loading is coming to the web! [https://t.co/LgF7F1iMgR](https://t.co/LgF7F1iMgR") &lt;img loading=lazy&gt; defers offscreen images until the user scrolls near them. Shipping in Chrome ~75 [https://t.co/4gR7lvx4zx](https://t.co/4gR7lvx4zx)

> ![https://pic.twitter.com/luCHEfLkKD](https://pbs.twimg.com/media/D3h8TW4UwAAj1jX?format=png&name=medium)
 
> &mdash; Addy Osmani (@addyosmani) [April 7, 2019](https://t/witter.com/addyosmani/status/1114777583302799360?ref_src=twsrc%5Etfw) 

Chrome will support `loading="lazy"` in `<img>` to turn on native lazy-load.
Then I think I can do this via a webpack plugin, adding this attribute to all `<img>`s.

Pre-requisites  
--------

This module requires Webpack@4+, and html-webpack-plugin@4+.

Installation
--------

First, install this package as a dependency in your package.json:

```bash
$ npm i -D lazyload-webpack-plugin
```

Usage
--------

Next, use it in your Webpack config:

```js
const HtmlWebpackPlugin = require('html-webpack-plugin');
const LazyLoadWebpackPlugin = require('lazyload-webpack-plugin');

module.exports = {
  plugins: [
    new HtmlWebpackPlugin(),
    new LazyLoadWebpackPlugin(),
  ]
}
```

TODO
--------

1. Add support for other lazyload methods.

Author
--------

Meathill (Lujia Zhai) <[meathill@gmail.com](mailto:meathill@gmail.com)>

I'm a developer live in Guangzhou, China.

License
--------

[MIT](https://opensource.org/licenses/MIT)
