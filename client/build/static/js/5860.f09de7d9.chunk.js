"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[5860],{12529:function(e,l,o){o(72791);l.Z=o.p+"static/media/three-dots.a35b2710e29e76719654fe2e784aa751.svg"},8168:function(e,l,o){o.d(l,{Z:function(){return v}});var a=o(29439),n=o(72791),r="Select3_select__YKk0W",t="Select3_selectClicked__Lh74g",c=o(80184),u=function(e){var l=e.menuShow,o=e.setMenuShow,a=e.selected;return(0,c.jsx)("div",{className:"".concat(r," ").concat(l&&t),onClick:function(){return o(!l)},style:{borderColor:"".concat(a.color)},children:(0,c.jsx)("span",{style:{color:"".concat(a.color)},children:a.name})})},i="Dropdown4_dropdown__6iRH6",s="Dropdown4_menu__0vJ8n",f="Dropdown4_menuOpen__rth5-",v=function(e){var l=e.options,o=e.selected,r=e.setSelected,t=e.placeholder,v=e.style,d=(0,n.useState)(!1),b=(0,a.Z)(d,2),m=b[0],p=b[1];(0,n.useEffect)((function(){r(o?{name:o.name,color:o.color}:{name:t,color:"#f3f3f3"})}),[]);var h=l.map((function(e,l){return(0,c.jsxs)(c.Fragment,{children:[(0,c.jsx)("li",{onClick:function(l){return function(e,l){r({name:e.target.innerText,color:l}),p(!m)}(l,e.color)},style:{color:"".concat(e.color)},children:e.label},l),e.divide?(0,c.jsx)("hr",{}):""]})})),w=(0,n.useRef)(null);return(0,n.useEffect)((function(){function e(e){w.current&&!w.current.contains(e.target)&&(p(!1),e.stopPropagation())}return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[w]),(0,c.jsxs)("div",{className:i,ref:w,children:[(0,c.jsx)(u,{menuShow:m,setMenuShow:p,selected:o}),(0,c.jsx)("ul",{className:"".concat(s," ").concat(m&&f),style:v,children:h})]})}},85733:function(e,l,o){o.d(l,{Z:function(){return b}});var a=o(4942),n=o(1413),r=o(29439),t=o(72791),c=o(51114),u="Dropdown5_dropdown__PdX9A",i="Dropdown5_menu__xfdTe",s="Dropdown5_menuOpen__hYLPR",f="Dropdown5_close__hdBVJ",v=o(54315),d=(o(78983),o(80184)),b=function(e){var l=e.options,o=e.selected,b=e.setSelected,m=e.index,p=e.element,h=(e.placeholder,e.style),w=(0,t.useState)(!1),g=(0,r.Z)(w,2),S=g[0],_=g[1],Z=(0,t.useState)({}),F=(0,r.Z)(Z,2),x=(F[0],F[1],(0,t.useState)(!1)),E=(0,r.Z)(x,2),y=E[0],C=E[1];(0,t.useEffect)((function(){}),[o]);var j=l.map((function(e,l){return(0,d.jsx)("li",{onClick:function(l){return function(e,l){console.log("selected: ",{name:e.target.innerText,color:l});var r=JSON.parse(JSON.stringify(o)),t=r[m];r[m]=(0,n.Z)((0,n.Z)({},t),{},(0,a.Z)({},p,JSON.stringify({name:e.target.innerText,color:l}))),console.log("arr: ",r),b(r),_(!S),C(!1)}(l,e.color)},style:{color:"".concat(e.color)},children:e.label},l)})),k=(0,t.useRef)(null);(0,t.useEffect)((function(){function e(e){k.current&&!k.current.contains(e.target)&&(C(!1),_(!1),e.stopPropagation())}return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[k]);return(0,d.jsxs)("div",{className:u,ref:k,children:[(0,d.jsx)(c.Z,{menuShow:S,setMenuShow:_,clearShow:y,setClearShow:C,selected:o?o[m]:"",index:m,el:p,style:{border:"none!important",color:""}}),(0,d.jsx)("div",{style:{position:"relative"},children:(0,d.jsx)("img",{src:v.Z,onClick:function(){C(!1),_(!1);var e=JSON.parse(JSON.stringify(o)),l=e[m];e[m]=(0,n.Z)((0,n.Z)({},l),{},(0,a.Z)({},p,JSON.stringify({name:"",color:""}))),b(e)},width:15,alt:"",className:f,style:{visibility:y?"visible":"hidden"}})}),(0,d.jsx)("ul",{className:"".concat(i," ").concat(S&&s),style:h,children:j})]})}},41260:function(e,l,o){o.d(l,{Z:function(){return h}});var a=o(4942),n=o(1413),r=o(29439),t=o(72791),c="Select4_select__eZNDe",u="Select4_selectClicked__HDN9f",i=o(54315),s=o(78983),f=o(80184),v=function(e){var l=e.menuShow,o=e.setMenuShow,a=e.clearShow,n=e.setClearShow,i=e.selected,v=e.el,d=e.setInputValue,b=(e.setSelected,e.options),m=(0,t.useState)(),p=(0,r.Z)(m,2),h=p[0],w=p[1],g=(0,t.useState)(!1),S=(0,r.Z)(g,2),_=(S[0],S[1]);(0,t.useEffect)((function(){var e=b.find((function(e){return e.id===parseInt(i[v])}));w(e?null===e||void 0===e?void 0:e.label:""),_(!0)}),[i]);return(0,f.jsx)("div",{className:"".concat(c," ").concat(l&&u),onClick:function(){o(!l),n(!a)},children:(0,f.jsx)(s.jO,{type:"text",placeholder:"",value:h&&h.length>25?h.substr(0,25)+"...":h,onChange:function(e){return function(e){w(e.target.value),console.log(e.target.value),d(e.target.value)}(e)},style:{height:"30px",fontSize:"16px",background:"transparent",border:"none",boxShadow:"none",textAlign:"center"}})})},d="Dropdown6_dropdown__wY9Nh",b="Dropdown6_menu__GVdaL",m="Dropdown6_menuOpen__w78OG",p="Dropdown6_close__2gHVr",h=function(e){var l=e.options,o=e.selected,c=e.setSelected,u=e.index,s=e.element,h=(e.placeholder,e.style),w=(0,t.useState)(!1),g=(0,r.Z)(w,2),S=g[0],_=g[1],Z=(0,t.useState)(""),F=(0,r.Z)(Z,2),x=F[0],E=F[1],y=(0,t.useState)([]),C=(0,r.Z)(y,2),j=C[0],k=C[1],N=(0,t.useState)(!1),D=(0,r.Z)(N,2),O=D[0],J=D[1];(0,t.useEffect)((function(){l.slice(0,15);k(l)}),[]),(0,t.useEffect)((function(){}),[o]),(0,t.useEffect)((function(){var e=l.filter((function(e){var l;return null===(l=e.label)||void 0===l?void 0:l.toLowerCase().includes(null===x||void 0===x?void 0:x.toLowerCase())}));k(""===x?l:e)}),[x]);var L=j.map((function(e,l){return(0,f.jsx)("li",{value:e.id,onClick:function(e){return function(e){console.log(e.target.value);var l=JSON.parse(JSON.stringify(o)),r=l[u];l[u]=(0,n.Z)((0,n.Z)({},r),{},(0,a.Z)({},s,e.target.value)),c(l),_(!S),J(!1)}(e)},children:e.label},l)})),R=(0,t.useRef)(null);(0,t.useEffect)((function(){function e(e){R.current&&!R.current.contains(e.target)&&(J(!1),_(!1),e.stopPropagation())}return document.addEventListener("mousedown",e),function(){document.removeEventListener("mousedown",e)}}),[R]);return(0,f.jsxs)("div",{className:d,ref:R,children:[(0,f.jsx)(v,{menuShow:S,setMenuShow:_,clearShow:O,setClearShow:J,selected:o?o[u]:"",index:u,el:s,setSelected:c,inputValue:x,setInputValue:E,options:l,style:{border:"none!important",color:""}}),(0,f.jsx)("div",{style:{position:"relative"},children:(0,f.jsx)("img",{src:i.Z,onClick:function(){J(!1),_(!1);var e=JSON.parse(JSON.stringify(o)),l=e[u];e[u]=(0,n.Z)((0,n.Z)({},l),{},(0,a.Z)({},s,"")),console.log("arr: ",e),c(e)},width:15,alt:"",className:p,style:{visibility:O?"visible":"hidden"}})}),(0,f.jsx)("ul",{className:"".concat(b," ").concat(S&&m),style:h,children:L})]})}},51114:function(e,l,o){o.d(l,{Z:function(){return u}});var a=o(29439),n=o(72791),r="Select2_select__avTEZ",t="Select2_selectClicked__eMhPW",c=(o(54315),o(78983),o(80184)),u=function(e){var l=e.menuShow,o=e.setMenuShow,u=e.clearShow,i=e.setClearShow,s=e.selected,f=e.el,v=(0,n.useState)(),d=(0,a.Z)(v,2),b=d[0],m=d[1],p=(0,n.useState)(!1),h=(0,a.Z)(p,2),w=(h[0],h[1]);(0,n.useEffect)((function(){m(void 0!==(null===s||void 0===s?void 0:s[f])&&""!==(null===s||void 0===s?void 0:s[f])?JSON.parse(null===s||void 0===s?void 0:s[f]):""),w(!0)}),[s]);return(0,c.jsx)("div",{className:"".concat(r," ").concat(l&&t),onClick:function(){o(!l),i(!u)},children:(0,c.jsx)("span",{style:{color:"".concat("\u041f\u0435\u0440\u0435\u0434\u0443\u043c\u0430\u043b"===(null===b||void 0===b?void 0:b.name)?"red":null===b||void 0===b?void 0:b.color)},children:null!==b&&void 0!==b&&b.name&&(null===b||void 0===b?void 0:b.name.length)>25?(null===b||void 0===b?void 0:b.name.substr(0,25))+"...":null===b||void 0===b?void 0:b.name})})}},33798:function(e,l){l.Z=[{value:1,label:"\u0417\u0432\u0443\u043a\u043e\u0440\u0435\u0436\u0438\u0441\u0441\u0435\u0440",name:"\u0417\u0432\u0443\u043a\u043e\u0440\u0435\u0436\u0438\u0441\u0441\u0435\u0440",color:"#fff"},{value:2,label:"\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u044b\u0439 \u0438\u043d\u0436\u0435\u043d\u0435\u0440",name:"\u0421\u0438\u0441\u0442\u0435\u043c\u043d\u044b\u0439 \u0438\u043d\u0436\u0435\u043d\u0435\u0440",color:"#fff"},{value:3,label:"RF-\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440",name:"RF-\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440",color:"#fff"},{value:4,label:"Backline",name:"Backline",color:"#fff"},{value:5,label:"Roadie",name:"Roadie",color:"#fff"},{value:6,label:"\u0422\u0435\u0445\u043d\u0438\u043a \u043f\u043e \u0437\u0432\u0443\u043a\u0443",name:"\u0422\u0435\u0445\u043d\u0438\u043a \u043f\u043e \u0437\u0432\u0443\u043a\u0443",color:"#fff"},{value:7,label:"\u041c\u0438\u043a\u0440\u043e\u0444\u043e\u043d\u043d\u044b\u0439 \u0442\u0435\u0445\u043d\u0438\u043a",name:"\u041c\u0438\u043a\u0440\u043e\u0444\u043e\u043d\u043d\u044b\u0439 \u0442\u0435\u0445\u043d\u0438\u043a",color:"#fff"},{value:8,label:"\u0425\u0443\u0434\u043e\u0436\u043d\u0438\u043a \u043f\u043e \u0441\u0432\u0435\u0442\u0443",name:"\u0425\u0443\u0434\u043e\u0436\u043d\u0438\u043a \u043f\u043e \u0441\u0432\u0435\u0442\u0443",color:""},{value:9,label:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 \u0441\u0432\u0435\u0442\u043e\u0432\u043e\u0439 \u043f\u0443\u0448\u043a\u0438",name:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 \u0441\u0432\u0435\u0442\u043e\u0432\u043e\u0439 \u043f\u0443\u0448\u043a\u0438",color:""},{value:10,label:"\u0413\u0430\u0444\u0435\u0440",name:"\u0413\u0430\u0444\u0435\u0440"},{value:11,label:"\u0422\u0435\u0445\u043d\u0438\u043a \u043f\u043e \u0441\u0432\u0435\u0442\u0443",name:"\u0422\u0435\u0445\u043d\u0438\u043a \u043f\u043e \u0441\u0432\u0435\u0442\u0443",color:""},{value:12,label:"\u042d\u043b\u0435\u043a\u0442\u0440\u0438\u043a",name:"\u042d\u043b\u0435\u043a\u0442\u0440\u0438\u043a",color:""},{value:13,label:"\u0418\u043d\u0436\u0435\u043d\u0435\u0440 VMix",name:"\u0418\u043d\u0436\u0435\u043d\u0435\u0440 VMix",color:"#fff"},{value:14,label:"\u0418\u043d\u0436\u0435\u043d\u0435\u0440 Resolume",name:"\u0418\u043d\u0436\u0435\u043d\u0435\u0440 Resolume",color:"#fff"},{value:15,label:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440",name:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440",color:"#fff"},{value:16,label:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 Zoom-\u043a\u043e\u043d\u0444\u0435\u0440\u0435\u043d\u0446\u0438\u0439",name:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 Zoom-\u043a\u043e\u043d\u0444\u0435\u0440\u0435\u043d\u0446\u0438\u0439",color:"#fff"},{value:17,label:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 Action-\u0441\u044a\u0435\u043c\u043a\u0438",name:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 Action-\u0441\u044a\u0435\u043c\u043a\u0438",color:"#fff"},{value:18,label:"\u0420\u0435\u0436\u0438\u0441\u0441\u0435\u0440 \u044d\u0444\u0438\u0440\u043e\u0432",name:"\u0420\u0435\u0436\u0438\u0441\u0441\u0435\u0440 \u044d\u0444\u0438\u0440\u043e\u0432",color:"#fff"},{value:19,label:"\u0422\u0435\u0445\u043d\u0438\u043a \u043f\u043e \u043c\u043e\u043d\u0442\u0430\u0436\u0443 \u044d\u043a\u0440\u0430\u043d\u043e\u0432",name:"\u0422\u0435\u0445\u043d\u0438\u043a \u043f\u043e \u043c\u043e\u043d\u0442\u0430\u0436\u0443 \u044d\u043a\u0440\u0430\u043d\u043e\u0432",color:"#fff"},{value:20,label:"\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",name:"\u0414\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u0430\u043b\u044c\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",color:""},{value:21,label:"\u0420\u0435\u043f\u043e\u0440\u0442\u0430\u0436\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",name:"\u0420\u0435\u043f\u043e\u0440\u0442\u0430\u0436\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",color:""},{value:22,label:"\u0421\u0432\u0430\u0434\u0435\u0431\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",name:"\u0421\u0432\u0430\u0434\u0435\u0431\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",color:""},{value:23,label:"\u041f\u043e\u0440\u0442\u0440\u0435\u0442\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",name:"\u041f\u043e\u0440\u0442\u0440\u0435\u0442\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",color:""},{value:24,label:"\u041f\u0440\u0435\u0434\u043c\u0435\u0442\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",name:"\u041f\u0440\u0435\u0434\u043c\u0435\u0442\u043d\u0430\u044f \u0441\u044a\u0435\u043c\u043a\u0430",color:""},{value:25,label:"\u0420\u0435\u0436\u0438\u0441\u0441\u0435\u0440",color:"#fff"},{value:26,label:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440-\u043f\u043e\u0441\u0442\u0430\u043d\u043e\u0432\u0449\u0438\u043a",color:"#fff"},{value:27,label:"\u0421\u0442\u0435\u0434\u0438\u043a\u0430\u043c",color:"#fff"},{value:28,label:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 \u043a\u0440\u0430\u043d\u0430",color:"#fff"},{value:29,label:"\u041e\u043f\u0435\u0440\u0430\u0442\u043e\u0440 Action-\u0441\u044a\u0435\u043c\u043a\u0438",color:"#fff"},{value:30,label:"\u0413\u0430\u0444\u0435\u0440",color:"#fff"},{value:31,label:"\u0410\u043a\u0442\u0435\u0440",color:"#fff"},{value:32,label:"\u0413\u0440\u0438\u043c\u0435\u0440",color:"#fff"},{value:33,label:"\u041a\u043e\u0441\u0442\u044e\u043c\u0435\u0440",color:"#fff"},{value:34,label:"\u041c\u043e\u0434\u0435\u043b\u044c",color:""},{value:35,label:"\u041f\u0440\u043e\u043c\u043e\u0443\u0442\u0435\u0440",color:""},{value:36,label:"\u0412\u0438\u0437\u0430\u0436\u0438\u0441\u0442",color:""},{value:37,label:"\u041a\u043e\u0441\u0442\u044e\u043c\u0435\u0440",color:""},{value:38,label:"\u0411\u0430\u043d\u043a\u0435\u0442\u043d\u044b\u0439 \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440",color:"#fff"},{value:39,label:"\u041f\u043e\u0432\u0430\u0440",color:"#fff"},{value:40,label:"\u0425\u043e\u0441\u0442\u0435\u0441",color:"#fff"},{value:41,label:"\u0411\u0430\u0440\u043c\u0435\u043d",color:"#fff"},{value:42,label:"\u041e\u0444\u0438\u0446\u0438\u0430\u043d\u0442",color:"#fff"},{value:43,label:"\u041f\u043e\u043c\u043e\u0449\u043d\u0438\u043a / \u0413\u0440\u0443\u0437\u0447\u0438\u043a",color:""},{value:44,label:"\u0412\u0435\u0440\u0445\u043d\u0438\u0439 \u0420\u0438\u0433\u0433\u0435\u0440",color:"#fff"},{value:45,label:"\u041d\u0438\u0436\u043d\u0438\u0439 \u0420\u0438\u0433\u0433\u0435\u0440",color:"#fff"},{value:46,label:"\u041c\u043e\u043d\u0442\u0430\u0436 \u043a\u043e\u043d\u0441\u0442\u0440\u0443\u043a\u0442\u0438\u0432\u0430 \u0441\u0446\u0435\u043d\u044b",color:"#fff"},{value:47,label:"\u041c\u043e\u043d\u0442\u0430\u0436 \u0448\u0430\u0442\u0440\u043e\u0432",color:"#fff"},{value:48,label:"\u0414\u0435\u043a\u043e\u0440\u0430\u0442\u043e\u0440",color:""},{value:49,label:"\u0424\u043b\u043e\u0440\u0438\u0441\u0442 \u043e\u0444\u043e\u0440\u043c\u0438\u0442\u0435\u043b\u044c",color:""},{value:50,label:"\u041c\u043e\u043d\u0442\u0430\u0436 \u043c\u0435\u0431\u0435\u043b\u0438",color:""},{value:51,label:"\u041c\u043e\u043d\u0442\u0430\u0436 \u0432\u044b\u0441\u0442\u0430\u0432\u043e\u0447\u043d\u044b\u0445 \u0441\u0442\u0435\u043d\u0434\u043e\u0432",color:""},{value:52,label:"\u041d\u0430\u043f\u043e\u043b\u044c\u043d\u044b\u0435 \u043f\u043e\u043a\u0440\u044b\u0442\u0438\u044f",color:""},{value:53,label:"\u0421 \u0433\u0438\u0434\u0440\u043e\u043b\u0438\u0444\u0442\u043e\u043c",color:""},{value:54,label:"\u0411\u0435\u0437 \u0433\u0438\u0434\u0440\u043e\u043b\u0438\u0444\u0442\u0430",color:""},{value:55,label:"C \u043b\u0438\u0447\u043d\u044b\u043c \u0422\u0421 [B/C]",color:""},{value:56,label:"\u0411\u0435\u0437 \u043b\u0438\u0447\u043d\u043e\u0433\u043e \u0422\u0421 [B/C]",color:""},{value:57,label:"\u041c\u043e\u0442\u043e\u043a\u0443\u0440\u044c\u0435\u0440",color:""},{value:58,label:"\u041a\u0430\u0432\u0435\u0440-\u0431\u0435\u043d\u0434",color:"#fff"},{value:59,label:"\u0422\u0430\u043d\u0446\u0435\u0432\u0430\u043b\u044c\u043d\u044b\u0439 \u043a\u043e\u043b\u043b\u0435\u043a\u0442\u0438\u0432",color:"#fff"},{value:60,label:"\u0414\u0438\u0434\u0436\u0435\u0439",color:"#fff"},{value:61,label:"\u0412\u0435\u0434\u0443\u0449\u0438\u0439",color:"#fff"},{value:62,label:"\u041f\u0435\u0432\u0435\u0446 / \u043f\u0435\u0432\u0438\u0446\u0430",color:"#fff"},{value:63,label:"\u0410\u0440\u0442\u0438\u0441\u0442 \u043e\u0440\u0438\u0433\u0438\u043d\u0430\u043b\u044c\u043d\u043e\u0433\u043e \u0436\u0430\u043d\u0440\u0430",color:"#fff"},{value:64,label:"\u0424\u0430\u0438\u0440-\u0448\u043e\u0443",color:"#fff"},{value:65,label:"Go-Go",color:"#fff"},{value:66,label:"\u041a\u0432\u0435\u0441\u0442",color:""},{value:67,label:"\u041a\u0432\u0438\u0437",color:""},{value:68,label:"\u0410\u043d\u0438\u043c\u0430\u0442\u043e\u0440",color:""},{value:69,label:"\u041f\u043d\u0435\u0432\u043c\u043e\u043a\u043e\u0441\u0442\u044e\u043c / \u0440\u043e\u0441\u0442\u043e\u0432\u0430\u044f \u043a\u0443\u043a\u043b\u0430",color:""},{value:70,label:"\u041d\u0430\u0441\u0442\u043e\u043b\u044c\u043d\u044b\u0435 \u0438\u0433\u0440\u044b / \u0438\u0433\u0440\u043e\u0432\u044b\u0435 \u0430\u0432\u0442\u043e\u043c\u0430\u0442\u044b",color:""},{value:71,label:"\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u0438 / \u0430\u0442\u0442\u0440\u0430\u043a\u0446\u0438\u043e\u043d\u044b",color:""},{value:72,label:"\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u0435 \u043f\u043e\u0434 \u043a\u043b\u044e\u0447",color:"#fff"},{value:73,label:"\u041e\u0442\u0434\u0435\u043b\u044c\u043d\u044b\u0435 \u0442\u0435\u0445\u043d\u0438\u0447\u0435\u0441\u043a\u0438\u0435 \u0437\u0430\u0434\u0430\u0447\u0438",color:"#fff"},{value:74,label:"Event-\u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440",color:"#fff"},{value:75,label:"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440 \xabU.L.E.Y\xbb",color:"#fff"}]},49389:function(e,l){l.Z=[{value:1,label:"\u0421\u0442\u0430\u043d\u0434\u0430\u0440\u0442",color:"#1E90FF"},{value:2,label:"\u0417\u0430 \u041c\u041a\u0410\u0414",color:"#1E90FF"},{value:3,label:"\u0423\u043b\u0438\u0446\u0430",color:"#1E90FF"},{value:4,label:"\u041d\u043e\u0447\u044c",color:"#1E90FF"},{value:5,label:"\u041a\u043e\u0440\u043f\u043e\u0440\u0430\u0442\u0438\u0432\u043d\u043e\u0435 \u0442\u0430\u043a\u0441\u0438",color:"#CD5C5C"},{value:6,label:"\u0414\u043e\u043f. \u0440\u0430\u0441\u0445\u043e\u0434\u044b",color:"#CD5C5C"},{value:7,label:"\u041d\u0435\u0441\u0442\u0430\u043d\u0434\u0430\u0440\u0442\u043d\u044b\u0439 \u043f\u0440\u043e\u0435\u043a\u0442",color:"#CD5C5C"},{value:8,label:"\u041e\u0444\u0438\u0441",color:"#CD5C5C"},{value:9,label:"\u0413\u0430\u0441\u0442\u0440\u043e\u043b\u044c\u043d\u044b\u0439 \u0442\u0443\u0440",color:"#1E90FF"},{value:10,label:"\u041f\u0440\u043e\u0435\u043a\u0442 90",color:"#1E90FF"},{value:11,label:"\u041f\u0440\u043e\u0435\u043a\u0442 60",color:"#1E90FF"},{value:12,label:"\u041f\u0440\u043e\u0435\u043a\u0442 30",color:"#1E90FF"}]},18578:function(e,l){l.Z=[{value:1,label:"\u041d\u043e\u0432\u044b\u0439",color:"#1E90FF",divide:!1},{value:2,label:"\u0412 \u043e\u0431\u0440\u0430\u0431\u043e\u0442\u043a\u0435",color:"#9400D3",divide:!1},{value:3,label:"\u0413\u043e\u0442\u043e\u0432",color:"#1E90FF",divide:!1},{value:4,label:"\u0412 \u044d\u0444\u0438\u0440\u0435",color:"#00FF00",divide:!1},{value:5,label:"\u0417\u0430\u0432\u0435\u0440\u0448\u0435\u043d",color:"#FFD700",divide:!0},{value:6,label:"\u041e\u0442\u043c\u0435\u043d\u0435\u043d",color:"red",divide:!1},{value:7,label:"\u0417\u0430\u043c\u043e\u0440\u043e\u0436\u0435\u043d",color:"red",divide:!0},{value:8,label:"\u0420\u0430\u0441\u0441\u0447\u0438\u0442\u0430\u043d",color:"#1E90FF",divide:!1},{value:9,label:"Fuck",color:"#FF8C00",divide:!1}]},37969:function(e,l){l.Z=[{label:"\u0421\u0431\u043e\u0440\u044b",name:"\u0421\u0431\u043e\u0440\u044b",value:"1",color:"#1E90FF"},{label:"\u041f\u043e\u0433\u0440\u0443\u0437\u043a\u0430",name:"\u041f\u043e\u0433\u0440\u0443\u0437\u043a\u0430",value:"2",color:"#1E90FF"},{label:"\u041c\u043e\u043d\u0442\u0430\u0436",name:"\u041c\u043e\u043d\u0442\u0430\u0436",value:"3",color:"#1E90FF"},{label:"\u0414\u0435\u043c\u043e\u043d\u0442\u0430\u0436",name:"\u0414\u0435\u043c\u043e\u043d\u0442\u0430\u0436",value:"4",color:"#1E90FF"},{label:"\u0414\u0435\u0436\u0443\u0440\u0441\u0442\u0432\u043e",name:"\u0414\u0435\u0436\u0443\u0440\u0441\u0442\u0432\u043e",value:"5",color:"red"},{label:"\u0421\u044a\u0435\u043c\u043a\u0438",name:"\u0421\u044a\u0435\u043c\u043a\u0438",value:"6",color:"red"},{label:"\u0420\u0435\u043f\u0435\u0442\u0438\u0446\u0438\u044f",name:"\u0420\u0435\u043f\u0435\u0442\u0438\u0446\u0438\u044f",value:"7",color:"red"},{label:"\u0422\u0435\u0441\u0442\u044b / \u0427\u0435\u043a\u0438",name:"\u0422\u0435\u0441\u0442\u044b / \u0427\u0435\u043a\u0438",value:"8",color:"red"},{label:"\u042d\u0444\u0438\u0440",name:"\u042d\u0444\u0438\u0440",value:"9",color:"#1E90FF"},{label:"\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u0435",name:"\u041c\u0435\u0440\u043e\u043f\u0440\u0438\u044f\u0442\u0438\u0435",value:"10",color:"#1E90FF"},{label:"\u0421\u043e\u043f\u0440\u043e\u0432\u043e\u0436\u0434\u0435\u043d\u0438\u0435",name:"\u0421\u043e\u043f\u0440\u043e\u0432\u043e\u0436\u0434\u0435\u043d\u0438\u0435",value:"11",color:"#1E90FF"},{label:"\u041f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b",name:"\u041f\u043e\u043b\u043d\u044b\u0439 \u0446\u0438\u043a\u043b",value:"12",color:"#1E90FF"},{label:"\u041f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430",name:"\u041f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u0430\u044f \u0440\u0430\u0431\u043e\u0442\u0430",value:"13",color:"red"},{label:"\u0420\u0430\u0431\u043e\u0442\u044b \u043d\u0430 \u0441\u043a\u043b\u0430\u0434\u0435",name:"\u0420\u0430\u0431\u043e\u0442\u044b \u043d\u0430 \u0441\u043a\u043b\u0430\u0434\u0435",value:"14",color:"red"},{label:"\u0412\u043e\u0434\u0438\u0442\u0435\u043b\u044c \u0422\u0421",name:"\u0412\u043e\u0434\u0438\u0442\u0435\u043b\u044c \u0422\u0421",value:"15",color:"red"},{label:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430",name:"\u0414\u043e\u0441\u0442\u0430\u0432\u043a\u0430",value:"16",color:"red"},{label:"\u0412\u044b\u0435\u0437\u0434 / \u041f\u0435\u0440\u0435\u043b\u0435\u0442",name:"\u0412\u044b\u0435\u0437\u0434 / \u041f\u0435\u0440\u0435\u043b\u0435\u0442",value:"17",color:"#1E90FF"},{label:"\u0417\u0430\u043f\u0430\u0441\u043d\u043e\u0439 \u0441\u043e\u0441\u0442\u0430\u0432",name:"\u0417\u0430\u043f\u0430\u0441\u043d\u043e\u0439 \u0441\u043e\u0441\u0442\u0430\u0432",value:"18",color:"#1E90FF"},{label:"\u0424\u0430\u043b\u044c\u0448\u0441\u0442\u0430\u0440\u0442",name:"\u0424\u0430\u043b\u044c\u0448\u0441\u0442\u0430\u0440\u0442",value:"19",color:"red"},{label:"\u041e\u0442\u043c\u0435\u043d\u0430",name:"\u041e\u0442\u043c\u0435\u043d\u0430",value:"20",color:"red"},{label:"\u041e\u0444\u0438\u0441",name:"\u041e\u0444\u0438\u0441",value:"21",color:"purple"}]},69155:function(e,l,o){o.d(l,{B:function(){return i},ME:function(){return c},NV:function(){return u},fE:function(){return s},mW:function(){return t}});var a=o(74165),n=o(15861),r=o(69018),t=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){var l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.y_.get("api/projectnew/get");case 3:return l=e.sent,e.abrupt("return",l.data);case 7:e.prev=7,e.t0=e.catch(0),console.log("error while calling getSpecialist api",e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),c=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(){var l;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.y_.get("api/projectnew/delete/get");case 3:return l=e.sent,e.abrupt("return",l.data);case 7:e.prev=7,e.t0=e.catch(0),console.log("error while calling getProjectsDel api",e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(){return e.apply(this,arguments)}}(),u=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(l,o){return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.y_.patch("api/projectnew/update/".concat(o),l);case 3:e.next=8;break;case 5:e.prev=5,e.t0=e.catch(0),console.log("error while calling editProject api",e.t0.message);case 8:case"end":return e.stop()}}),e,null,[[0,5]])})));return function(l,o){return e.apply(this,arguments)}}(),i=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(l){var o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.y_.post("api/projectnew/add",l);case 3:return o=e.sent,e.abrupt("return",o.data);case 7:e.prev=7,e.t0=e.catch(0),console.log("error while calling addProject api",e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(l){return e.apply(this,arguments)}}(),s=function(){var e=(0,n.Z)((0,a.Z)().mark((function e(l){var o;return(0,a.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,e.next=3,r.y_.get("api/projectnew/get/".concat(l));case 3:return o=e.sent,e.abrupt("return",o.data);case 7:e.prev=7,e.t0=e.catch(0),console.log("error while calling getProjectId api",e.t0.message);case 10:case"end":return e.stop()}}),e,null,[[0,7]])})));return function(l){return e.apply(this,arguments)}}()},76194:function(e,l,o){e.exports=o.p+"static/media/change_sloy.72096d68a8a8d8a2c559.png"}}]);
//# sourceMappingURL=5860.f09de7d9.chunk.js.map