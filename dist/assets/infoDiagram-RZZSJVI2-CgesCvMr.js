import{_ as e,l as o,F as i,k as n,G as p}from"./Chat-CzXMPopO.js";import{p as g}from"./mermaid-parser.core-QCSXH1LS.js";import"./SendMessageButton-B9fWAkGQ.js";import"./index-y4UV28p1.js";import"//at.alicdn.com/t/c/font_4565805_mtkshfnyzag.js";import"./min-BDCttEOm.js";import"./reduce-CdkMM4rx.js";import"./clone-2dwnmST8.js";var m={parse:e(async r=>{const a=await g("info",r);o.debug(a)},"parse")},v={version:p},d=e(()=>v.version,"getVersion"),c={getVersion:d},l=e((r,a,s)=>{o.debug(`rendering info diagram
`+r);const t=i(a);n(t,100,400,!0),t.append("g").append("text").attr("x",100).attr("y",40).attr("class","version").attr("font-size",32).style("text-anchor","middle").text(`v${s}`)},"draw"),f={draw:l},D={parser:m,db:c,renderer:f};export{D as diagram};