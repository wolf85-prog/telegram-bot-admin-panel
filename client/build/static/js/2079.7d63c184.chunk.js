"use strict";(self.webpackChunkclient=self.webpackChunkclient||[]).push([[2079],{2079:(e,s,a)=>{a.r(s),a.d(s,{default:()=>v});var t=a(72791),l=a(78983),i=a(10935),r=a(93076),n=a(24846),d=a(85602),c=a(66925),x=a(26213),o=a(94810),h=a(8379),m=a(14248);const j=a.p+"static/media/1_sound.fb04824659bdd80fc9502db76513fd24.svg";const p=a.p+"static/media/3_video.9b9eba3a38bcc282e301c993d881cd09.svg";const g=a.p+"static/media/2_light.d1b940468251a400e7c6579d0bedfb0e.svg";const b=a.p+"static/media/7_stagehands.85d23da1b05093fd38a86549b8d6d631.svg";var y=a(15005),u=a(73130),N=a(80184);const v=()=>{const{users:e}=(0,x.Z)(),{managers:s}=(0,x.Z)(),{projects:a}=(0,x.Z)(),{companys:v}=(0,x.Z)(),[A,f]=(0,t.useState)([]),[w,k]=(0,t.useState)([]),[I,S]=(0,t.useState)([]),[R,L]=(0,t.useState)([]),[T,Z]=(0,t.useState)(!0),[C,Q]=(0,t.useState)(!0),[M,O]=(0,t.useState)(!1),[V,F]=(0,t.useState)(1),[K,B]=(0,t.useState)(!0),[q,U]=(0,t.useState)(!1),P="1775583141";(0,t.useEffect)((()=>{const a=[];(async()=>{console.log("companys (admin): ",v),console.log("clients (admin): ",e),console.log("managers (admin): ",s);let t=await(0,o.qu)();console.log("messages: ",t),e.map(((l,i)=>{const r=[...s][s.findIndex((e=>e.tgID===l.chatId))];let n=v.find((e=>e.managers.find((e=>e.id===(null===r||void 0===r?void 0:r.id)))));const d=null===n||void 0===n?void 0:n.title,c=null!==n&&void 0!==n&&n.city?null===n||void 0===n?void 0:n.city:"",x=l.date.split("T"),o=new Date(x[0]),h=o.getFullYear(),m=String(o.getMonth()+1).padStart(2,"0"),j=String(o.getDate()).padStart(2,"0"),p="".concat(j,".").concat(m,".").concat(h),g=l.name.includes("|")?l.name.split(" | ")[1]:l.name,b=t.length,y=t.filter((e=>e.senderId===P)),u=t.filter((e=>e.senderId===l.chatId)),N=e.filter((e=>""===e.message));S(N);const A=e.filter((e=>""!==e.message));L(A);const f={avatar:l.avatar,user:{name:g,new:!0,registered:"01.01.2023"},TG_ID:l.chatId,city:c,company:d||"",phone:null===r||void 0===r?void 0:r.phone,usage:{value:Math.round(100*u.length/(b-y.length)),period:"01.04.2023 - "+p,color:"success"},activity:p};a.push(f)}));const l=[...[...a].filter((e=>e.TG_ID!==P))].sort(((e,s)=>s.usage.value-e.usage.value));console.log("userbots: ",l),f(l),setTimeout((()=>{Z(!1)}),"6000")})()}),[e]),(0,t.useEffect)((()=>{const e=[];(async()=>{a.map((async s=>{const a={id:s.id,name:s.title,start:s.time_start,created:s.time_created,teh:s.teh,manager:s.manager,company:s.company};e.push(a)})),k(e)})()}),[a]);const W=e=>{console.log(e),"Workhub"===e&&(O(!0),Q(!1),F(2),B(!1),U(!0)),"Renthub"===e&&(O(!1),Q(!0),F(1),B(!0),U(!1))};return(0,N.jsxs)("div",{className:"dark-theme",children:[(0,N.jsx)(i.S8,{}),(0,N.jsxs)("div",{className:"wrapper d-flex flex-column min-vh-100 bg-uley",children:[(0,N.jsx)(i.tf,{}),(0,N.jsx)("div",{className:"body flex-grow-1 px-3",children:(0,N.jsx)(l.KB,{lg:!0,children:(0,N.jsx)(t.Suspense,{fallback:(0,N.jsx)(l.LQ,{color:"primary"}),children:(0,N.jsxs)(N.Fragment,{children:[K?(0,N.jsx)(h.Z,{users:e.length-1,projects:w.length,companys:v.length}):(0,N.jsx)(m.Z,{users:e.length-1,projects:w.length,companys:v.length}),(0,N.jsxs)(l.n2,{variant:"tabs",className:"dark-theme",children:[(0,N.jsx)(l.U6,{children:(0,N.jsx)(l.AQ,{style:{background:1!==V?"#08080869":""},onClick:()=>W("Renthub"),active:1===V,children:"Renthub"})}),(0,N.jsx)(l.U6,{children:(0,N.jsx)(l.AQ,{style:{background:2!==V?"#08080869":""},onClick:()=>W("Workhub"),active:2===V,children:"Workhub"})})]}),(0,N.jsxs)(l.xH,{className:"rounded-bottom",style:{borderRadius:"0px",borderTopRightRadius:"0.375rem"},children:[(0,N.jsx)(l.sl,{id:"Renthub",style:{display:C?"block":"none"},children:(0,N.jsx)(l.rb,{children:(0,N.jsx)(l.b7,{xs:!0,children:(0,N.jsxs)(l.xH,{className:"mb-4",children:[(0,N.jsxs)(l.bn,{style:{textAlign:"left"},children:["\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u0438 \u0431\u043e\u0442\u0430 (",e.length-1,")"]}),(0,N.jsxs)(l.sl,{children:[(0,N.jsxs)(l.rb,{children:[(0,N.jsx)(l.b7,{xs:12,md:6,xl:6,children:(0,N.jsxs)(l.rb,{children:[(0,N.jsx)(l.b7,{sm:6,children:(0,N.jsxs)("div",{className:"border-start border-start-4 border-start-info py-1 px-3",children:[(0,N.jsx)("div",{className:"text-medium-emphasis small",children:"\u041d\u043e\u0432\u044b\u0435 \u043a\u043b\u0438\u0435\u043d\u0442\u044b"}),(0,N.jsx)("div",{className:"fs-5 fw-semibold",children:I.length})]})}),(0,N.jsx)(l.b7,{sm:6,children:(0,N.jsxs)("div",{className:"border-start border-start-4 border-start-danger py-1 px-3 mb-3",children:[(0,N.jsx)("div",{className:"text-medium-emphasis small",children:"\u041f\u043e\u0441\u0442\u043e\u044f\u043d\u043d\u044b\u0435 \u043a\u043b\u0438\u0435\u043d\u0442\u044b"}),(0,N.jsx)("div",{className:"fs-5 fw-semibold",children:R.length-1})]})})]})}),(0,N.jsxs)(l.b7,{xs:12,md:6,xl:6,children:[(0,N.jsxs)(l.rb,{children:[(0,N.jsx)(l.b7,{sm:6,children:(0,N.jsxs)("div",{className:"border-start border-start-4 border-start-warning py-1 px-3 mb-3",children:[(0,N.jsx)("div",{className:"text-medium-emphasis small",children:"\u041f\u0440\u043e\u0441\u043c\u043e\u0442\u0440\u044b"}),(0,N.jsx)("div",{className:"fs-5 fw-semibold",children:"-"})]})}),(0,N.jsx)(l.b7,{sm:6,children:(0,N.jsxs)("div",{className:"border-start border-start-4 border-start-success py-1 px-3 mb-3",children:[(0,N.jsx)("div",{className:"text-medium-emphasis small",children:"\u0414\u0440\u0443\u0433\u043e\u0435"}),(0,N.jsx)("div",{className:"fs-5 fw-semibold",children:"-"})]})})]}),(0,N.jsx)("div",{className:"mb-5"})]})]}),T?(0,N.jsx)(l.LQ,{}):(0,N.jsxs)(l.Sx,{align:"middle",className:"mb-0 border",hover:!0,responsive:!0,children:[(0,N.jsx)(l.V,{className:"table-dark",children:(0,N.jsxs)(l.T6,{children:[(0,N.jsx)(l.is,{style:{width:"30px"},children:"\u2116"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"100px"},children:(0,N.jsx)(n.Z,{icon:d.g})}),(0,N.jsx)(l.is,{style:{width:"160px"},children:"\u041f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u0442\u0435\u043b\u044c"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"160px"},children:"\u041e\u0440\u0433\u0430\u043d\u0438\u0437\u0430\u0446\u0438\u044f"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"160px"},children:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"80px"},children:"\u0413\u043e\u0440\u043e\u0434"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"100px"},children:"TG ID"}),(0,N.jsx)(l.is,{style:{width:"100px"},children:"\u0418\u0441\u043f\u043e\u043b\u044c\u0437\u043e\u0432\u0430\u043d\u0438\u0435"}),(0,N.jsx)(l.is,{style:{width:"100px"},children:"\u0410\u043a\u0442\u0438\u0432\u043d\u043e\u0441\u0442\u044c"})]})}),(0,N.jsx)(l.NR,{children:A.map(((e,s)=>(0,N.jsxs)(l.T6,{"v-for":"item in tableItems",children:[(0,N.jsx)(l.NN,{className:"text-center",children:s+1}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)(l.cU,{size:"md",src:e.avatar?"https://proj.uley.team:5000/"+e.avatar:c,alt:""})}),(0,N.jsxs)(l.NN,{children:[(0,N.jsx)("div",{children:e.user.name}),(0,N.jsx)("div",{className:"small text-medium-emphasis"})]}),(0,N.jsx)(l.NN,{className:"text-center",children:e.company?(0,N.jsx)("div",{children:e.company}):""}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:e.phone})}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:e.city})}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:e.TG_ID})}),(0,N.jsxs)(l.NN,{children:[(0,N.jsxs)("div",{className:"clearfix",children:[(0,N.jsx)("div",{className:"float-start",children:(0,N.jsxs)("strong",{children:[e.usage.value,"%"]})}),(0,N.jsx)("div",{className:"float-end",children:(0,N.jsx)("small",{className:"text-medium-emphasis",children:e.usage.period})})]}),(0,N.jsx)(l.yI,{thin:!0,color:e.usage.color,value:e.usage.value})]}),(0,N.jsxs)(l.NN,{children:[(0,N.jsx)("div",{className:"small text-medium-emphasis",children:"\u041f\u043e\u0441\u043b\u0435\u0434\u043d\u0438\u0439 \u0432\u0445\u043e\u0434"}),(0,N.jsx)("strong",{children:e.activity})]})]},s)))})]})]})]})})})}),(0,N.jsx)(l.sl,{id:"Workhub",style:{display:M?"block":"none"},children:(0,N.jsx)(l.rb,{children:(0,N.jsxs)(l.b7,{xs:!0,children:[(0,N.jsx)(l.rb,{children:(0,N.jsx)(l.co,{className:"mb-4",color:"primary",value:(0,N.jsx)(N.Fragment,{}),title:"",action:(0,N.jsxs)(l.w5,{alignment:"end",children:[(0,N.jsx)(l.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,N.jsx)(n.Z,{icon:u.t,className:"text-high-emphasis-inverse"})}),(0,N.jsxs)(l.$H,{children:[(0,N.jsx)(l.$f,{children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c"}),(0,N.jsx)(l.$f,{children:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c"}),(0,N.jsx)(l.$f,{disabled:!0,children:"\u0414\u0440\u0443\u0433\u043e\u0435"})]})]}),chart:(0,N.jsx)(r.oK,{className:"mt-3 mx-3",style:{height:"500px"},data:{labels:["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c"],datasets:[{label:"My First dataset",backgroundColor:"transparent",borderColor:"rgba(255,255,255,.55)",pointBackgroundColor:(0,y.getStyle)("--cui-primary"),data:[65,59,84,84,51,55,40]}]},options:{plugins:{legend:{display:!1}},maintainAspectRatio:!1,scales:{x:{grid:{display:!1,drawBorder:!1},ticks:{display:!0}},y:{min:10,max:99,display:!0,grid:{display:!1},ticks:{display:!0}}},elements:{line:{borderWidth:1,tension:.4},point:{radius:4,hitRadius:10,hoverRadius:4}}}})})}),(0,N.jsx)("br",{}),(0,N.jsxs)(l.rb,{children:[(0,N.jsx)(l.b7,{xs:12,md:6,xl:6,children:(0,N.jsxs)(l.rb,{children:[(0,N.jsx)(l.b7,{sm:6,children:(0,N.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,N.jsxs)("div",{className:"border-start border-start-4 border-start-info py-1 px-3 mb-3",children:[(0,N.jsx)("div",{className:"text-medium-emphasis small",children:"\u0417\u0432\u0443\u043a"}),(0,N.jsx)("div",{className:"fs-5 fw-semibold",children:"15"})]}),(0,N.jsx)("img",{src:j,alt:"",style:{marginBottom:"15px"}})]})}),(0,N.jsx)(l.b7,{sm:6,children:(0,N.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,N.jsxs)("div",{className:"border-start border-start-4 border-start-danger py-1 px-3 mb-3",children:[(0,N.jsx)("div",{className:"text-medium-emphasis small",children:"\u0421\u0432\u0435\u0442"}),(0,N.jsx)("div",{className:"fs-5 fw-semibold",children:"11"})]}),(0,N.jsx)("img",{src:g,alt:"",style:{marginBottom:"15px"}})]})})]})}),(0,N.jsxs)(l.b7,{xs:12,md:6,xl:6,children:[(0,N.jsxs)(l.rb,{children:[(0,N.jsx)(l.b7,{sm:6,children:(0,N.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,N.jsxs)("div",{className:"border-start border-start-4 border-start-warning py-1 px-3 mb-3",children:[(0,N.jsx)("div",{className:"text-medium-emphasis small",children:"\u0412\u0438\u0434\u0435\u043e"}),(0,N.jsx)("div",{className:"fs-5 fw-semibold",children:"65"})]}),(0,N.jsx)("img",{src:p,alt:"",style:{marginBottom:"15px"}})]})}),(0,N.jsx)(l.b7,{sm:6,children:(0,N.jsxs)("div",{style:{display:"flex",justifyContent:"space-between",alignItems:"center"},children:[(0,N.jsxs)("div",{className:"border-start border-start-4 border-start-success py-1 px-3 mb-3",children:[(0,N.jsx)("div",{className:"text-medium-emphasis small",children:"\u0425\u0435\u043b\u043f\u0435\u0440\u044b"}),(0,N.jsx)("div",{className:"fs-5 fw-semibold",children:"23"})]}),(0,N.jsx)("img",{src:b,alt:"",style:{marginBottom:"15px"}})]})})]}),(0,N.jsx)("div",{className:"mb-5"})]})]}),(0,N.jsxs)(l.rb,{children:[(0,N.jsxs)(l.b7,{md:6,style:{textAlign:"center"},children:[(0,N.jsx)(l.u5,{color:"primary",style:{marginRight:"10px",width:"120px"},children:"\u0421\u0443\u0442\u043a\u0438"}),(0,N.jsx)(l.u5,{color:"secondary",style:{marginRight:"10px",width:"120px"},children:"\u041d\u0435\u0434\u0435\u043b\u044f"}),(0,N.jsx)(l.u5,{color:"success",style:{marginRight:"10px",width:"120px"},children:"\u041c\u0435\u0441\u044f\u0446"}),(0,N.jsx)(l.u5,{color:"danger",style:{marginRight:"10px",width:"120px"},children:"\u0413\u043e\u0434"})]}),(0,N.jsxs)(l.b7,{md:6,style:{textAlign:"center",display:"flex"},children:[(0,N.jsx)(l.jO,{type:"text",placeholder:"01.01.2000","aria-label":"sm input example",style:{marginLeft:"10px"}}),(0,N.jsx)(l.jO,{type:"text",placeholder:"01.01.2000","aria-label":"sm input example",style:{marginLeft:"10px"}}),(0,N.jsx)(l.u5,{color:"dark",style:{marginLeft:"10px"},children:"\u041f\u0440\u0438\u043c\u0435\u043d\u0438\u0442\u044c"})]})]}),(0,N.jsx)("br",{}),(0,N.jsx)(l.rb,{children:(0,N.jsx)(l.b7,{children:(0,N.jsxs)(l.Sx,{align:"middle",className:"mb-0 border",hover:!0,responsive:!0,children:[(0,N.jsx)(l.V,{className:"table-light",children:(0,N.jsxs)(l.T6,{children:[(0,N.jsx)(l.is,{className:"text-center",style:{width:"90px"},children:"\u0414\u0430\u0442\u0430"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"70px"},children:"\u0412\u0440\u0435\u043c\u044f"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"250px"},children:"\u0424\u0418\u041e"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"150px"},children:"\u0413\u043e\u0440\u043e\u0434"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"160px"},children:"\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u044c\u043d\u043e\u0441\u0442\u044c"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"140px"},children:"\u0414\u0430\u0442\u0430 \u0440\u043e\u0436\u0434\u0435\u043d\u0438\u044f"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"150px"},children:"\u0422\u0435\u043b\u0435\u0444\u043e\u043d"}),(0,N.jsx)(l.is,{className:"text-center",style:{width:"120px"},children:"\u041d\u0438\u043a"})]})}),(0,N.jsxs)(l.NR,{children:[(0,N.jsxs)(l.T6,{"v-for":"item in tableItems",children:[(0,N.jsx)(l.NN,{className:"text-center",children:"12.01.2000"}),(0,N.jsx)(l.NN,{className:"text-center",children:"12:00"}),(0,N.jsx)(l.NN,{className:"text-center",children:"\u0418\u0432\u0430\u043d\u043e\u0432  \u0418\u0432\u0430\u043d \u0418\u0432\u0430\u043d\u043e\u0432\u0438\u0447"}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:"\u041c\u043e\u0441\u043a\u0432\u0430"})}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsxs)("div",{children:["\u041f\u043e\u0432\u0430\u0440 ",(0,N.jsx)("br",{}),"\u041f\u043b\u043e\u0442\u043d\u0438\u043a ",(0,N.jsx)("br",{}),"\u041e\u0445\u043e\u0442\u043d\u0438\u043a"]})}),(0,N.jsx)(l.NN,{className:"text-center",children:"12.03.1990"}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:"8 (900) 122-12-12"})}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:"\u041d\u0438\u043a"})})]}),(0,N.jsxs)(l.T6,{"v-for":"item in tableItems",children:[(0,N.jsx)(l.NN,{className:"text-center",children:"12.01.2000"}),(0,N.jsx)(l.NN,{className:"text-center",children:"12:00"}),(0,N.jsx)(l.NN,{className:"text-center",children:"\u0418\u0432\u0430\u043d\u043e\u0432  \u0418\u0432\u0430\u043d \u0418\u0432\u0430\u043d\u043e\u0432\u0438\u0447"}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:"\u041c\u043e\u0441\u043a\u0432\u0430"})}),(0,N.jsx)(l.NN,{className:"text-center",children:"-"}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:"12.03.1990"})}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:"8 (900) 122-12-12"})}),(0,N.jsx)(l.NN,{className:"text-center",children:(0,N.jsx)("div",{children:"\u041d\u0438\u043a"})})]})]})]})})})]})})})]})]})})})}),(0,N.jsx)(i.qh,{})]})]})}},8379:(e,s,a)=>{a.d(s,{Z:()=>x});a(72791);var t=a(78983),l=a(15005),i=a(93076),r=a(24846),n=a(73130),d=a(5372),c=a(80184);const x=e=>{let{users:s,projects:a,companys:x}=e;return(0,c.jsxs)(t.rb,{children:[(0,c.jsx)(t.b7,{sm:6,lg:3,children:(0,c.jsx)(t.co,{className:"mb-4",color:"primary",value:(0,c.jsxs)(c.Fragment,{children:[s," "]}),title:"\u0417\u0430\u043a\u0430\u0437\u0447\u0438\u043a\u0438",action:(0,c.jsxs)(t.w5,{alignment:"end",children:[(0,c.jsx)(t.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,c.jsx)(r.Z,{icon:n.t,className:"text-high-emphasis-inverse"})}),(0,c.jsxs)(t.$H,{children:[(0,c.jsx)(t.$f,{children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c"}),(0,c.jsx)(t.$f,{children:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c"}),(0,c.jsx)(t.$f,{disabled:!0,children:"\u0414\u0440\u0443\u0433\u043e\u0435"})]})]}),chart:(0,c.jsx)(i.oK,{className:"mt-3 mx-3",style:{height:"70px"},data:{labels:["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c"],datasets:[{label:"My First dataset",backgroundColor:"transparent",borderColor:"rgba(255,255,255,.55)",pointBackgroundColor:(0,l.getStyle)("--cui-primary"),data:[65,59,84,84,51,55,40]}]},options:{plugins:{legend:{display:!1}},maintainAspectRatio:!1,scales:{x:{grid:{display:!1,drawBorder:!1},ticks:{display:!1}},y:{min:30,max:89,display:!1,grid:{display:!1},ticks:{display:!1}}},elements:{line:{borderWidth:1,tension:.4},point:{radius:4,hitRadius:10,hoverRadius:4}}}})})}),(0,c.jsx)(t.b7,{sm:6,lg:3,children:(0,c.jsx)(t.co,{className:"mb-4",color:"info",value:(0,c.jsx)(c.Fragment,{children:a}),title:"\u041f\u0440\u043e\u0435\u043a\u0442\u044b",action:(0,c.jsxs)(t.w5,{alignment:"end",children:[(0,c.jsx)(t.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,c.jsx)(r.Z,{icon:n.t,className:"text-high-emphasis-inverse"})}),(0,c.jsxs)(t.$H,{children:[(0,c.jsx)(t.$f,{children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c"}),(0,c.jsx)(t.$f,{children:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c"}),(0,c.jsx)(t.$f,{disabled:!0,children:"\u0414\u0440\u0443\u0433\u043e\u0435"})]})]}),chart:(0,c.jsx)(i.oK,{className:"mt-3 mx-3",style:{height:"70px"},data:{labels:["January","February","March","April","May","June","July"],datasets:[{label:"My First dataset",backgroundColor:"transparent",borderColor:"rgba(255,255,255,.55)",pointBackgroundColor:(0,l.getStyle)("--cui-info"),data:[1,18,9,17,34,22,11]}]},options:{plugins:{legend:{display:!1}},maintainAspectRatio:!1,scales:{x:{grid:{display:!1,drawBorder:!1},ticks:{display:!1}},y:{min:-9,max:39,display:!1,grid:{display:!1},ticks:{display:!1}}},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}}})})}),(0,c.jsx)(t.b7,{sm:6,lg:3,children:(0,c.jsx)(t.co,{className:"mb-4",color:"warning",value:(0,c.jsxs)(c.Fragment,{children:[x," "]}),title:"\u041a\u043e\u043c\u043f\u0430\u043d\u0438\u0438",action:(0,c.jsxs)(t.w5,{alignment:"end",children:[(0,c.jsx)(t.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,c.jsx)(r.Z,{icon:n.t,className:"text-high-emphasis-inverse"})}),(0,c.jsxs)(t.$H,{children:[(0,c.jsx)(t.$f,{children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c"}),(0,c.jsx)(t.$f,{children:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c"}),(0,c.jsx)(t.$f,{disabled:!0,children:"\u0414\u0440\u0443\u0433\u043e\u0435"})]})]}),chart:(0,c.jsx)(i.oK,{className:"mt-3",style:{height:"70px"},data:{labels:["January","February","March","April","May","June","July"],datasets:[{label:"My First dataset",backgroundColor:"rgba(255,255,255,.2)",borderColor:"rgba(255,255,255,.55)",data:[78,81,80,45,34,12,40],fill:!0}]},options:{plugins:{legend:{display:!1}},maintainAspectRatio:!1,scales:{x:{display:!1},y:{display:!1}},elements:{line:{borderWidth:2,tension:.4},point:{radius:0,hitRadius:10,hoverRadius:4}}}})})}),(0,c.jsx)(t.b7,{sm:6,lg:3,children:(0,c.jsx)(t.co,{className:"mb-4",color:"danger",value:(0,c.jsxs)(c.Fragment,{children:["44"," ",(0,c.jsxs)("span",{className:"fs-6 fw-normal",children:["(-23.6% ",(0,c.jsx)(r.Z,{icon:d.t}),")"]})]}),title:"\u0427\u0430\u0441\u044b [\u0437\u0430 \u0433\u043e\u0434]",action:(0,c.jsxs)(t.w5,{alignment:"end",children:[(0,c.jsx)(t.SQ,{color:"transparent",caret:!1,className:"p-0",children:(0,c.jsx)(r.Z,{icon:n.t,className:"text-high-emphasis-inverse"})}),(0,c.jsxs)(t.$H,{children:[(0,c.jsx)(t.$f,{children:"\u041f\u043e\u0441\u043c\u043e\u0442\u0440\u0435\u0442\u044c"}),(0,c.jsx)(t.$f,{children:"\u041e\u0431\u043d\u043e\u0432\u0438\u0442\u044c"}),(0,c.jsx)(t.$f,{disabled:!0,children:"\u0414\u0440\u0443\u0433\u043e\u0435"})]})]}),chart:(0,c.jsx)(i.JZ,{className:"mt-3 mx-3",style:{height:"70px"},data:{labels:["January","February","March","April","May","June","July","August","September","October","November","December","January","February","March","April"],datasets:[{label:"My First dataset",backgroundColor:"rgba(255,255,255,.2)",borderColor:"rgba(255,255,255,.55)",data:[78,81,80,45,34,12,40,85,65,23,12,98,34,84,67,82],barPercentage:.6}]},options:{maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1,drawTicks:!1},ticks:{display:!1}},y:{grid:{display:!1,drawBorder:!1,drawTicks:!1},ticks:{display:!1}}}}})})})]})}},14248:(e,s,a)=>{a.d(s,{Z:()=>n});a(72791);var t=a(78983),l=a(15005),i=a(93076),r=a(80184);const n=e=>{let{users:s,newUsers:a,activeUsers:n,delUsers:d}=e;return(0,r.jsxs)(t.rb,{children:[(0,r.jsx)(t.b7,{sm:6,lg:3,children:(0,r.jsx)(t.co,{className:"mb-4",color:"primary",value:(0,r.jsxs)(r.Fragment,{children:[s.length," "]}),title:"\u0412\u0441\u0435\u0433\u043e",action:"",chart:(0,r.jsx)(i.oK,{className:"mt-3 mx-3",style:{height:"70px"},data:{labels:["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c"],datasets:[{label:"\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u044b",backgroundColor:"transparent",borderColor:"rgba(255,255,255,.55)",pointBackgroundColor:(0,l.getStyle)("--cui-primary"),data:[100*s.filter((e=>0===new Date(e.createDate).getMonth())).length/s.length-5,100*s.filter((e=>1===new Date(e.createDate).getMonth())).length/s.length-5,100*s.filter((e=>2===new Date(e.createDate).getMonth())).length/s.length-5,100*s.filter((e=>3===new Date(e.createDate).getMonth())).length/s.length-5,0,0,0]}]},options:{plugins:{legend:{display:!1}},maintainAspectRatio:!1,scales:{x:{grid:{display:!1,drawBorder:!1},ticks:{display:!1}},y:{min:-5,max:95,display:!1,grid:{display:!1},ticks:{display:!1}}},elements:{line:{borderWidth:1,tension:.4},point:{radius:4,hitRadius:10,hoverRadius:4}}}})})}),(0,r.jsx)(t.b7,{sm:6,lg:3,children:(0,r.jsx)(t.co,{className:"mb-4",color:"info",value:(0,r.jsx)(r.Fragment,{children:a.length}),title:"\u041d\u043e\u0432\u044b\u0435",action:"",chart:(0,r.jsx)(i.oK,{className:"mt-3 mx-3",style:{height:"70px"},data:{labels:["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c"],datasets:[{label:"\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u044b",backgroundColor:"transparent",borderColor:"rgba(255,255,255,.55)",pointBackgroundColor:(0,l.getStyle)("--cui-info"),data:[100*a.filter((e=>0===new Date(e.createDate).getMonth())).length/a.length-5,100*a.filter((e=>1===new Date(e.createDate).getMonth())).length/a.length-5,100*a.filter((e=>2===new Date(e.createDate).getMonth())).length/a.length-5,100*a.filter((e=>3===new Date(e.createDate).getMonth())).length/a.length-5,0,0,0]}]},options:{plugins:{legend:{display:!1}},maintainAspectRatio:!1,scales:{x:{grid:{display:!1,drawBorder:!1},ticks:{display:!1}},y:{min:-5,max:95,display:!1,grid:{display:!1},ticks:{display:!1}}},elements:{line:{borderWidth:1},point:{radius:4,hitRadius:10,hoverRadius:4}}}})})}),(0,r.jsx)(t.b7,{sm:6,lg:3,children:(0,r.jsx)(t.co,{className:"mb-4",color:"warning",value:(0,r.jsxs)(r.Fragment,{children:[n.length," "]}),title:"\u0410\u043a\u0442\u0438\u0432\u043d\u044b\u0435",action:"",chart:(0,r.jsx)(i.oK,{className:"mt-3",style:{height:"70px"},data:{labels:["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c"],datasets:[{label:"\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u044b",backgroundColor:"rgba(255,255,255,.2)",borderColor:"rgba(255,255,255,.55)",data:[n,0,0,0,0,0,0],fill:!0}]},options:{plugins:{legend:{display:!1}},maintainAspectRatio:!1,scales:{x:{display:!1},y:{display:!1}},elements:{line:{borderWidth:2,tension:.4},point:{radius:0,hitRadius:10,hoverRadius:4}}}})})}),(0,r.jsx)(t.b7,{sm:6,lg:3,children:(0,r.jsx)(t.co,{className:"mb-4",color:"danger",value:(0,r.jsx)(r.Fragment,{children:d.length}),title:"\u0423\u0434\u0430\u043b\u0435\u043d\u043d\u044b\u0435",action:"",chart:(0,r.jsx)(i.JZ,{className:"mt-3 mx-3",style:{height:"70px"},data:{labels:["\u042f\u043d\u0432\u0430\u0440\u044c","\u0424\u0435\u0432\u0440\u0430\u043b\u044c","\u041c\u0430\u0440\u0442","\u0410\u043f\u0440\u0435\u043b\u044c","\u041c\u0430\u0439","\u0418\u044e\u043d\u044c","\u0418\u044e\u043b\u044c","\u0410\u0432\u0433\u0443\u0441\u0442","\u0421\u0435\u043d\u0442\u044f\u0431\u0440\u044c","\u041e\u043a\u0442\u044f\u0431\u0440\u044c","\u041d\u043e\u044f\u0431\u0440\u044c","\u0414\u0435\u043a\u0430\u0431\u0440\u044c"],datasets:[{label:"\u0421\u043f\u0435\u0446\u0438\u0430\u043b\u0438\u0441\u0442\u044b",backgroundColor:"rgba(255,255,255,.2)",borderColor:"rgba(255,255,255,.55)",data:[d,0,0,0,0,0,0,0,0,0,0,0],barPercentage:.6}]},options:{maintainAspectRatio:!1,plugins:{legend:{display:!1}},scales:{x:{grid:{display:!1,drawTicks:!1},ticks:{display:!1}},y:{grid:{display:!1,drawBorder:!1,drawTicks:!1},ticks:{display:!1}}}}})})})]})}},5372:(e,s,a)=>{a.d(s,{t:()=>t});const t=["512 512","<polygon fill='var(--ci-primary-color, currentColor)' points='367.997 338.75 271.999 434.747 271.999 17.503 239.999 17.503 239.999 434.745 144.003 338.75 121.376 361.377 256 496 390.624 361.377 367.997 338.75' class='ci-primary'/>"]},73130:(e,s,a)=>{a.d(s,{t:()=>t});const t=["512 512","<path fill='var(--ci-primary-color, currentColor)' d='M256,144a64,64,0,1,0-64-64A64.072,64.072,0,0,0,256,144Zm0-96a32,32,0,1,1-32,32A32.036,32.036,0,0,1,256,48Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M256,368a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,368Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,464Z' class='ci-primary'/><path fill='var(--ci-primary-color, currentColor)' d='M256,192a64,64,0,1,0,64,64A64.072,64.072,0,0,0,256,192Zm0,96a32,32,0,1,1,32-32A32.036,32.036,0,0,1,256,288Z' class='ci-primary'/>"]},66925:e=>{e.exports="data:image/png;base64,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"}}]);
//# sourceMappingURL=2079.7d63c184.chunk.js.map