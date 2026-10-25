# RIFTFALL II — The Overgrown Citadel

Samostatná 3D survival aréna s vlastními modely, procedurálními povrchy a grafikou WebGL 2. Bez externích knihoven a bez připojení k internetu.

## Jak spustit hru na Windows

1. Na stránce repozitáře zvolte větev `riftfall-v2-3d`, pak **Code → Download ZIP**.
2. ZIP rozbalte: pravé tlačítko → **Extrahovat vše**.
3. Ve složce `riftfall-v2` otevřete dvojklikem **riftfall-3d.html**.
4. Pokud se soubor otevře v editoru, zvolte **Otevřít v programu → Google Chrome / Microsoft Edge / Firefox**.

Jediný soubor `riftfall-3d.html` obsahuje celou hru. Vyžaduje moderní prohlížeč s WebGL 2 a zapnutou hardwarovou akcelerací. Nenahrává žádná data na server. Rekord se ukládá lokálně, pokud to prohlížeč povolí.

Alternativně otevřete `index.html` vedle souborů `engine.js`, `game.js` a `style.css`.

## Ovládání

- WASD nebo šipky: pohyb.
- Mezerník: úskok, opět dostupný za 3.2 sekundy.
- E: nova, opět dostupná za 10 sekund.
- Esc: pauza; při přepnutí okna se hra také pozastaví.
- Kolečko myši: přiblížení a oddálení kamery.
- 1, 2 nebo 3: výběr nabízeného vylepšení.
- Dotykové ovládání: šipky a tlačítka schopností na displeji.

Útoky míří automaticky. Projektily blokují zdi. Postava i nepřátelé respektují kolize, úskok nepřenáší přes překážky. Nepřátelé hledají cestu kolem ruin. Dekorační tráva a drobné kameny pohyb neblokují.

## Cíl a obsah

Přežijte 5 minut a porazte Voraka, který se objeví po 4:30. Pokud v 5:00 stále žije, souboj pokračuje do jeho poražení.

- Kael, Brann a Lyra mají odlišné zdraví, rychlost a poškození; Lyra také rychleji střílí.
- Skarabeové, rohatí lovci, krystaloví golemové a Vorak mají vlastní vícebarevné 3D modely a animované končetiny.
- Kamenná citadela s ručně rozmístěnými překážkami, mechovou dlažbou, vegetací, pochodněmi a krystaly.
- Perspektivní kamera, dynamické stíny, mlha, světelné akcenty a částicové efekty.
- Zkušenosti, osm typů vylepšení, léčení, oběžné čepele, minimapa a úsporné nastavení grafiky.

## Zdrojové soubory

`engine.js`: nativní WebGL 2 renderer, geometrie, osvětlení a mapa stínů.

`game.js`: mapa, modely, kolize, navigace a herní logika.

`style.css` a `index.html`: české rozhraní.

`riftfall-3d.html`: samostatné sestavení bez závislostí.

## Ověření

Prošly kontroly syntaxe JavaScriptu a automatické kontroly geometrie, kolizí pohybu a projektilů, úskoku, navigace, sběru zkušeností, výběru vylepšení, pauzy, smrti a vítězství. Všech 2018 průchozích navigačních buněk je vzájemně dostupných. Oba shaderové programy byly zkompilovány a propojeny na OpenGL ES 3.2; kompletní scéna i mapa stínů 2048 × 2048 byly vykresleny bez GL chyb.

Interakce a rozvržení v reálném prohlížeči nebyly v pracovním prostředí ověřeny. Výkon závisí na zařízení; při problémech zapněte úspornou grafiku.

Původní neoficiální prototyp inspirovaný žánrem survivor. Bez propojení s Riot Games a bez jejich herních assetů.
