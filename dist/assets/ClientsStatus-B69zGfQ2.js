import{a7 as J,a8 as Y,a9 as te,aa as d,ab as F,ac as ae,ad as se,ae as oe,af as O,ag as ne,T as q,h as K,r as f,P as H,o as G,w as v,R as z,K as p,n as m,m as V,z as M,ah as re,y as A,F as Q,J as W,q as _,S as b,ai as le,aj as ce,ak as ie,al as ue,L as h,C as Z,t as de,v as ve,D as pe,O as T,x as U,p as ge,am as he}from"./index-BI-xII2M.js";import"//at.alicdn.com/t/c/font_4565805_mtkshfnyzag.js";const S=(o,e)=>new J(o).setAlpha(e).toRgbString(),I=(o,e)=>new J(o).lighten(e).toHexString(),fe=o=>{const e=Y(o,{theme:"dark"});return{1:e[0],2:e[1],3:e[2],4:e[3],5:e[6],6:e[5],7:e[4],8:e[6],9:e[5],10:e[4]}},_e=(o,e)=>{const a=o||"#000",t=e||"#fff";return{colorBgBase:a,colorTextBase:t,colorText:S(t,.85),colorTextSecondary:S(t,.65),colorTextTertiary:S(t,.45),colorTextQuaternary:S(t,.25),colorFill:S(t,.18),colorFillSecondary:S(t,.12),colorFillTertiary:S(t,.08),colorFillQuaternary:S(t,.04),colorBgElevated:I(a,12),colorBgContainer:I(a,8),colorBgLayout:I(a,0),colorBgSpotlight:I(a,26),colorBorder:I(a,26),colorBorderSecondary:I(a,19)}},me=(o,e)=>{const a=Object.keys(te).map(n=>{const c=Y(o[n],{theme:"dark"});return new Array(10).fill(1).reduce((y,x,r)=>(y[`${n}-${r+1}`]=c[r],y),{})}).reduce((n,c)=>(n=d(d({},n),c),n),{}),t=e??F(o);return d(d(d({},t),a),ae(o,{generateColorPalettes:fe,generateNeutralColorPalettes:_e}))};function ye(o){const{sizeUnit:e,sizeStep:a}=o,t=a-2;return{sizeXXL:e*(t+10),sizeXL:e*(t+6),sizeLG:e*(t+2),sizeMD:e*(t+2),sizeMS:e*(t+1),size:e*t,sizeSM:e*t,sizeXS:e*(t-1),sizeXXS:e*(t-1)}}const ke=(o,e)=>{const a=e??F(o),t=a.fontSizeSM,n=a.controlHeight-4;return d(d(d(d(d({},a),ye(e??o)),se(t)),{controlHeight:n}),oe(d(d({},a),{controlHeight:n})))};function Se(){const[o,e,a]=ne();return{theme:o,token:e,hashId:a}}const Te={defaultConfig:O,defaultSeed:O.token,useToken:Se,defaultAlgorithm:F,darkAlgorithm:me,compactAlgorithm:ke},xe=q,Ce=xe+"/api/v1";async function we(o,e,a,t=null,n=null){o=Ce+o,t&&(o+="?"+new URLSearchParams(t).toString());try{return(await fetch(o,{method:e,headers:a,body:n?JSON.stringify(n):void 0})).json()}catch(c){console.error("Error:",c)}}async function ee(o,e,a=null,t=null){return we(o,e,{"Content-Type":"application/json"},a,t)}const $e={class:"header-content"},De={class:"value-display"},Ie={key:1,class:"stored-value"},Me={class:"button-container"},P="SJ_API_KEY",be=K({__name:"HeaderComponent",setup(o){const e=f(""),a=f(""),t=f(!1),n=f(!1),c=H(()=>{const s=e.value;return s.length<=4?s:s.length<=8?s.slice(0,4)+"*".repeat(s.length-4):s.slice(0,4)+"****..."}),y=H(()=>e.value?"重置秘钥":"输入秘钥"),x=()=>{const s=localStorage.getItem(P);s?(e.value=s,L()):r()},r=()=>{t.value=!0},i=()=>{t.value=!1,a.value=""},C=async()=>{const s=localStorage.getItem("SJ_API_KEY"),g=`${q}/api/v1/device_verification/device/${s}/update`;try{const l=await fetch(g,{method:"POST",headers:{"Content-Type":"application/json"}});if(!l.ok)throw new Error(`Network response was not ok: ${l.statusText}`);const k=await l.json();console.log(k)}catch(l){console.error("Device status check failed:",l)}},w=()=>{if(a.value.trim()){localStorage.setItem(P,a.value),e.value=a.value,a.value="",t.value=!1,h.success("秘钥保存成功");try{L()}catch{}try{C()}catch{}}else h.error("请输入秘钥")},$=()=>{localStorage.removeItem(P),e.value="",h.success("秘钥重置成功")},u=()=>{e.value?$():r()},N=s=>{const g=new Date,l=new Date(s);if(isNaN(l.getTime()))return"无效的过期时间";const k=l.getTime()-g.getTime();if(k<0)return"已经过期";const B=Math.floor(k/(1e3*60*60*24)),E=Math.floor(k%(1e3*60*60*24)/(1e3*60*60)),R=Math.floor(k%(1e3*60*60)/(1e3*60));let D="";return B>0&&(D+=`${B}天`),(E>0||B>0)&&(D+=`${E}小时`),D+=`${R}分钟`,D},L=async()=>{n.value=!0;try{const s=await ee("/api_key/get_information/"+e.value,"GET");if(s.is_key_valid){const l=String(s.expire_time),k=s.usage_limit,B=s.current_usage,E=k-B;if(l=="Never expire")h.success("秘钥未激活， 等待激活后显示过期时间。");else{const R=N(l),D=new Date(l.replace(" ","T")),j=Math.ceil((D.getTime()-new Date().getTime())/(1e3*60*60*24));j<=7&&h.warning(`秘钥即将过期，剩余${j}天`),h.success(`剩余有效期：${R}`)}h.info(`剩余使用积分：${E}`)}else h.error("秘钥无效， 请输入有效的秘钥"),localStorage.removeItem(P),e.value="",a.value=""}catch(s){console.error(s),h.error("获取信息失败")}finally{n.value=!1}};return G(()=>{x()}),(s,g)=>(v(),z(M(ue),{class:"header"},{default:p(()=>[m("div",$e,[m("div",De,[e.value?(v(),V(Q,{key:0},[n.value?(v(),z(M(re),{key:0})):(v(),V("span",Ie,"存储秘钥: "+A(c.value),1))],64)):W("",!0),m("div",Me,[_(M(le),{class:"custom-button",size:"small",onClick:u},{default:p(()=>[b(A(y.value),1)]),_:1})])])]),_(M(ie),{visible:t.value,"onUpdate:visible":g[1]||(g[1]=l=>t.value=l),title:"输入新秘钥",onOk:w,onCancel:i},{default:p(()=>[_(M(ce),{value:a.value,"onUpdate:value":g[0]||(g[0]=l=>a.value=l),placeholder:"请输入秘钥"},null,8,["value"])]),_:1},8,["visible"])]),_:1}))}}),ze=Z(be,[["__scopeId","data-v-113da9b4"]]),Be={class:"content-wrapper"},Ve={class:"header"},Le={class:"theme-toggle-container"},Ee=["innerHTML"],Pe={key:1,class:"account-list"},Ae=K({__name:"Index",setup(o){const e=de();ve();const a=f(!0),t=f(!1),n=f(`
  <p>
    1、POE账号是积分制，不存在速率限制，在该账号积分使用完毕之前均可使用，<span class="highlight">请注意您的积分消耗速度</span>，即使在有效期内，<strong>积分消耗完后也将无法使用，需要重新续费增加积分</strong>。<br><br>
    2、<span class="highlight">请注意您的秘钥有效期</span>，<strong>秘钥过期后将无法使用</strong>，续费会重置积分，不会累积。
  </p>
`),c=f([]),y=f(!1);pe(t,r=>{console.log("Theme changed:",r?"Dark":"Light")});const x=r=>{const i=r.idx,C=r.type;e.push({path:"/login",query:{client_idx:String(i),client_type:C}})};return H(()=>r=>r.is_session_login?"#87d068":r.type==="normal"?"#2db7f5":r.usage<10&&r.status!=="cd"?"#ffff00":"#f50"),G(async()=>{const r=async()=>{try{const u=await ee("/clients_status","GET");return u&&u.length>0?(c.value=u,y.value=u.length>=10,a.value=!1,!0):!1}catch(u){return console.error("Error loading data:",u),!1}};let w=0;const $=async()=>{await r()||(w++,w<10?setTimeout($,2e3):(a.value=!1,h.error("加载数据失败，请刷新页面重试")))};$()}),(r,i)=>{const C=T("a-switch"),w=T("a-spin"),$=T("a-tag"),u=T("a-statistic"),N=T("a-card"),L=T("a-divider");return v(),V("div",{class:U(["account-pool",{"dark-theme":t.value}])},[m("div",Be,[m("div",Ve,[m("div",Le,[_(C,{checked:t.value,"onUpdate:checked":i[0]||(i[0]=s=>t.value=s)},{checkedChildren:p(()=>i[1]||(i[1]=[b("🌙")])),unCheckedChildren:p(()=>i[2]||(i[2]=[b("☀️")])),_:1},8,["checked"])]),m("div",{class:U(["notice",{dark:t.value}])},[m("div",{innerHTML:n.value},null,8,Ee)],2)]),a.value?(v(),z(w,{key:0})):(v(),V("div",Pe,[(v(!0),V(Q,null,ge(c.value,s=>(v(),z(N,{key:s.id,hoverable:"",bordered:!1,class:U(["account-card",{dark:t.value,"card-plus":s.type==="plus","card-normal":s.type==="normal","card-cd":s.status==="cd"}]),onClick:g=>x(s)},{extra:p(()=>[_($,{color:s.type==="normal"?"#2db7f5":"#f50"},{default:p(()=>[b(A(s.type),1)]),_:2},1032,["color"])]),default:p(()=>[b(" "+A(s.id)+" ",1),_(u,{title:"该账号剩余可用积分",value:s.usage,"value-style":{color:"#3f8600"}},null,8,["value"]),_(u,{title:"状态",value:s.status==="cd"?"冷却":"可用","value-style":{color:s.status==="cd"?"#cf1322":"#3f8600"}},null,8,["value","value-style"])]),_:2},1032,["class","onClick"]))),128))])),y.value?(v(),z(L,{key:2,dashed:"",style:{"font-size":"14px","margin-top":"20px"}},{default:p(()=>i[3]||(i[3]=[b(" 上拉加载更多 ")])),_:1})):W("",!0)])],2)}}}),Ne=Z(Ae,[["__scopeId","data-v-fa79074c"]]),Re={style:{"margin-top":"40px"}},X="isDarkTheme",Fe=K({__name:"ClientsStatus",setup(o){const e=localStorage.getItem(X),a=f(e==="true"),t={algorithm:Te.darkAlgorithm},n=c=>{a.value=c,localStorage.setItem(X,String(c))};return(c,y)=>{const x=T("a-message-provider");return v(),z(M(he),{theme:a.value?t:void 0},{default:p(()=>[_(x,null,{default:p(()=>[_(ze)]),_:1}),m("div",Re,[_(Ne,{isDarkTheme:a.value,onChangeIsDarkTheme:n},null,8,["isDarkTheme"])])]),_:1},8,["theme"])}}});export{Fe as default};
