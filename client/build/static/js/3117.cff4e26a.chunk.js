"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[3117,5049,4729,1170],{81170:function(e,t,n){n.r(t);var r=n(74165),s=n(15861),c=n(29439),i=n(72791),l=n(84688),a=(n(43513),n(78983)),d=n(80225),o=n(69835),x=n(75749),h=n(80184);t.default=function(){var e=(0,d.Z)().setCountPretendent,t=(0,i.useState)([]),n=(0,c.Z)(t,2),u=(n[0],n[1]),m=(0,i.useState)([]),j=(0,c.Z)(m,2),p=j[0],f=j[1],v=(0,i.useState)(!0),N=(0,c.Z)(v,2),w=(N[0],N[1],(0,i.useState)(!0)),g=(0,c.Z)(w,2),b=g[0],y=g[1],k=(0,i.useState)(!1),S=(0,c.Z)(k,2),Z=S[0],C=S[1];return(0,i.useEffect)((function(){var t=[];e(0);var n=function(){var e=(0,s.Z)((0,r.Z)().mark((function e(){var n,c,i;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.gM)();case 2:return n=e.sent,console.log("pretendents: ",n),e.next=6,(0,x.bQ)();case 6:return c=e.sent,console.log("workers: ",c),e.next=10,(0,o.Y5)();case 10:i=e.sent,console.log("projects: ",i),u(i),n.map(function(){var e=(0,s.Z)((0,r.Z)().mark((function e(n,l){var a,d,o,h,u,m,j,p,v,N,w;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:a=i.find((function(e){return e.id===n.projectId})),d=null===a||void 0===a?void 0:a.name,o=c.find((function(e){return e.chatId===n.receiverId})),h=(null===o||void 0===o?void 0:o.userfamily)+" "+(null===o||void 0===o?void 0:o.username),"","","","",u=new Date(n.createdAt).getTime(),m=new Date(u),j=String(m.getMonth()+1).padStart(2,"0"),p=String(m.getDate()).padStart(2,"0"),v=m.getHours(),N=String(m.getMinutes()).padStart(2,"0"),w="".concat(p,".").concat(j," ").concat(v,":").concat(N),setTimeout((0,s.Z)((0,r.Z)().mark((function e(){var s,c,i,l,a;return(0,r.Z)().wrap((function(e){for(;;)switch(e.prev=e.next){case 0:return e.next=2,(0,x.YL)(n.receiverId);case 2:l=e.sent,a={date:w,project:d,worker:h,worklist:l[0].spec,rang:null===(s=l[0])||void 0===s?void 0:s.rank,comment:null===(c=l[0])||void 0===c?void 0:c.comment,phone:null===(i=l[0])||void 0===i?void 0:i.phone},t.push(a),f(t),y(!1);case 7:case"end":return e.stop()}}),e)}))),1500*++l);case 16:case"end":return e.stop()}}),e)})));return function(t,n){return e.apply(this,arguments)}}());case 14:case"end":return e.stop()}}),e)})));return function(){return e.apply(this,arguments)}}();n()}),[]),(0,h.jsxs)("div",{className:"dark-theme",children:[(0,h.jsx)(l.S8,{}),(0,h.jsxs)("div",{className:"wrapper d-flex flex-column min-vh-100 bg-uley",children:[(0,h.jsx)(l.tf,{}),(0,h.jsx)("div",{className:"body flex-grow-1 px-3",children:(0,h.jsx)(a.KB,{lg:!0,children:(0,h.jsxs)(i.Suspense,{fallback:(0,h.jsx)(a.LQ,{color:"primary"}),children:[(0,h.jsx)("h2",{children:"\u041f\u0440\u0435\u0442\u0435\u043d\u0434\u0435\u043d\u0442\u044b"}),(0,h.jsx)(a.rb,{className:"mb-3",children:(0,h.jsx)(a.b7,{sm:3,children:(0,h.jsx)(a.jO,{placeholder:"\u041f\u043e\u0438\u0441\u043a...","aria-label":"City"})})}),(0,h.jsx)(a.rb,{children:(0,h.jsx)(a.b7,{style:{textAlign:"center"},children:(0,h.jsx)(a.xH,{className:"mb-4",children:(0,h.jsx)(a.sl,{children:b?(0,h.jsx)(a.LQ,{}):(0,h.jsxs)(a.Sx,{align:"middle",className:"mb-0 border",hover:!0,responsive:!0,children:[(0,h.jsx)(a.V,{className:"table-light",children:(0,h.jsxs)(a.T6,{children:[(0,h.jsx)(a.is,{className:"text-center",style:{width:"110px"},children:"\u0414\u0430\u0442\u0430"}),(0,h.jsx)(a.is,{className:"text-center",style:{width:"250px"},children:"\u041f\u0440\u043e\u0435\u043a\u0442"}),(0,h.jsx)(a.is,{className:"text-center",style:{width:"150px"},children:"\u0424\u0418\u041e"}),(0,h.jsx)(a.is,{className:"text-center",style:{width:"160px"},children:"\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c"}),(0,h.jsx)(a.is,{className:"text-center",style:{width:"120px"},children:"U.L.E.Y"}),(0,h.jsx)(a.is,{className:"text-center",style:{minWidth:"120px"},children:"\u041a\u043e\u043c\u043c\u0435\u043d\u0442\u0430\u0440\u0438\u0439"}),(0,h.jsx)(a.is,{className:"text-center",style:{width:"180px"},children:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"})]})}),(0,h.jsx)(a.NR,{children:p.map((function(e,t){return(0,h.jsxs)(a.T6,{"v-for":"item in tableItems",children:[(0,h.jsx)(a.NN,{className:"text-center",children:e.date}),(0,h.jsx)(a.NN,{className:"text-center",children:e.project}),(0,h.jsx)(a.NN,{className:"text-center",style:{color:e.dateborn>=2005?"red":""},children:e.worker}),(0,h.jsxs)(a.NN,{style:{fontSize:"13px",textAlign:"left"},children:[(0,h.jsx)("div",{onClick:function(){return C(!Z)},children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c"}),(0,h.jsx)(a.V9,{visible:Z,children:(0,h.jsx)("table",{children:e.worklist?e.worklist.map((function(e,t){return(0,h.jsx)("tr",{children:(0,h.jsxs)("td",{children:["- ",e.name]})},t)})):""})})]}),(0,h.jsx)(a.NN,{className:"text-center",children:e.rang}),(0,h.jsx)(a.NN,{style:{color:e.dateborn>=2005?"red":"",fontSize:"13px",textAlign:"left"},children:e.comment}),(0,h.jsx)(a.NN,{className:"text-center",children:(0,h.jsx)("div",{children:e.phone})})]},t)}))})]})})})})})]})})}),(0,h.jsx)(l.qh,{})]})]})}}}]);
//# sourceMappingURL=3117.cff4e26a.chunk.js.map