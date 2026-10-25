# RIFTFALL V — Endless Expedition

Pátá verze offline 3D survival arény: navazující pětiminutová kola, zachování výbavy, škálování nepřátel podle síly postavy, ukládání, přenositelné zálohy a 13 trvalých achievementů.

## Jak spustit

1. Stáhněte ZIP větve **riftfall-v5-campaign** přes **Code → Download ZIP**.
2. ZIP rozbalte přes **Extrahovat vše**.
3. Ve složce **riftfall-v5** spusťte dvojklikem **riftfall-v5.html** v aktuálním Chrome, Edge nebo Firefoxu.

Vše je v jednom souboru; nepotřebujete instalaci, server ani internet. Vyžadováno je WebGL 2 a hardwarová akcelerace. Modulární varianta je `index.html` vedle ostatních zdrojových souborů.

## Pokračování výpravy

Každé kolo trvá alespoň 5 minut a končí po poražení mapového bosse. Pokud je boss v 5:00 stále naživu, boj pokračuje. Potom můžete pokračovat do dalšího kola nebo výpravu uložit a odejít.

Do dalšího kola zůstávají hrdina, obtížnost, úroveň, zkušenosti, potřebné XP, poškození, rychlost útoku, další projektily, čepele, regenerace, dosah sběru, maximální zdraví, vývoj zbraně i všechny vybrané upgrady. Aktuální zdraví se zachová a doplní se o 25 % maxima. Schopnosti budou připravené.

Kolo dostane nové rozmístění ruin, stromů a dekorací, ale zachová styl původně vybraného světa: Zeleného údolí, Mrazivé propasti nebo Prokletého hvozdu. Rozměry zůstávají velké jako ve čtvrté verzi. Oltáře se obnoví, běžní nepřátelé i boss začnou nové kolo. Rozložení je deterministické podle mapy a čísla kola, takže načtení savu obnoví stejný svět.

## Jak roste obtížnost

Síla se přepočítává při začátku kola, ne po každém získaném upgradu. Vylepšení tak mají během kola okamžitý přínos.

Útočná síla porovnává aktuální poškození za sekundu s výchozí zbraní hrdiny, zohlední efektivní počet projektilů, vývoj zbraně i oběžné čepele. Odolnost porovnává maximální zdraví a regeneraci s výchozím hrdinou.

Od druhého kola platí:

- **HP nepřátel:** `1.22^(kolo−1) × útočná_síla^0.58`.
- **Poškození nepřátel:** `1.10^(kolo−1) × odolnost^0.30`.
- **Rychlost nepřátel:** +3.5 % za kolo, maximálně +35 %.
- **Četnost vln:** +12 % za kolo, maximálně +90 %.
- **Hodnota XP:** +35 % za kolo, aby šlo dál získávat vylepšení.
- Postupně častěji přicházejí elity. Bossové dostanou mírně vyšší násobič zdraví.

Jde o částečné dorovnání síly: silnější postava vyvolá silnější protivníky, ale nepřijde o celý náskok. Například samotné zdvojnásobení útočné síly znamená přibližně 1.5× HP protivníků před násobičem čísla kola. HARD se násobí navíc stejně jako ve čtvrté verzi. Obrazovka po dokončení ukáže násobiče pro následující kolo.

## Ukládání a pokračování

- Hra automaticky ukládá každých 10 sekund, při pauze, při nabídce nebo výběru vylepšení, po dokončení kola a při přechodu do dalšího.
- Ručně použijte **Uložit**, **F5** nebo tlačítko v pauze. F5 zde ukládá hru místo obnovení stránky.
- **Menu → Uložit a přejít do menu** zachová rozehranou výpravu.
- Na úvodní obrazovce použijte **Pokračovat**, které ukazuje hrdinu, mapu a kolo uložené výpravy.
- Načtený boj začíná pozastavený. Nabídka upgradu se načte se stejnými třemi možnostmi; dokončené kolo se načte na přechodové obrazovce.
- Ukládají se také pozice a zdraví nepřátel, nepřátelské projektily, aktivní plošné útoky, kořist, průběh výzvy a vybrané oltáře. Vlastní střely a kosmetické částice se při načtení nevytvářejí znovu.
- Je jeden slot výpravy. Nová hra požádá o potvrzení nahrazení existujícího savu. Smrt nebo ukončení bez uložení smaže slot dané výpravy. Achievementy zůstanou.

