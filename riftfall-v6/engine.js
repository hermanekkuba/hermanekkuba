'use strict';
/* Native WebGL2 renderer; no network, libraries or external assets. */
const RF={};
(()=>{
const canvas=document.getElementById('scene');
const gl=canvas.getContext('webgl2',{antialias:true,alpha:false,powerPreference:'high-performance'});
if(!gl){document.getElementById('overlay').innerHTML='<div class="modal"><h2>3D grafika není dostupná</h2><p>Otevři soubor v aktuálním Chrome nebo Edge se zapnutou hardwarovou akcelerací. Hra vyžaduje WebGL 2.</p></div>';throw Error('WebGL2 unavailable')}
const VS=`#version 300 es
precision highp float;
layout(location=0) in vec3 position;layout(location=1) in vec3 normal;layout(location=2) in vec3 color;layout(location=3) in float material;
uniform mat4 pv;uniform mat4 lightPV;out vec3 P;out vec3 N;out vec3 C;out float M;out vec4 SP;
void main(){P=position;N=normal;C=color;M=material;SP=lightPV*vec4(position,1.);gl_Position=pv*vec4(position,1.);}`;
const FS=`#version 300 es
precision highp float;
in vec3 P;in vec3 N;in vec3 C;in float M;in vec4 SP;uniform vec3 eye;uniform sampler2D shadowMap;uniform bool shadows;uniform int biome;uniform vec2 torchPositions[4];out vec4 frag;
float hash(vec2 p){return fract(sin(dot(p,vec2(127.1,311.7)))*43758.5453);}
float noise(vec2 p){vec2 i=floor(p),f=fract(p);f=f*f*(3.-2.*f);return mix(mix(hash(i),hash(i+vec2(1,0)),f.x),mix(hash(i+vec2(0,1)),hash(i+vec2(1)),f.x),f.y);}
void main(){
vec3 n=normalize(N),c=C;float rough=1.;
if(M<-.5){vec2 q=P.xz*.85;vec2 tile=floor(q);vec2 f=fract(q);float edge=min(min(f.x,1.-f.x),min(f.y,1.-f.y));float grain=noise(P.xz*9.);float moss=smoothstep(.53,.8,noise(P.xz*.42)+noise(P.xz*2.)*.14);
c=mix(vec3(.15,.20,.20),vec3(.24,.28,.24),hash(tile));c*=.88+grain*.22;c=mix(c,vec3(.09,.17,.075),moss*.78);c*=mix(.54,1.,smoothstep(.016,.055,edge));float crack=abs(noise(P.xz*4.)-.49);c*=mix(.70,1.,smoothstep(.005,.02,crack));
if(biome==0){float river=1.-smoothstep(1.9,3.5,abs(P.x+P.z-5.));float path=1.-smoothstep(1.3,2.5,min(abs(P.x),abs(P.z)));c=mix(vec3(.08,.18,.065)+noise(P.xz*2.)*.035,c,path);c=mix(c,vec3(.055,.21,.25)+noise(P.xz*3.)*.025,river*.9);}
if(biome==1){float ice=smoothstep(.4,.8,noise(P.xz*.35));c=mix(vec3(.55,.64,.7),vec3(.19,.35,.46),ice*.65);c*=.9+grain*.12;c*=mix(.68,1.,smoothstep(.008,.04,edge));}
if(biome==2){float path=1.-smoothstep(1.,2.7,min(abs(P.x+P.z*.4),abs(P.x-P.z*.6)));c=mix(vec3(.07,.095,.075),vec3(.19,.14,.20),path);c*=.85+grain*.22;float corruption=smoothstep(.5,.85,noise(P.xz*.3));c+=vec3(.045,.0,.06)*corruption;}
rough=.9;
}else if(M<.1){c*=.92+noise(P.xz*7.+P.y*3.)*.15;}
vec3 l=normalize(vec3(-.6,1.,.45));float diffuse=max(0.,dot(n,l));
float shadow=1.;if(shadows&&M<.9){vec3 s=SP.xyz/SP.w*.5+.5;if(s.x>0.&&s.x<1.&&s.y>0.&&s.y<1.){float blocked=0.;float bias=max(.0012,.003*(1.-diffuse));for(int x=-1;x<=1;x++)for(int y=-1;y<=1;y++){float d=texture(shadowMap,s.xy+vec2(float(x),float(y))/2048.).r;blocked+=s.z-bias>d?1.:0.;}shadow=1.-blocked/9.*.68;}}
vec3 ambient=mix(vec3(.19,.24,.25),vec3(.37,.43,.40),n.y*.5+.5);vec3 lit=c*(ambient+vec3(1.,.90,.70)*diffuse*shadow*.82);
vec3 view=normalize(eye-P),halfway=normalize(l+view);float spec=pow(max(0.,dot(n,halfway)),28.)*.12*shadow;lit+=spec;
float torch=0.;for(int i=0;i<4;i++)torch+=2.4/(1.+dot(P.xz-torchPositions[i],P.xz-torchPositions[i])*1.4);lit+=c*vec3(1.,.45,.13)*torch;
float rift=2.4/(1.+dot(P.xz,P.xz)*.75);lit+=c*vec3(.12,.7,.67)*rift;
if(M>.9)lit=c*1.65;float fog=1.-exp(-distance(eye,P)*.004);lit=mix(lit,(biome==1?vec3(.13,.22,.32):biome==2?vec3(.065,.065,.12):vec3(.08,.17,.14)),fog);lit=lit/(lit+vec3(.8));lit=pow(lit,vec3(1./2.2));frag=vec4(lit,1.);
}`;
const DVS=`#version 300 es
precision highp float;layout(location=0)in vec3 position;uniform mat4 pv;void main(){gl_Position=pv*vec4(position,1.);}`;
const DFS=`#version 300 es
precision highp float;void main(){}`;
function shader(type,source){const s=gl.createShader(type);gl.shaderSource(s,source);gl.compileShader(s);if(!gl.getShaderParameter(s,gl.COMPILE_STATUS))throw Error(gl.getShaderInfoLog(s));return s}
function program(v,f){const p=gl.createProgram();gl.attachShader(p,shader(gl.VERTEX_SHADER,v));gl.attachShader(p,shader(gl.FRAGMENT_SHADER,f));gl.linkProgram(p);if(!gl.getProgramParameter(p,gl.LINK_STATUS))throw Error(gl.getProgramInfoLog(p));return p}
const main=program(VS,FS),depth=program(DVS,DFS);
const sub=(a,b)=>a.map((v,i)=>v-b[i]),dot=(a,b)=>a.reduce((s,v,i)=>s+v*b[i],0),cross=(a,b)=>[a[1]*b[2]-a[2]*b[1],a[2]*b[0]-a[0]*b[2],a[0]*b[1]-a[1]*b[0]],norm=a=>{const d=Math.hypot(...a)||1;return a.map(v=>v/d)};
function multiply(a,b){const o=new Float32Array(16);for(let c=0;c<4;c++)for(let r=0;r<4;r++)for(let k=0;k<4;k++)o[c*4+r]+=a[k*4+r]*b[c*4+k];return o}
function lookAt(eye,at){const z=norm(sub(eye,at)),x=norm(cross([0,1,0],z)),y=cross(z,x);return new Float32Array([x[0],y[0],z[0],0,x[1],y[1],z[1],0,x[2],y[2],z[2],0,-dot(x,eye),-dot(y,eye),-dot(z,eye),1])}
function perspective(fov,aspect,near,far){const f=1/Math.tan(fov/2);return new Float32Array([f/aspect,0,0,0,0,f,0,0,0,0,(far+near)/(near-far),-1,0,0,2*far*near/(near-far),0])}
function ortho(l,r,b,t,n,f){return new Float32Array([2/(r-l),0,0,0,0,2/(t-b),0,0,0,0,-2/(f-n),0,-(r+l)/(r-l),-(t+b)/(t-b),-(f+n)/(f-n),1])}
class Builder{
 constructor(){this.v=[]}
 tri(a,b,c,color,mat=0){const n=norm(cross(sub(b,a),sub(c,a)));for(const p of [a,b,c])this.v.push(...p,...n,...color,mat)}
 quad(a,b,c,d,color,mat=0){this.tri(a,b,c,color,mat);this.tri(a,c,d,color,mat)}
 box(x,y,z,sx,sy,sz,color,mat=0){const a=x-sx/2,b=x+sx/2,c=y-sy/2,d=y+sy/2,e=z-sz/2,f=z+sz/2;this.quad([a,c,f],[b,c,f],[b,d,f],[a,d,f],color,mat);this.quad([b,c,e],[a,c,e],[a,d,e],[b,d,e],color,mat);this.quad([b,c,f],[b,c,e],[b,d,e],[b,d,f],color,mat);this.quad([a,c,e],[a,c,f],[a,d,f],[a,d,e],color,mat);this.quad([a,d,f],[b,d,f],[b,d,e],[a,d,e],color,mat);this.quad([a,c,e],[b,c,e],[b,c,f],[a,c,f],color,mat)}
 cone(x,y,z,r,h,color,sides=7,top=0,mat=0){for(let i=0;i<sides;i++){const a=i*Math.PI*2/sides,b=(i+1)*Math.PI*2/sides;const p=[x+Math.cos(a)*r,y,z+Math.sin(a)*r],q=[x+Math.cos(b)*r,y,z+Math.sin(b)*r],u=[x+Math.cos(a)*top,y+h,z+Math.sin(a)*top],v=[x+Math.cos(b)*top,y+h,z+Math.sin(b)*top];this.quad(q,p,u,v,color,mat);this.tri([x,y+h,z],v,u,color,mat);this.tri([x,y,z],p,q,color,mat)}}
 sphere(x,y,z,sx,sy,sz,color,mat=0){const n=7,m=4;for(let j=0;j<m;j++)for(let i=0;i<n;i++){const point=(u,v)=>{const a=u*Math.PI*2/n,b=v*Math.PI/m;return[x+Math.cos(a)*Math.sin(b)*sx,y+Math.cos(b)*sy,z+Math.sin(a)*Math.sin(b)*sz]};this.quad(point(i,j),point(i+1,j),point(i+1,j+1),point(i,j+1),color,mat)}}
 ring(x,y,z,r,width,color,mat=1,sides=40){for(let i=0;i<sides;i++){const a=i*Math.PI*2/sides,b=(i+1)*Math.PI*2/sides;this.quad([x+Math.cos(a)*r,y,z+Math.sin(a)*r],[x+Math.cos(b)*r,y,z+Math.sin(b)*r],[x+Math.cos(b)*(r+width),y,z+Math.sin(b)*(r+width)],[x+Math.cos(a)*(r+width),y,z+Math.sin(a)*(r+width)],color,mat)}}
 add(model,x,y,z,angle=0,scale=1){const c=Math.cos(angle),s=Math.sin(angle),v=model.v;for(let i=0;i<v.length;i+=10){this.v.push(x+(v[i]*c+v[i+2]*s)*scale,y+v[i+1]*scale,z+(-v[i]*s+v[i+2]*c)*scale,v[i+3]*c+v[i+5]*s,v[i+4],-v[i+3]*s+v[i+5]*c,v[i+6],v[i+7],v[i+8],v[i+9])}}
}
function buffer(){const vao=gl.createVertexArray(),vbo=gl.createBuffer();gl.bindVertexArray(vao);gl.bindBuffer(gl.ARRAY_BUFFER,vbo);for(let i=0;i<4;i++){gl.enableVertexAttribArray(i);gl.vertexAttribPointer(i,i===3?1:3,gl.FLOAT,false,40,i*12)}return{vao,vbo,count:0}}
const stat=buffer(),dyn=buffer();
function upload(target,b,usage){gl.bindBuffer(gl.ARRAY_BUFFER,target.vbo);gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(b.v),usage);target.count=b.v.length/10}
const shadow=gl.createTexture();gl.bindTexture(gl.TEXTURE_2D,shadow);gl.texImage2D(gl.TEXTURE_2D,0,gl.DEPTH_COMPONENT24,2048,2048,0,gl.DEPTH_COMPONENT,gl.UNSIGNED_INT,null);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MIN_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_MAG_FILTER,gl.NEAREST);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_S,gl.CLAMP_TO_EDGE);gl.texParameteri(gl.TEXTURE_2D,gl.TEXTURE_WRAP_T,gl.CLAMP_TO_EDGE);const fbo=gl.createFramebuffer();gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);gl.framebufferTexture2D(gl.FRAMEBUFFER,gl.DEPTH_ATTACHMENT,gl.TEXTURE_2D,shadow,0);gl.drawBuffers([gl.NONE]);gl.readBuffer(gl.NONE);const shadowOK=gl.checkFramebufferStatus(gl.FRAMEBUFFER)===gl.FRAMEBUFFER_COMPLETE;gl.bindFramebuffer(gl.FRAMEBUFFER,null);
const lightPV=multiply(ortho(-42,42,-42,42,1,130),lookAt([-35,60,30],[0,0,0]));
const loc={pv:gl.getUniformLocation(main,'pv'),lightPV:gl.getUniformLocation(main,'lightPV'),eye:gl.getUniformLocation(main,'eye'),shadows:gl.getUniformLocation(main,'shadows'),torches:gl.getUniformLocation(main,'torchPositions[0]'),biome:gl.getUniformLocation(main,'biome'),shadowMap:gl.getUniformLocation(main,'shadowMap'),depthPV:gl.getUniformLocation(depth,'pv')};
let quality=true,biome=0,torches=[-8,-5,8,-5,-8,6,8,6];
function render(b,eye,target){const tx=Math.round(target[0]*8)/8,tz=Math.round(target[2]*8)/8;const lightPV=multiply(ortho(-34,34,-34,34,1,130),lookAt([tx-35,60,tz+30],[tx,0,tz]));const ratio=Math.min(devicePixelRatio||1,quality?1.7:1);const w=Math.round(canvas.clientWidth*ratio),h=Math.round(canvas.clientHeight*ratio);if(canvas.width!==w||canvas.height!==h){canvas.width=w;canvas.height=h}upload(dyn,b,gl.DYNAMIC_DRAW);gl.enable(gl.DEPTH_TEST);gl.disable(gl.CULL_FACE);
function draw(){for(const v of[stat,dyn]){gl.bindVertexArray(v.vao);gl.drawArrays(gl.TRIANGLES,0,v.count)}}
if(quality&&shadowOK){gl.bindFramebuffer(gl.FRAMEBUFFER,fbo);gl.viewport(0,0,2048,2048);gl.clear(gl.DEPTH_BUFFER_BIT);gl.useProgram(depth);gl.uniformMatrix4fv(loc.depthPV,false,lightPV);gl.enable(gl.POLYGON_OFFSET_FILL);gl.polygonOffset(1,1);draw();gl.disable(gl.POLYGON_OFFSET_FILL)}
gl.bindFramebuffer(gl.FRAMEBUFFER,null);gl.viewport(0,0,w,h);gl.clearColor(.08,.15,.18,1);gl.clear(gl.COLOR_BUFFER_BIT|gl.DEPTH_BUFFER_BIT);gl.useProgram(main);const pv=multiply(perspective(.66,w/h,.2,150),lookAt(eye,target));gl.uniformMatrix4fv(loc.pv,false,pv);gl.uniformMatrix4fv(loc.lightPV,false,lightPV);gl.uniform3fv(loc.eye,eye);gl.uniform1i(loc.shadows,quality&&shadowOK);gl.uniform1i(loc.biome,biome);gl.uniform2fv(loc.torches,torches);gl.activeTexture(gl.TEXTURE0);gl.bindTexture(gl.TEXTURE_2D,shadow);gl.uniform1i(loc.shadowMap,0);draw();
}
Object.assign(RF,{Builder,render,setStatic:b=>upload(stat,b,gl.STATIC_DRAW),setQuality:q=>quality=q,setBiome:i=>biome=i,setTorches:v=>torches=v.flat(),math:{multiply,lookAt,perspective,ortho},shaders:{VS,FS,DVS,DFS}});
})();
