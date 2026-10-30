# RIFTFALL IX — Hero Sanctum

Samostatná 3D survival hra pro WebGL2. `index.html` načítá lokální moduly; `riftfall-v9.html` obsahuje vše v jediném offline souboru. Žádné externí závislosti nebo stahování hudby.

## Příprava výpravy
Nová úvodní obrazovka odděluje přípravu od bojiště. Vlastní 3D pódium ukazuje vybraného hrdinu, lze ho otáčet posuvníkem nebo zapnout jemné automatické otáčení. Zobrazují se základní statistiky a popis schopností. Každá mapa má vlastní vektorovou ilustraci, popis prostředí a rozměry; ilustrace je přehled stylu prostředí, nikoliv přesný plán překážek. Rozložení se přizpůsobuje užším obrazovkám. Uložení, achievementy, import a pokračování zůstávají dostupné.

## Léčení
Dříve běžný nepřítel: 4,5% šance na léčení; elita: zaručený drop; pickup: 28 HP.
Nyní NORMAL: běžný 1,5 %, elita 25 %, maximálně 4 léčivé předměty na zemi.
HARD: běžný 0,9 %, elita 16 %, maximálně 3 léčivé předměty.
Pickup doplní 16 % maximálních HP, nejvýše 22 HP. Starší už uložené předměty se zachovají; nové nepadají nad limit. Regenerace, odměny výzev a léčení z upgradů se nemění.

## Hudba
Původní 64taktová fantasy skladba, přibližně 3:03 při 84 BPM. Více částí a osmi melodických frází, harfa, flétna, smyčce, sbor, rohy, zvon a jemné perkuse. Nástroje jsou syntetizované pomocí vlastních harmonických průběhů; nejde o nahrávku orchestru. Prostorový dozvuk, stereo a komprese drží soubor malý a hlasitost pod kontrolou. V menu je aranžmá klidnější, v boji přibývá rytmus. Barva tóniny se mění podle prostředí. Nastavení hlasitosti/vypnutí se zachovává. Přehrávání vyžaduje uživatelskou interakci podle pravidel prohlížeče; na skryté kartě se pozastaví.

## Ovládání a postup
WASD/šipky: pohyb, E: schopnost, SPACE: úskok, ESC: pauza. Uložené výpravy a achievementy zůstávají na stejné adrese ve stejném prohlížeči. Doporučená záloha: export JSON.

Ověření: regresní herní testy včetně opětovného načtení/importu, měřené četnosti dropů, limity zásob, výběr hrdinů/map a ovládání náhledu; simulace celého hudebního aranžmá včetně limitu hlasů a nastavení; nativní OpenGL ES test shaderů, stínů a instancování. Interaktivní kontrola skutečného prohlížeče nebyla v tomto prostředí dostupná.
