'use strict';
(()=>{
const B=RF.Builder;
const maps=[
{id:'rift',name:'Zelené údolí',inspiration:'Summoner’s Rift',subtitle:'Řeka, jungle kempy a kamenné stezky',boss:'VAELTHAR · STAROBYLÝ DRAK',bossModel:'dragon',color:'#93dba0',obstacles:[[-10,-10,7,2,1.5],[10,-10,2,7,1.5],[-12,5,2,7,1.8],[12,6,7,2,1.8],[-4,13,7,2,1.5],[7,16,2,4,2.3]],torches:[[-7,-5],[8,-5],[-8,7],[8,9]]},
{id:'abyss',name:'Mrazivá propast',inspiration:'Howling Abyss',subtitle:'Zasněžený most nad ledovou propastí',boss:'SKAAL · LEDOVÝ LEVIATAN',bossModel:'frost',color:'#9cd6ff',obstacles:[[-7,-13,3,2,1.4],[7,-7,3,2,1.7],[-7,5,3,2,1.6],[7,12,3,2,1.6],[0,17,3,2,1.1]],torches:[[-9,-16],[9,-16],[-9,13],[9,13]]},
{id:'treeline',name:'Prokletý hvozd',inspiration:'Twisted Treeline',subtitle:'Mrtvé stromy, mlha a prokleté oltáře',boss:'MORGAATH · PAVOUČÍ MATKA',bossModel:'spider',color:'#c3a1ec',obstacles:[[-9,-8,6,2,1.3],[9,-9,2,6,1.5],[-10,8,2,6,1.7],[9,9,6,2,1.4],[0,16,5,2,1.4],[-17,-16,3,3,2.5],[17,16,3,3,2.5]],torches:[[-6,-5],[7,-5],[-7,7],[7,8]]}
];
function build(index){
const cfg=maps[index],b=new B(),obs=cfg.obstacles.map(([x,z,w,d,h])=>({x,z,w,d,h}));let seed=180+index;const rnd=()=>{seed=(Math.imul(seed,1664525)+1013904223)>>>0;return seed/4294967296},r=(a,c)=>a+rnd()*(c-a);
const stone=index===1?[.32,.4,.49]:index===2?[.19,.19,.25]:[.31,.36,.29],cap=index===1?[.72,.82,.88]:index===2?[.32,.28,.36]:[.46,.48,.37],moss=index===2?[.17,.12,.24]:[.15,.27,.10];
const free=(x,z,margin=.6)=>Math.hypot(x,z)>3&&!obs.some(o=>Math.abs(x-o.x)<o.w/2+margin&&Math.abs(z-o.z)<o.d/2+margin);
function crystal(x,y,z,col,h=1){b.cone(x,y,z,.25,h,col,5,.04,1)}
function tree(x,z,dead=false){obs.push({x,z,w:1.1,d:1.1,h:3.4,tree:true});b.cone(x,0,z,.4,2.7,dead?[.16,.12,.19]:[.22,.14,.07],7,.18);for(const s of[-1,1]){const branch=new B();branch.cone(0,0,0,.15,1.2,dead?[.23,.18,.28]:[.24,.16,.08],5,.02);b.add(branch,x+s*.3,1.8,z,s*.8);b.box(x+s*.7,2.5,z,.9,.16,.16,dead?[.2,.15,.24]:[.25,.17,.08])}if(dead){b.cone(x,2.7,z,.18,1.7,[.19,.14,.24],5,.02);b.box(x+.45,3,z,.9,.14,.16,[.2,.15,.24])}else{b.cone(x,1.8,z,1.7,2.4,[.10,.24,.10],7,.04);b.cone(x,3,z,1.25,2,[.15,.31,.13],7,.02)}}
if(index===1){b.box(0,-.4,0,23,.75,51,stone);b.quad([-11.2,0,-25],[-11.2,0,25],[11.2,0,25],[11.2,0,-25],stone,-1);obs.push({x:-18.1,z:0,w:14,d:51,h:0,void:true},{x:18.1,z:0,w:14,d:51,h:0,void:true});b.box(-19,-5,0,15,.3,65,[.03,.08,.15]);b.box(19,-5,0,15,.3,65,[.03,.08,.15]);for(const s of[-1,1])for(let z=-24;z<=24;z+=4){b.box(s*11.5,.65,z,.65,1.3,3.8,stone);b.box(s*11.5,1.4,z,1.2,.2,3.9,cap);b.box(s*11.5,1.1,z-1.8,1.2,2.2,1.2,stone);b.cone(s*12,-5,z,1.5,4,[.22,.35,.49],5,.1);if(z%8===0)crystal(s*11.5,2.2,z-1.8,[.3,.7,1],.7)}}else{b.box(0,-.4,0,52,.7,52,stone);b.quad([-25,0,-25],[-25,0,25],[25,0,25],[25,0,-25],stone,-1);for(const s of[-1,1])for(let i=-24;i<=24;i+=3){b.box(s*25,.5,i,.6,1,2.9,stone);b.box(i,.5,s*25,2.9,1,.6,stone)}
const locations=index===0?[[-18,-18],[-14,-17],[-20,-12],[-17,-4],[-19,10],[-14,16],[-8,20],[0,21],[14,18],[19,12],[18,1],[20,-7],[15,-18],[7,-20],[-3,-19]]:[[-18,-18],[-14,-17],[-20,-10],[-17,-2],[-19,10],[-14,17],[-7,20],[2,21],[15,18],[19,10],[18,1],[20,-8],[14,-18],[7,-20],[-4,-19],[-15,12],[15,-3]];for(const[x,z]of locations)tree(x,z,index===2)}
for(const o of obs){if(o.tree||o.void)continue;const rows=Math.ceil(o.h/.55),cols=Math.ceil(o.w/1.4);for(let j=0;j<rows;j++)for(let i=0;i<cols;i++)b.box(o.x-o.w/2+(i+.5)*o.w/cols,(j+.5)*.55,o.z,o.w/cols-.06,.49,o.d-.07,stone.map(v=>v+r(-.025,.025)));b.box(o.x,rows*.55+.05,o.z,o.w+.2,.2,o.d+.15,cap);if(index!==1)for(let i=0;i<6;i++)b.sphere(o.x+r(-o.w/2,o.w/2),rows*.55+.18,o.z+r(-o.d/2,o.d/2),.26,.08,.24,moss)}
for(const[x,z]of cfg.torches){obs.push({x,z,w:1.2,d:1.2,h:2.4,torch:true});b.box(x,.15,z,1.5,.3,1.5,stone);b.cone(x,.3,z,.45,1.9,stone,8,.32);b.cone(x,2.2,z,.55,.25,[.62,.42,.17],7,.28)}
for(let i=0;i<160;i++){const x=r(index===1?-10:-24,index===1?10:24),z=r(-24,24);if(!free(x,z,.3))continue;if(index===1){if(rnd()<.5)b.sphere(x,.1,z,r(.2,.5),.12,r(.2,.5),cap);else if(Math.abs(x)>8)crystal(x,.05,z,[.33,.67,.85],r(.3,.8))}else if(rnd()<.55){const a=r(0,6.28),h=r(.2,.5);b.tri([x-.15,0,z],[x+.15,0,z],[x+Math.sin(a)*.2,h,z+Math.cos(a)*.2],moss)}else b.sphere(x,.1,z,r(.12,.35),r(.08,.2),r(.12,.35),rnd()<.5?stone:moss)}
for(const[x,z]of(index===1?[[-8,-20],[8,20]]:[[-17,-7],[17,1],[-9,18],[14,-19]])){b.box(x,.12,z,1.5,.24,1.5,stone);crystal(x,.25,z,index===2?[.53,.2,.8]:[.13,.7,.64],1.1)}
if(index===2)for(const[x,z]of[[-15,0],[15,0]]){b.cone(x,.05,z,1.8,.25,stone,12,1.8);b.ring(x,.32,z,1.4,.09,[.58,.19,.75]);crystal(x,.3,z,[.6,.21,.9],1.1)}
b.cone(0,.03,0,1.8,.15,stone,24,1.8);b.ring(0,.2,0,1.4,.06,index===2?[.6,.2,.8]:[.12,.7,.65]);RF.setStatic(b);RF.setBiome(index);RF.setTorches(cfg.torches);return{cfg,obstacles:obs,world:b};
}
RF.maps=maps;RF.buildMap=build;
})();
