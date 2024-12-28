import{m as tt,c as et,a as nt,u as it,s as st,i as at,b as rt,p as G,d as lt,e as ot,f as F,g as R}from"./chunk-REEJFE46-DlK5t-GO.js";import{c as ct,a as M,s as dt}from"./chunk-NGC4727B-2SGlv8Jx.js";import{_ as g,l as s,d as m,j as T,u as ft,Q as ut,R as $,S as H,T as W,v as ht,e as z,U as J,V as B,W as gt}from"./Chat-C9f0yEPa.js";import{G as V}from"./graph-CTt8dfoK.js";import{l as wt}from"./layout-Bx5aaVaM.js";import{w as S}from"./json-D4A_Nm-l.js";import"./SendMessageButton-B4BIf7W_.js";import"./index-Dw27YMp-.js";import"//at.alicdn.com/t/c/font_4565805_mtkshfnyzag.js";import"./reduce-CAJGmYJX.js";import"./min-BOpl9zSm.js";import"./clone-B5zZgYSn.js";var u={},x={},q={},yt=g(()=>{x={},q={},u={}},"clear"),L=g((e,t)=>(s.trace("In isDescendant",t," ",e," = ",x[t].includes(e)),!!x[t].includes(e)),"isDescendant"),bt=g((e,t)=>(s.info("Descendants of ",t," is ",x[t]),s.info("Edge is ",e),e.v===t||e.w===t?!1:x[t]?x[t].includes(e.v)||L(e.v,t)||L(e.w,t)||x[t].includes(e.w):(s.debug("Tilt, ",t,",not in descendants"),!1)),"edgeInCluster"),Q=g((e,t,n,l)=>{s.warn("Copying children of ",e,"root",l,"data",t.node(e),l);const i=t.children(e)||[];e!==l&&i.push(e),s.warn("Copying (nodes) clusterId",e,"nodes",i),i.forEach(a=>{if(t.children(a).length>0)Q(a,t,n,l);else{const r=t.node(a);s.info("cp ",a," to ",l," with parent ",e),n.setNode(a,r),l!==t.parent(a)&&(s.warn("Setting parent",a,t.parent(a)),n.setParent(a,t.parent(a))),e!==l&&a!==e?(s.debug("Setting parent",a,e),n.setParent(a,e)):(s.info("In copy ",e,"root",l,"data",t.node(e),l),s.debug("Not Setting parent for node=",a,"cluster!==rootId",e!==l,"node!==clusterId",a!==e));const f=t.edges(a);s.debug("Copying Edges",f),f.forEach(d=>{s.info("Edge",d);const h=t.edge(d.v,d.w,d.name);s.info("Edge data",h,l);try{bt(d,l)?(s.info("Copying as ",d.v,d.w,h,d.name),n.setEdge(d.v,d.w,h,d.name),s.info("newGraph edges ",n.edges(),n.edge(n.edges()[0]))):s.info("Skipping copy of edge ",d.v,"-->",d.w," rootId: ",l," clusterId:",e)}catch(b){s.error(b)}})}s.debug("Removing node",a),t.removeNode(a)})},"copy"),U=g((e,t)=>{const n=t.children(e);let l=[...n];for(const i of n)q[i]=e,l=[...l,...U(i,t)];return l},"extractDescendants"),k=g((e,t)=>{s.trace("Searching",e);const n=t.children(e);if(s.trace("Searching children of id ",e,n),n.length<1)return s.trace("This is a valid node",e),e;for(const l of n){const i=k(l,t);if(i)return s.trace("Found replacement for",e," => ",i),i}},"findNonClusterChild"),X=g(e=>!u[e]||!u[e].externalConnections?e:u[e]?u[e].id:e,"getAnchorId"),mt=g((e,t)=>{if(!e||t>10){s.debug("Opting out, no graph ");return}else s.debug("Opting in, graph ");e.nodes().forEach(function(n){e.children(n).length>0&&(s.warn("Cluster identified",n," Replacement id in edges: ",k(n,e)),x[n]=U(n,e),u[n]={id:k(n,e),clusterData:e.node(n)})}),e.nodes().forEach(function(n){const l=e.children(n),i=e.edges();l.length>0?(s.debug("Cluster identified",n,x),i.forEach(a=>{if(a.v!==n&&a.w!==n){const r=L(a.v,n),f=L(a.w,n);r^f&&(s.warn("Edge: ",a," leaves cluster ",n),s.warn("Descendants of XXX ",n,": ",x[n]),u[n].externalConnections=!0)}})):s.debug("Not a cluster ",n,x)});for(let n of Object.keys(u)){const l=u[n].id,i=e.parent(l);i!==n&&u[i]&&!u[i].externalConnections&&(u[n].id=i)}e.edges().forEach(function(n){const l=e.edge(n);s.warn("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(n)),s.warn("Edge "+n.v+" -> "+n.w+": "+JSON.stringify(e.edge(n)));let i=n.v,a=n.w;if(s.warn("Fix XXX",u,"ids:",n.v,n.w,"Translating: ",u[n.v]," --- ",u[n.w]),u[n.v]&&u[n.w]&&u[n.v]===u[n.w]){s.warn("Fixing and trixing link to self - removing XXX",n.v,n.w,n.name),s.warn("Fixing and trixing - removing XXX",n.v,n.w,n.name),i=X(n.v),a=X(n.w),e.removeEdge(n.v,n.w,n.name);const r=n.w+"---"+n.v;e.setNode(r,{domId:r,id:r,labelStyle:"",labelText:l.label,padding:0,shape:"labelRect",style:""});const f=structuredClone(l),d=structuredClone(l);f.label="",f.arrowTypeEnd="none",d.label="",f.fromCluster=n.v,d.toCluster=n.v,e.setEdge(i,r,f,n.name+"-cyclic-special"),e.setEdge(r,a,d,n.name+"-cyclic-special")}else if(u[n.v]||u[n.w]){if(s.warn("Fixing and trixing - removing XXX",n.v,n.w,n.name),i=X(n.v),a=X(n.w),e.removeEdge(n.v,n.w,n.name),i!==n.v){const r=e.parent(i);u[r].externalConnections=!0,l.fromCluster=n.v}if(a!==n.w){const r=e.parent(a);u[r].externalConnections=!0,l.toCluster=n.w}s.warn("Fix Replacing with XXX",i,a,n.name),e.setEdge(i,a,l,n.name)}}),s.warn("Adjusted Graph",S(e)),j(e,0),s.trace(u)},"adjustClustersAndEdges"),j=g((e,t)=>{var i,a;if(s.warn("extractor - ",t,S(e),e.children("D")),t>10){s.error("Bailing out");return}let n=e.nodes(),l=!1;for(const r of n){const f=e.children(r);l=l||f.length>0}if(!l){s.debug("Done, no node has children",e.nodes());return}s.debug("Nodes = ",n,t);for(const r of n)if(s.debug("Extracting node",r,u,u[r]&&!u[r].externalConnections,!e.parent(r),e.node(r),e.children("D")," Depth ",t),!u[r])s.debug("Not a cluster",r,t);else if(!u[r].externalConnections&&e.children(r)&&e.children(r).length>0){s.warn("Cluster without external connections, without a parent and with children",r,t);let d=e.graph().rankdir==="TB"?"LR":"TB";(a=(i=u[r])==null?void 0:i.clusterData)!=null&&a.dir&&(d=u[r].clusterData.dir,s.warn("Fixing dir",u[r].clusterData.dir,d));const h=new V({multigraph:!0,compound:!0}).setGraph({rankdir:d,nodesep:50,ranksep:50,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}});s.warn("Old graph before copy",S(e)),Q(r,e,h,r),e.setNode(r,{clusterNode:!0,id:r,clusterData:u[r].clusterData,labelText:u[r].labelText,graph:h}),s.warn("New graph after copy node: (",r,")",S(h)),s.debug("Old graph after copy",S(e))}else s.warn("Cluster ** ",r," **not meeting the criteria !externalConnections:",!u[r].externalConnections," no parent: ",!e.parent(r)," children ",e.children(r)&&e.children(r).length>0,e.children("D"),t),s.debug(u);n=e.nodes(),s.warn("New list of nodes",n);for(const r of n){const f=e.node(r);s.warn(" Now next level",r,f),f.clusterNode&&j(f.graph,t+1)}},"extractor"),K=g((e,t)=>{if(t.length===0)return[];let n=Object.assign(t);return t.forEach(l=>{const i=e.children(l),a=K(e,i);n=[...n,...a]}),n},"sorter"),vt=g(e=>K(e,e.children()),"sortNodesByHierarchy"),pt=g((e,t)=>{s.info("Creating subgraph rect for ",t.id,t);const n=m(),l=e.insert("g").attr("class","cluster"+(t.class?" "+t.class:"")).attr("id",t.id),i=l.insert("rect",":first-child"),a=B(n.flowchart.htmlLabels),r=l.insert("g").attr("class","cluster-label"),f=t.labelType==="markdown"?gt(r,t.labelText,{style:t.labelStyle,useHtmlLabels:a},n):r.node().appendChild(F(t.labelText,t.labelStyle,void 0,!0));let d=f.getBBox();if(B(n.flowchart.htmlLabels)){const c=f.children[0],o=T(f);d=c.getBoundingClientRect(),o.attr("width",d.width),o.attr("height",d.height)}const h=0*t.padding,b=h/2,y=t.width<=d.width+h?d.width+h:t.width;t.width<=d.width+h?t.diff=(d.width-t.width)/2-t.padding/2:t.diff=-t.padding/2,s.trace("Data ",t,JSON.stringify(t)),i.attr("style",t.style).attr("rx",t.rx).attr("ry",t.ry).attr("x",t.x-y/2).attr("y",t.y-t.height/2-b).attr("width",y).attr("height",t.height+h);const{subGraphTitleTopMargin:v}=J(n);a?r.attr("transform",`translate(${t.x-d.width/2}, ${t.y-t.height/2+v})`):r.attr("transform",`translate(${t.x}, ${t.y-t.height/2+v})`);const w=i.node().getBBox();return t.width=w.width,t.height=w.height,t.intersect=function(c){return R(t,c)},l},"rect"),xt=g((e,t)=>{const n=e.insert("g").attr("class","note-cluster").attr("id",t.id),l=n.insert("rect",":first-child"),i=0*t.padding,a=i/2;l.attr("rx",t.rx).attr("ry",t.ry).attr("x",t.x-t.width/2-a).attr("y",t.y-t.height/2-a).attr("width",t.width+i).attr("height",t.height+i).attr("fill","none");const r=l.node().getBBox();return t.width=r.width,t.height=r.height,t.intersect=function(f){return R(t,f)},n},"noteGroup"),St=g((e,t)=>{const n=m(),l=e.insert("g").attr("class",t.classes).attr("id",t.id),i=l.insert("rect",":first-child"),a=l.insert("g").attr("class","cluster-label"),r=l.append("rect"),f=a.node().appendChild(F(t.labelText,t.labelStyle,void 0,!0));let d=f.getBBox();if(B(n.flowchart.htmlLabels)){const c=f.children[0],o=T(f);d=c.getBoundingClientRect(),o.attr("width",d.width),o.attr("height",d.height)}d=f.getBBox();const h=0*t.padding,b=h/2,y=t.width<=d.width+t.padding?d.width+t.padding:t.width;t.width<=d.width+t.padding?t.diff=(d.width+t.padding*0-t.width)/2:t.diff=-t.padding/2,i.attr("class","outer").attr("x",t.x-y/2-b).attr("y",t.y-t.height/2-b).attr("width",y+h).attr("height",t.height+h),r.attr("class","inner").attr("x",t.x-y/2-b).attr("y",t.y-t.height/2-b+d.height-1).attr("width",y+h).attr("height",t.height+h-d.height-3);const{subGraphTitleTopMargin:v}=J(n);a.attr("transform",`translate(${t.x-d.width/2}, ${t.y-t.height/2-t.padding/3+(B(n.flowchart.htmlLabels)?5:3)+v})`);const w=i.node().getBBox();return t.height=w.height,t.intersect=function(c){return R(t,c)},l},"roundedWithTitle"),Nt=g((e,t)=>{const n=e.insert("g").attr("class",t.classes).attr("id",t.id),l=n.insert("rect",":first-child"),i=0*t.padding,a=i/2;l.attr("class","divider").attr("x",t.x-t.width/2-a).attr("y",t.y-t.height/2).attr("width",t.width+i).attr("height",t.height+i);const r=l.node().getBBox();return t.width=r.width,t.height=r.height,t.diff=-t.padding/2,t.intersect=function(f){return R(t,f)},n},"divider"),Et={rect:pt,roundedWithTitle:St,noteGroup:xt,divider:Nt},Y={},Ct=g((e,t)=>{s.trace("Inserting cluster");const n=t.shape||"rect";Y[t.id]=Et[n](e,t)},"insertCluster"),Tt=g(()=>{Y={}},"clear"),Z=g(async(e,t,n,l,i,a)=>{s.info("Graph in recursive render: XXX",S(t),i);const r=t.graph().rankdir;s.trace("Dir in recursive render - dir:",r);const f=e.insert("g").attr("class","root");t.nodes()?s.info("Recursive render XXX",t.nodes()):s.info("No nodes found for",t),t.edges().length>0&&s.trace("Recursive edges",t.edge(t.edges()[0]));const d=f.insert("g").attr("class","clusters"),h=f.insert("g").attr("class","edgePaths"),b=f.insert("g").attr("class","edgeLabels"),y=f.insert("g").attr("class","nodes");await Promise.all(t.nodes().map(async function(c){const o=t.node(c);if(i!==void 0){const p=JSON.parse(JSON.stringify(i.clusterData));s.info("Setting data for cluster XXX (",c,") ",p,i),t.setNode(i.id,p),t.parent(c)||(s.trace("Setting parent",c,i.id),t.setParent(c,i.id,p))}if(s.info("(Insert) Node XXX"+c+": "+JSON.stringify(t.node(c))),o!=null&&o.clusterNode){s.info("Cluster identified",c,o.width,t.node(c));const{ranksep:p,nodesep:E}=t.graph();o.graph.setGraph({...o.graph.graph(),ranksep:p,nodesep:E});const D=await Z(y,o.graph,n,l,t.node(c),a),N=D.elem;it(o,N),o.diff=D.diff||0,s.info("Node bounds (abc123)",c,o,o.width,o.x,o.y),st(N,o),s.warn("Recursive render complete ",N,o)}else t.children(c).length>0?(s.info("Cluster - the non recursive path XXX",c,o.id,o,t),s.info(k(o.id,t)),u[o.id]={id:k(o.id,t),node:o}):(s.info("Node - the non recursive path",c,o.id,o),await at(y,t.node(c),{config:a,dir:r}))})),t.edges().forEach(async function(c){const o=t.edge(c.v,c.w,c.name);s.info("Edge "+c.v+" -> "+c.w+": "+JSON.stringify(c)),s.info("Edge "+c.v+" -> "+c.w+": ",c," ",JSON.stringify(t.edge(c))),s.info("Fix",u,"ids:",c.v,c.w,"Translating: ",u[c.v],u[c.w]),await rt(b,o)}),t.edges().forEach(function(c){s.info("Edge "+c.v+" -> "+c.w+": "+JSON.stringify(c))}),s.info("Graph before layout:",JSON.stringify(S(t))),s.info("#############################################"),s.info("###                Layout                 ###"),s.info("#############################################"),s.info(t),wt(t),s.info("Graph after layout:",JSON.stringify(S(t)));let v=0;const{subGraphTitleTotalMargin:w}=J(a);return vt(t).forEach(function(c){const o=t.node(c);s.info("Position "+c+": "+JSON.stringify(t.node(c))),s.info("Position "+c+": ("+o.x,","+o.y,") width: ",o.width," height: ",o.height),o!=null&&o.clusterNode?(o.y+=w,G(o)):t.children(c).length>0?(o.height+=w,Ct(d,o),u[o.id].node=o):(o.y+=w/2,G(o))}),t.edges().forEach(function(c){const o=t.edge(c);s.info("Edge "+c.v+" -> "+c.w+": "+JSON.stringify(o),o),o.points.forEach(E=>E.y+=w/2);const p=lt(h,c,o,u,n,t,l);ot(o,p)}),t.nodes().forEach(function(c){const o=t.node(c);s.info(c,o.type,o.diff),o.type==="group"&&(v=o.diff)}),{elem:f,diff:v}},"recursiveRender"),kt=g(async(e,t,n,l,i)=>{tt(e,n,l,i),et(),nt(),Tt(),yt(),s.warn("Graph at first:",JSON.stringify(S(t))),mt(t),s.warn("Graph after:",JSON.stringify(S(t)));const a=m();await Z(e,t,l,i,void 0,a)},"render"),O=g(e=>z.sanitizeText(e,m()),"sanitizeText"),_={dividerMargin:10,padding:5,textHeight:10,curve:void 0},Dt=g(function(e,t,n,l){s.info("keys:",[...e.keys()]),s.info(e),e.forEach(function(i){var f,d;const r={shape:"rect",id:i.id,domId:i.domId,labelText:O(i.id),labelStyle:"",style:"fill: none; stroke: black",padding:((f=m().flowchart)==null?void 0:f.padding)??((d=m().class)==null?void 0:d.padding)};t.setNode(i.id,r),I(i.classes,t,n,l,i.id),s.info("setNode",r)})},"addNamespaces"),I=g(function(e,t,n,l,i){s.info("keys:",[...e.keys()]),s.info(e),[...e.values()].filter(a=>a.parent===i).forEach(function(a){var v,w;const r=a.cssClasses.join(" "),f=$(a.styles),d=a.label??a.id,h=0,y={labelStyle:f.labelStyle,shape:"class_box",labelText:O(d),classData:a,rx:h,ry:h,class:r,style:f.style,id:a.id,domId:a.domId,tooltip:l.db.getTooltip(a.id,i)||"",haveCallback:a.haveCallback,link:a.link,width:a.type==="group"?500:void 0,type:a.type,padding:((v=m().flowchart)==null?void 0:v.padding)??((w=m().class)==null?void 0:w.padding)};t.setNode(a.id,y),i&&t.setParent(a.id,i),s.info("setNode",y)})},"addClasses"),Xt=g(function(e,t,n,l){s.info(e),e.forEach(function(i,a){var o,p;const r=i,f="",d={labelStyle:"",style:""},h=r.text,b=0,v={labelStyle:d.labelStyle,shape:"note",labelText:O(h),noteData:r,rx:b,ry:b,class:f,style:d.style,id:r.id,domId:r.id,tooltip:"",type:"note",padding:((o=m().flowchart)==null?void 0:o.padding)??((p=m().class)==null?void 0:p.padding)};if(t.setNode(r.id,v),s.info("setNode",v),!r.class||!l.has(r.class))return;const w=n+a,c={id:`edgeNote${w}`,classes:"relation",pattern:"dotted",arrowhead:"none",startLabelRight:"",endLabelLeft:"",arrowTypeStart:"none",arrowTypeEnd:"none",style:"fill:none",labelStyle:"",curve:H(_.curve,W)};t.setEdge(r.id,r.class,c,w)})},"addNotes"),Bt=g(function(e,t){const n=m().flowchart;let l=0;e.forEach(function(i){var r;l++;const a={classes:"relation",pattern:i.relation.lineType==1?"dashed":"solid",id:ht(i.id1,i.id2,{prefix:"id",counter:l}),arrowhead:i.type==="arrow_open"?"none":"normal",startLabelRight:i.relationTitle1==="none"?"":i.relationTitle1,endLabelLeft:i.relationTitle2==="none"?"":i.relationTitle2,arrowTypeStart:A(i.relation.type1),arrowTypeEnd:A(i.relation.type2),style:"fill:none",labelStyle:"",curve:H(n==null?void 0:n.curve,W)};if(s.info(a,i),i.style!==void 0){const f=$(i.style);a.style=f.style,a.labelStyle=f.labelStyle}i.text=i.title,i.text===void 0?i.style!==void 0&&(a.arrowheadStyle="fill: #333"):(a.arrowheadStyle="fill: #333",a.labelpos="c",((r=m().flowchart)==null?void 0:r.htmlLabels)??m().htmlLabels?(a.labelType="html",a.label='<span class="edgeLabel">'+i.text+"</span>"):(a.labelType="text",a.label=i.text.replace(z.lineBreakRegex,`
`),i.style===void 0&&(a.style=a.style||"stroke: #333; stroke-width: 1.5px;fill:none"),a.labelStyle=a.labelStyle.replace("color:","fill:"))),t.setEdge(i.id1,i.id2,a,l)})},"addRelations"),Lt=g(function(e){_={..._,...e}},"setConf"),Rt=g(async function(e,t,n,l){s.info("Drawing class - ",t);const i=m().flowchart??m().class,a=m().securityLevel;s.info("config:",i);const r=(i==null?void 0:i.nodeSpacing)??50,f=(i==null?void 0:i.rankSpacing)??50,d=new V({multigraph:!0,compound:!0}).setGraph({rankdir:l.db.getDirection(),nodesep:r,ranksep:f,marginx:8,marginy:8}).setDefaultEdgeLabel(function(){return{}}),h=l.db.getNamespaces(),b=l.db.getClasses(),y=l.db.getRelations(),v=l.db.getNotes();s.info(y),Dt(h,d,t,l),I(b,d,t,l),Bt(y,d),Xt(v,d,y.length+1,b);let w;a==="sandbox"&&(w=T("#i"+t));const c=a==="sandbox"?T(w.nodes()[0].contentDocument.body):T("body"),o=c.select(`[id="${t}"]`),p=c.select("#"+t+" g");if(await kt(p,d,["aggregation","extension","composition","dependency","lollipop"],"classDiagram",t),ft.insertTitle(o,"classTitleText",(i==null?void 0:i.titleTopMargin)??5,l.db.getDiagramTitle()),ut(d,o,i==null?void 0:i.diagramPadding,i==null?void 0:i.useMaxWidth),!(i!=null&&i.htmlLabels)){const E=a==="sandbox"?w.nodes()[0].contentDocument:document,D=E.querySelectorAll('[id="'+t+'"] .edgeLabel .label');for(const N of D){const P=N.getBBox(),C=E.createElementNS("http://www.w3.org/2000/svg","rect");C.setAttribute("rx",0),C.setAttribute("ry",0),C.setAttribute("width",P.width),C.setAttribute("height",P.height),N.insertBefore(C,N.firstChild)}}},"draw");function A(e){let t;switch(e){case 0:t="aggregation";break;case 1:t="extension";break;case 2:t="composition";break;case 3:t="dependency";break;case 4:t="lollipop";break;default:t="none"}return t}g(A,"getArrowMarker");var _t={setConf:Lt,draw:Rt},qt={parser:ct,db:M,renderer:_t,styles:dt,init:g(e=>{e.class||(e.class={}),e.class.arrowMarkerAbsolute=e.arrowMarkerAbsolute,M.clear()},"init")};export{qt as diagram};