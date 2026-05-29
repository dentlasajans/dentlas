import{c}from"./index-B7y582Lx.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const o=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],a=c("image",o),r=t=>{const e=t.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)||t.match(/\/d\/([a-zA-Z0-9_-]+)/)||t.match(/[?&]id=([a-zA-Z0-9_-]+)/);return e?e[1]:null},n=t=>t.includes("drive.google.com"),s=t=>{try{const e=r(t);if(e)return`https://drive.google.com/file/d/${e}/preview`}catch(e){console.error(e)}return t.replace("/view","/preview")},m=t=>{try{const e=r(t);if(e)return`https://drive.google.com/thumbnail?id=${e}&sz=w800-h600`}catch{}return"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80"};export{a as I,m as a,s as g,n as i};
