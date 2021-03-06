---
title: 云音乐搭建平台性能优化实践
date: 2020-11-16T02:14:39.087Z
description: 提升 Web 与 React Native 双端页面性能优化实践。
---

![](https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4551280490/b2ab/17cc/1cbb/6ab1906abb75b19eb74b0ede07f0260a.png)

> 本文作者：傅远

> 图片来源：https://hackernoon.com/drafts/ro2832a9.png

### 前言
XRN 平台是云音乐音乐内容组产出的一个可视化的搭建页面平台，通过拖拽组件与设置组件，XRN 可以快速生成同时能在 React Native 与 Web 端渲染的页面。不管是 React Native 端还是 Web 端，我们都期望能够输出高性能的页面，带给用户更好的体验。本文会介绍我们提升页面性能的一些优化实践。以下是一些搭建的页面案例：

![preview](https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4580767589/abbb/804a/e078/a52ba7e6268fee10ba3bf28d66e70515.png)

### 打包阶段优化
#### Web 端
##### 1. 减少重复打包
XRN 的 Web 工程主要分为 2 个，一个是与 React Native 端公用的  xrn-common 包，承载了所有的组件与业务的逻辑。另一个是 xrn-webview 包，主要作用是定义了一个 web 容器来使用 xrn-common 内的的组件与逻辑。因为这两个包具有互相依赖的关系，很容易出现重复打包的场景。

