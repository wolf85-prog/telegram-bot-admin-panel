"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[167],{36167:function(e,n,r){r.d(n,{NU:function(){return R}});var t=r(74165),a=r(15861),o=r(93433),c=r(1413),s=r(29439),i=r(72791),l=r(80184);!function(e){var n=arguments.length>1&&void 0!==arguments[1]?arguments[1]:{},r=n.insertAt;if(e&&!(typeof document>"u")){var t=document.head||document.getElementsByTagName("head")[0],a=document.createElement("style");a.type="text/css","top"===r&&t.firstChild?t.insertBefore(a,t.firstChild):t.appendChild(a),a.styleSheet?a.styleSheet.cssText=e:a.appendChild(document.createTextNode(e))}}(".rmsc{--rmsc-main: #4285f4;--rmsc-hover: #f1f3f5;--rmsc-selected: #e2e6ea;--rmsc-border: #ccc;--rmsc-gray: #aaa;--rmsc-bg: #fff;--rmsc-p: 10px;--rmsc-radius: 4px;--rmsc-h: 38px}.rmsc *{box-sizing:border-box;transition:all .2s ease}.rmsc .gray{color:var(--rmsc-gray)}.rmsc .dropdown-content{position:absolute;z-index:1;top:100%;width:100%;padding-top:8px}.rmsc .dropdown-content .panel-content{overflow:hidden;border-radius:var(--rmsc-radius);background:var(--rmsc-bg);box-shadow:0 0 0 1px #0000001a,0 4px 11px #0000001a}.rmsc .dropdown-container{position:relative;outline:0;background-color:var(--rmsc-bg);border:1px solid var(--rmsc-border);border-radius:var(--rmsc-radius)}.rmsc .dropdown-container[aria-disabled=true]:focus-within{box-shadow:var(--rmsc-gray) 0 0 0 1px;border-color:var(--rmsc-gray)}.rmsc .dropdown-container:focus-within{box-shadow:var(--rmsc-main) 0 0 0 1px;border-color:var(--rmsc-main)}.rmsc .dropdown-heading{position:relative;padding:0 var(--rmsc-p);display:flex;align-items:center;width:100%;height:var(--rmsc-h);cursor:default;outline:0}.rmsc .dropdown-heading .dropdown-heading-value{overflow:hidden;text-overflow:ellipsis;white-space:nowrap;flex:1}.rmsc .clear-selected-button{cursor:pointer;background:none;border:0;padding:0;display:flex}.rmsc .options{max-height:260px;overflow-y:auto;margin:0;padding-left:0}.rmsc .options li{list-style:none;margin:0}.rmsc .select-item{box-sizing:border-box;cursor:pointer;display:block;padding:var(--rmsc-p);outline-offset:-1px;outline-color:var(--rmsc-primary)}.rmsc .select-item:hover{background:var(--rmsc-hover)}.rmsc .select-item.selected{background:var(--rmsc-selected)}.rmsc .no-options{padding:var(--rmsc-p);text-align:center;color:var(--rmsc-gray)}.rmsc .search{width:100%;position:relative;border-bottom:1px solid var(--rmsc-border)}.rmsc .search input{background:none;height:var(--rmsc-h);padding:0 var(--rmsc-p);width:100%;outline:0;border:0;font-size:1em}.rmsc .search input:focus{background:var(--rmsc-hover)}.rmsc .search-clear-button{cursor:pointer;position:absolute;top:0;right:0;bottom:0;background:none;border:0;padding:0 calc(var(--rmsc-p) / 2)}.rmsc .search-clear-button [hidden]{display:none}.rmsc .item-renderer{display:flex;align-items:baseline}.rmsc .item-renderer input{margin:0 5px 0 0}.rmsc .item-renderer.disabled{opacity:.5}.rmsc .spinner{animation:rotate 2s linear infinite}.rmsc .spinner .path{stroke:var(--rmsc-border);stroke-width:4px;stroke-linecap:round;animation:dash 1.5s ease-in-out infinite}@keyframes rotate{to{transform:rotate(360deg)}}@keyframes dash{0%{stroke-dasharray:1,150;stroke-dashoffset:0}50%{stroke-dasharray:90,150;stroke-dashoffset:-35}to{stroke-dasharray:90,150;stroke-dashoffset:-124}}\n");var u={allItemsAreSelected:"All items are selected.",clearSearch:"Clear Search",clearSelected:"Clear Selected",noOptions:"No options",search:"Search",selectAll:"Select All",selectAllFiltered:"Select All (Filtered)",selectSomeItems:"Select...",create:"Create"},d={value:[],hasSelectAll:!0,className:"multi-select",debounceDuration:200,options:[]},f=i.createContext({}),p=function(e){var n=e.props,r=e.children,t=(0,i.useState)(n.options),a=(0,s.Z)(t,2),o=a[0],p=a[1];return(0,i.useEffect)((function(){p(n.options)}),[n.options]),(0,l.jsx)(f.Provider,{value:(0,c.Z)((0,c.Z)((0,c.Z)({t:function(e){var r;return(null==(r=n.overrideStrings)?void 0:r[e])||u[e]}},d),n),{},{options:o,setOptions:p}),children:r})},h=function(){return i.useContext(f)};var m={when:!0,eventTypes:["keydown"]};function v(e,n,r){var t=(0,i.useMemo)((function(){return Array.isArray(e)?e:[e]}),[e]),a=Object.assign({},m,r),o=a.when,c=a.eventTypes,s=(0,i.useRef)(n),l=a.target;(0,i.useEffect)((function(){s.current=n}));var u=(0,i.useCallback)((function(e){t.some((function(n){return e.key===n||e.code===n}))&&s.current(e)}),[t]);(0,i.useEffect)((function(){if(o&&typeof window<"u"){var e=l?l.current:window;return c.forEach((function(n){e&&e.addEventListener(n,u)})),function(){c.forEach((function(n){e&&e.removeEventListener(n,u)}))}}}),[o,c,t,l,n])}var x={ARROW_DOWN:"ArrowDown",ARROW_UP:"ArrowUp",ENTER:"Enter",ESCAPE:"Escape",SPACE:"Space"};function b(e,n){return n?e.filter((function(e){var r=e.label,t=e.value;return null!=r&&null!=t&&r.toLowerCase().includes(n.toLowerCase())})):e}var g=function(){return(0,l.jsxs)("svg",{width:"24",height:"24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"dropdown-search-clear-icon gray",children:[(0,l.jsx)("line",{x1:"18",y1:"6",x2:"6",y2:"18"}),(0,l.jsx)("line",{x1:"6",y1:"6",x2:"18",y2:"18"})]})},y=function(e){var n=e.checked,r=e.option,t=e.onClick,a=e.disabled;return(0,l.jsxs)("div",{className:"item-renderer ".concat(a?"disabled":""),children:[(0,l.jsx)("input",{type:"checkbox",onChange:t,checked:n,tabIndex:-1,disabled:a}),(0,l.jsx)("span",{children:r.label})]})},k=function(e){var n=e.itemRenderer,r=void 0===n?y:n,t=e.option,a=e.checked,o=e.tabIndex,c=e.disabled,s=e.onSelectionChanged,u=e.onClick,d=(0,i.useRef)(),f=function(){c||s(!a)};return v([x.ENTER,x.SPACE],(function(e){f(),e.preventDefault()}),{target:d}),(0,l.jsx)("label",{className:"select-item ".concat(a?"selected":""),role:"option","aria-selected":a,tabIndex:o,ref:d,children:(0,l.jsx)(r,{option:t,checked:a,onClick:function(e){f(),u(e)},disabled:c})})},w=function(e){var n=e.options,r=e.onClick,t=e.skipIndex,a=h(),c=a.disabled,s=a.value,i=a.onChange,u=a.ItemRenderer;return(0,l.jsx)(l.Fragment,{children:n.map((function(e,n){var a=n+t;return(0,l.jsx)("li",{children:(0,l.jsx)(k,{tabIndex:a,option:e,onSelectionChanged:function(n){return function(e,n){c||i(n?[].concat((0,o.Z)(s),[e]):s.filter((function(n){return n.value!==e.value})))}(e,n)},checked:!!s.find((function(n){return n.value===e.value})),onClick:function(e){return r(e,a)},itemRenderer:u,disabled:e.disabled||c})},(null==e?void 0:e.key)||n)}))})},C=function(){var e=h(),n=e.t,r=e.onChange,c=e.options,u=e.setOptions,d=e.value,f=e.filterOptions,p=e.ItemRenderer,m=e.disabled,y=e.disableSearch,C=e.hasSelectAll,j=e.ClearIcon,S=e.debounceDuration,E=e.isCreatable,N=e.onCreateOption,R=(0,i.useRef)(),A=(0,i.useRef)(),Z=(0,i.useState)(""),O=(0,s.Z)(Z,2),I=O[0],T=O[1],P=(0,i.useState)(c),W=(0,s.Z)(P,2),M=W[0],_=W[1],D=(0,i.useState)(""),L=(0,s.Z)(D,2),F=L[0],z=L[1],B=(0,i.useState)(0),U=(0,s.Z)(B,2),q=U[0],H=U[1],V=(0,i.useCallback)(function(e,n){var r;return function(){for(var t=arguments.length,a=new Array(t),o=0;o<t;o++)a[o]=arguments[o];clearTimeout(r),r=setTimeout((function(){e.apply(null,a)}),n)}}((function(e){return z(e)}),S),[]),G=(0,i.useMemo)((function(){var e=0;return y||(e+=1),C&&(e+=1),e}),[y,C]),J={label:n(I?"selectAllFiltered":"selectAll"),value:""},K=function(){var e;z(""),T(""),null==(e=null==A?void 0:A.current)||e.focus()},Q=function(e){return H(e)};v([x.ARROW_DOWN,x.ARROW_UP],(function(e){switch(e.code){case x.ARROW_UP:$(-1);break;case x.ARROW_DOWN:$(1);break;default:return}e.stopPropagation(),e.preventDefault()}),{target:R});var X=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){var n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(n={label:I,value:I,__isNew__:!0},e.t0=N,!e.t0){e.next=6;break}return e.next=5,N(I);case 5:n=e.sent;case 6:u([n].concat((0,o.Z)(c))),K(),r([].concat((0,o.Z)(d),[n]));case 9:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),Y=function(){var e=(0,a.Z)((0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!f){e.next=6;break}return e.next=3,f(c,F);case 3:e.t0=e.sent,e.next=7;break;case 6:e.t0=b(c,F);case 7:return e.abrupt("return",e.t0);case 8:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),$=function(e){var n=q+e;n=Math.max(0,n),n=Math.min(n,c.length+Math.max(G-1,0)),H(n)};(0,i.useEffect)((function(){var e,n;null==(n=null==(e=null==R?void 0:R.current)?void 0:e.querySelector("[tabIndex='".concat(q,"']")))||n.focus()}),[q]);var ee=(0,i.useMemo)((function(){var e=M.filter((function(e){return!e.disabled}));return[e.every((function(e){return-1!==d.findIndex((function(n){return n.value===e.value}))})),0!==e.length]}),[M,d]),ne=(0,s.Z)(ee,2),re=ne[0],te=ne[1];(0,i.useEffect)((function(){Y().then(_)}),[F,c]);var ae=(0,i.useRef)();v([x.ENTER],X,{target:ae});var oe=E&&I&&!M.some((function(e){return(null==e?void 0:e.value)===I}));return(0,l.jsxs)("div",{className:"select-panel",role:"listbox",ref:R,children:[!y&&(0,l.jsxs)("div",{className:"search",children:[(0,l.jsx)("input",{placeholder:n("search"),type:"text","aria-describedby":n("search"),onChange:function(e){V(e.target.value),T(e.target.value),H(0)},onFocus:function(){H(0)},value:I,ref:A,tabIndex:0}),(0,l.jsx)("button",{type:"button",className:"search-clear-button",hidden:!I,onClick:K,"aria-label":n("clearSearch"),children:j||(0,l.jsx)(g,{})})]}),(0,l.jsxs)("ul",{className:"options",children:[C&&te&&(0,l.jsx)(k,{tabIndex:1===G?0:1,checked:re,option:J,onSelectionChanged:function(e){var n=function(e){var n=M.filter((function(e){return!e.disabled})).map((function(e){return e.value}));if(e){var r=[].concat((0,o.Z)(d.map((function(e){return e.value}))),(0,o.Z)(n));return(f?M:c).filter((function(e){return r.includes(e.value)}))}return d.filter((function(e){return!n.includes(e.value)}))}(e);r(n)},onClick:function(){return Q(1)},itemRenderer:p,disabled:m}),M.length?(0,l.jsx)(w,{skipIndex:G,options:M,onClick:function(e,n){return Q(n)}}):oe?(0,l.jsx)("li",{onClick:X,className:"select-item creatable",tabIndex:1,ref:ae,children:"".concat(n("create"),' "').concat(I,'"')}):(0,l.jsx)("li",{className:"no-options",children:n("noOptions")})]})]})},j=function(e){var n=e.expanded;return(0,l.jsx)("svg",{width:"24",height:"24",fill:"none",stroke:"currentColor",strokeWidth:"2",className:"dropdown-heading-dropdown-arrow gray",children:(0,l.jsx)("path",{d:n?"M18 15 12 9 6 15":"M6 9L12 15 18 9"})})},S=function(){var e=h(),n=e.t,r=e.value,t=e.options,a=e.valueRenderer,o=0===r.length,c=r.length===t.length,s=a&&a(r,t);return o?(0,l.jsx)("span",{className:"gray",children:s||n("selectSomeItems")}):(0,l.jsx)("span",{children:s||(c?n("allItemsAreSelected"):r.map((function(e){return e.label})).join(", "))})},E=function(e){var n=e.size,r=void 0===n?24:n;return(0,l.jsx)("span",{style:{width:r,marginRight:"0.2rem"},children:(0,l.jsx)("svg",{width:r,height:r,className:"spinner",viewBox:"0 0 50 50",style:{display:"inline",verticalAlign:"middle"},children:(0,l.jsx)("circle",{cx:"25",cy:"25",r:"20",fill:"none",className:"path"})})})},N=function(){var e=h(),n=e.t,r=e.onMenuToggle,t=e.ArrowRenderer,a=e.shouldToggleOnHover,o=e.isLoading,c=e.disabled,u=e.onChange,d=e.labelledBy,f=e.value,p=e.isOpen,m=e.defaultIsOpen,b=e.ClearSelectedIcon,y=e.closeOnChangedValue;(0,i.useEffect)((function(){y&&I(!1)}),[f]);var k=(0,i.useState)(!0),w=(0,s.Z)(k,2),N=w[0],R=w[1],A=(0,i.useState)(m),Z=(0,s.Z)(A,2),O=Z[0],I=Z[1],T=(0,i.useState)(!1),P=(0,s.Z)(T,2),W=P[0],M=P[1],_=t||j,D=(0,i.useRef)();(function(e,n){var r=(0,i.useRef)(!1);(0,i.useEffect)((function(){r.current?e():r.current=!0}),n)})((function(){r&&r(O)}),[O]),(0,i.useEffect)((function(){void 0===m&&"boolean"==typeof p&&(R(!1),I(p))}),[p]);v([x.ENTER,x.ARROW_DOWN,x.SPACE,x.ESCAPE],(function(e){var n;["text","button"].includes(e.target.type)&&[x.SPACE,x.ENTER].includes(e.code)||(N&&(e.code===x.ESCAPE?(I(!1),null==(n=null==D?void 0:D.current)||n.focus()):I(!0)),e.preventDefault())}),{target:D});var L=function(e){N&&a&&I(e)};return(0,l.jsxs)("div",{tabIndex:0,className:"dropdown-container","aria-labelledby":d,"aria-expanded":O,"aria-readonly":!0,"aria-disabled":c,ref:D,onFocus:function(){return!W&&M(!0)},onBlur:function(e){!e.currentTarget.contains(e.relatedTarget)&&N&&(M(!1),I(!1))},onMouseEnter:function(){return L(!0)},onMouseLeave:function(){return L(!1)},children:[(0,l.jsxs)("div",{className:"dropdown-heading",onClick:function(){N&&I(!o&&!c&&!O)},children:[(0,l.jsx)("div",{className:"dropdown-heading-value",children:(0,l.jsx)(S,{})}),o&&(0,l.jsx)(E,{}),f.length>0&&null!==b&&(0,l.jsx)("button",{type:"button",className:"clear-selected-button",onClick:function(e){e.stopPropagation(),u([]),N&&I(!1)},disabled:c,"aria-label":n("clearSelected"),children:b||(0,l.jsx)(g,{})}),(0,l.jsx)(_,{expanded:O})]}),O&&(0,l.jsx)("div",{className:"dropdown-content",children:(0,l.jsx)("div",{className:"panel-content",children:(0,l.jsx)(C,{})})})]})},R=function(e){return(0,l.jsx)(p,{props:e,children:(0,l.jsx)("div",{className:"rmsc ".concat(e.className||"multi-select"),children:(0,l.jsx)(N,{})})})}}}]);
//# sourceMappingURL=167.7b23816e.chunk.js.map