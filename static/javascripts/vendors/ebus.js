(()=>{var o=Object.create;var s=Object.defineProperty;var p=Object.getOwnPropertyDescriptor;var g=Object.getOwnPropertyNames;var m=Object.getPrototypeOf,c=Object.prototype.hasOwnProperty;var x=r=>s(r,"__esModule",{value:!0});var d=(r,t)=>()=>(t||r((t={exports:{}}).exports,t),t.exports);var w=(r,t,l)=>{if(t&&typeof t=="object"||typeof t=="function")for(let e of g(t))!c.call(r,e)&&e!=="default"&&s(r,e,{get:()=>t[e],enumerable:!(l=p(t,e))||l.enumerable});return r},b=r=>w(x(s(r!=null?o(m(r)):{},"default",r&&r.__esModule&&"default"in r?{get:()=>r.default,enumerable:!0}:{value:r,enumerable:!0})),r);var f=d((y,a)=>{"use strict";a.exports=(r,t)=>{let l=(e,i)=>typeof r=="function"?r(e,i):null;return{all:t=t||new Map,json:()=>Array.from(t.entries()),sub:(e,i)=>{if(typeof i!="function")return;let u=t.get(e);u&&u.push(i)||t.set(e,[i])},unsub:(e,i)=>{if(!i&&t.delete(e))return;let u=t.get(e);if(u)for(;u.indexOf(i)>-1;)u.splice(u.indexOf(i),1)},pub:(e,i)=>{(t.get(e)||[]).slice().map(u=>u(i)),(t.get("*")||[]).slice().map(u=>u(e,i))},set:(e,i,u=0)=>{if(typeof value!="function")return t.set(e,{value:i,expiration:u!==0?new Date().getTime()+parseInt(u):0}),l(e,i),t.has(e)},del:e=>{let i=t.delete(e);return i&&l(e,null),i},get:(e,i=null)=>t.has(e)?t.get(e).expiration===0||t.get(e).expiration>new Date().getTime()?t.get(e).value:(t.delete(e),l(e,null),i):i}}});var n=b(f());window.mitt=(0,n.default)();})();