我们可以使用 [source-map-explorer](https://github.com/danvk/source-map-explorer#readme) 工具，通过生成的模块依赖图（如下图所示），快速定位并分析出存在重复打包问题的库。
![source-map-explorer](https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4682476125/69ab/074e/b5fd/8e01a4493db647a9acb1bd8401ac7cba.png)

我们可以根据不同的问题起因来作出相应的调整。对于版本兼容性导致的问题，我们可以通过协调库的版本，来使得引入库保持一致。对于引入路径不一致的起因，我们可以配置 Webpack 中的 `resolve.alias` 字段来指定统一的引用路径从而解决重复打包的问题。

##### 2. 代码剪枝

Webpack 等现代打包工具会通过 Tree Shaking 的方式，自动剔除未被使用的代码片段，从而减小打包后的 js 文件体积。但是 Tree Shaking 的触发条件是比较苛刻的，它要求代码都使用 es6  的 import / export 语法进行引入和导出。更多情况下，需要剪枝的第三方库会提供相应的 babel 插件来协助我们通过修改引用路径方法来剪枝。

需要注意的是 react-native-web 这个包的剪枝是较难达成的，通过使用插件 [babel-plugin-react-native-web](https://www.npmjs.com/package/babel-plugin-react-native-web) ，组件的引入路径可以被修改为：
```js
// 修改前
import { View } from 'react-native';
// 修改后
import View from 'react-native-web/dist/exports/View'`
```
完成这一步后，我们看似已经实现了对这个包的剪枝，但如果我们后续引入的第三方库中含有 `require('react-native-web')`，就会再次将 react-native-web 整个包引入项目。在这种情况下，直接引入第三方库的源码往往会是一个更好的选择。 这个[问题](https://baconbrix.gitbook.io/react-native-web/anti-pitch#tree-shaking-is-too-fragile)也同样被 Expo Web 所提及。

##### 3. Polyfill 优化
 在入口文件引入 babel-polyfill 会导致大量不被使用的 polyfill 代码被打入 js 包中。为了尽可能地降低 polyfill 的体积，一种做法是可以直接安装 core-js，手动引入所需的 polyfill（例：`import 'core-js/fn/object/values'`）。
 
 另一种更为智能的方法是使用 @babel/preset-env 插件，并配置 `useBuiltIns: 'usage'` 选项，这样就可以实现按需打包 polyfill。从下图中就可以看出 @babel/preset-env 对于 js 体积（gzip前）的优化量：
 
![babel](https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4549417428/6d5f/3df1/285c/cb21b95405c0086bc8ead8ebc743acd2.png)

##### 4. 动态引入
通过动态引入的 `import` 语法，现代打包工具例如 Webpack, Rollup 可以将代码打包成多个 js 文件模块，当页面真正需要某个模块时，才会通过异步请求的方式去获取这个 js 文件。

使用 React.lazy 与 Suspense 这两个 API，可以对我们组件代码进行动态引入，精确加载每个页面内所需要的组件，从而大大减小页面渲染时请求的 js 文件体积。除了组件，我们更可以直接使用 `import` 语法来动态加载第三方库或者 js 文件，进一步减小首屏的 js 文件体积。

需要注意的是，动态引入也可能会造成性能上损失。动态引入大量小体积的 js 文件，会造成不必要的网络开销，甚至会带来负优化的效果。因此在优化时我们需要权衡异步请求数、异步请求文件体积等因素来决定是否真正需要使用动态引入。

##### 5. 更多
我们也可以使用 Chrome DevTools 提供的 [Coverage Tab](https://developers.google.com/web/tools/chrome-devtools/coverage)，来找到 jsbundle 中每一行未被使用的代码。除此之外，[Web Dev](https://web.dev/unused-javascript/) 也提供了更多关于这项优化的建议。


#### React Native 端 

##### 1. 拆包
与 Web 端类似的，React Native 中 jsbundle 体积大小也是决定页面加载速度的一个重要因素。XRN 在 RN 端构建时拆分了**业务包**与**基础包** 。**业务包**包含了 XRN 特有的组件与业务逻辑，而**基础包**包含了云音乐所有 RN 应用共享的依赖库（例：react, react-native, react-navigation），XRN 的 jsbundle 体积在拆包后下降了 `36%`。

##### 2. 预加载
![babel](https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4551036069/11d9/b848/bd6c/579ee875ff437c62e3898e5b901da91f.png)

如上图所示，云音乐 APP 在启动时会去主动下载重点 RN 应用的**业务包**来实现预加载，从而省去 RN 页面首次打开时请求**业务包**的耗时。在打开 RN 应用前云音乐 APP 也会预热好一个加载完了**基础包**的 RN 容器，再去加载**业务包**来进一步提升 RN 页面的打开速度。

### 渲染阶段优化
> 通过 React Native Web 库, XRN 实现了 95% 以上的代码能够在 Web 端与 React Native 端复用，但这也给性能优化带来了挑战，如何在优化时最大程度地复用代码也是我们一直在思考的一个问题。

##### 1. 图片懒加载
在一个长页面中，往往会有大量处于首屏可视区外的图片，如果在首屏渲染时对这些图片进行加载并渲染，势必会对性能产生较大的影响。

我们常在 Web 端使用的懒加载方案包括 [`<img loading="lazy" />`](https://developer.mozilla.org/en-US/docs/Web/Performance/Lazy_loading), [IntersectionObserver](https://developer.mozilla.org/en-US/docs/Web/API/Intersection_Observer_API), [FlatList (react-native-web)](https://necolas.github.io/react-native-web/docs/?path=/docs/components-flatlist--single-column) 等等，在 React Native 端并没有原生支持图片懒加载的方式，更多的是使用 FlatList 去模拟图片懒加载。

FlatList 本是一个双端都兼容的方案，但它作为一个滚动容器在渲染内容时不够灵活，并且不适用于较为复杂的 DOM 结构与多种的定位方式，因此 XRN 最终的方案为基于 ScrollView 实现的图片懒加载机制。原理如下：

```html
<ScrollView
    onScroll={handleScroll}>
    <Component1>
        { ... }
    </Component1>
    <Component2>
        <LazyLoadImage
            height={300}
            width={300} />
    </Component2>
</ScrollView>
```
LazyLoadImage 为一个自定义组件，它会在组件渲染后调用 React Native 提供的 `measureLayout` 方法去确定自己在 ScrollView 内的位置（X / Y轴坐标），通过监听 `onScroll` 事件、对比页面的滚动高度，图片组件便能确定是否需要渲染。当图片处于可视区域外不需要渲染时，渲染相同宽高的占位组件来保持页面高度一致并提升用户体验。

##### 2. 列表懒加载
![babel](https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4552010682/5e88/84ca/933e/0e258d806132ce533642a786616b34e9.png?imageView&thumbnail=300x0)

XRN 也对长列表（例：上图中的歌曲列表）实现了与图片类似的懒加载优化。列表懒加载与图片不同的是，React Native 的图片往往在渲染前就能知道高度及宽度的数据，可以直接使用这组数据进行占位，使得可视区域外的图片省去了大量渲染的耗时。

而对于列表来说，由于不同的列表承载的是不同的组件类型（例：单曲、歌单、艺人），也就无法在渲染前获得其准确高度来进行占位。这里 XRN 采取的策略是：先渲染单行列表，等获得了单行高度后再去渲染余下的列表内容，通过这种方式在不渲染实际内容的情况下对可视区外的列表行进行占位。

##### 3. 首屏渲染
当渲染内容较多的长页面时，往往会有首屏加载时间长、速度慢等性能问题。在 XRN 中，我们对首屏渲染做了进一步优化，XRN 会优先渲染首屏可见的内容，同时延迟渲染不可见的内容。当用户进入页面时，首屏渲染的内容高度将被限制在一屏半的高度内。

解决“多少个组件才能填满一屏半高度”这个问题的前提是获得每个组件的高度数据。XRN 中包含了大量不定高的组件，这些组件的高度只有在被渲染后才能决定。

![rerender](https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4550379943/f701/440b/f129/4bd60882d22fbcdb0a5b81f94ec198ea.png)

为了在页面渲染前获得组件的高度数据，XRN 会在页面搭建时根据 Web 端的组件渲染结果估算出页面中每个组件的高度（如上图所示），这样在页面渲染时就可以根据这些高度数据来决定首屏渲染的组件数量，从而将页面高度控制在一屏半左右的范围内。

##### 4. 渐进式渲染
![rerender](https://p5.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4550451451/1f64/45c2/c6a6/88bbbd3d68b904db2b46ec12c6c63efd.png?imageView&thumbnail=200x0)

在首屏渲染完成后，XRN 会在用户滑动页面后加载后续内容，如果后续内容过多、页面过长（如上图所示），那么一次性加载后续内容会造成页面长时间白屏、卡顿等问题。对于剩余的页面组件 XRN 会通过 `setTimeout` 的方式来分次进行加载。渐进式加载后续内容保证了页面具有一定可交互性的同时，也使得在可视区域中的内容可以最快地呈现给用户。

##### 5. 减少重复渲染
![rerender](https://p6.music.126.net/obj/wo3DlcOGw6DClTvDisK1/4549417394/bf96/1114/c73d/fe1dfeef123fa85ccd7b4207e60403fb.png)

重复渲染是一个常见但是不容忽视的问题，React Native 的核心贡献者 Mike Grabowski 也在他的[优化建议](https://callstack.com/blog/the-ultimate-guide-to-react-native-optimization/#Pay_attention_to_UI_re-renders)中提到了这点。如上图所示的，我们可以通过 React Developer Tools 浏览器插件中包含的 react profiler 来查找与定位每个组件的重复渲染原因、渲染次数及具体耗时。当定位到了问题组件及查明了重复渲染原因后，我们可以改写 `shouldComponentUpdate` 来主动控制组件渲染逻辑，也可以用 `useMemo`, `useCallback`, `React.memo` 等方法来阻止组件 props 中的引用变更来减少重复渲染。

### 小结
完成了以上的性能优化点后，XRN Web 页面的 Lighthouse 分数从初始的 `50.3` 分（基于 Lighthouse 5.5.0 / 198 个线上页面），提升到 `80.4` 分（基于 Lighthouse 5.5.0 / 618 个线上页面）的成绩。在 React Native 端的页面加载速度也提升了 `40%`。相信也能为各位在做 Web 或者 RN 的性能优化时带来一些有价值的参考点。

## 参考资料

- [apply-instant-loading-with-prpl](https://web.dev/apply-instant-loading-with-prpl/)
- [Fast load times](https://web.dev/fast/)

> 本文发布自 [网易云音乐大前端团队](https://github.com/x-orpheus)，文章未经授权禁止任何形式的转载。我们常年招收前端、iOS、Android，如果你准备换工作，又恰好喜欢云音乐，那就加入我们 grp.music-fe(at)corp.netease.com！
