# RIFTFALL IV — Beyond the Rift

Samostatná offline 3D survival aréna. Čtvrtá verze rozšiřuje mapy, přidává HARD mode, návrat do menu, přehlednější kořist a projektily a tři potvrzená herní vylepšení.

## Spuštění

1. Stáhněte ZIP větve `riftfall-v4-hardmode` přes **Code → Download ZIP**.
2. Rozbalte ho přes **Extrahovat vše**.
3. Ve složce **riftfall-v4** otevřete dvojklikem **riftfall-v4.html** v aktuálním Chrome, Edge nebo Firefoxu.

Celá hra je v jediném HTML souboru. Funguje offline, bez serveru a instalace. Vyžaduje WebGL 2 a hardwarovou akceleraci. Alternativně lze otevřít `index.html` vedle ostatních zdrojových souborů.

## Větší mapy

Zelené údolí a Prokletý hvozd mají nyní rozměry 120 × 120 m místo 50 × 50 m, tedy přibližně 5.8× větší plochu. Nové oblasti obsahují další ruiny, stromy a dekorace; postavy a překážky nejsou pouze zvětšené. Mrazivá propast má most široký přibližně 38 m a dlouhý 120 m, přibližně 4.8× původní plochu. Kamera i stíny sledují hráče a minimapa pokrývá celý nový prostor.

Zůstávají čtyři hrdinové včetně Rooka s puškou, minioni, jungle monstra, průlomový titán a tři mapoví bossové. Mapy jsou volně inspirované Summoner’s Rift, Howling Abyss a Twisted Treeline.

## Obtížnost

Před spuštěním vyberte **NORMAL** nebo **HARD**.

HARD nabízí více nepřátel, o 50 % vyšší zdraví, o 18 % vyšší rychlost a o 35 % vyšší poškození nepřátel. Přicházejí častěji a mají vyšší limit současně aktivních jednotek. Je také vyšší šance elitních variant.

## Návrat do menu

Použijte tlačítko **Menu** nahoře nebo **Esc → Hlavní menu**. Hra se pozastaví a požádá o potvrzení ukončení aktuální výpravy. Zrušení vrátí předchozí nabídku, včetně výběru vylepšení; potvrzení ukončí běh a umožní znovu vybrat postavu, mapu i obtížnost.

## Čitelnost boje

- Vaše projektily: azurové podlouhlé střely s bílou stopou a tmavým obrysem.
- Nepřátelské projektily: červenooranžové kulaté střely s prstencem.
- XP: větší zlaté krystaly, kruh na zemi a světelný sloupek.
- Léčení: zelené křížky.
- Elitní nepřítel: oranžová aura a krystal nad hlavou.

V rohu obrazovky je legenda. Odlišení využívá barvy i tvary.

## Tři nová potvrzená vylepšení

### Výzvy na mapě

Na každé mapě jsou tři zlaté oltáře, vyznačené na minimapě. Přijďte k nim a stiskněte **F**, nebo použijte tlačítko na obrazovce. Přežijte 20 sekund posíleného útoku. Výzva nevyžaduje zůstat v kruhu. Odměnou je doplnění 35 HP a zkušenosti na alespoň jedno další vylepšení. Každý oltář lze splnit jen jednou za běh. Po smrti či odchodu do menu se výzva ukončí.

### Vývoj zbraně

Po čtyřech výběrech útočných vylepšení **Ostré střepy**, **Rychlá palba** nebo **Rozštěpení** se zbraň automaticky vyvine. Získá alespoň tři projektily, o 20 % vyšší poškození, o 15 % kratší interval palby a střely prorážející až tři různé cíle. Rookova varianta se jmenuje **Průbojná bouře**. Postup se zobrazuje v pravém panelu.

### Elitní nepřátelé

Od 35. sekundy mohou běžné jednotky přijít v elitní variantě: pravděpodobnost 7 % v NORMAL a 16 % v HARD. Mají 2.4× zdraví oproti odpovídající běžné jednotce a vlastní schopnost: kruhovou salvu nebo předem označený plošný úder. Padají z nich krystaly s hodnotou 9 XP a garantované léčení. Výzvy mohou přivolat další elity. Bossové a průlomový titán se s elitním příznakem nekombinují.

## Ovládání a cíl

- WASD / šipky: pohyb.
- Mezerník: úskok.
- E: nova.
- F: aktivace nedalekého oltáře výzvy.
- Esc: pauza.
- Kolečko: přiblížení kamery.
- 1 / 2 / 3: výběr vylepšení.
- Na dotykovém zařízení použijte šipky a tlačítka na obrazovce.

Přežijte 5 minut a porazte mapového bosse, který přijde po 4:30. Pokud je stále naživu v 5:00, boj pokračuje. Útoky míří automaticky. Zdi blokují pohyb, úskok i projektily obou stran. Při přepnutí okna se hra automaticky pozastaví.

## Ověření

Kontroly zahrnují geometrii a shadery, spojitost navigace na všech mapách, kolize, střelbu obou stran, všechny hrdiny, úrovně, pauzu, smrt a vítězství. Zvlášť jsou ověřeny násobiče HARD, elity a jejich kořist, vývoj zbraně, průbojné projektily, dostupnost všech oltářů, odměny výzev, návrat do menu a reset nového běhu. Vykreslení scén je ověřováno přes OpenGL ES 3.2, včetně stínů. Kompletní ovládání a rozvržení v reálném prohlížeči v pracovním prostředí ověřeno nebylo.

Původní vlastní geometrie a procedurální povrchy. Neoficiální fanouškovský prototyp bez propojení s Riot Games a bez jejich stažených modelů či textur.
