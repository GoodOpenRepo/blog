(window.webpackJsonp=window.webpackJsonp||[]).push([[5],{218:function(e,t,n){"use strict";n.r(t),n.d(t,"pageQuery",function(){return c});n(12);var r=n(0),o=n.n(r),i=n(107),a=n(222),s=n(215),u=n(216),l=n(59);var d=function(e){var t,n;function r(){return e.apply(this,arguments)||this}return n=e,(t=r).prototype=Object.create(n.prototype),t.prototype.constructor=t,t.__proto__=n,r.prototype.render=function(){var e=this.props.data.markdownRemark,t=this.props.data.site.siteMetadata,n=t.title,r=t.siteUrl,d=this.props.pageContext,c=d.previous,p=d.next,f={url:""+(r+this.props.location.pathname),identifier:e.id,title:e.frontmatter.title};return o.a.createElement(s.a,{location:this.props.location,title:n},o.a.createElement(u.a,{title:e.frontmatter.title,description:e.frontmatter.description||e.excerpt}),o.a.createElement("article",null,o.a.createElement("header",null,o.a.createElement("h1",{style:{marginTop:Object(l.a)(1),marginBottom:0,color:"#001E26"}},e.frontmatter.title),o.a.createElement("p",{style:Object.assign({},Object(l.b)(-.2),{display:"block",marginBottom:Object(l.a)(1)})},e.frontmatter.date)),o.a.createElement("section",{dangerouslySetInnerHTML:{__html:e.html}}),o.a.createElement("hr",{style:{marginBottom:Object(l.a)(1)}})),o.a.createElement("nav",null,o.a.createElement("ul",{style:{display:"flex",flexWrap:"wrap",justifyContent:"space-between",listStyle:"none",padding:0}},o.a.createElement("li",null,c&&o.a.createElement(i.a,{to:c.fields.slug,rel:"prev"},"← 上一篇")),o.a.createElement("li",null,p&&o.a.createElement(i.a,{to:p.fields.slug,rel:"next"},"下一篇 →")))),o.a.createElement(a.Disqus,{config:f}))},r}(o.a.Component);t.default=d;var c="878944747"},221:function(e,t,n){"use strict";n(25),n(19),n(14),n(15),n(8),n(106),n(104);var r=n(22);t.__esModule=!0,t.insertScript=function(e,t,n){var r=window.document.createElement("script");return r.async=!0,r.src=e,r.id=t,n.appendChild(r),r},t.removeScript=function(e,t){var n=window.document.getElementById(e);n&&t.removeChild(n)},t.debounce=function(e,t,n){var r;return function(){var o=this,i=arguments,a=function(){r=null,n||e.apply(o,i)},s=n&&!r;window.clearTimeout(r),r=setTimeout(a,t),s&&e.apply(o,i)}},t.isReactElement=a,t.shallowComparison=function e(t,n){var r;var i=new Set(Object.keys(t).concat(Object.keys(n)));var s=(r=[]).concat.apply(r,(0,o.default)(i)).filter(function(r){if("object"==typeof t[r]){if(e(t[r],n[r]))return!0}else if(t[r]!==n[r]&&!a(t[r]))return!0});return 0!==s.length};var o=r(n(224)),i=r(n(0));function a(e){return!!i.default.isValidElement(e)||!!Array.isArray(e)&&e.some(function(e){return i.default.isValidElement(e)})}},222:function(e,t,n){"use strict";var r=n(22);t.__esModule=!0,t.default=void 0;var o=r(n(223));t.Disqus=o.default;var i=r(n(228));t.CommentCount=i.default;var a=r(n(229));t.CommentEmbed=a.default;var s=o.default;t.default=s},223:function(e,t,n){"use strict";var r=n(22);t.__esModule=!0,t.default=void 0;var o=r(n(147)),i=r(n(146)),a=r(n(79)),s=r(n(0)),u=r(n(46)),l=n(221),d=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="yun-yin-le-da-qian-duan-zhuan-lan",n.embedUrl="https://"+n.shortname+".disqus.com/embed.js",n}(0,a.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,l.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.getDisqusConfig=function(e){return function(){this.page.identifier=e.identifier,this.page.url=e.url,this.page.title=e.title,this.page.remote_auth_s3=e.remoteAuthS3,this.page.api_key=e.apiKey,this.language=e.language}},n.loadInstance=function(){"undefined"!=typeof window&&window.document&&(window.disqus_config=this.getDisqusConfig(this.props.config),window.document.getElementById("dsq-embed-scr")?this.reloadInstance():(0,l.insertScript)(this.embedUrl,"dsq-embed-scr",window.document.body))},n.reloadInstance=function(){window&&window.DISQUS&&window.DISQUS.reset({reload:!0})},n.cleanInstance=function(){(0,l.removeScript)("dsq-embed-scr",window.document.body);try{delete window.DISQUS}catch(n){window.DISQUS=void 0}var e=window.document.getElementById("disqus_thread");if(e)for(;e.hasChildNodes();)e.removeChild(e.firstChild);if(window.document.querySelector('[id^="dsq-app"]')){var t=window.document.getElementById(window.document.querySelector('[id^="dsq-app"]').id);t.parentNode.removeChild(t)}},n.render=function(){var e=this.props,t=(e.config,(0,i.default)(e,["config"]));return s.default.createElement("div",(0,o.default)({id:"disqus_thread"},t,{__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/Disqus.jsx",lineNumber:86,columnNumber:7}}))},t}(s.default.Component);t.default=d,d.propTypes={config:u.default.shape({identifier:u.default.string,title:u.default.string,url:u.default.string,language:u.default.string,remoteAuthS3:u.default.string,apiKey:u.default.string})}},224:function(e,t,n){var r=n(225),o=n(226),i=n(227);e.exports=function(e){return r(e)||o(e)||i()}},225:function(e,t){e.exports=function(e){if(Array.isArray(e)){for(var t=0,n=new Array(e.length);t<e.length;t++)n[t]=e[t];return n}}},226:function(e,t){e.exports=function(e){if(Symbol.iterator in Object(e)||"[object Arguments]"===Object.prototype.toString.call(e))return Array.from(e)}},227:function(e,t){e.exports=function(){throw new TypeError("Invalid attempt to spread non-iterable instance")}},228:function(e,t,n){"use strict";var r=n(22);t.__esModule=!0,t.default=void 0;var o=r(n(147)),i=r(n(146)),a=r(n(79)),s=r(n(0)),u=r(n(46)),l=n(221),d=(0,l.debounce)(function(){window.DISQUSWIDGETS&&window.DISQUSWIDGETS.getCount({reset:!0})},300,!1),c=function(e){function t(t){var n;return(n=e.call(this,t)||this).shortname="yun-yin-le-da-qian-duan-zhuan-lan",n}(0,a.default)(t,e);var n=t.prototype;return n.componentDidMount=function(){this.loadInstance()},n.shouldComponentUpdate=function(e){return this.props!==e&&(0,l.shallowComparison)(this.props,e)},n.componentDidUpdate=function(){this.loadInstance()},n.componentWillUnmount=function(){this.cleanInstance()},n.loadInstance=function(){window.document.getElementById("dsq-count-scr")?d():(0,l.insertScript)("https://"+this.shortname+".disqus.com/count.js","dsq-count-scr",window.document.body)},n.cleanInstance=function(){(0,l.removeScript)("dsq-count-scr",window.document.body),window.DISQUSWIDGETS=void 0},n.render=function(){var e=this.props,t=e.config,n=e.placeholder,r=(0,i.default)(e,["config","placeholder"]);return s.default.createElement("span",(0,o.default)({className:"disqus-comment-count","data-disqus-identifier":t.identifier,"data-disqus-url":t.url},r,{__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentCount.jsx",lineNumber:53,columnNumber:7}}),n)},t}(s.default.Component);t.default=c,c.defaultProps={placeholder:"..."},c.propTypes={config:u.default.shape({identifier:u.default.string,title:u.default.string,url:u.default.string}),placeholder:u.default.string}},229:function(e,t,n){"use strict";n(230),n(47),n(8);var r=n(22);t.__esModule=!0,t.default=void 0;var o=r(n(79)),i=r(n(0)),a=r(n(46)),s=function(e){function t(){return e.apply(this,arguments)||this}(0,o.default)(t,e);var n=t.prototype;return n.getSrc=function(){return"https://embed.disqus.com/p/"+Number(this.props.commentId).toString(36)+"?p="+(this.props.showParentComment?"1":"0")+"&m="+(this.props.showMedia?"1":"0")},n.render=function(){return i.default.createElement("iframe",{src:this.getSrc(),width:this.props.width,height:this.props.height,seamless:"seamless",scrolling:"no",frameBorder:"0",__self:this,__source:{fileName:"/Users/brettstevenson/Desktop/Folder/gatsby-plugin-workspace/gatsby-plugin-disqus/src/components/CommentEmbed.jsx",lineNumber:17,columnNumber:13}})},t}(i.default.Component);t.default=s,s.defaultProps={width:420,height:320,showMedia:!0,showParentComment:!0},s.propTypes={commentId:a.default.string.isRequired,width:a.default.number,height:a.default.number,showMedia:a.default.bool,showParentComment:a.default.bool}},230:function(e,t,n){"use strict";var r=n(4),o=n(24),i=n(40),a=n(105),s=n(61),u=n(9),l=n(80).f,d=n(103).f,c=n(11).f,p=n(148).trim,f=r.Number,m=f,h=f.prototype,g="Number"==i(n(62)(h)),w="trim"in String.prototype,y=function(e){var t=s(e,!1);if("string"==typeof t&&t.length>2){var n,r,o,i=(t=w?t.trim():p(t,3)).charCodeAt(0);if(43===i||45===i){if(88===(n=t.charCodeAt(2))||120===n)return NaN}else if(48===i){switch(t.charCodeAt(1)){case 66:case 98:r=2,o=49;break;case 79:case 111:r=8,o=55;break;default:return+t}for(var a,u=t.slice(2),l=0,d=u.length;l<d;l++)if((a=u.charCodeAt(l))<48||a>o)return NaN;return parseInt(u,r)}}return+t};if(!f(" 0o1")||!f("0b1")||f("+0x1")){f=function(e){var t=arguments.length<1?0:e,n=this;return n instanceof f&&(g?u(function(){h.valueOf.call(n)}):"Number"!=i(n))?a(new m(y(t)),n,f):y(t)};for(var v,b=n(10)?l(m):"MAX_VALUE,MIN_VALUE,NaN,NEGATIVE_INFINITY,POSITIVE_INFINITY,EPSILON,isFinite,isInteger,isNaN,isSafeInteger,MAX_SAFE_INTEGER,MIN_SAFE_INTEGER,parseFloat,parseInt,isInteger".split(","),I=0;b.length>I;I++)o(m,v=b[I])&&!o(f,v)&&c(f,v,d(m,v));f.prototype=h,h.constructor=f,n(13)(r,"Number",f)}}}]);
//# sourceMappingURL=component---src-templates-blog-post-js-788c454dbed28c00f3b8.js.map