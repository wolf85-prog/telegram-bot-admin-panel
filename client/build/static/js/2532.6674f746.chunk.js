"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[2532],{33314:function(e,a,s){s.d(a,{Z:function(){return g}});var t=s(93433),n=s(29439),c=s(72791),i=s(57689),r=s(75421),l=s(36223),o=s(74165),d=s(15861),h=s(11087),u=s(48463),m=s(11988),_=s(64941),p=s(27839),x=s(78983),j=(s(69835),s(80184)),f=function(e){var a=e.contact,s=(0,c.useContext)(_.w).setPerson,n=(0,m.Z)(),i=n.setUserAsUnread,r=n.usersOnline,x=n.setCountMessage,f=(r.find((function(e){return e.userId==a.chatId})),function(){var e=(0,d.Z)((0,o.Z)().mark((function e(){return(0,o.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:s({name:a.name,id:a.chatId,avatar:a.avatar}),i(a.chatId),x(0);case 3:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}()),v=function(){var e,s=Object.keys(a.messages);e=0!==s.length?s[s.length-1]:"2000-01-01";var n=[];if("{}"!==JSON.stringify(a.messages)&&(n=(0,t.Z)(a.messages[e])),n.length)return n.pop();return""}();return(0,j.jsxs)(h.rU,{className:"sidebar-contact",onClick:function(){return f()},children:[(0,j.jsx)("div",{className:"sidebar-contact__avatar-wrapper",children:a.avatar?(0,j.jsx)("img",{src:"".concat("https://proj.uley.team:5000/").concat(a.avatar),onError:function(e){e.target.src=p},alt:"",className:"avatar-adm"}):(0,j.jsx)("img",{src:p,alt:"",className:"avatar-adm"})}),(0,j.jsxs)("div",{className:"sidebar-contact__content",children:[(0,j.jsxs)("div",{className:"sidebar-contact__top-content",children:[(0,j.jsxs)("h2",{className:"sidebar-contact__name",children:[" ",a.name]}),(0,j.jsx)("span",{className:"sidebar-contact__time",children:""===v?"":(0,u.Z)(v.time)})]}),(0,j.jsxs)("div",{className:"sidebar-contact__bottom-content",children:[(0,j.jsxs)("p",{className:"sidebar-contact__message-wrapper",children:[v.status&&(0,j.jsx)(l.Z,{id:"sent"===(null===v||void 0===v?void 0:v.status)?"singleTick":"doubleTick","aria-label":null===v||void 0===v?void 0:v.status,className:"sidebar-contact__message-icon ".concat("read"===(null===v||void 0===v?void 0:v.status)?"sidebar-contact__message-icon--blue":"")}),(0,j.jsx)("span",{className:"sidebar-contact__message ".concat(a.unread?"sidebar-contact__message--unread":""),children:a.typing?(0,j.jsx)("i",{children:" \u043f\u0435\u0447\u0430\u0442\u0430\u0435\u0442..."}):null===v||void 0===v?void 0:v.content})]}),(0,j.jsxs)("div",{className:"sidebar-contact__icons",children:[a.pinned&&(0,j.jsx)(l.Z,{id:"pinned",className:"sidebar-contact__icon"}),!!a.unread&&(0,j.jsx)("span",{className:"sidebar-contact__unread",children:a.unread}),(0,j.jsx)("button",{"aria-label":"sidebar-contact__btn",children:(0,j.jsx)(l.Z,{id:"downArrow",className:"sidebar-contact__icon sidebar-contact__icon--dropdown"})})]})]})]})]})},v=s(30549),g=(s(94810),function(){var e=(0,m.Z)(),a=e.users,s=(e.setUsers,(0,c.useState)([])),o=(0,n.Z)(s,2),d=o[0],h=o[1],u=(0,c.useState)(""),_=(0,n.Z)(u,2),p=_[0],g=_[1],b=(0,c.useState)(!0),N=(0,n.Z)(b,2),Z=N[0],w=N[1],y=(0,c.useState)([]),k=(0,n.Z)(y,2),S=(k[0],k[1],(0,i.s0)());(0,c.useEffect)((function(){var e=(0,t.Z)(a).sort((function(e,a){var s=new Date(e.date);return new Date(a.date)-s}));h(e),a.length>0&&w(!1)}),[a]),(0,c.useEffect)((function(){var e=a.filter((function(e){var a;return null===(a=e.name+e.chatId)||void 0===a?void 0:a.replace(/[\u0435\u0451]/g,"(\u0435|\u0451)").toLowerCase().includes(p.replace(/[\u0435\u0451]/g,"(\u0435|\u0451)").toLowerCase())}));h(e)}),[p]);return(0,j.jsxs)("aside",{className:"sidebarB",children:[(0,j.jsxs)("header",{className:"headerB",children:[(0,j.jsx)("div",{className:"sidebar__avatar-wrapper",children:(0,j.jsx)("img",{src:r,alt:"U.L.E.Y",className:"avatar-adm"})}),(0,j.jsx)("div",{children:"\u041c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u044b"}),(0,j.jsx)("div",{className:"sidebar__actions",children:(0,j.jsx)(v.Z,{className:"sidebar__action",ariaLabel:"Menu",iconId:"menu",iconClassName:"sidebar__action-icon",onSelected:function(e){switch(e){case 0:console.log("\u041f\u0440\u043e\u0444\u0438\u043b\u044c");break;case 1:console.log("1");break;case 4:S("/dashboard");break;default:console.log("\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435")}},options:["\u041f\u0440\u043e\u0444\u0438\u043b\u044c"]})})]}),(0,j.jsxs)("div",{className:"search-wrapper",children:[(0,j.jsxs)("div",{className:"search-icons",children:[(0,j.jsx)(l.Z,{id:"search",className:"search-icon"}),(0,j.jsx)("button",{className:"search__back-btn",children:(0,j.jsx)(l.Z,{id:"back"})})]}),(0,j.jsx)("input",{className:"search",placeholder:"\u041f\u043e\u0438\u0441\u043a \u043c\u0435\u043d\u0435\u0434\u0436\u0435\u0440\u0430",onChange:function(e){return g(e.target.value)}})]}),(0,j.jsx)("div",{className:"sidebar__contacts",children:Z?(0,j.jsx)(x.LQ,{style:{margin:"50%"}}):d.map((function(e){return"1775583141"!==e.chatId&&(0,j.jsx)(j.Fragment,{children:(0,j.jsx)(f,{contact:e})})}))})]})})},95017:function(e,a,s){s.d(a,{Z:function(){return D}});var t=s(74165),n=s(15861),c=s(29439),i=s(72791),r=s(36223),l=s(80184),o=[{icon:"recent",label:"Recent emojis",active:!0},{icon:"emojiPeople",label:"People emojis",active:!1},{icon:"emojiNature",label:"Nature emojis",active:!1},{icon:"emojiFood",label:"Food emojis",active:!1},{icon:"emojiActivity",label:"Activity emojis",active:!1},{icon:"emojiTravel",label:"Travel emojis",active:!1},{icon:"emojiObjects",label:"Object emojis",active:!1},{icon:"emojiSymbols",label:"Symbol emojis",active:!1},{icon:"emojiFlags",label:"Flag emojis",active:!1}],d=function(e){var a=e.showEmojis;e.newMessage,e.setNewMessage;return(0,l.jsxs)("div",{className:"emojis__wrapper ".concat(a?"emojis__wrapper--active":""),children:[(0,l.jsx)("div",{className:"emojis__tabs",children:o.map((function(e){return(0,l.jsx)("div",{className:"emojis__tab ".concat(e.active?"emojis__tab--active":""),children:(0,l.jsx)("button",{"aria-label":e.label,children:(0,l.jsx)(r.Z,{id:e.icon,className:"emojis__tab-icon"})},e.icon)},e.label)}))}),(0,l.jsxs)("div",{className:"emojis__content",children:[(0,l.jsx)("input",{className:"emojis__search",placeholder:"Search Emoji"}),(0,l.jsxs)("h4",{className:"emojis__label",children:[" Smileys ","&"," People "]}),(0,l.jsx)("div",{className:"emojis__grid",children:new Array(6).fill(null).map((function(e,a){return new Array(11).fill(null).map((function(e,s){return(0,l.jsx)("div",{role:"img","aria-label":"emoji",className:"emoji emojis__emoji",style:{backgroundPositionX:-3-44.2*s,backgroundPositionY:-6-52*a}},"".concat(a,"-").concat(s))}))}))}),(0,l.jsxs)("h4",{className:"emojis__label",children:[" Animals ","&"," Nature "]}),(0,l.jsx)("div",{className:"emojis__grid",children:new Array(6).fill(null).map((function(e,a){return new Array(11).fill(null).map((function(e,s){return(0,l.jsx)("div",{role:"img","aria-label":"emoji",className:"emoji emojis__emoji",style:{backgroundPositionX:-3-44.2*s,backgroundPositionY:-6-52*a}},"".concat(a,"-").concat(s))}))}))})]})]})},h=function(e,a){(0,i.useEffect)((function(){if(e){e.style.height="0px";var a=e.scrollHeight-40;e.style.height=a+"px"}}),[e,a])},u=[{icon:"attachDocument",label:"Choose document",click:"doc"},{icon:"attachImage",label:"Choose image",click:"image"}],m=function(e){var a=e.showAttach,s=e.setShowAttach,t=e.showEmojis,n=e.setShowEmojis,c=e.mess,o=e.setMess,d=e.submitNewMessage,m=e.onFileChange,_=(0,i.useRef)(null);h(_.current,c);return(0,l.jsxs)("div",{className:"chat__input-wrapper",children:[t&&(0,l.jsx)("button",{"aria-label":"Close emojis",onClick:function(){return n(!1)},children:(0,l.jsx)(r.Z,{id:"cancel",className:"chat__input-icon"})}),(0,l.jsx)("button",{"aria-label":"Emojis",onClick:function(){return n(!0)},children:(0,l.jsx)(r.Z,{id:"smiley",className:"chat__input-icon ".concat(t?"chat__input-icon--highlight":"")})}),t&&(0,l.jsxs)(l.Fragment,{children:[(0,l.jsx)("button",{"aria-label":"Choose GIF",children:(0,l.jsx)(r.Z,{id:"gif",className:"chat__input-icon"})}),(0,l.jsx)("button",{"aria-label":"Choose sticker",children:(0,l.jsx)(r.Z,{id:"sticker",className:"chat__input-icon"})})]}),(0,l.jsxs)("div",{className:"pos-rel",children:[(0,l.jsx)("button",{"aria-label":"Attach",onClick:function(){return s(!a)},children:(0,l.jsx)(r.Z,{id:"attach",className:"chat__input-icon ".concat(a?"chat__input-icon--pressed":"")})}),(0,l.jsx)("div",{className:"chat__attach ".concat(a?"chat__attach--active":""),children:u.map((function(e){return(0,l.jsxs)("button",{className:"chat__attach-btn","aria-label":e.label,onClick:function(){return console.log(e.click)},children:[(0,l.jsx)("label",{htmlFor:"fileInput",children:(0,l.jsx)(r.Z,{id:e.icon,className:"chat__attach-icon"})}),(0,l.jsx)("input",{type:"file",id:"fileInput",name:"photo",style:{display:"none"},onChange:function(e){return m(e)}})]},e.label)}))})]}),(0,l.jsx)("textarea",{className:"chat__input",placeholder:"\u0412\u0432\u0435\u0434\u0438\u0442\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435",value:c,onChange:function(e){console.log(e.target.value),o(e.target.value)},ref:_,rows:1}),(0,l.jsx)("button",{"aria-label":"Send message",onClick:d,children:(0,l.jsx)(r.Z,{id:"send",className:"chat__input-icon"})})]})},_=s(30549),p=s(27839),x=s(78983),j=function(e){var a=e.user,s=e.openProfileSidebar,t=e.openSearchSidebar,n=e.clearFile,c=(e.setClearFile,e.clickClearFile);return(0,l.jsxs)("header",{className:"headerB chat__header",children:[(0,l.jsx)("div",{className:"chat__avatar-wrapper",onClick:s,children:a.avatar?(0,l.jsx)("img",{src:"".concat("https://proj.uley.team:5000/").concat(a.avatar),alt:null===a||void 0===a?void 0:a.name,className:"avatar-adm"}):(0,l.jsx)("img",{src:p,alt:null===a||void 0===a?void 0:a.name,className:"avatar-adm"})}),(0,l.jsxs)("div",{className:"chat__contact-wrapper",onClick:s,children:[(0,l.jsxs)("h2",{className:"chat__contact-name",children:[" ",null===a||void 0===a?void 0:a.name]}),(0,l.jsx)("p",{className:"chat__contact-desc",children:a.typing?"\u043f\u0435\u0447\u0430\u0442\u0430\u0435\u0442...":"\u0434\u0430\u043d\u043d\u044b\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0430"})]}),(0,l.jsxs)("div",{className:"chat__actions",children:[n?(0,l.jsx)(x.u5,{color:"danger",onClick:c,children:"\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c"}):"",(0,l.jsx)("button",{className:"chat__action","aria-label":"Search",onClick:t,children:(0,l.jsx)(r.Z,{id:"search",className:"chat__action-icon chat__action-icon--search"})}),(0,l.jsx)(_.Z,{className:"chat__action",ariaLabel:"Menu",iconId:"menu",iconClassName:"chat__action-icon",onSelected:function(e){switch(e){case 0:s();break;case 1:console.log("1");break;default:console.log("\u0412 \u0440\u0430\u0437\u0440\u0430\u0431\u043e\u0442\u043a\u0435")}},options:["\u0414\u0430\u043d\u043d\u044b\u0435 \u043e \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435","\u041e\u0447\u0438\u0441\u0442\u0438\u0442\u044c \u043f\u0435\u0440\u0435\u043f\u0438\u0441\u043a\u0443","\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0447\u0430\u0442"]})]})]})},f=function(e){var a=e.active,s=e.closeSidebar,t=e.heading,n=e.children;return(0,l.jsxs)("aside",{className:"chat-sidebar ".concat(a?"chat-sidebar--active":""),children:[(0,l.jsxs)("header",{className:"header chat-sidebar__header",children:[(0,l.jsx)("button",{onClick:s,children:(0,l.jsx)(r.Z,{id:"cancel",className:"chat-sidebar__header-icon"})}),(0,l.jsxs)("h2",{className:"chat-sidebar__heading",children:[" ",t]})]}),(0,l.jsx)("div",{className:"chat-sidebar__content",children:n})]})},v=function(){return(0,l.jsxs)(l.Fragment,{children:[(0,l.jsxs)("div",{className:"search-wrapper",children:[(0,l.jsxs)("div",{className:"search-icons",children:[(0,l.jsx)(r.Z,{id:"search",className:"search-icon"}),(0,l.jsx)("button",{className:"search__back-btn",children:(0,l.jsx)(r.Z,{id:"back"})})]}),(0,l.jsx)("input",{className:"search",placeholder:"\u041f\u043e\u0438\u0441\u043a..."})]}),(0,l.jsx)("div",{className:"chat-sidebar__search-results",children:(0,l.jsx)("p",{children:" \u041f\u043e\u0438\u0441\u043a \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0439 \u0432 \u0447\u0430\u0442\u0435"})})]})},g=s(50882),b=s(1413),N=function(e){var a=e.inputProps;return(0,l.jsxs)("div",{className:"checkbox",children:[(0,l.jsx)("input",(0,b.Z)((0,b.Z)({type:"checkbox",id:"checkbox"},a),{},{className:"checkbox__input"})),(0,l.jsx)("label",{htmlFor:"checkbox",className:"checkbox__label",children:(0,l.jsx)(r.Z,{id:"check",className:"checkbox__icon"})})]})},Z=s(94810),w=s(11988),y=s(64941),k=function(e){var a=e.user,s=(0,i.useState)(""),o=(0,c.Z)(s,2),d=o[0],h=o[1],u=(0,i.useState)(!1),m=(0,c.Z)(u,2),_=m[0],x=m[1],j=(0,w.Z)(),f=j.addNewName,v=j.addNewAvatar,b=(0,i.useContext)(y.w).setPerson,k=(0,i.useState)(null),S=(0,c.Z)(k,2),C=S[0],I=S[1],A=(0,i.useState)(!1),F=(0,c.Z)(A,2),M=F[0],E=F[1],P=i.useRef(),T="https://proj.uley.team:5000/";(0,i.useEffect)((function(){I("".concat(T).concat(a.avatar))}),[a]);var D=function(){var e=(0,n.Z)((0,t.Z)().mark((function e(){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:b({name:a.name,id:a.chatId,avatar:a.avatar});case 1:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}(),L=function(){var e=(0,n.Z)((0,t.Z)().mark((function e(s){var n;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s.preventDefault(),n={username:d},e.next=4,(0,Z.mP)(n,a.chatId);case 4:f(a.chatId,d),D(),x(!1);case 7:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),O=function(){var e=(0,n.Z)((0,t.Z)().mark((function e(a){return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a.preventDefault(),I(a.target.files[0]),E(!0);case 3:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}(),R=i.useCallback((0,n.Z)((0,t.Z)().mark((function e(){var s,n,c;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.prev=0,(s=new FormData).append("photo",C),e.next=5,(0,Z.cT)(s);case 5:return n=e.sent,c={avatar:n.data.path.split(".team")[1]},e.next=9,(0,Z.MB)(c,a.chatId);case 9:v(a.chatId,n.data.path.split(".team")[1]),D(),E(!1),e.next=16;break;case 14:e.prev=14,e.t0=e.catch(0);case 16:case"end":return e.stop()}}),e,null,[[0,14]])}))),[C]);return(0,l.jsxs)("div",{className:"profile",children:[(0,l.jsxs)("div",{className:"profile__section profile__section--personal",children:[(0,l.jsxs)("div",{className:"profile__avatar-wrapper upload",children:[a.avatar?(0,l.jsx)("img",{src:"".concat(T).concat(a.avatar),alt:null===a||void 0===a?void 0:a.name,className:"avatar-adm"}):(0,l.jsx)("img",{src:p,alt:null===a||void 0===a?void 0:a.name,className:"avatar-adm"}),(0,l.jsxs)("div",{className:"round_adm",children:[(0,l.jsx)("input",{type:"file",name:"photo",onChange:O}),(0,l.jsx)("i",{className:"fa fa-camera",style:{color:"#fff"}})]})]}),M?(0,l.jsx)("button",{className:"btn_save",onClick:R,children:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c"}):"",(0,l.jsx)("p",{style:{color:"#d5d5d5"},children:a.chatId}),_?(0,l.jsxs)("form",{onSubmit:L,children:[(0,l.jsx)("input",{type:"text",value:d,onChange:function(e){e.preventDefault(),h(e.target.value)},ref:P,onFocus:function(){return P.current.select()},style:{borderBottom:"1px solid #0e892e",color:"#d5d5d5"}}),(0,l.jsx)("input",{type:"submit",value:"\u0421\u043e\u0445\u0440\u0430\u043d\u0438\u0442\u044c",style:{color:"#6a6a6a"}})]}):(0,l.jsxs)("h2",{className:"profile__name",children:[" ",a.name," "]}),_?"":(0,l.jsx)("span",{onClick:function(){h(a.name),x(!0)},style:{cursor:"pointer",color:"#6a6a6a"},children:"\u0420\u0435\u0434\u0430\u043a\u0442\u0438\u0440\u043e\u0432\u0430\u0442\u044c"})]}),(0,l.jsxs)("div",{className:"profile__section profile__section--media",children:[(0,l.jsxs)("div",{className:"sb profile__heading-wrapper",children:[(0,l.jsx)("h2",{className:"profile__heading",children:" \u041c\u0435\u0434\u0438\u0430, \u0441\u0441\u044b\u043b\u043a\u0438 \u0438 \u0434\u043e\u043a\u0443\u043c\u0435\u043d\u0442\u044b "}),(0,l.jsx)("button",{children:(0,l.jsx)(r.Z,{id:"rightArrow",className:"profile__heading-icon"})})]}),(0,l.jsxs)("div",{className:"profile__media-wrapper",children:[(0,l.jsx)("img",{src:g,alt:"media",className:"profile__media"}),(0,l.jsx)("img",{src:g,alt:"media",className:"profile__media"}),(0,l.jsx)("img",{src:g,alt:"media",className:"profile__media"})]})]}),(0,l.jsxs)("ul",{className:"profile__section profile__section--actions",children:[(0,l.jsxs)("li",{className:"profile__action",children:[(0,l.jsx)("p",{className:"profile__action-left",children:(0,l.jsx)("span",{className:"profile__action-text profile__action-text--top",children:"\u041e\u0442\u043a\u043b\u044e\u0447\u0438\u0442\u044c \u0443\u0432\u0435\u0434\u043e\u043c\u043b\u0435\u043d\u0438\u044f"})}),(0,l.jsx)("div",{className:"profile__action-right",children:(0,l.jsx)(N,{})})]}),(0,l.jsxs)("li",{className:"profile__action",children:[(0,l.jsx)("p",{className:"profile__action-left",children:(0,l.jsx)("span",{className:"profile__action-text profile__action-text--top",children:"\u041e\u0442\u043c\u0435\u0447\u0435\u043d\u043d\u044b\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f"})}),(0,l.jsx)("button",{className:"profile__action-right",children:(0,l.jsx)(r.Z,{id:"rightArrow",className:"profile__heading-icon"})})]}),(0,l.jsxs)("li",{className:"profile__action",children:[(0,l.jsxs)("p",{className:"profile__action-left",children:[(0,l.jsx)("span",{className:"profile__action-text profile__action-text--top",children:"\u0418\u0441\u0447\u0435\u0437\u0430\u044e\u0449\u0438\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f"}),(0,l.jsx)("span",{className:"profile__action-text profile__action-text--bottom",children:"Off"})]}),(0,l.jsxs)("button",{className:"profile__action-right",children:[(0,l.jsx)(r.Z,{id:"rightArrow",className:"profile__heading-icon"})," "]})]})]}),(0,l.jsxs)("div",{className:"profile__section profile__section--about",children:[(0,l.jsx)("div",{className:"sb profile__heading-wrapper",children:(0,l.jsx)("h2",{className:"profile__heading",children:" \u041e \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438 \u0438 \u043d\u043e\u043c\u0435\u0440 \u0442\u0435\u043b\u0435\u0444\u043e\u043d\u0430 "})}),(0,l.jsxs)("ul",{children:[(0,l.jsx)("li",{className:"profile__about-item",children:"\u041d\u0435\u0441\u043a\u043e\u043b\u044c\u043a\u043e \u0441\u043b\u043e\u0432 \u043e \u043a\u043e\u043c\u043f\u0430\u043d\u0438\u0438..."}),(0,l.jsx)("li",{className:"profile__about-item",children:"+7 123-12-12"})]})]}),(0,l.jsxs)("div",{className:"profile__section profile__section--danger",children:[(0,l.jsx)(r.Z,{id:"block",className:"profile__danger-icon"}),(0,l.jsx)("p",{className:"profile__danger-text",children:" \u0417\u0430\u0431\u043b\u043e\u043a\u0438\u0440\u043e\u0432\u0430\u0442\u044c "})]}),(0,l.jsxs)("div",{className:"profile__section profile__section--danger",children:[(0,l.jsx)(r.Z,{id:"thumbsDown",className:"profile__danger-icon"}),(0,l.jsx)("p",{className:"profile__danger-text",children:" \u0421\u043e\u043e\u0431\u0449\u0438\u0442\u044c \u043e \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0435 "})]}),(0,l.jsxs)("div",{className:"profile__section profile__section--danger",children:[(0,l.jsx)(r.Z,{id:"delete",className:"profile__danger-icon"}),(0,l.jsx)("p",{className:"profile__danger-text",children:" \u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0447\u0430\u0442 "})]})]})},S=s(76443),C=s(43506),I=s(48463),A=s(69018),F=s(29886),M=function(e){var a,s=e.lastMsgRef,o=e.messages,d=(0,i.useContext)(y.w).person,h=Object.keys(o),u="1775583141",m=(0,i.useRef)([]),_=(0,w.Z)().delMessageContext,p=i.forwardRef((function(e,a){var s=e.children,t=e.onClick;return(0,l.jsxs)("button",{"aria-label":"Message options",className:"chat__msg-options",ref:a,onClick:function(e){e.preventDefault(),t(e)},children:[s,(0,l.jsx)(r.Z,{id:"downArrow",className:"chat__msg-options-icon"})]})}));p.displayName="Search";var x=i.forwardRef((function(e,a){var s=e.children,t=(e.style,e.className),n=e["aria-labelledby"],r=(0,i.useState)(""),o=(0,c.Z)(r,2),d=o[0];o[1];return(0,l.jsx)("div",{ref:a,style:{backgroundColor:"#20272b"},className:t,"aria-labelledby":n,children:(0,l.jsx)("ul",{className:"list-unstyled",children:i.Children.toArray(s).filter((function(e){var a;return!d||(null===(a=e.props.children)||void 0===a?void 0:a.toLowerCase().startsWith(d))}))})})}));x.displayName=x;var j=function(){var e=(0,n.Z)((0,t.Z)().mark((function e(a){var s,n,c;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return s=JSON.parse(a),_(s.id,s.date,s.chatId),(0,Z.Kp)(s.id),n="https://api.telegram.org/bot".concat("5836103512:AAFoXHwI8PsQ6_xeqcx0IawMbc7njLwJydQ","/deleteMessage?chat_id=").concat(d.id,"&message_id=").concat(s.id),e.next=6,A.y_.get(n);case 6:c=e.sent,console.log("\u0423\u0434\u0430\u043b\u044f\u0435\u043c\u043e\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435: ",s.id),console.log("\u0414\u0430\u0442\u0430 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f: ",s.date),c?console.log("\u0412\u0430\u0448\u0435 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u0443\u0434\u0430\u043b\u0435\u043d\u043e \u0438\u0437 \u0442\u0435\u043b\u0435\u0433\u0440\u0430\u043c! ",c):console.log("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437.");case 10:case"end":return e.stop()}}),e)})));return function(a){return e.apply(this,arguments)}}();return h.map((function(e,t){var n=o[e];return(0,l.jsxs)("div",{children:[(0,l.jsx)("div",{className:"chat__date-wrapper",children:(0,l.jsxs)("span",{className:"chat__date",children:[" ",e]})}),0===t&&(0,l.jsxs)("p",{className:"chat__encryption-msg",children:[(0,l.jsx)(r.Z,{id:"lock",className:"chat__encryption-icon"}),"\u0421\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f \u0448\u0438\u0444\u0440\u0443\u044e\u0442\u0441\u044f \u0441\u043a\u0432\u043e\u0437\u043d\u044b\u043c \u0448\u0438\u0444\u0440\u043e\u0432\u0430\u043d\u0438\u0435\u043c. \u041d\u0438\u043a\u0442\u043e \u0437\u0430 \u043f\u0440\u0435\u0434\u0435\u043b\u0430\u043c\u0438 \u044d\u0442\u043e\u0433\u043e \u0447\u0430\u0442\u0430 \u043d\u0435 \u043c\u043e\u0436\u0435\u0442 \u0447\u0438\u0442\u0430\u0442\u044c \u0438\u043b\u0438 \u0441\u043b\u0443\u0448\u0430\u0442\u044c \u0438\u0445"]}),(0,l.jsx)("div",{className:"chat__msg-group",children:n.map((function(e,c){var i,o,_,f,v;null!==(i=e.content)&&void 0!==i&&i.includes("_reply_")&&(a=null===e||void 0===e?void 0:e.content.split("_reply_")[0]);var g=function(){return t===h.length-1&&c===n.length-1?s:void 0};return(0,l.jsx)(l.Fragment,{children:e.image?(0,l.jsxs)("div",{className:"chat__msg chat__img-wrapper ".concat(e.sender!==u?"chat__msg--rxd":"chat__msg--sent"),ref:g(),children:[e.content.endsWith(".pdf")?(0,l.jsx)("figure",{children:(0,l.jsx)("iframe",{src:e.content,height:"235px",width:"100%",title:"myFramePdf"})}):e.content.endsWith(".xlsx")?(0,l.jsxs)("figure",{children:[" ",(0,l.jsx)("img",{src:C,width:30}),(0,l.jsx)("a",{href:e.content,target:"_blank",rel:"noreferrer",children:e.content})," "]}):e.content.endsWith(".docx")?(0,l.jsxs)("figure",{children:[" ",(0,l.jsx)("img",{src:S,width:30}),(0,l.jsx)("a",{href:e.content,target:"_blank",rel:"noreferrer",children:e.content})," "]}):(0,l.jsxs)("figure",{children:[(0,l.jsx)("a",{href:e.content,target:"_blank",rel:"noreferrer",children:(0,l.jsx)("img",{src:e.content,alt:"",className:"chat__img"})}),(0,l.jsx)("figcaption",{style:{textAlign:"center",backgroundColor:"#607a7a",borderRadius:"5px"},children:e.descript})]}),(0,l.jsxs)("span",{className:"chat__msg-footer",children:[(0,l.jsx)("span",{children:(0,I.Z)(e.time)}),!e.sender&&(0,l.jsx)(r.Z,{id:"sent"===(null===e||void 0===e?void 0:e.status)?"singleTick":"doubleTick","aria-label":null===e||void 0===e?void 0:e.status,className:"chat__msg-status-icon ".concat("read"===(null===e||void 0===e?void 0:e.status)?"chat__msg-status-icon--blue":"")})]}),(0,l.jsxs)(F.Z,{onSelect:j,children:[(0,l.jsx)(F.Z.Toggle,{as:p,id:"dropdown-custom-components"}),(0,l.jsx)(F.Z.Menu,{as:x,children:(0,l.jsx)(F.Z.Item,{eventKey:JSON.stringify({id:e.id,date:e.date,chatId:d.id}),children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"})})]})]}):e.sender!==u?(0,l.jsxs)("p",{className:"chat__msg chat__msg--rxd",ref:g(),children:[(0,l.jsxs)("div",{className:"flex-row",ref:function(a){return m.current[e.id]=a},children:[null!==(o=e.content)&&void 0!==o&&o.includes("_reply_")?(0,l.jsx)("div",{className:"chat__msg--reply",onClick:function(){return a=e.reply,console.log(a),console.log(m.current),void m.current[a].scrollIntoView({transition:"smooth"});var a},children:(0,l.jsx)("div",{className:"reply__content",children:(0,l.jsxs)("div",{className:"reply__full",children:[(0,l.jsx)("span",{className:"reply__left"}),(0,l.jsxs)("div",{className:"reply__pad",children:[(0,l.jsx)("div",{className:"reply__contact",children:"U.L.E.Y"}),(0,l.jsx)("div",{className:"reply__text",children:null!==(_=a)&&void 0!==_&&_.startsWith("http")?(0,l.jsx)("a",{href:a,target:"_blank",rel:"noreferrer",children:(0,l.jsx)("img",{src:a,alt:"",width:"50px",height:"50px"})}):a})]})]})})}):(0,l.jsx)(l.Fragment,{}),(0,l.jsx)("span",{children:null!==(f=e.content)&&void 0!==f&&f.includes("_reply_")?e.content.split("_reply_")[1]:e.content}),(0,l.jsx)("span",{className:"chat__msg-filler",children:" "}),(0,l.jsx)("span",{className:"chat__msg-footer",children:(0,I.Z)(e.time)})]}),(0,l.jsxs)(F.Z,{onSelect:j,children:[(0,l.jsx)(F.Z.Toggle,{as:p,id:"dropdown-custom-components"}),(0,l.jsx)(F.Z.Menu,{as:x,children:(0,l.jsx)(F.Z.Item,{eventKey:JSON.stringify({id:e.id,date:e.date,chatId:d.id}),children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"})})]})]}):(0,l.jsx)("p",{className:"chat__msg chat__msg--sent",ref:g(),children:(0,l.jsxs)("div",{ref:function(a){return m.current[e.id]=a},children:[(0,l.jsx)("span",{children:null!==(v=e.content)&&void 0!==v&&v.startsWith("http")?(0,l.jsx)("a",{className:"chat__href",href:e.content,target:"_blank",rel:"noreferrer",children:e.content}):e.content}),(0,l.jsx)("span",{className:"chat__msg-filler",children:" "}),(0,l.jsxs)("span",{className:"chat__msg-footer",children:[(0,l.jsxs)("span",{children:[" ",(0,I.Z)(e.time)," "]}),(0,l.jsx)(r.Z,{id:"sent"===(null===e||void 0===e?void 0:e.status)?"singleTick":"doubleTick","aria-label":null===e||void 0===e?void 0:e.status,className:"chat__msg-status-icon ".concat("read"===(null===e||void 0===e?void 0:e.status)?"chat__msg-status-icon--blue":"")})]}),(0,l.jsxs)(F.Z,{onSelect:j,children:[(0,l.jsx)(F.Z.Toggle,{as:p,id:"dropdown-custom-components"}),(0,l.jsx)(F.Z.Menu,{as:x,children:(0,l.jsx)(F.Z.Item,{eventKey:JSON.stringify({id:e.id,date:e.date,chatId:d.id}),children:"\u0423\u0434\u0430\u043b\u0438\u0442\u044c \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435"})})]})]})})})}))})]},t)}))},E="1775583141",P="5836103512:AAFoXHwI8PsQ6_xeqcx0IawMbc7njLwJydQ",T="https://proj.uley.team",D=function(){var e=(0,w.Z)(),a=e.users,s=(e.setUsers,e.setUserAsUnread),o=e.addNewMessage,h=e.setShowGetMess,u=(0,i.useContext)(y.w).person,_=(0,w.Z)().setCountMessage,p=(0,i.useState)(!1),g=(0,c.Z)(p,2),b=g[0],N=g[1],S=u.id,C=a.filter((function(e){return e.chatId===S.toString()}))[0],I=(0,i.useRef)(null),F=(0,i.useState)(!1),D=(0,c.Z)(F,2),L=D[0],O=D[1],R=(0,i.useState)(!1),U=(0,c.Z)(R,2),B=U[0],J=U[1],W=(0,i.useState)(!1),Q=(0,c.Z)(W,2),K=Q[0],X=Q[1],Y=(0,i.useState)(!1),H=(0,c.Z)(Y,2),q=H[0],G=H[1],V=(0,i.useState)(),z=(0,c.Z)(V,2),$=z[0],ee=z[1],ae=(0,i.useState)(""),se=(0,c.Z)(ae,2),te=se[0],ne=se[1],ce=(0,i.useState)(""),ie=(0,c.Z)(ce,2),re=ie[0],le=ie[1],oe=(0,i.useState)([]),de=(0,c.Z)(oe,2),he=(de[0],de[1],(0,i.useState)(!1)),ue=(0,c.Z)(he,2),me=ue[0],_e=(ue[1],(0,i.useState)()),pe=(0,c.Z)(_e,2);pe[0],pe[1];(0,i.useEffect)((function(){C&&(xe(),s(C.chatId),_(0),h(!1))}),[]),(0,i.useEffect)((function(){C&&xe()}),[a]);var xe=function(){var e;null===(e=I.current)||void 0===e||e.scrollIntoView({transition:"smooth"})};(0,i.useEffect)((function(){var e=function(){var e=(0,n.Z)((0,t.Z)().mark((function e(){var a,s;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(!$){e.next=10;break}return(a=new FormData).append("name",$.name),a.append("photo",$),e.next=6,(0,Z.cT)(a);case 6:s=e.sent,ne(s.data.path.split(".team")[1]),le(T+s.data.path.split(".team")[1]),N(!0);case 10:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();e()}),[$]);var je=function(e){X(!1),G(!1),e(!0)},fe=function(){var e=(0,n.Z)((0,t.Z)().mark((function e(){var a,s,n,c,i,r,l;return(0,t.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:if(a=(a=(a=(a=(a=(a=re.replace(/\n/g,"%0A")).replace(/#/g,"%23")).replace(/&/g,"%26")).replace(/\+/g,"%2b")).replace(/>/g,"%3e")).replace(/</g,"%3c"),$){e.next=13;break}return c="https://api.telegram.org/bot".concat(P,"/sendMessage?chat_id=").concat(u.id,"&parse_mode=html&text=").concat(a),e.next=10,A.y_.get(c);case 10:s=e.sent,e.next=24;break;case 13:if("gif"!==te.slice(-3)&&"pdf"!==te.slice(-3)&&"zip"!==te.slice(-3)){e.next=20;break}return i="https://api.telegram.org/bot".concat(P,"/sendDocument?chat_id=").concat(u.id,"&document=").concat(T+te),e.next=17,A.y_.get(i);case 17:n=e.sent,e.next=24;break;case 20:return r="https://api.telegram.org/bot".concat(P,"/sendPhoto?chat_id=").concat(u.id,"&photo=").concat(T+te),e.next=23,A.y_.get(r);case 23:n=e.sent;case 24:return s?console.log("\u0421\u043f\u0430\u0441\u0438\u0431\u043e! \u0412\u0430\u0448\u0430 \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u0435 \u043e\u0442\u043f\u0440\u0430\u0432\u043b\u0435\u043d\u043e! ",s.data.result.message_id):console.log("\u0427\u0442\u043e-\u0442\u043e \u043f\u043e\u0448\u043b\u043e \u043d\u0435 \u0442\u0430\u043a. \u041f\u043e\u043f\u0440\u043e\u0431\u0443\u0439\u0442\u0435 \u0435\u0449\u0451 \u0440\u0430\u0437."),l={},$?(l={senderId:E,receiverId:C.chatId,conversationId:C.conversationId,type:"image",text:T+te,isBot:null,messageId:n.data.result.message_id},o(C.chatId,T+te,"image","",C.conversationId,n.data.result.message_id)):(l={senderId:E,receiverId:C.chatId,conversationId:C.conversationId,type:"text",text:re,isBot:null,messageId:s.data.result.message_id},o(C.chatId,re,"text","",C.conversationId,s.data.result.message_id)),e.next=29,(0,Z.rW)(l);case 29:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();return(0,l.jsxs)("div",{className:"chat",children:[(0,l.jsxs)("div",{className:"chat__body",children:[(0,l.jsx)("div",{className:"chat__bg"}),(0,l.jsx)(j,{user:u,openProfileSidebar:function(){return je(X)},openSearchSidebar:function(){return je(G)},setClearFile:N,clearFile:b,clickClearFile:function(){console.log("clear file..."),N(!1)}}),(0,l.jsx)("div",{className:"chat__content",children:me?(0,l.jsx)(x.LQ,{style:{margin:"50%"}}):(0,l.jsx)(M,{lastMsgRef:I,messages:C.messages})}),(0,l.jsx)("footer",{className:"chat__footer",children:(0,l.jsxs)("div",{className:"chat__footer-wrapper",children:[(0,l.jsx)("button",{className:"chat__scroll-btn","aria-label":"scroll down",onClick:xe,children:(0,l.jsx)(r.Z,{id:"downArrow"})}),(0,l.jsx)(d,{showEmojis:B,mess:re,setMess:le}),(0,l.jsx)(m,{showEmojis:B,setShowEmojis:J,showAttach:L,setShowAttach:O,onFileChange:function(e){ee(e.target.files[0])},mess:re,setMess:le,submitNewMessage:function(){fe(),le(""),xe(),ee(""),ne("")}})]})})]}),(0,l.jsx)(f,{heading:"\u041f\u043e\u0438\u0441\u043a \u0441\u043e\u043e\u0431\u0449\u0435\u043d\u0438\u044f",active:q,closeSidebar:function(){return G(!1)},children:(0,l.jsx)(v,{})}),(0,l.jsx)(f,{heading:"\u0414\u0430\u043d\u043d\u044b\u0435 \u043a\u043e\u043d\u0442\u0430\u043a\u0442\u0430",active:K,closeSidebar:function(){return X(!1)},children:(0,l.jsx)(k,{user:C})})]})}}}]);
//# sourceMappingURL=2532.6674f746.chunk.js.map