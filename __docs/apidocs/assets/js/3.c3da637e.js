(window.webpackJsonp=window.webpackJsonp||[]).push([[3,5],{368:function(t,e,n){"use strict";n(31),n(105),n(74);var i=function(t,e){for(var n=e.split("."),i=n.length,a=0;null!=t&&a<i;)t=t[n[a++]];return a&&a===i?t:void 0};e.a={get:function(t,e,n){return n?i(t,"themeConfig.locales.".concat(n,".").concat(e))||i(t,"themeConfig.".concat(e))||i(t,"locales.".concat(n,".").concat(e))||t[e]:i(t,"themeConfig.".concat(e))||t[e]}}},369:function(t,e,n){},373:function(t,e,n){n(32),n(36),n(31),n(105),e.defaultLocales={"/":{lastUpdated:"Last Updated",editLinkText:"Edit this page",container:{tip:"TIP",warning:"WARNING",danger:"DANGER"}},"/zh/":{lastUpdated:"上次更新",editLinkText:"编辑此页面",container:{tip:"提示",warning:"注意",danger:"警告"}}},e.getDefaultLocales=function(t,n){var i=e.defaultLocales[t];return n.split(".").forEach((function(t){i=i[t]})),i}},374:function(t,e,n){"use strict";n(369)},389:function(t,e,n){},390:function(t,e,n){},391:function(t,e,n){},392:function(t,e,n){"use strict";n.r(e);n(31),n(73),n(32),n(36),n(106),n(16);var i=n(30),a=n(368),s=n(373),o={data:function(){return{blocks:[]}},computed:{isEnchanceMode:function(){return!!this.$page.frontmatter.enhance},isBlockLayout:function(){return this.isEnchanceMode||!!this.blocks.length},pageClasses:function(){return{page__container:!0,"page--block-layout":this.isBlockLayout}},lastUpdated:function(){return!1!==this.$site.themeConfig.lastUpdated&&this.$page.lastUpdated},lastUpdatedText:function(){return"string"==typeof(this.$site.themeConfig.lastUpdated||a.a.get(this.$site,"lastUpdated",this.$localePath))?this.$site.themeConfig.lastUpdated:Object(s.getDefaultLocales)(this.$localePath,"lastUpdated")},editLink:function(){if(!1===this.$page.frontmatter.editLink)return"";var t=this.$site.themeConfig,e=t.repo,n=t.editLinks,a=t.docsDir,s=void 0===a?"":a,o=t.docsBranch,r=void 0===o?"master":o,c=t.docsRepo,l=void 0===c?e:c,u=this.$page.path;return"/"===u.substr(-1)?u+="README.md":u+=".md",l&&n?(Object(i.b)(l)?l:"https://github.com/".concat(l)).replace(/\/$/,"")+"/edit/".concat(r)+(s?"/"+s.replace(/\/$/,""):"")+u:""},editLinkText:function(){return this.$site.themeConfig.editLinkText||Object(s.getDefaultLocales)(this.$localePath,"editLinkText")}},watch:{$route:function(t,e){t.path!==e.path&&(this.blocks.length=0,this.isEnchanceMode&&this.$nextTick(this.resolveLayout))}},mounted:function(){this.isEnchanceMode&&this.$nextTick(this.resolveLayout)},created:function(){this.$on("addBlock",this.addBlock)},methods:{resolveLayout:function(){var t=this.$el.children[0],e="";Array.from(t.children).forEach((function(t){!function(t){var e=t.tagName.toLowerCase();return"h1"===e||"h2"===e}(t)?e+=t.outerHTML:(e&&(e+='\n                </div>\n                <div class="content-block__examples">\n                </div>\n              </div>\n            </div>\n            '),e+='\n            <div class="content-block">\n              <div class="content-block__heading">\n                '.concat(t.outerHTML,'\n              </div>\n              <div class="content-block__body">\n                <div class="content-block__cont">\n          '))})),e+='\n                </div>\n                <div class="content-block__examples">\n                </div>\n              </div>\n            </div>\n      ',t.innerHTML=e},addBlock:function(t){this.blocks.push(t)}}},r=(n(374),n(2)),c=Object(r.a)(o,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{class:t.pageClasses},[n("Content",{attrs:{custom:""}}),t._v(" "),t.lastUpdated||t.editLink?n("div",{staticClass:"content__footer-container"},[n("div",{staticClass:"content__footer"},[t.lastUpdated?n("div",{staticClass:"last-updated"},[n("span",{staticClass:"prefix"},[t._v(t._s(t.lastUpdatedText)+":")]),t._v(" "),n("span",{staticClass:"time"},[t._v(t._s(t.lastUpdated))])]):t._e(),t._v(" "),t.editLink?n("div",{staticClass:"edit-link"},[n("a",{attrs:{href:t.editLink,target:"_blank",rel:"noopener noreferrer"}},[t._v(t._s(t.editLinkText))]),t._v(" "),n("svg",{attrs:{viewBox:"0 0 33 32",version:"1.1",xmlns:"http://www.w3.org/2000/svg",height:"16",width:"16"}},[n("g",{attrs:{stroke:"none","stroke-width":"1",fill:"none","fill-rule":"evenodd"}},[n("g",{attrs:{id:"github",fill:"#000"}},[n("path",{attrs:{d:"M16.3,0 C7.3,0 -3.55271368e-15,7.3 -3.55271368e-15,16.3 C-3.55271368e-15,23.5 4.7,29.6 11.1,31.8 C11.9,31.9 12.2,31.4 12.2,31 L12.2,28.2 C7.7,29.2 6.7,26 6.7,26 C6,24.2 5,23.7 5,23.7 C3.5,22.7 5.1,22.7 5.1,22.7 C6.7,22.8 7.6,24.4 7.6,24.4 C9.1,26.9 11.4,26.2 12.3,25.8 C12.4,24.7 12.9,24 13.3,23.6 C9.7,23.2 5.9,21.8 5.9,15.5 C5.9,13.7 6.5,12.3 7.6,11.1 C7.4,10.7 6.9,9 7.8,6.8 C7.8,6.8 9.2,6.4 12.3,8.5 C13.6,8.1 15,8 16.4,8 C17.8,8 19.2,8.2 20.5,8.5 C23.6,6.4 25,6.8 25,6.8 C25.9,9 25.3,10.7 25.2,11.1 C26.2,12.2 26.9,13.7 26.9,15.5 C26.9,21.8 23.1,23.1 19.5,23.5 C20.1,24 20.6,25 20.6,26.5 L20.6,31 C20.6,31.4 20.9,31.9 21.7,31.8 C28.2,29.6 32.8,23.5 32.8,16.3 C32.6,7.3 25.3,0 16.3,0 L16.3,0 Z"}})])])])]):t._e()])]):t._e()],1)}),[],!1,null,null,null);e.default=c.exports},452:function(t,e,n){"use strict";var i=n(1),a=n(107),s=n(52),o=n(13),r=n(15),c=n(108),l=n(53),u=n(54)("splice"),d=Math.max,h=Math.min;i({target:"Array",proto:!0,forced:!u},{splice:function(t,e){var n,i,u,p,f,g,v=r(this),_=o(v.length),m=a(t,_),C=arguments.length;if(0===C?n=i=0:1===C?(n=0,i=_-m):(n=C-2,i=h(d(s(e),0),_-m)),_+n-i>9007199254740991)throw TypeError("Maximum allowed length exceeded");for(u=c(v,i),p=0;p<i;p++)(f=m+p)in v&&l(u,p,v[f]);if(u.length=i,n<i){for(p=m;p<_-i;p++)g=p+n,(f=p+i)in v?v[g]=v[f]:delete v[g];for(p=_;p>_-i+n;p--)delete v[p-1]}else if(n>i)for(p=_-i;p>m;p--)g=p+n-1,(f=p+i-1)in v?v[g]=v[f]:delete v[g];for(p=0;p<n;p++)v[p+m]=arguments[p+2];return v.length=_-i+n,u}})},453:function(t,e,n){"use strict";var i=n(1),a=n(27),s=n(15),o=n(3),r=n(39),c=[],l=c.sort,u=o((function(){c.sort(void 0)})),d=o((function(){c.sort(null)})),h=r("sort");i({target:"Array",proto:!0,forced:u||!d||!h},{sort:function(t){return void 0===t?l.call(s(this)):l.call(s(this),a(t))}})},454:function(t,e,n){var i=n(1),a=n(455);i({global:!0,forced:parseInt!=a},{parseInt:a})},455:function(t,e,n){var i=n(4),a=n(115).trim,s=n(116),o=i.parseInt,r=/^[+-]?0[Xx]/,c=8!==o(s+"08")||22!==o(s+"0x16");t.exports=c?function(t,e){var n=a(String(t));return o(n,e>>>0||(r.test(n)?16:10))}:o},456:function(t,e,n){"use strict";n(389)},457:function(t,e,n){"use strict";n(390)},458:function(t,e,n){"use strict";n(391)},462:function(t,e,n){"use strict";n.r(e);n(75),n(56),n(37),n(38);var i=n(0),a=n(72),s=n.n(a),o=(n(32),n(36),n(74),n(24),n(203),n(205),n(55),n(31),n(73),n(114),n(204),n(452),n(453),n(454),n(368));var r={name:"Sidebar",components:{NavLink:n(197).a},props:{items:{type:Object,required:!0}},data:function(){return{containerWidth:"100%",searchKeyword:""}},computed:{searchedOptions:function(){var t=this,e=[];return this.sidebars.forEach((function(t){t.to&&e.push({to:t.to,text:t.title}),t.headers&&t.headers.forEach((function(n){e.push({to:"".concat(t.to,"#").concat(n.slug),text:n.title})})),t.children&&t.children.forEach((function(t){e.push({to:t.to,text:t.title}),t.headers&&t.headers.forEach((function(n){e.push({to:"".concat(t.to,"#").concat(n.slug),text:n.title})}))}))})),e.filter((function(e){return(e.text||"").toLowerCase().includes(t.searchKeyword.toLowerCase())}))},shouldShowLangSelect:function(){return Object.keys(this.$site.locales||{}).length>1},languageSelectText:function(){return o.a.get(this.$site,"selectText",this.$localePath)||"languages"},currentPagePath:function(){return this.$page.path},currentRouteFullPath:function(){return decodeURIComponent(this.$route.fullPath)},localePathList:function(){var t=this;return Object.keys(this.$site.locales||{}).map((function(e){var n=t.$site.locales[e],i=o.a.get(t.$site,"label",e)||n.text||n.lang,a="";n.path===t.$localePath?a=t.$page.path:(a=t.$page.path.replace(t.$localePath,n.path),!t.$site.pages.some((function(t){return t.path===a}))&&(a=n.path));return{prop:i,value:a}}))},sidebarGroupOrder:function(){var t=this,e=o.a.get(this.$site,"sidebarGroupOrder",this.$localePath),n=e?e.filter((function(e){return!!t.items[e]})):Object.keys(this.items),i=n.indexOf("home");return-1!==i&&n.splice(i,1),n.sort(),n.unshift("home"),n},sidebars:function(){var t=this;return this.sidebarGroupOrder.map((function(e){return t.items[e]})).filter((function(t){return t}))}},mounted:function(){this.refreshContainerWidth(),this.checkActiveSidebarItem(),window.addEventListener("resize",this.refreshContainerWidth)},beforeDestroy:function(){window.removeEventListener("resize",this.refreshContainerWidth)},methods:{title:function(t){var e=["http","https","cli","api"];return t.toLowerCase().replace(/(?:(?:(\s?(?:^|[.\(\)!?;:"-])\s*)(\w))|(\w))(\w*[’']*\w*)/g,(function(t){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:"",i=arguments.length>2?arguments[2]:void 0,a=arguments.length>3?arguments[3]:void 0,s=arguments.length>4?arguments[4]:void 0;return e.includes(t)?t.toUpperCase():n+(a||i).toUpperCase()+s}))},toggleLocale:function(t){this.$router.push(t)},refreshContainerWidth:function(){var t=this.$refs.container.parentNode.getBoundingClientRect().width;this.containerWidth=t?"".concat(t,"px"):"100%"},savePosition:function(){if(this.$refs.container){var t=this.$refs.container.scrollTop;window.localStorage.setItem("vuepress_theme_api_sidebar_position",t)}},restorePosition:function(){var t=parseInt(window.localStorage.getItem("vuepress_theme_api_sidebar_position"),10);t&&(this.$refs.container.scrollTop=t)},checkActiveSidebarItem:function(){var t=this.$refs.container.querySelector(".category--active");if(t){var e=document.documentElement.clientHeight,n=t.getBoundingClientRect().top;n<e?this.restorePosition():(this.$refs.container.scrollTop=n-100,this.savePosition())}else this.restorePosition()}}},c=(n(456),n(2)),l=Object(c.a)(r,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{ref:"container",staticClass:"sidebar",style:{width:t.containerWidth},on:{click:t.savePosition}},[n("div",{staticClass:"group"},[n("div",{staticClass:"group__title"},[t._v("Search")]),t._v(" "),n("div",{staticClass:"group__body"},[n("Search",{attrs:{options:t.searchedOptions},model:{value:t.searchKeyword,callback:function(e){t.searchKeyword=e},expression:"searchKeyword"}})],1)]),t._v(" "),t.shouldShowLangSelect?n("div",{staticClass:"group"},[n("div",{staticClass:"group__title"},[t._v(t._s(t.languageSelectText))]),t._v(" "),n("div",{staticClass:"group__body"},[n("div",{staticClass:"sidebar__lang"},[n("Select",{attrs:{options:t.localePathList,value:t.currentPagePath},on:{change:t.toggleLocale}})],1)])]):t._e(),t._v(" "),t._l(t.sidebars,(function(e,i){return n("div",{key:e.to||i,staticClass:"group"},[n("div",{staticClass:"group__title"},[t._v("\n      "+t._s(t.sidebarGroupOrder[i].replace(/^\d+[_-]*/g,""))+"\n    ")]),t._v(" "),n("div",{staticClass:"group__body"},[e.to?n("div",{class:["group__category","category",{"category--selected":t.currentRouteFullPath===e.to,"category--active":t.currentRouteFullPath===e.to}]},[n("div",{staticClass:"category__label"},[n("NavLink",{staticClass:"category__link sidebar-link",attrs:{to:e.to}},[t._v(t._s(t.title(e.title||t.sidebarGroupOrder[i])))])],1)]):t._e(),t._v(" "),e.headers&&e.headers.length?n("div",t._l(e.headers,(function(i){return n("div",{key:e.to+"#"+i.slug,class:["group__category","category",{"category--selected":t.currentRouteFullPath===e.to+"#"+i.slug,"category--active":t.currentRouteFullPath===e.to+"#"+i.slug}]},[n("div",{staticClass:"category__label"},[n("NavLink",{staticClass:"category__link sidebar-link",attrs:{to:e.to+"#"+i.slug}},[t._v(t._s(t.title(i.title)))])],1)])})),0):t._e(),t._v(" "),e.children&&e.children.length?n("div",t._l(e.children,(function(e){return n("div",{key:""+e.to,class:["group__category","category",{"category--selected":!e.isLangNav&&t.$route.path===e.to,"category--active":!e.isLangNav&&t.currentRouteFullPath===e.to}]},[n("div",{staticClass:"category__label"},[n("NavLink",{staticClass:"category__link sidebar-link",attrs:{to:e.to}},[t._v(t._s(t.title(e.title)))])],1),t._v(" "),e.headers&&e.headers.length?n("div",t._l(e.headers,(function(i){return n("div",{key:e.to+"#"+i.slug,class:["category__headers",{"category--active":t.currentRouteFullPath===e.to+"#"+i.slug}]},[n("div",{staticClass:"category__header-item"},[n("NavLink",{staticClass:"category__link sidebar-link",attrs:{to:e.to+"#"+i.slug}},[t._v(t._s(t.title(i.title)))])],1)])})),0):t._e()])})),0):t._e()])])}))],2)}),[],!1,null,null,null).exports,u=n(459),d=n(392),h=n(387);var p={components:{Home:u.default,Sidebar:l,Page:d.default},data:function(){return{isSidebarOpen:!0,isMenuOpened:!1}},computed:{sidebarItems:function(){return t=this.$site,e=this.$localePath,n={},(i=o.a.get(t,"sidebar",e))?Object.assign(n,i):(t.pages.filter((function(n){return!t.locales||Object(h.e)(n.path,t.locales)===e})).forEach((function(t){if(Object(h.a)(t.path,e))n.home={title:t.title,to:t.path,children:[]};else{var i=Object(h.d)(t.path,e);n[i]||(n[i]={children:[]}),void 0===t.headers&&(t.headers=[]);var a=function(t){if(!t.length)return-1;for(var e=t[0].level,n=1,i=t.length;n<i;n++)t[n].level<e&&(e=t[n].level);return e}(t.headers);t.path==="".concat(e).concat(i,"/")?(n[i].title=t.title,n[i].to=t.path,n[i].headers=t.headers.filter((function(t){return t.level===a}))):n[i].children.push({title:t.title||Object(h.c)(t.path),to:t.path,headers:t.headers.filter((function(t){return t.level===a}))})}})),n);var t,e,n,i},shouldShowSidebar:function(){var t=this.$page.frontmatter;return!t.home&&!1!==t.sidebar&&Object.keys(this.sidebarItems).length},pageClasses:function(){var t=this.$page.frontmatter.pageClass;return[{"no-sidebar":!this.shouldShowSidebar},t]}},watch:{$route:function(){this.isMenuOpened=!1}},mounted:function(){s.a.configure({showSpinner:!1}),this.$router.beforeEach((function(t,e,n){t.path===e.path||i.a.component(t.name)||s.a.start(),n()})),this.$router.afterEach((function(){s.a.done()}))},created:function(){this.$ssrContext&&(this.$ssrContext.title=this.$title,this.$ssrContext.lang=this.$lang,this.$ssrContext.description=this.$page.description||this.$description)}},f=(n(457),n(458),Object(c.a)(p,(function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"theme__container",class:t.pageClasses},[t.shouldShowSidebar?n("div",{staticClass:"row"},[n("div",{staticClass:"col-md-3 col-lg-2 sidebar__container"},[n("Menubar",{attrs:{open:t.isMenuOpened},on:{"update:open":function(e){t.isMenuOpened=e}}}),t._v(" "),n("Sidebar",{directives:[{name:"show",rawName:"v-show",value:t.isMenuOpened,expression:"isMenuOpened"}],attrs:{items:t.sidebarItems}},[t._t("sidebar-top",null,{slot:"top"}),t._v(" "),t._t("sidebar-bottom",null,{slot:"bottom"})],2)],1),t._v(" "),n("div",{staticClass:"col-md-9 col-lg-10 content__container"},[t.$page.frontmatter.layout?n("div",{staticClass:"custom__layout"},[n(t.$page.frontmatter.layout,{tag:"component"})],1):t.$page.frontmatter.home?n("Home"):n("Page")],1)]):t._e(),t._v(" "),t.shouldShowSidebar?t._e():n("div",[t.$page.frontmatter.layout?n("div",{staticClass:"custom__layout"},[n(t.$page.frontmatter.layout,{tag:"component"})],1):t.$page.frontmatter.home?n("Home"):n("Page")],1)])}),[],!1,null,null,null));e.default=f.exports}}]);