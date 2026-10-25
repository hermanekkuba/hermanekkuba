# RIFTFALL III — Realms of the Rift

Třetí verze samostatné offline 3D survival arény. Nově nabízí 4 hrdiny, 3 volitelné mapy, miniony, jungle monstra, průlomového titána a tři mapové epické bossy.

## Spuštění na Windows

1. Stáhněte ZIP větve `riftfall-v3-realms` přes GitHub → **Code → Download ZIP**.
2. ZIP rozbalte přes **pravé tlačítko → Extrahovat vše**.
3. Otevřete složku **riftfall-v3**.
4. Dvojklikem spusťte **riftfall-v3.html** v aktuálním Chrome, Edge nebo Firefoxu.

Vše je v jediném HTML souboru. Není potřeba server, instalace ani internet. Prohlížeč musí podporovat WebGL 2 a mít zapnutou hardwarovou akceleraci.

Alternativně otevřete `index.html` vedle `engine.js`, `maps.js`, `actors.js`, `game.js` a `style.css`.

## Hrdinové

- **Rook:** nový střelec s opakovací puškou, rychlými kulkami a zábleskem hlavně. 95 HP, rychlost 6.7, poškození 19, interval střelby 0.23 s.
- **Kael:** vyvážený strážce, 110 HP.
- **Brann:** odolný bojovník, 180 HP.
- **Lyra:** rychlá čarodějka, 85 HP.

Útoky všech hrdinů míří automaticky na dostupný cíl. Rook se při střelbě otáčí k cíli. Zdi blokují pohyb, úskok i střelbu obou stran.

## Výběr mapy

Výběr hrdiny a mapy je na úvodní obrazovce. Kliknutí na mapu okamžitě přestaví 3D prostředí v pozadí. Mapy se liší geometrií, překážkami i grafikou, nejde jen o změnu barev.

| Mapa | Inspirace | Prostředí | Závěrečný boss |
| --- | --- | --- | --- |
| Zelené údolí | Summoner’s Rift | Travnatá jungle, řeka, stromy, kamenné stezky a ruiny | Vaelthar, starobylý drak |
| Mrazivá propast | Howling Abyss | Úzký most nad propastí, zasněžená dlažba, ledové krystaly, sněžení | Skaal, ledový leviatan |
| Prokletý hvozd | Twisted Treeline | Mrtvé stromy, temné stezky, fialová mlha a prokleté oltáře | Morgaath, pavoučí matka |

Řeka je mělká a průchozí. Do propasti kolem mostu vstoupit nelze. Velké stromy a ruiny blokují pohyb; drobná dekorace pohyb neblokuje.

## Nepřátelé

Vlastní stylizované modely inspirované známými rolemi a siluetami z League of Legends:

- Minion se štítem, mečem a barevnou kapucí.
- Kouzelník s holí, který střílí magické projektily.
- Kanónový minion s kolovým podvozkem a pomalými silnějšími střelami.
- Jungle vlk, žabí monstrum a dravec.
- Modrý a rudý golem s odlišnou září.
- Průlomový titán s velkým okem, který přichází po 1:50.
- Ohnivý drak, ledový leviatan a osminohá pavoučí matka, podle zvolené mapy.

Počet, statistiky a chování se liší podle typu. Kouzelníci a kanóny se při střelbě zastavují; ostatní nepřátelé hledají cestu k hráči. Závěreční bossové používají předem označený plošný úder, kterému lze uniknout.

## Cíl

Přežijte 5 minut a porazte mapového bosse, který vstupuje do arény po 4:30. Pokud je v 5:00 stále naživu, souboj pokračuje do jeho poražení. Za eliminace padají krystaly zkušeností, někdy léčení. Každá úroveň nabídne výběr ze tří vylepšení. Rekord se ukládá lokálně, pokud to prohlížeč umožní.

## Ovládání

- WASD / šipky: pohyb.
- Mezerník: úskok.
- E: nova.
- Esc: pauza, také automatická při přepnutí okna.
- Kolečko: přiblížení a oddálení kamery.
- 1 / 2 / 3: výběr vylepšení.
- Mobil: šipky a tlačítka na displeji.

Vpravo nahoře lze přepnout úspornou grafiku a zvuk. Hra obsahuje minimapu a původní systém vylepšení.

## Ověření

Prošly kontroly syntaxe, konečnosti a struktury modelů, kolizí pohybu, úskoku i projektilů, sběru zkušeností, vylepšení, smrti a vítězství. Ověřen je výběr všech čtyř hrdinů, Rookovy kulky a střelba nepřátel. Na každé mapě byly ověřeny spawny všech devíti herních kategorií a spojitost všech průchozích buněk navigace (2044 / 866 / 2044).

Všechny tři scény byly vykresleny přes OpenGL ES 3.2 včetně shaderů pro biomy a mapy stínů 2048 × 2048, bez GL chyb. Rozvržení a interakce v reálném prohlížeči nebyly v pracovním prostředí ověřeny.

Původní vlastní geometrie, procedurální povrchy a postavy. Neoficiální fanouškovský prototyp, bez propojení s Riot Games. Neobsahuje jejich stažené modely ani textury.
