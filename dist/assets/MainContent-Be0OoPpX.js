import{h as K,r as i,u as R,s as V,j as m,o as W,l as F,m as a,n as e,_ as $,F as u,p as g,q as c,A as j,t as q,v as z,w as l,x as G,M as y,y as p,z as b,B as w,C as J}from"./index-BB1CUsUs.js";import{S as L}from"./SendMessageButton-Ct9mWzRB.js";import"//at.alicdn.com/t/c/font_4565805_mtkshfnyzag.js";const O={class:"main-container"},Y={class:"main-content"},D={class:"header"},H={class:"model-selection"},Q=["onClick"],U={class:"bot-sections"},X={class:"section"},Z={class:"bot-grid"},ee=["onClick"],se={class:"bot-info"},te={class:"section"},oe={class:"bot-grid"},ne=["onClick"],ae={class:"bot-info"},le=K({__name:"MainContent",setup(ie){const h=i(!1),C=i([]),_=()=>{h.value=!0},M=()=>{h.value=!1},r=q(),t=R(),{api_key:ce,client_idx:v,client_type:I,inputMessage:re,model:de}=V(t),x=Number(m("client_idx"))??v.value,A=m("client_type")??I.value,N=m("api_key")||localStorage.getItem("SJ_API_KEY");t.setClientIdx(x),t.setApiKey(N),t.setClientType(A),W(async()=>{(!(m("api_key")||localStorage.getItem("SJ_API_KEY"))||!v.value||v.value==0)&&r.push("/status"),C.value=F(12)});const P=z(),k=async n=>{t.setModel(n),t.clearCurrentChatHistory();const o={};P.path==="/chat"?(await r.replace({path:"/chat",query:o}),window.location.reload()):await r.push({path:"/chat",query:o}),M()},B=i([{name:"Claude-3.5-Sonnet",icon:"🌟",description:"Anthropic's most powerful model. Excels in complex..."},{name:"Claude-3.5-Sonnet-200k",icon:"🌟",description:"Anthropic's most powerful model. Excels in complex..."},{name:"Flux-Pro-1.1-t",icon:"🖼️",description:"State-of-the-art image generation with top-of-the-line..."},{name:"stablediffusion3.5-l",icon:"🌐",description:"Web-enabled assistant bot that searches the intern..."},{name:"o1-mini",icon:"🔮",description:"This OpenAI model is a faster, cheaper version of o1 that is..."},{name:"GPT-4o",icon:"🤖",description:"OpenAI's latest model. This intelligent small..."}]);i([{name:"PythonAIChat",icon:"🐍",description:"Python programming how know everythin..."},{name:"Wolfram-math-1",icon:"🧮",description:"Wolfram-math is and advanced math..."},{name:"einstein-chatgpt",icon:"👨‍🔬",description:"Meet the founder of the theory of..."},{name:"Python_Expert",icon:"🐍",description:"I am an expert in python programmin..."}]);const f=i([{name:"Claude-3.5-Sonnet",icon:"../assets/claude-icon.svg"},{name:"GPT-4o",icon:"../assets/avatars/gpt4o.jepg"},{name:"photo_createe",icon:"../assets/gpt-turbo-icon.svg"}]),T=async n=>{t.setInputMessage(n),r.push("/chat")},S=i(0);t.setModel(f.value[0].name);const E=n=>{S.value=n,t.setModel(f.value[n].name)};return(n,o)=>(l(),a(u,null,[e("div",O,[e("div",Y,[e("div",D,[o[0]||(o[0]=e("div",{class:"header-logo"},[e("img",{src:$,alt:"Poe Logo",class:"header-logo"})],-1)),e("div",H,[(l(!0),a(u,null,g(f.value,(s,d)=>(l(),a("button",{key:s.name,class:G(["model-button",{selected:S.value===d}]),onClick:me=>E(d)},[c(y,{modelName:s.name,showName:!0},null,8,["modelName"])],10,Q))),128)),e("button",{class:"model-button more-button",onClick:_},"更多模型")]),c(L,{onSendMessage:T,placeholder:"开始一个新的对话"})]),e("div",U,[e("div",X,[e("div",{class:"section-header"},[o[1]||(o[1]=e("h2",null,"官方模型",-1)),e("a",{href:"#",class:"see-all",onClick:_},"See all")]),e("div",Z,[(l(!0),a(u,null,g(B.value,s=>(l(),a("div",{key:s.name,class:"bot-item",onClick:d=>k(s.name)},[c(y,{modelName:s.name,showName:!1},null,8,["modelName"]),e("div",se,[e("h3",null,p(s.name),1),e("p",null,p(b(w)(s.name).desc.substring(0,30)+"..."),1)])],8,ee))),128))])]),e("div",te,[e("div",{class:"section-header"},[o[2]||(o[2]=e("h2",null,"为你准备的模型 ",-1)),e("a",{href:"#",class:"see-all",onClick:_},"See all")]),e("div",oe,[(l(!0),a(u,null,g(C.value,s=>(l(),a("div",{key:s.name,class:"bot-item",onClick:d=>k(s.name)},[c(y,{modelName:s.name,showName:!1},null,8,["modelName"]),e("div",ae,[e("h3",null,p(s.name),1),e("p",null,p(b(w)(s.name).desc.substring(0,30)+"..."),1)])],8,ne))),128))])])])])]),c(j,{isVisible:h.value,onClose:M},null,8,["isVisible"])],64))}}),_e=J(le,[["__scopeId","data-v-114c649f"]]);export{_e as default};
