import{a0 as c,Y as u,a3 as d,W as f,X as i,a4 as p,a5 as l,Z as y,k as v}from"./index-7gtwGELg.js";function b(n,e,r,a){var t=-1,s=n==null?0:n.length;for(a&&s&&(r=n[++t]);++t<s;)r=e(r,n[t],t,n);return r}function g(n){return typeof n=="function"?n:c}function R(n,e){var r=u(n)?d:f;return r(n,g(e))}function P(n,e){var r=[];return f(n,function(a,t,s){e(a,t,s)&&r.push(a)}),r}function A(n,e){var r=u(n)?p:P;return r(n,i(e))}var w=Object.prototype,E=w.hasOwnProperty;function F(n,e){return n!=null&&E.call(n,e)}function H(n,e){return n!=null&&l(n,e,F)}function O(n,e){return y(e,function(r){return n[r]})}function I(n){return n==null?[]:O(n,v(n))}function M(n){return n===void 0}function k(n,e,r,a,t){return t(n,function(s,h,o){r=a?(a=!1,s):e(r,s,h,o)}),r}function U(n,e,r){var a=u(n)?b:k,t=arguments.length<3;return a(n,i(e),r,t,f)}export{R as a,P as b,g as c,A as f,H as h,M as i,U as r,I as v};