### Kde jsou data

Data se ukládají **lokálně v prohlížeči**, nikoli do cloudu nebo GitHubu. Přístup pro soubory otevřené přes `file://` závisí na prohlížeči a cestě souboru. Při přesunu HTML, přechodu do jiného prohlížeče nebo nové verze použijte **Export zálohy** a potom **Import zálohy**.

Exportovaný JSON obsahuje uloženou výpravu i trvalý profil. Uložte si ho mimo dočasnou složku ZIPu. Pokud prohlížeč lokální úložiště blokuje nebo je plné, hra to oznámí; export funguje i tak. Import pak může výpravu otevřít alespoň v paměti. Bez lokálního úložiště je pro zachování dalšího postupu nutné znovu exportovat.

Neplatné nebo nepodporované zálohy se odmítnou před změnou herního stavu. Při importu se odemčené achievementy sloučí; záznamy se nesčítají podruhé. Opakované načtení stejného průběhu také nepřičítá už započítané eliminace a dokončená kola znovu.

## Trvalé achievementy

Na úvodní obrazovce otevřete **Achievementy**. Odemknutí se oznamuje během hry a zůstává mezi novými výpravami.

1. První krev — první eliminace.
2. Lovec roje — 100 eliminací celkem.
3. Postrach trhliny — 1 000 eliminací celkem.
4. Lovec elit — 25 poražených elit.
5. První výprava — dokončené kolo.
6. Veterán — 5 dokončených kol celkem.
7. Za druhou bránu — dosažení třetího kola jedné výpravy.
8. Bez slitování — dokončené kolo na HARD.
9. Tři světy — dokončené kolo na každé mapě.
10. Celá družina — hra za všechny čtyři hrdiny.
11. Nová forma — vyvinutá zbraň.
12. Zkouška odvahy — 3 splněné oltářové výzvy.
13. Nedotknutelný — dokončené kolo bez ztráty HP po zásahu.

Achievementy nepřidávají skryté bonusy do nové hry. Sledují i číselný postup k odemčení.

## Ovládání

WASD / šipky: pohyb. Mezerník: úskok. E: nova. F: oltářová výzva. Esc: pauza. F5: uložit. Kolečko: zoom. Klávesy 1 / 2 / 3: výběr vylepšení. Na dotykovém zařízení použijte tlačítka na obrazovce.

Zůstávají čtyři hrdinové, vlastní 3D modely nepřátel, velké mapy, NORMAL/HARD, přehledné projektily a kořist, elity, výzvy, minimapa a vývoj zbraní.

## Ověření

Automatické kontroly pokrývají původní boj, kolize, hrdiny, HARD, elity a odměny, vývoj zbraně, výzvy, smrt a dokončení kola. Nově ověřují zachování výbavy a XP při pokračování, proporční růst obtížnosti, změnu a determinismus map, pokračování z uloženého boje i přechodové obrazovky, zachování nabídky vylepšení, aktivní výzvu a HP nepřátel, odmítnutí poškozených savů a trvalé achievementy bez opakovaného započítávání statistik.

Na každé ze tří map je ověřena průchodnost a dosažitelnost oltářů v prvních čtyřech kolech. Shaderové programy a 3D scény se ověřují na OpenGL ES 3.2. Kompletní rozvržení a interakce v reálném prohlížeči v pracovním prostředí ověřeny nebyly.

Neoficiální původní fanouškovský prototyp bez propojení s Riot Games a bez jejich stažených modelů nebo textur.
