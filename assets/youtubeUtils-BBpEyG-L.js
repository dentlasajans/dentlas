import{c}from"./index-0O9z8cEy.js";/**
 * @license lucide-react v0.546.0 - ISC
 *
 * This source code is licensed under the ISC license.
 * See the LICENSE file in the root directory of this source tree.
 */const n=[["rect",{width:"18",height:"18",x:"3",y:"3",rx:"2",ry:"2",key:"1m3agn"}],["circle",{cx:"9",cy:"9",r:"2",key:"af1f0g"}],["path",{d:"m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21",key:"1xmnt7"}]],r=c("image",n),o=t=>{const e=t.match(/(?:youtu\.be\/|youtube\.com\/(?:embed\/|v\/|watch\?v=|watch\?.+&v=))((\w|-){11})/);return e?e[1]:null},s=t=>o(t)!==null,m=t=>{const e=o(t);return e?`https://www.youtube.com/embed/${e}`:t},i=t=>{const e=o(t);return e?`https://img.youtube.com/vi/${e}/hqdefault.jpg`:""},d=async t=>{try{return(await(await fetch(`https://noembed.com/embed?url=${encodeURIComponent(t)}`)).json()).title||""}catch{return""}};export{r as I,i as a,d as f,m as g,s as i};
