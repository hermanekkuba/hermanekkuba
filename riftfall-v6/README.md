# RIFTFALL VI — Paths of Power

Šestá verze offline 3D survival arény přidává vlastní základní útok a dvě schopnosti každého hrdiny, 24 typů vylepšení, reroll / banish / skip, šest skutečných synergií a pět rarit s barevnými rámečky a různou silou bonusu.

## Stažení a spuštění

1. Na GitHubu stáhněte ZIP větve **riftfall-v6-synergies**: **Code → Download ZIP**.
2. ZIP rozbalte přes **Extrahovat vše**.
3. Ve složce **riftfall-v6** otevřete dvojklikem **riftfall-v6.html** v aktuálním Chrome, Edge nebo Firefoxu.

Hra funguje offline bez serveru a instalace; vyžaduje WebGL 2 a hardwarovou akceleraci. Celá je v jednom HTML souboru. Modulární zdroje jsou dostupné jako `index.html`, `game.js`, `engine.js`, `maps.js`, `actors.js`, `progress.js` a `style.css`.

## Hrdinové mají vlastní způsob boje

| Hrdina | Automatický základní útok | E | SPACE |
| --- | --- | --- | --- |
| Rook | Rychlé azurové kulky z pušky | Vějířová salva sedmi střel | Úhybný kotoul |
| Kael | Zelené srpové vlny, standardně procházejí dvěma cíli | Kruhová seč kolem postavy | Výpad, který zraní nepřátele na dráze |
| Brann | Plošná seč kladivem pouze zblízka; nevytváří projektily | Zemětřesení a štít s 60% redukcí poškození na 6 s | Krátký náraz do nepřátel |
| Lyra | Naváděné fialové astrální koule s menším plošným výbuchem | Zpožděný meteor na blízký cíl | Hvězdný krok |

Útoky respektují překážky. Brannova seč míří směrem k nejbližšímu viditelnému cíli, zasahuje kužel před postavou a netrefí nepřítele za zdí. Vícečetný útok mu zvyšuje sílu a dosah seče místo přidávání kulek. Vylepšení průrazu se mu nenabízí. Názvy některých karet se přizpůsobí hrdinovi, například Rookovy Silnější náboje a Brannovo Drtivé kladivo.

Popis výbavy hrdiny je přímo pod výběrem postav. Označení schopností se mění i v herním panelu.

## Rarity vylepšení

Rarita se losuje pro každou jednotlivou kartu nezávisle na ostatních kartách nabídky.

| Rarita | Šance | Rámeček | Násobek běžného bonusu |
| --- | --- | --- | --- |
| Common | 55 % | Šedý | 1× |
| Uncommon | 25 % | Zelený | 1.2× |
| Rare | 13 % | Modrý | 1.5× |
| Epic | 6 % | Fialový | 1.9× |
| Legendary | 1 % | Zlatý | 2.5× |

Karty ukazují konkrétní výsledný bonus i maximální hodnotu. Například vylepšení poškození přidá v Common +30 %, v Legendary +75 %. U počtových bonusů se násobek zaokrouhluje na celé kusy a platí limity zbraní a zásob; některé sousední rarity proto mohou přidat stejný počet. Vyšší rarita nedává více bodů k vývoji zbraně — každá vybraná útočná karta znamená jeden krok.

Při uložení a načtení zůstávají stejné karty, jejich rarity, zásoby přelosování a stav režimu banish. Načtení nepřelosuje nabídku.

## Reroll, banish a skip

Na začátku výpravy máte **3 rerolly, 2 banishe a 2 skipy**.

- **R / Přelosovat:** spotřebuje reroll a vymění nabídku. Pokud existuje jiná dostupná karta, nová nabídka se alespoň jednou kartou liší. Rarity nových karet se losují znovu. Pokud nabídku nelze změnit, tlačítko je neaktivní.
- **B / Banish:** přepne režim vyřazování. Kliknutí na kartu spotřebuje banish a vyřadí ji ze všech dalších nabídek této výpravy. Uvolněné místo dostane jinou kartu, pokud je dostupná. Ostatní karty a jejich rarity zůstávají. Už získané úrovně vyřazeného upgradu se nemažou a dál se započítávají do synergií. Další stisk B režim zruší bez spotřeby.
- **X / Přeskočit:** spotřebuje skip, zruší nabídku bez upgradu a doplní 10 % maximálního zdraví. Získaná úroveň postavy zůstane.

Na začátku dalšího kola získáte jeden reroll navíc, maximálně do osmi. Banishe a skipy se automaticky neobnovují. Karty Zásoba inspirace a Pečeť zapomnění přidávají další zásoby. Všechny zásoby a vyřazené karty zůstávají v rámci celé navazující výpravy. Nová výprava je resetuje.

Pokud by žádná karta nebyla dostupná, hra nabídne pokračování s léčením bez spotřeby skipu; výběr se nezablokuje.

## 24 typů vylepšení

Vedle původního poškození, rychlosti útoku, vícečetných útoků, oběžných čepelí, zdraví, pohybu, sběru a regenerace jsou dostupné:

