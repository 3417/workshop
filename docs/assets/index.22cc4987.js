import{d as p,o as f,c as h,r as k,a as u,b as S,e as b,f as I,g as l,n as w,t as d,F as E,p as O,h as L,i as P,j as $,k as x}from"./vendor.7062e3b4.js";const A=function(){const n=document.createElement("link").relList;if(n&&n.supports&&n.supports("modulepreload"))return;for(const e of document.querySelectorAll('link[rel="modulepreload"]'))t(e);new MutationObserver(e=>{for(const o of e)if(o.type==="childList")for(const r of o.addedNodes)r.tagName==="LINK"&&r.rel==="modulepreload"&&t(r)}).observe(document,{childList:!0,subtree:!0});function s(e){const o={};return e.integrity&&(o.integrity=e.integrity),e.referrerpolicy&&(o.referrerPolicy=e.referrerpolicy),e.crossorigin==="use-credentials"?o.credentials="include":e.crossorigin==="anonymous"?o.credentials="omit":o.credentials="same-origin",o}function t(e){if(e.ep)return;e.ep=!0;const o=s(e);fetch(e.href,o)}};A();const B=p({setup(a){return(n,s)=>{const t=k("router-view");return f(),h(t)}}}),C="modulepreload",m={},F="/",N=function(n,s){return!s||s.length===0?n():Promise.all(s.map(t=>{if(t=`${F}${t}`,t in m)return;m[t]=!0;const e=t.endsWith(".css"),o=e?'[rel="stylesheet"]':"";if(document.querySelector(`link[href="${t}"]${o}`))return;const r=document.createElement("link");if(r.rel=e?"stylesheet":C,e||(r.as="script",r.crossOrigin=""),r.href=t,document.head.appendChild(r),e)return new Promise((i,c)=>{r.addEventListener("load",i),r.addEventListener("error",c)})})).then(()=>n())};var j=(a,n)=>{const s=a.__vccOpts||a;for(const[t,e]of n)s[t]=e;return s};const z=a=>(O("data-v-2f029e94"),a=a(),L(),a),R={class:"solar_form"},q={class:"solar_hit"},D={class:"solar_ple"},M=z(()=>l("span",null,"\u2014\u2014",-1)),T=p({setup(a){const n=u(""),s=u(""),t=u(""),e=u(""),o=u(0);p({name:"solar"});const r=()=>{fetch("https://picsum.photos/1920/1080?random").then(c=>{const{url:_}=c;n.value=_}).then(c=>{console.log(c)}).catch(function(c){console.log("Oops, error")})},i=()=>{fetch("https://v1.hitokoto.cn").then(c=>c.json()).then(c=>{const{hitokoto:_,from:g,from_who:y}=c;s.value=_,t.value=g,e.value=y}).catch(console.error)};return S(()=>{r(),i()}),o.value=window.setInterval(()=>{r(),i()},5*60*1e3),b(()=>{clearInterval(o.value)}),(c,_)=>(f(),I(E,null,[l("div",{class:"solar",style:w({background:`url(${n.value}) no-repeat`,backgroundSize:"100% 100%"})},null,4),l("div",R,[l("div",q,[l("p",null,d(s.value),1),l("p",D,[l("span",null,d(t.value?t.value:"\u672A\u77E5"),1),M,l("span",null,d(e.value?e.value:"\u672A\u77E5"),1)])])])],64))}});var v=j(T,[["__scopeId","data-v-2f029e94"]]),V=Object.freeze({__proto__:null,[Symbol.toStringTag]:"Module",default:v});const W=p({setup(a){return(n,s)=>(f(),h(v))}}),H=P({history:$(),routes:[{path:"/",component:W,meta:{title:"\u9996\u9875"}},{path:"/solar",name:"solar",component:()=>N(()=>Promise.resolve().then(function(){return V}),void 0),meta:{title:"\u6CF0\u7136\u5982\u8005"}}]}),K=x(B);K.use(H).mount("#app");
