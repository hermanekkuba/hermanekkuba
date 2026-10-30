'use strict';
(()=>{
let ctx,master,filter,timer=null,next=0,step=0,enabled=true,volume=.22,scene='menu',biome=0;const nodes=new Set();
function prefs(){try{const raw=localStorage.getItem('riftfall-audio-v1');if(raw){const p=JSON.parse(raw);enabled=p.enabled!==false;volume=Math.max(0,Math.min(1,Number.isFinite(p.volume)?p.volume:.22))}}catch{}}
function persist(){try{localStorage.setItem('riftfall-audio-v1',JSON.stringify({enabled,volume}))}catch{}}
function gain(){if(master&&ctx)master.gain.setTargetAtTime(enabled?volume*(scene==='playing'?.26:.13):0,ctx.currentTime,.15)}
function note(freq,at,duration,amplitude,type='sine'){const o=ctx.createOscillator(),v=ctx.createGain();o.type=type;o.frequency.setValueAtTime(freq,at);v.gain.setValueAtTime(.0001,at);v.gain.exponentialRampToValueAtTime(amplitude,at+.07);v.gain.exponentialRampToValueAtTime(.0001,at+duration);o.connect(v).connect(filter);o.start(at);o.stop(at+duration+.05);nodes.add(o);o.onended=()=>{nodes.delete(o);o.disconnect();v.disconnect()}}
function schedule(){if(!enabled||!ctx||ctx.state!=='running')return;if(next<ctx.currentTime-.5)next=ctx.currentTime+.05;const beat=60/(biome===1?72:biome===2?66:76);const roots=[45,41,48,43],arp=[0,7,12,15,12,7,3,7,0,10,15,19,15,10,7,3];while(next<ctx.currentTime+.5){const bar=Math.floor(step/16)%4,root=roots[bar]+(biome===2?-2:0);if(step%16===0){for(const n of[0,7,12])note(440*2**((root+n-69)/12),next,beat*7.8,.11,'triangle');note(440*2**((root-12-69)/12),next,beat*6,.2)}const m=root+24+arp[step%16];note(440*2**((m-69)/12),next,beat*1.2,step%4===0?.13:.075);if(scene==='playing'&&step%4===0)note(step%8===0?62:92,next,.18,.12,'sine');step++;next+=beat*.5}}
function start(){try{if(!ctx){ctx=new AudioContext();master=ctx.createGain();filter=ctx.createBiquadFilter();filter.type='lowpass';filter.frequency.value=2200;filter.connect(master).connect(ctx.destination);next=ctx.currentTime+.08}if(enabled&&ctx.state==='suspended')ctx.resume();if(!timer)timer=setInterval(schedule,180);gain();schedule();return true}catch{return false}}
function setEnabled(v){enabled=!!v;if(enabled)start();else{for(const o of nodes){try{o.stop()}catch{}}nodes.clear()}gain();persist();return enabled}
function setVolume(v){volume=Math.max(0,Math.min(1,v));gain();persist()}
function setScene(v,map){if(v!==scene||map!==biome){scene=v;biome=map;gain()}}
function suspend(){if(ctx?.state==='running')ctx.suspend()}
function resume(){if(ctx&&enabled)ctx.resume()}
prefs();Object.assign(RF,{music:{start,setEnabled,setVolume,setScene,suspend,resume,get enabled(){return enabled},get volume(){return volume}}});
})();