- Kritická šance a bonus kritického poškození.
- Redukce přijatého poškození.
- Větší rozsah plošných útoků a seče.
- Další průrazy pro projektilové hrdiny.
- Zpomalení a průběžné poškození hořením.
- Léčení ze způsobeného poškození.
- Kratší cooldowny a delší trvání efektů.
- Bonus ke zkušenostem.
- Odražené kontaktní poškození.
- Zásoby rerollu a banish.
- Řetězové blesky.
- Odtlačování nepřátel.

Karty s označením **Útočné** přispívají k vývoji zbraně. Ten se nadále spustí po čtyřech takových výběrech. Brann získá Kladivo titána s posílenou sečí; nezmění se na střelce. Synergie se zapínají automaticky podle získaných typů upgradu, nezávisle na jejich raritě.

## Šest synergií

| Synergie | Potřebná vylepšení | Skutečný účinek |
| --- | --- | --- |
| Roztříštění | Kritické oko + Ledové ostří | +20 procentních bodů kritické šance proti zpomaleným cílům |
| Divoký požár | Rozsáhlý dopad + Spalující jádro | Smrt hořícího cíle vyvolá plošný výbuch za 60 % poškození zbraně |
| Bouřevodič | Rychlost základního útoku + Řetězový výboj | Další přeskok blesku a 70 % místo 45 % poškození přeskoků |
| Živá pevnost | Živoucí kámen + Ocelová kůže | Dalších 10 % redukce poškození a o 50 % vyšší regenerace |
| Orbitální mlýn | Oběžná čepel + Zrychlené schopnosti | +25 % dosahu a +30 % poškození oběžných čepelí |
| Balistika | Rozštěpení + Průrazné jádro | +1 průraz projektilů a +15 % poškození přímých zásahů |

Každá karta ukazuje související synergii a chybějící součást. Pokud ji její výběr aktivuje, je to zvýrazněné. Pod nabídkou jsou podmínky a účinky všech šesti synergií; aktivní kombinace se zobrazují i v herním panelu. Brannovi se Balistika nenabízí jako dokončitelná cesta, protože nemůže získat projektilový průraz; ostatní synergie mu fungují.

Plošné výbuchy a vedlejší zásahy nevytvářejí nekonečné řetězce kritických zásahů a blesků. Léčení ze zásahů nepřičítá poškození nad zbývající HP cíle.

## Kola, ukládání a kompatibilita

Zůstávají tři velké mapy, navazující pětiminutová kola s obměnou prostředí, NORMAL/HARD, oltářové výzvy, elity, bossové, lokální profil a 13 achievementů. Obtížnost dalších kol nyní zohledňuje také kritické poškození, hoření, blesky, některé synergie a zbroj.

Ruční uložení: **Uložit** nebo **F5**. Automatické ukládání probíhá jako v páté verzi, navíc po změnách nabídky. Použijte **Export zálohy**, pokud měníte soubor hry nebo prohlížeč. Data jsou lokální, nikoli v cloudu.

Šestá verze umí **importovat zálohu z páté verze**, včetně výpravy, původních upgradů a achievementů. Nové pasivní statistiky a zásoby dostanou výchozí hodnoty; tank a čarodějka se převedou na nový základní útok při zachování poměru jejich předchozích vylepšení rychlosti. Původní rozpracovaná nabídka dostane Common rarity. Zálohy vytvořené šestou verzí používejte v šesté nebo novější kompatibilní verzi, nikoli zpět v páté.

Ukládá se také zbývající trvání Brannova štítu, meteor, hoření a zpomalení na nepřátelích. Vlastní střely a čistě kosmetické efekty se při načtení znovu nevytvářejí, stejně jako v předchozí verzi.

## Ovládání

WASD / šipky: pohyb. Automatický útok: bez mačkání tlačítka. SPACE: schopnost pohybu hrdiny. E: jeho aktivní bojová schopnost. F: oltář. Esc: pauza. F5: uložit. Kolečko: přiblížení. V nabídce upgradu: 1/2/3 výběr, R reroll, B banish, X skip.

## Ověření

Prošly původní kontroly boje, navigace, kol, ukládání a achievementů. Nově byly ověřeny melee dosah a blokování zdí, sedmistřelová salva, srpové průrazy, navádění koule, zásah meteoru a redukce poškození štítem. Synergie mají samostatné kontroly aktivace i skutečných zásahů, přeskoků, prodlouženého dosahu, kritického zásahu a průrazu.

Ověřena je spotřeba a vyčerpání reroll / banish / skip, zachování vlastněných upgradů po banish, uchování rarit v savech, odlišná síla rarity a import save verze 5. Všech 24 typů bylo aplikováno ve všech pěti raritách všem čtyřem hrdinům; výsledné stavy prošly validací a respektovaly limity. Simulace 50 000 losování naměřila 54.85 / 25.26 / 12.91 / 6.07 / 0.91 %.

3D scény všech čtyř hrdinů a jejich efektů byly vykresleny přes OpenGL ES 3.2 bez chyb. Kompletní ovládání a rozvržení v reálném prohlížeči nebyly v pracovním prostředí ověřeny.

Původní neoficiální fanouškovský prototyp bez propojení s Riot Games a bez jejich stažených modelů či textur.
