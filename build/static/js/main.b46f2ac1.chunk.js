(this["webpackJsonpfaouzi-13-10-2021"]=this["webpackJsonpfaouzi-13-10-2021"]||[]).push([[0],[,,,,,,,,,,,,,,function(e,t,n){},function(e,t,n){},,function(e,t,n){},function(e,t,n){},function(e,t,n){},function(e,t,n){"use strict";n.r(t);var r=n(0),c=n.n(r),i=n(8),a=n.n(i),s=(n(14),n(5)),u=n(3),o=n(2),l=function(e){return e.reduce((function(e,t){var n=Object(o.a)(t,2),r=n[0],c=n[1],i=e.reduce((function(e,t){var n=Object(o.a)(t,2);n[0];return e+n[1]}),c);return[].concat(Object(s.a)(e),[[r,c,i]])}),[])},b=function(e,t){return e.sort((function(e,n){var r=Object(o.a)(e,1)[0],c=Object(o.a)(n,1)[0];return"desc"===t?c-r:r-c}))},d=function(e,t){var n=Object(r.useState)({orderbook:null,spread:null,totalSize:0}),c=Object(o.a)(n,2),i=c[0],a=c[1];return Object(r.useEffect)((function(){if(e){var n=function(e){return e.bids.reduce((function(e,t){var n=Object(o.a)(t,2);return n[0],e+n[1]}),0)+e.asks.reduce((function(e,t){var n=Object(o.a)(t,2);return n[0],e+n[1]}),0)}(e),r=function(e){var t=l(e.asks),n=l(e.bids);return Object(u.a)(Object(u.a)({},e),{},{asks:t,bids:n})}(function(e,t){var n=e.bids.slice(0,t),r=e.asks.slice(0,t);return Object(u.a)(Object(u.a)({},e),{},{asks:r,bids:n})}(function(e){return Object(u.a)(Object(u.a)({},e),{},{asks:b(e.asks,"asc"),bids:b(e.bids,"desc")})}(e),t)),c=function(e){var t=Object(o.a)(e.bids,1)[0],n=Object(o.a)(e.asks,1)[0];if(n&&t){var r=Object(o.a)(t,1)[0];return Object(o.a)(n,1)[0]-r}return 0}(r);a({orderbook:r,spread:c,totalSize:n})}}),[e,t]),i},j=n.p+"feed-worker.js",f=new Intl.NumberFormat("en-GB"),O=new Intl.NumberFormat("en-GB",{minimumFractionDigits:2,maximumFractionDigits:2}),h=function(e){return f.format(e)},v=(n(15),n(1)),m=function(e){var t=e.width,n=e.theme;return Object(v.jsx)("svg",{className:"graph-line",children:Object(v.jsx)("rect",{x:"0",y:"0",width:"".concat(t,"%"),height:"100%",fill:n,"fill-opacity":"0.2"})})},w=(n(17),Object(r.forwardRef)((function(e,t){var n=e.levelsWithTotals,r=e.theme,c=e.hideHeader,i=e.totalSize;return Object(v.jsx)("div",{className:"table-container ".concat(r),ref:t,children:Object(v.jsxs)("table",{className:"table",children:[c?null:Object(v.jsx)("thead",{className:"table-head",children:Object(v.jsxs)("tr",{children:[Object(v.jsx)("th",{children:"PRICE"}),Object(v.jsx)("th",{children:"SIZE"}),Object(v.jsx)("th",{children:"TOTAL"})]})}),Object(v.jsx)("tbody",{children:n.map((function(e){var t,n=Object(o.a)(e,3),c=n[0],a=n[1],s=n[2];return Object(v.jsxs)("tr",{className:"graph-line-container",children:[Object(v.jsxs)("td",{className:"apply-them-color",children:[Object(v.jsx)(m,{width:100*s/i*100,theme:r}),(t=c,O.format(t))]}),Object(v.jsx)("td",{children:h(a)}),Object(v.jsx)("td",{children:h(s)})]},c)}))})]})})}))),p=n(9),g=(n(18),function(e){var t=e.children,n=Object(p.a)(e,["children"]);return Object(v.jsx)("button",Object(u.a)(Object(u.a)({className:"button"},n),{},{children:t}))}),k=(n(19),function(){var e,t={realtimeFeedSource:(e="wss://www.cryptofacilities.com/ws/v1","undefined"!==typeof e?"".concat(e).trim():"")};if(!t.realtimeFeedSource)throw new Error("Not all envs are set. check your .env file");return t}().realtimeFeedSource),x=32/navigator.hardwareConcurrency*500,S=function(){var e,t,n=Object(r.useRef)(null),c=function(e){var t=Object(r.useRef)(0),n=Object(r.useState)({bottom:0,height:0,left:0,right:0,top:0,width:0,x:0,y:0}),c=Object(o.a)(n,2),i=c[0],a=c[1],s=Object(r.useCallback)((function(){if(e.current){var t=e.current.getBoundingClientRect(),n=t.width,r=t.top,c=t.right,i=t.height,s=t.bottom,u=t.left,o=t.x,l=t.y;a({bottom:s,height:i,left:u,right:c,top:r,width:n,x:o,y:l})}}),[e]);return Object(r.useEffect)((function(){var n=e.current;if(n){var r=new ResizeObserver((function(){t.current=window.requestAnimationFrame(s)}));return r.observe(n),function(){null!==n&&(r.unobserve(n),window.cancelAnimationFrame(t.current))}}}),[e,s]),i}(n).height,i=function(){var e=Object(r.useState)("visible"===document.visibilityState),t=Object(o.a)(e,2),n=t[0],c=t[1],i=Object(r.useCallback)((function(){c("visible"===document.visibilityState)}),[]);return Object(r.useEffect)((function(){return document.addEventListener("visibilitychange",i),function(){return document.removeEventListener("visibilitychange",i)}}),[i]),{tabVisible:n}}().tabVisible,a=function(){var e=Object(r.useState)(0),t=Object(o.a)(e,2),n=t[0],c=t[1],i=Object(r.useCallback)((function(){c(window.innerWidth)}),[]);return Object(r.useEffect)((function(){return i(),window.addEventListener("resize",i),function(){return window.removeEventListener("resize",i)}}),[i]),{windowWith:n,isMobile:n<=768}}().isMobile,l=function(e,t){var n=Object(r.useState)(!1),c=Object(o.a)(n,2),i=c[0],a=c[1],s=Object(r.useState)(null),u=Object(o.a)(s,2),l=u[0],b=u[1],d=Object(r.useRef)(null),f=Object(r.useRef)([]),O=Object(r.useRef)([]);return Object(r.useEffect)((function(){d.current=new Worker(j),d.current.onmessage=function(e){"ORDERBOOK_UPDATE"===e.data.type&&b(e.data.data),"READY"===e.data.type&&a(e.data.data)};var n={type:"INIT",data:{realtimeFeedSource:e,updateInterval:t}};d.current.postMessage(n)}),[e,t]),{subscribeToFeed:Object(r.useCallback)((function(e){var t;if(e!==f.current){f.current=e,O.current=e;var n={type:"SUBSCRIBE",data:{productsIds:e}};null===(t=d.current)||void 0===t||t.postMessage(n)}}),[]),unsubscribe:Object(r.useCallback)((function(){var e;f.current=[],null===(e=d.current)||void 0===e||e.postMessage({type:"UNSUBSCRIBE"})}),[]),ready:i,rawOrderbook:l,currentProductsIds:f.current,lastProductsIds:O.current}}(k,x),b=l.rawOrderbook,f=l.subscribeToFeed,O=l.unsubscribe,m=l.ready,p=l.currentProductsIds,S=l.lastProductsIds,y=d(b,c/34-1),E=y.spread,I=y.orderbook,F=y.totalSize,C=Object(r.useMemo)((function(){return a&&I?Object(u.a)(Object(u.a)({},I),{},{asks:Object(s.a)(I.asks).reverse()}):I}),[a,I]),N=Object(r.useCallback)((function(){p.includes("PI_XBTUSD")?f(["PI_ETHUSD"]):f(["PI_XBTUSD"])}),[f,p]);Object(r.useCallback)((function(){f(S)}),[f,S]);return Object(r.useEffect)((function(){0===p.length&&f(["PI_XBTUSD"])}),[f]),Object(r.useEffect)((function(){i||O()}),[O,i]),Object(v.jsxs)("div",{className:"orderbook",children:[Object(v.jsxs)("h1",{className:"title",children:["Order book (",null===p||void 0===p?void 0:p.join(", "),")"]}),Object(v.jsxs)("p",{className:"spread",children:["Spread: ",null!==E?h(E):null]}),Object(v.jsx)(w,{ref:n,levelsWithTotals:null!==(e=null===C||void 0===C?void 0:C.bids)&&void 0!==e?e:[],totalSize:F,hideHeader:a,theme:"green"}),Object(v.jsx)(w,{levelsWithTotals:null!==(t=null===C||void 0===C?void 0:C.asks)&&void 0!==t?t:[],totalSize:F,theme:"red"}),Object(v.jsx)("footer",{className:"footer",children:Object(v.jsx)(g,{onClick:N,disabled:!m,children:"Toggle Feed"})})]})},y=function(e){e&&e instanceof Function&&n.e(3).then(n.bind(null,21)).then((function(t){var n=t.getCLS,r=t.getFID,c=t.getFCP,i=t.getLCP,a=t.getTTFB;n(e),r(e),c(e),i(e),a(e)}))};a.a.render(Object(v.jsx)(c.a.StrictMode,{children:Object(v.jsx)(S,{})}),document.getElementById("root")),y()}],[[20,1,2]]]);
//# sourceMappingURL=main.b46f2ac1.chunk.js.map