import{h as S,r as f,x as o,m as c,N as V,n as e,F as _,q as H,z as x,y as z,_ as R,O as I,o as K,P as N,Q as A,R as F,S as C,t as P,H as q,K as h,T as E,I as Q,B as W}from"./index-ByKTrOpW.js";const G={key:0,class:"active-plugins"},J={class:"active-plugins-list"},X=["src","alt"],Y={class:"active-plugin-name"},ee=["onClick"],se={class:"plugin-grid"},te=["onClick"],ae=["src","alt"],ne={class:"plugin-status"},le=S({__name:"PluginPanel",setup(T,{expose:L}){const l=f(!1),d=f([]),m=[{id:1,name:"联网搜索",description:"通过联网搜索，获取最新的信息和数据。",icon:"/path/to/weather-icon.png"},{id:2,name:"artifacts",description:"基于Vue3的artifacts， 支持交互式渲染",icon:"/path/to/bilibili-icon.png"}],b=v=>d.value.some(i=>i.id===v.id),k=v=>{const i=d.value.findIndex(n=>n.id===v.id);i===-1?d.value.push(v):d.value.splice(i,1)},y=()=>{l.value=!1};return L({isOpen:l,activePlugins:d}),(v,i)=>(o(),c(_,null,[l.value?(o(),c("div",{key:0,class:"overlay",onClick:y})):V("",!0),e("div",{class:z(["plugin-panel",{"panel-open":l.value}])},[e("div",{class:"panel-header"},[i[1]||(i[1]=e("h2",null,"Poe插件中心",-1)),e("button",{class:"close-button",onClick:y},i[0]||(i[0]=[e("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})],-1)]))]),d.value.length>0?(o(),c("div",G,[i[3]||(i[3]=e("h3",null,"已启用插件",-1)),e("div",J,[(o(!0),c(_,null,H(d.value,n=>(o(),c("div",{key:n.id,class:"active-plugin-item"},[e("img",{src:n.icon,alt:n.name,class:"active-plugin-icon"},null,8,X),e("span",Y,x(n.name),1),e("button",{class:"disable-button",onClick:M=>k(n)},i[2]||(i[2]=[e("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg"},[e("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})],-1)]),8,ee)]))),128))])])):V("",!0),e("div",se,[(o(),c(_,null,H(m,n=>e("div",{key:n.id,class:z(["plugin-item",{"plugin-active":b(n)}]),onClick:M=>k(n)},[e("img",{src:n.icon,alt:n.name,class:"plugin-icon"},null,8,ae),e("h3",null,x(n.name),1),e("p",null,x(n.description),1),e("div",ne,x(b(n)?"已启用":"点击启用"),1)],10,te)),64))])],2)],64))}}),ie=R(le,[["__scopeId","data-v-1122b92a"]]),oe=["placeholder","onKeyup"],ce={key:0,class:"file-preview"},re=["onClick"],de={key:0},ue=["src"],ve={key:1,class:"file-icon"},pe={class:"file-name"},ge={class:"button-group"},he={class:"addFiles","aria-label":"Add attachment"},me=["disabled"],fe="image/*,.pdf,.doc,.docx,.csv,.txt,.html,.htm",we=S({__name:"SendMessageButton",props:{placeholder:{},files:{},disabled:{type:Boolean}},emits:["sendMessage","addFiles","toggleMic","updateFileList"],setup(T,{emit:L}){const l=f([]),d=window.URL||window.webkitURL,m=L;I(l,t=>{m("updateFileList",t)},{deep:!0});const b=t=>{var r;const s=(r=t.clipboardData)==null?void 0:r.items;if(s)for(let a=0;a<s.length;a++){const g=s[a];if(g.type.indexOf("image")!==-1){const w=g.getAsFile();w&&v(w,d.createObjectURL(w))}}},k=()=>{h.warning("麦克风功能暂未开放")},y=t=>{var r;const s=(r=t.dataTransfer)==null?void 0:r.files;if(s)for(let a=0;a<s.length;a++)v(s[a])},v=(t,s)=>{if(l.value.length>=5){h.error("最多只能上传5个文件");return}const r=10*1024*1024;if(t.size>r){h.error("文件大小不能超过10MB");return}l.value.push({uid:Date.now().toString(),name:t.name,status:"done",originFileObj:t,url:s})},i=t=>{if(t.size>10485760)return h.error("文件大小不能超过10MB"),!1},n=t=>{const{file:s,fileList:r}=t;s.status==="done"?h.success(`${s.name} 上传成功`):s.status==="error"&&h.error(`${s.name} file upload failed.`);const a=r.map(g=>{const{url:w,...j}=g;return j});l.value=a,m("updateFileList",a)},M=t=>{l.value.splice(t,1),m("updateFileList",l.value)},O=({onSuccess:t})=>{setTimeout(()=>{t("ok")},0)},p=f(""),u=f(null),B=()=>{p.value.trim()&&(l.value=[],m("sendMessage",p.value),p.value="",E(()=>{u.value&&(u.value.style.height="auto",$())}))},U=()=>{p.value+=`
`},$=()=>{if(u.value){u.value.style.height="auto";const t=Math.min(Math.max(u.value.scrollHeight,24),150);u.value.style.height=`${t}px`}};K(()=>{u.value&&u.value.addEventListener("input",$)});const D=f(),Z=()=>{h.warning("插件功能暂未开放")};return(t,s)=>{const r=Q("a-upload");return o(),c(_,null,[e("div",{class:"input-container",onPaste:b,onDrop:C(y,["prevent"]),onDragover:s[2]||(s[2]=C(()=>{},["prevent"]))},[N(e("textarea",{"onUpdate:modelValue":s[0]||(s[0]=a=>p.value=a),placeholder:t.placeholder,class:"chat-input",onKeyup:[F(C(B,["exact"]),["enter"]),F(C(U,["shift","exact","prevent"]),["enter"])],ref_key:"textareaRef",ref:u},null,40,oe),[[A,p.value]]),l.value.length>0?(o(),c("div",ce,[(o(!0),c(_,null,H(l.value,(a,g)=>(o(),c("div",{key:g,class:"file-item"},[e("div",{class:"delete-icon",onClick:w=>M(g)},s[3]||(s[3]=[e("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",class:"delete-icon-svg"},[e("path",{d:"M19 6.41L17.59 5 12 10.59 6.41 5 5 6.41 10.59 12 5 17.59 6.41 19 12 13.41 17.59 19 19 17.59 13.41 12z"})],-1)]),8,re),a.type&&a.type.startsWith("image")?(o(),c("div",de,[e("img",{src:a.url||W(d).createObjectURL(a.originFileObj),alt:"Preview",class:"image-preview"},null,8,ue)])):(o(),c("div",ve,[s[4]||(s[4]=e("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",class:"file-icon-svg"},[e("path",{d:"M14 2H6c-1.1 0-1.99.9-1.99 2L4 20c0 1.1.89 2 1.99 2H18c1.1 0 2-.9 2-2V8l-6-6zm2 16H8v-2h8v2zm0-4H8v-2h8v2zm-3-5V3.5L18.5 9H13z"})],-1)),e("span",pe,x(a.name),1)]))]))),128))])):V("",!0),e("div",ge,[e("button",{class:"plugin-button",onClick:Z,"aria-label":"Open plugins"},s[5]||(s[5]=[e("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",class:"plugin-icon"},[e("path",{d:"M20.5 11H19V7c0-1.1-.9-2-2-2h-4V3.5C13 2.12 11.88 1 10.5 1S8 2.12 8 3.5V5H4c-1.1 0-1.99.9-1.99 2v3.8H3.5c1.49 0 2.7 1.21 2.7 2.7s-1.21 2.7-2.7 2.7H2V20c0 1.1.9 2 2 2h3.8v-1.5c0-1.49 1.21-2.7 2.7-2.7 1.49 0 2.7 1.21 2.7 2.7V22H17c1.1 0 2-.9 2-2v-4h1.5c1.38 0 2.5-1.12 2.5-2.5S21.88 11 20.5 11z"})],-1)])),e("button",he,[P(r,{"before-upload":i,accept:fe,"file-list":l.value,"onUpdate:fileList":s[1]||(s[1]=a=>l.value=a),"max-count":5,customRequest:O,onChange:n,"show-upload-list":!1},{default:q(()=>s[6]||(s[6]=[e("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",class:"add-icon"},[e("path",{"fill-rule":"evenodd","clip-rule":"evenodd",d:"M4 12a8 8 0 1 1 16 0 8 8 0 0 1-16 0Zm8-10C6.477 2 2 6.477 2 12s4.477 10 10 10 10-4.477 10-10S17.523 2 12 2Zm0 4a1 1 0 0 1 1 1v4h4a1 1 0 1 1 0 2h-4v4a1 1 0 1 1-2 0v-4H7a1 1 0 1 1 0-2h4V7a1 1 0 0 1 1-1Z"})],-1)])),_:1},8,["file-list"])]),e("button",{class:"mic-button",onClick:k,"aria-label":"Toggle microphone"},s[7]||(s[7]=[e("svg",{viewBox:"0 0 16 27",xmlns:"http://www.w3.org/2000/svg",class:"mic-icon"},[e("path",{"clip-rule":"evenodd",d:"M4.235 1.803C4.848.823 6.013 0 8 0c1.986 0 3.152.824 3.765 1.803a3.826 3.826 0 0 1 .568 1.836V3.664s0 .003-1 .003h1v10.666h-1 1v.028a1.823 1.823 0 0 1-.01.176 3.827 3.827 0 0 1-.558 1.66C11.152 17.177 9.986 18 8 18c-1.987 0-3.152-.824-3.765-1.803a3.828 3.828 0 0 1-.568-1.836V14.336s0-.003 1-.003h-1V3.667h1-1v-.028a2.004 2.004 0 0 1 .01-.176 3.827 3.827 0 0 1 .558-1.66Zm1.432 1.874.002-.036a1.828 1.828 0 0 1 .262-.778C6.152 2.51 6.653 2 8 2s1.848.51 2.069.863a1.83 1.83 0 0 1 .264.814v10.646l-.002.036a1.83 1.83 0 0 1-.262.778c-.221.353-.722.863-2.07.863-1.346 0-1.847-.51-2.068-.863a1.828 1.828 0 0 1-.264-.814V3.677Zm-4.334 4.99a1 1 0 0 1 1 1v4.666l.001.03a5.657 5.657 0 0 0 .087.725c.09.49.27 1.13.62 1.76a4.464 4.464 0 0 0 1.62 1.69c.76.457 1.827.795 3.339.795s2.579-.338 3.34-.795a4.464 4.464 0 0 0 1.62-1.69c.349-.63.528-1.27.62-1.76a5.642 5.642 0 0 0 .086-.724V9.667a1 1 0 1 1 2 0v4.666h-1 1v.035a3.958 3.958 0 0 1-.016.302 7.653 7.653 0 0 1-.104.783 7.85 7.85 0 0 1-.839 2.366 6.464 6.464 0 0 1-2.338 2.434c-.902.541-2.013.914-3.37 1.037v3.377h4.334a1 1 0 0 1 0 2H2.667a1 1 0 1 1 0-2H7v-3.378c-1.356-.122-2.467-.495-3.369-1.036a6.463 6.463 0 0 1-2.339-2.434 7.852 7.852 0 0 1-.838-2.366 7.66 7.66 0 0 1-.118-1.015 3.637 3.637 0 0 1-.002-.07v-.032s0-.003 1-.003h-1V9.667a1 1 0 0 1 1-1Z"})],-1)])),e("button",{class:"send-button",onClick:B,disabled:t.disabled||!p.value.trim(),"aria-label":"Send message"},s[8]||(s[8]=[e("svg",{viewBox:"0 0 24 24",xmlns:"http://www.w3.org/2000/svg",class:"send-icon"},[e("path",{d:"M4 13h14.09l-6.79 6.79a.996.996 0 1 0 1.41 1.41l8.5-8.5c.06-.06.09-.13.13-.2.03-.04.06-.08.08-.13a.91.91 0 0 0 .08-.37c0-.03-.01-.05-.01-.07-.01-.1-.02-.21-.06-.31a.955.955 0 0 0-.22-.33L12.72 2.8c-.2-.2-.45-.29-.71-.29-.26 0-.51.1-.71.29a.996.996 0 0 0 0 1.41L18.08 11H4c-.55 0-1 .45-1 1s.45 1 1 1Z"})],-1)]),8,me)])],32),P(ie,{ref_key:"pluginPanelRef",ref:D},null,512)],64)}}}),_e=R(we,[["__scopeId","data-v-3ce6bae2"]]);export{_e as S};
