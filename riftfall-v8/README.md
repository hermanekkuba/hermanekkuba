# RIFTFALL VIII — Painted Realms

První herní zpracování schváleného směru stylizované fantasy grafiky. Původní generovaný koncept je výtvarná předloha; tato verze používá vlastní procedurálně vytvořené 3D modely a materiály, nikoliv převzaté herní assety ani GLB modely s kosterní animací.

## Grafika
- Nové modely čtyř hrdinů, minionů, střelců, jungle i epických monster. Pláště, obličeje, vlasy, vousy, vrstvené pláty zbroje, vlastní zbraně, peří, srst, mech a led.
- Hladké analytické normály, zakřivené plochy, zkosené hrany a vyřezávané díly zbroje nahrazují hranaté základní tvary.
- Osm lokálně generovaných texturovaných povrchů (kůže, useň, kov, látka, srst, kámen, led, peří), mapovaných na model bez síťových požadavků. Malovaný vzhled tvoří barevné přechody, široké tahy a drobná struktura.
- Pohyb látky, původní animace chůze a otáčení při útoku. Plná kosterní animace není součástí této verze.
- Dvě úrovně geometrického detailu: zjednodušené modely při větší vzdálenosti a v úsporném režimu. Sdílené modely a GPU instancing zůstávají zachované.
- Hladší koruny stromů, zdobené vršky ruin, prapory a lemování oltářů. Geometrie pohybu a oprava navigace na mostě z VII.1 zůstávají zachované.

## Spuštění
Otevřete `index.html` nebo samostatný `riftfall-v8.html` v prohlížeči s WebGL2. Bez instalace, externích knihoven a stahovaných zdrojů. WASD/šipky: pohyb; E: schopnost; mezerník: úskok; Esc: pauza/menu.

Postup, achievementy a nastavení zvuku zůstávají uložené lokálně ve stejném prohlížeči a na stejné adrese. Podporovaný je import/export i starší uložené výpravy.

Ověřeno regresními herními testy, 184 navigačními trasami malých i velkých nepřátel, kontrolou geometrie/LOD/textur, syntetickým CPU benchmarkem a nativním OpenGL ES testem shaderů, textur, stínů a instancování. Výsledné FPS závisí na zařízení; browserové interaktivní měření FPS zde neproběhlo.
