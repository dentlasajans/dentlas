import{c as r}from"./index-Cf1biaHR.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const c=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],i=r("image",c),o=e=>{const t=e.match(/\/file\/d\/([a-zA-Z0-9_-]+)/)||e.match(/\/d\/([a-zA-Z0-9_-]+)/)||e.match(/[?&]id=([a-zA-Z0-9_-]+)/);return t?t[1]:null},n=e=>e.includes("drive.google.com"),s=e=>{try{const t=o(e);if(t)return`https://drive.google.com/file/d/${t}/preview`}catch(t){console.error(t)}return e.replace("/view","/preview")},m=e=>"https://images.unsplash.com/photo-1626814026160-2237a95fc5a0?auto=format&fit=crop&w=800&q=80";export{i as I,m as a,s as g,n as i};
