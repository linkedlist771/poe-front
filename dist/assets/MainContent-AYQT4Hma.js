import{h as E,r as i,u as R,s as V,j as m,o as F,l as $,m as a,n as e,_ as j,F as u,p as g,q as c,A as q,t as z,v as G,w as l,x as J,M as C,y as p,z as b,B as w,C as L}from"./index-DSAni5mW.js";import{S as O}from"./SendMessageButton-Bv9t0i5H.js";import"//at.alicdn.com/t/c/font_4565805_mtkshfnyzag.js";const W={class:"main-container"},Y={class:"main-content"},D={class:"header"},H={class:"model-selection"},Q=["onClick"],U={class:"bot-sections"},X={class:"section"},Z={class:"bot-grid"},ee=["onClick"],se={class:"bot-info"},te={class:"section"},oe={class:"bot-grid"},ne=["onClick"],ae={class:"bot-info"},le=E({__name:"MainContent",setup(ie){const h=i(!1),y=i([]),_=()=>{h.value=!0},M=()=>{h.value=!1},d=z(),t=R(),{api_key:ce,client_idx:v,client_type:A,inputMessage:de,model:re}=V(t),I=Number(m("client_idx"))??v.value,N=m("client_type")??A.value,x=m("api_key")||localStorage.getItem("SJ_API_KEY");t.setClientIdx(I),t.setApiKey(x),t.setClientType(N),F(async()=>{(!(m("api_key")||localStorage.getItem("SJ_API_KEY"))||!v.value||v.value==0)&&d.push("/status"),y.value=$(12)});const B=G(),k=async n=>{t.setModel(n),t.clearCurrentChatHistory();const o={};B.path==="/chat"?(await d.replace({path:"/chat",query:o}),window.location.reload()):await d.push({path:"/chat",query:o}),M()},P=i([{name:"Claude-3.5-Sonnet",icon:"🌟",description:"Anthropic's most powerful model. Excels in complex..."},{name:"Claude-3.5-Sonnet-200k",icon:"🌟",description:"Anthropic's most powerful model. Excels in complex..."},{name:"Flux-Pro-1.1-t",icon:"🖼️",description:"State-of-the-art image generation with top-of-the-line..."},{name:"stablediffusion3.5-l",icon:"🌐",description:"Web-enabled assistant bot that searches the intern..."},{name:"o1-mini",icon:"🔮",description:"This OpenAI model is a faster, cheaper version of o1 that is..."},{name:"GPT-4o",icon:"🤖",description:"OpenAI's latest model. This intelligent small..."}]),f=i([{name:"Claude-3.5-Sonnet",icon:"../assets/claude-icon.svg"},{name:"GPT-4o",icon:"../assets/avatars/gpt4o.jepg"},{name:"photo_createe",icon:"../assets/gpt-turbo-icon.svg"}]),T=async n=>{t.setInputMessage(n),d.push("/chat")},S=i(0);t.setModel(f.value[0].name);const K=n=>{S.value=n,t.setModel(f.value[n].name)};return(n,o)=>(l(),a(u,null,[e("div",W,[e("div",Y,[e("div",D,[o[0]||(o[0]=e("div",{class:"header-logo"},[e("img",{src:j,alt:"Poe Logo",class:"header-logo"})],-1)),e("div",H,[(l(!0),a(u,null,g(f.value,(s,r)=>(l(),a("button",{key:s.name,class:J(["model-button",{selected:S.value===r}]),onClick:me=>K(r)},[c(C,{modelName:s.name,showName:!0},null,8,["modelName"])],10,Q))),128)),e("button",{class:"model-button more-button",onClick:_},"更多模型")]),c(O,{onSendMessage:T,placeholder:"开始一个新的对话"})]),e("div",U,[e("div",X,[e("div",{class:"section-header"},[o[1]||(o[1]=e("h2",null,"官方模型",-1)),e("a",{href:"#",class:"see-all",onClick:_},"See all")]),e("div",Z,[(l(!0),a(u,null,g(P.value,s=>(l(),a("div",{key:s.name,class:"bot-item",onClick:r=>k(s.name)},[c(C,{modelName:s.name,showName:!1},null,8,["modelName"]),e("div",se,[e("h3",null,p(s.name),1),e("p",null,p(b(w)(s.name).desc.substring(0,30)+"..."),1)])],8,ee))),128))])]),e("div",te,[e("div",{class:"section-header"},[o[2]||(o[2]=e("h2",null,"为你准备的模型 ",-1)),e("a",{href:"#",class:"see-all",onClick:_},"See all")]),e("div",oe,[(l(!0),a(u,null,g(y.value,s=>(l(),a("div",{key:s.name,class:"bot-item",onClick:r=>k(s.name)},[c(C,{modelName:s.name,showName:!1},null,8,["modelName"]),e("div",ae,[e("h3",null,p(s.name),1),e("p",null,p(b(w)(s.name).desc.substring(0,30)+"..."),1)])],8,ne))),128))])])])])]),c(q,{isVisible:h.value,onClose:M},null,8,["isVisible"])],64))}}),_e=L(le,[["__scopeId","data-v-e8bde085"]]);export{_e as default};