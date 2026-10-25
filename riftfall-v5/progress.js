'use strict';
(()=>{
const PROFILE_KEY='riftfall-profile-v1',SAVE_KEY='riftfall-save-v1';
const counters=['kills','elites','challenges','rounds','evolutions','hardRounds','noHitRounds'];
const achievements=[
{id:'first',name:'První krev',desc:'Eliminuj prvního nepřítele.',key:'kills',goal:1},
{id:'hundred',name:'Lovec roje',desc:'Celkem eliminuj 100 nepřátel.',key:'kills',goal:100},
{id:'thousand',name:'Postrach trhliny',desc:'Celkem eliminuj 1 000 nepřátel.',key:'kills',goal:1000},
{id:'elite',name:'Lovec elit',desc:'Poraz 25 elitních nepřátel.',key:'elites',goal:25},
{id:'clear',name:'První výprava',desc:'Dokonči první pětiminutové kolo.',key:'rounds',goal:1},
{id:'veteran',name:'Veterán',desc:'Celkem dokonči 5 kol.',key:'rounds',goal:5},
{id:'third',name:'Za druhou bránu',desc:'Dostaň se do třetího kola jedné výpravy.',key:'bestStage',goal:3},
{id:'hard',name:'Bez slitování',desc:'Dokonči kolo na HARD.',key:'hardRounds',goal:1},
{id:'maps',name:'Tři světy',desc:'Dokonči kolo na všech třech mapách.',key:'mapMask',goal:3,mask:true},
{id:'heroes',name:'Celá družina',desc:'Zahraj si za všechny čtyři hrdiny.',key:'heroMask',goal:4,mask:true},
{id:'evolve',name:'Nová forma',desc:'Vyviň svou zbraň.',key:'evolutions',goal:1},
{id:'challenge',name:'Zkouška odvahy',desc:'Dokonči celkem 3 oltářové výzvy.',key:'challenges',goal:3},
{id:'untouched',name:'Nedotknutelný',desc:'Dokonči kolo bez ztráty zdraví po zásahu.',key:'noHitRounds',goal:1}
];
const countBits=n=>{let c=0;while(n){c+=n&1;n>>>=1}return c};
const blankStats=()=>Object.fromEntries([...counters.map(k=>[k,0]),['bestStage',0],['mapMask',0],['heroMask',0]]);
const blankProfile=()=>({version:1,stats:blankStats(),unlocked:{},runs:Object.create(null)});
let available=true;
function read(key){try{return localStorage.getItem(key)}catch{available=false;return null}}
function write(key,value){try{localStorage.setItem(key,JSON.stringify(value));return true}catch{available=false;return false}}
function remove(key){try{localStorage.removeItem(key);return true}catch{available=false;return false}}
const isObj=v=>v&&typeof v==='object'&&!Array.isArray(v);
function num(v,min,max,label){if(typeof v!=='number'||!Number.isFinite(v)||v<min||v>max)throw Error('Neplatná hodnota: '+label);return v}
function integer(v,min,max,label){num(v,min,max,label);if(!Number.isInteger(v))throw Error('Neplatné celé číslo: '+label);return v}
function stats(value){const out=blankStats();if(!isObj(value))throw Error('Neplatné statistiky.');for(const k of counters)out[k]=integer(value[k]??0,0,1e12,k);out.bestStage=integer(value.bestStage??0,0,999,'kolo');out.mapMask=integer(value.mapMask??0,0,7,'mapy');out.heroMask=integer(value.heroMask??0,0,15,'hrdinové');return out}
function validateProfile(value){if(!isObj(value)||value.version!==1)throw Error('Nepodporovaný profil.');const out=blankProfile();out.stats=stats(value.stats);if(!isObj(value.unlocked)||!isObj(value.runs))throw Error('Neplatný profil.');for(const a of achievements)if(value.unlocked[a.id]!==undefined)out.unlocked[a.id]=num(value.unlocked[a.id],0,1e15,'achievement');for(const [id,run]of Object.entries(value.runs).slice(-100)){if(!/^[a-zA-Z0-9_-]{1,80}$/.test(id)||['__proto__','constructor','prototype'].includes(id))continue;out.runs[id]=stats(run)}return out}
function loadProfile(){try{const raw=read(PROFILE_KEY);return raw?validateProfile(JSON.parse(raw)):blankProfile()}catch{return blankProfile()}}
function sync(profile,runId,run){const previous=profile.runs[runId]||blankStats();for(const k of counters){profile.stats[k]+=Math.max(0,run[k]-previous[k]);previous[k]=Math.max(previous[k],run[k])}for(const k of ['bestStage']){profile.stats[k]=Math.max(profile.stats[k],run[k]);previous[k]=Math.max(previous[k],run[k])}for(const k of ['mapMask','heroMask']){profile.stats[k]|=run[k];previous[k]|=run[k]}profile.runs[runId]=previous;const ids=Object.keys(profile.runs);while(ids.length>100)delete profile.runs[ids.shift()];return unlock(profile)}
function unlock(profile){const added=[];for(const a of achievements){const value=a.mask?countBits(profile.stats[a.key]):profile.stats[a.key];if(value>=a.goal&&!profile.unlocked[a.id]){profile.unlocked[a.id]=Date.now();added.push(a)}}return added}
function mergeProfiles(a,b){const out=blankProfile();for(const k of [...counters,'bestStage'])out.stats[k]=Math.max(a.stats[k],b.stats[k]);for(const k of ['mapMask','heroMask'])out.stats[k]=a.stats[k]|b.stats[k];for(const def of achievements){const x=a.unlocked[def.id],y=b.unlocked[def.id];if(x||y)out.unlocked[def.id]=x&&y?Math.min(x,y):x||y}for(const src of[a.runs,b.runs])for(const[id,run]of Object.entries(src)){const prev=out.runs[id]||blankStats();for(const k of [...counters,'bestStage'])prev[k]=Math.max(prev[k],run[k]);for(const k of ['mapMask','heroMask'])prev[k]|=run[k];out.runs[id]=prev}const ids=Object.keys(out.runs);while(ids.length>100)delete out.runs[ids.shift()];unlock(out);return out}
function position(v,label){if(!isObj(v))throw Error('Neplatná pozice: '+label);num(v.x,-60,60,label);num(v.z,-60,60,label)}
function validateSave(s){if(!isObj(s)||s.version!==1||s.game!=='riftfall-campaign')throw Error('Tento soubor není uložená výprava RIFTFALL V.');if(!/^[a-zA-Z0-9_-]{1,80}$/.test(s.runId)||['__proto__','constructor','prototype'].includes(s.runId))throw Error('Neplatné ID výpravy.');integer(s.hero,0,3,'hrdina');integer(s.map,0,2,'mapa');integer(s.difficulty,0,1,'obtížnost');integer(s.stage,1,999,'kolo');if(!['playing','upgrade','round-clear'].includes(s.phase))throw Error('Neplatná fáze hry.');num(s.t,0,1e7,'čas kola');num(s.totalTime,0,1e10,'čas výpravy');integer(s.kills,0,1e12,'eliminace');integer(s.level,1,10000,'úroveň');num(s.xp,0,1e18,'XP');num(s.need,1,1e18,'potřebné XP');position(s.player,'hráč');for(const k of ['hp','max','speed','r'])num(s.player[k],k==='hp'?.001:.01,1e15,k);if(s.player.hp>s.player.max)throw Error('Zdraví přesahuje maximum.');for(const k of ['angle','walk'])num(s.player[k],-1e12,1e12,k);for(const k of ['dx','dz'])num(s.player[k],-1,1,k);num(s.player.inv,0,5,'nezranitelnost');num(s.player.speed,.1,100,'rychlost hráče');num(s.player.r,.1,2,'poloměr hráče');num(s.damage,.01,1e18,'poškození');num(s.interval,.05,10,'interval');integer(s.multi,1,6,'střely');integer(s.orbit,0,4,'čepele');num(s.magnet,.1,1e6,'magnet');num(s.regen,0,1e6,'regenerace');integer(s.weaponRank,0,10000,'vývoj');num(s.dashCD,0,10,'úskok');num(s.novaCD,0,20,'nova');integer(s.seed,0,4294967295,'seed');num(s.stageDamage,0,1e18,'zásahy');for(const k of ['hp','damage','speed','density','xp','power'])num(s.balance?.[k],.01,1e18,'obtížnost '+k);for(const k of ['bossAppeared','bossDefeated','epicAppeared','evolved'])if(typeof s[k]!=='boolean')throw Error('Neplatný stav '+k);if(!isObj(s.upgrades))throw Error('Neplatná výbava.');if(!Array.isArray(s.done)||s.done.length>3||s.done.some(v=>!Number.isInteger(v)||v<0||v>2))throw Error('Neplatné oltáře.');if(s.challenge!==null){integer(s.challenge?.index,0,2,'výzva');num(s.challenge.remaining,.001,20,'čas výzvy');num(s.challenge.spawn,-1,3,'výzva spawn')}
for(const [key,max]of[['enemies',200],['gems',500],['hostile',2000],['hazards',200]]){if(!Array.isArray(s[key])||s[key].length>max)throw Error('Neplatná kolekce '+key);for(const e of s[key])position(e,key)}
for(const e of s.enemies){integer(e.type,0,8,'nepřítel');for(const k of ['hp','max','speed','r'])num(e[k],.001,1e18,'nepřítel '+k);for(const k of ['angle','walk','cool','flash'])num(e[k],-1e10,1e10,'nepřítel '+k);num(e.speed,.01,30,'rychlost nepřítele');num(e.r,.1,4,'poloměr nepřítele');if(e.elite){num(e.eliteCD,-1,6,'elita');if(!['volley','impact'].includes(e.eliteSkill))throw Error('Neplatná elita.')}}
for(const g of s.gems)num(g.value,0,1e18,'kořist');for(const h of s.hostile){for(const k of ['vx','vz'])num(h[k],-100,100,'střela');num(h.life,.001,4,'život střely');num(h.damage,.001,1e12,'poškození střely')}
for(const h of s.hazards){if(!['nova','slam','elite'].includes(h.type))throw Error('Neplatná hrozba.');num(h.life,.001,2,'život hrozby');num(h.r,0,10,'dosah hrozby')}
if(s.pending!==null&&(!Array.isArray(s.pending)||s.pending.length!==3||s.pending.some(i=>!Number.isInteger(i)||i<0||i>7)||new Set(s.pending).size!==3))throw Error('Neplatná nabídka vylepšení.');if(s.phase==='upgrade'&&!s.pending)throw Error('Chybí nabídka vylepšení.');stats(s.runStats);return s}
Object.assign(RF,{progress:{PROFILE_KEY,SAVE_KEY,counters,achievements,countBits,blankStats,blankProfile,loadProfile,validateProfile,validateSave,mergeProfiles,sync,unlock,read,write,remove,available:()=>available}});
})();
