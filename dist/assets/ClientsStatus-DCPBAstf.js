import{a7 as j,a8 as q,a9 as Z,aa as d,ab as U,ac as ee,ad as te,ae,af as K,ag as se,T as oe,h as F,r as p,P as N,o as G,w as g,R as b,K as f,n as m,m as L,z,ah as ne,y as P,F as J,J as Y,q as _,S as I,ai as re,aj as le,ak as ce,al as ie,L as h,C as Q,t as ue,v as de,D as ve,O as S,x as H,p as ge,am as fe}from"./index-BPoRKTUO.js";import"//at.alicdn.com/t/c/font_4565805_mtkshfnyzag.js";const k=(s,e)=>new j(s).setAlpha(e).toRgbString(),$=(s,e)=>new j(s).lighten(e).toHexString(),he=s=>{const e=q(s,{theme:"dark"});return{1:e[0],2:e[1],3:e[2],4:e[3],5:e[6],6:e[5],7:e[4],8:e[6],9:e[5],10:e[4]}},pe=(s,e)=>{const a=s||"#000",t=e||"#fff";return{colorBgBase:a,colorTextBase:t,colorText:k(t,.85),colorTextSecondary:k(t,.65),colorTextTertiary:k(t,.45),colorTextQuaternary:k(t,.25),colorFill:k(t,.18),colorFillSecondary:k(t,.12),colorFillTertiary:k(t,.08),colorFillQuaternary:k(t,.04),colorBgElevated:$(a,12),colorBgContainer:$(a,8),colorBgLayout:$(a,0),colorBgSpotlight:$(a,26),colorBorder:$(a,26),colorBorderSecondary:$(a,19)}},_e=(s,e)=>{const a=Object.keys(Z).map(o=>{const c=q(s[o],{theme:"dark"});return new Array(10).fill(1).reduce((y,T,l)=>(y[`${o}-${l+1}`]=c[l],y),{})}).reduce((o,c)=>(o=d(d({},o),c),o),{}),t=e??U(s);return d(d(d({},t),a),ee(s,{generateColorPalettes:he,generateNeutralColorPalettes:pe}))};function me(s){const{sizeUnit:e,sizeStep:a}=s,t=a-2;return{sizeXXL:e*(t+10),sizeXL:e*(t+6),sizeLG:e*(t+2),sizeMD:e*(t+2),sizeMS:e*(t+1),size:e*t,sizeSM:e*t,sizeXS:e*(t-1),sizeXXS:e*(t-1)}}const ye=(s,e)=>{const a=e??U(s),t=a.fontSizeSM,o=a.controlHeight-4;return d(d(d(d(d({},a),me(e??s)),te(t)),{controlHeight:o}),ae(d(d({},a),{controlHeight:o})))};function ke(){const[s,e,a]=se();return{theme:s,token:e,hashId:a}}const Se={defaultConfig:K,defaultSeed:K.token,useToken:ke,defaultAlgorithm:U,darkAlgorithm:_e,compactAlgorithm:ye},Te=oe,xe=Te+"/api/v1";async function Ce(s,e,a,t=null,o=null){s=xe+s,t&&(s+="?"+new URLSearchParams(t).toString());try{return(await fetch(s,{method:e,headers:a,body:o?JSON.stringify(o):void 0})).json()}catch(c){console.error("Error:",c)}}async function W(s,e,a=null,t=null){return Ce(s,e,{"Content-Type":"application/json"},a,t)}const we={class:"header-content"},Me={class:"value-display"},De={key:1,class:"stored-value"},$e={class:"button-container"},A="SJ_API_KEY",ze=F({__name:"HeaderComponent",setup(s){const e=p(""),a=p(""),t=p(!1),o=p(!1),c=N(()=>{const n=e.value;return n.length<=4?n:n.length<=8?n.slice(0,4)+"*".repeat(n.length-4):n.slice(0,4)+"****..."}),y=N(()=>e.value?"重置秘钥":"输入秘钥"),T=()=>{const n=localStorage.getItem(A);n?(e.value=n,V()):l()},l=()=>{t.value=!0},i=()=>{t.value=!1,a.value=""},x=()=>{if(a.value.trim()){localStorage.setItem(A,a.value),e.value=a.value,a.value="",t.value=!1,h.success("秘钥保存成功");try{V()}catch{}}else h.error("请输入秘钥")},C=()=>{localStorage.removeItem(A),e.value="",h.success("秘钥重置成功")},w=()=>{e.value?C():l()},u=n=>{const r=new Date,v=new Date(n);if(isNaN(v.getTime()))return"无效的过期时间";const M=v.getTime()-r.getTime();if(M<0)return"已经过期";const B=Math.floor(M/(1e3*60*60*24)),E=Math.floor(M%(1e3*60*60*24)/(1e3*60*60)),R=Math.floor(M%(1e3*60*60)/(1e3*60));let D="";return B>0&&(D+=`${B}天`),(E>0||B>0)&&(D+=`${E}小时`),D+=`${R}分钟`,D},V=async()=>{o.value=!0;try{const n=await W("/api_key/get_information/"+e.value,"GET");if(n.is_key_valid){const v=String(n.expire_time),M=n.usage_limit,B=n.current_usage,E=M-B;if(v=="Never expire")h.success("秘钥未激活， 等待激活后显示过期时间。");else{const R=u(v),D=new Date(v.replace(" ","T")),X=Math.ceil((D.getTime()-new Date().getTime())/(1e3*60*60*24));X<=7&&h.warning(`秘钥即将过期，剩余${X}天`),h.success(`剩余有效期：${R}`)}h.info(`剩余使用积分：${E}`)}else h.error("秘钥无效， 请输入有效的秘钥"),localStorage.removeItem(A),e.value="",a.value=""}catch(n){console.error(n),h.error("获取信息失败")}finally{o.value=!1}};return G(()=>{T()}),(n,r)=>(g(),b(z(ie),{class:"header"},{default:f(()=>[m("div",we,[m("div",Me,[e.value?(g(),L(J,{key:0},[o.value?(g(),b(z(ne),{key:0})):(g(),L("span",De,"存储秘钥: "+P(c.value),1))],64)):Y("",!0),m("div",$e,[_(z(re),{class:"custom-button",size:"small",onClick:w},{default:f(()=>[I(P(y.value),1)]),_:1})])])]),_(z(ce),{visible:t.value,"onUpdate:visible":r[1]||(r[1]=v=>t.value=v),title:"输入新秘钥",onOk:x,onCancel:i},{default:f(()=>[_(z(le),{value:a.value,"onUpdate:value":r[0]||(r[0]=v=>a.value=v),placeholder:"请输入秘钥"},null,8,["value"])]),_:1},8,["visible"])]),_:1}))}}),Ie=Q(ze,[["__scopeId","data-v-2f8f0c72"]]),be={class:"content-wrapper"},Be={class:"header"},Le={class:"theme-toggle-container"},Ve=["innerHTML"],Ee={key:1,class:"account-list"},Ae=F({__name:"Index",setup(s){const e=ue();de();const a=p(!0),t=p(!1),o=p(`
  <p>
    1、POE账号是积分制，不存在速率限制，在该账号积分使用完毕之前均可使用，<span class="highlight">请注意您的积分消耗速度</span>，即使在有效期内，<strong>积分消耗完后也将无法使用，需要重新续费增加积分</strong>。<br><br>
    2、<span class="highlight">请注意您的秘钥有效期</span>，<strong>秘钥过期后将无法使用</strong>，续费会重置积分，不会累积。
  </p>
`),c=p([]),y=p(!1);ve(t,l=>{console.log("Theme changed:",l?"Dark":"Light")});const T=l=>{const i=l.idx,x=l.type;e.push({path:"/login",query:{client_idx:String(i),client_type:x}})};return N(()=>l=>l.is_session_login?"#87d068":l.type==="normal"?"#2db7f5":l.usage<10&&l.status!=="cd"?"#ffff00":"#f50"),G(async()=>{const l=async()=>{try{const u=await W("/clients_status","GET");return u&&u.length>0?(c.value=u,y.value=u.length>=10,a.value=!1,!0):!1}catch(u){return console.error("Error loading data:",u),!1}};let C=0;const w=async()=>{await l()||(C++,C<10?setTimeout(w,2e3):(a.value=!1,h.error("加载数据失败，请刷新页面重试")))};w()}),(l,i)=>{const x=S("a-switch"),C=S("a-spin"),w=S("a-tag"),u=S("a-statistic"),V=S("a-card"),n=S("a-divider");return g(),L("div",{class:H(["account-pool",{"dark-theme":t.value}])},[m("div",be,[m("div",Be,[m("div",Le,[_(x,{checked:t.value,"onUpdate:checked":i[0]||(i[0]=r=>t.value=r)},{checkedChildren:f(()=>i[1]||(i[1]=[I("🌙")])),unCheckedChildren:f(()=>i[2]||(i[2]=[I("☀️")])),_:1},8,["checked"])]),m("div",{class:H(["notice",{dark:t.value}])},[m("div",{innerHTML:o.value},null,8,Ve)],2)]),a.value?(g(),b(C,{key:0})):(g(),L("div",Ee,[(g(!0),L(J,null,ge(c.value,r=>(g(),b(V,{key:r.id,hoverable:"",bordered:!1,class:H(["account-card",{dark:t.value,"card-plus":r.type==="plus","card-normal":r.type==="normal","card-cd":r.status==="cd"}]),onClick:v=>T(r)},{extra:f(()=>[_(w,{color:r.type==="normal"?"#2db7f5":"#f50"},{default:f(()=>[I(P(r.type),1)]),_:2},1032,["color"])]),default:f(()=>[I(" "+P(r.id)+" ",1),_(u,{title:"该账号剩余可用积分",value:r.usage,"value-style":{color:"#3f8600"}},null,8,["value"]),_(u,{title:"状态",value:r.status==="cd"?"冷却":"可用","value-style":{color:r.status==="cd"?"#cf1322":"#3f8600"}},null,8,["value","value-style"])]),_:2},1032,["class","onClick"]))),128))])),y.value?(g(),b(n,{key:2,dashed:"",style:{"font-size":"14px","margin-top":"20px"}},{default:f(()=>i[3]||(i[3]=[I(" 上拉加载更多 ")])),_:1})):Y("",!0)])],2)}}}),Pe=Q(Ae,[["__scopeId","data-v-fa79074c"]]),Re={style:{"margin-top":"40px"}},O="isDarkTheme",Ue=F({__name:"ClientsStatus",setup(s){const e=localStorage.getItem(O),a=p(e==="true"),t={algorithm:Se.darkAlgorithm},o=c=>{a.value=c,localStorage.setItem(O,String(c))};return(c,y)=>{const T=S("a-message-provider");return g(),b(z(fe),{theme:a.value?t:void 0},{default:f(()=>[_(T,null,{default:f(()=>[_(Ie)]),_:1}),m("div",Re,[_(Pe,{isDarkTheme:a.value,onChangeIsDarkTheme:o},null,8,["isDarkTheme"])])]),_:1},8,["theme"])}}});export{Ue as default};