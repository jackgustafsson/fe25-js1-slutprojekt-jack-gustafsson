# fe25-js1-slutprojekt-jack-gustafsson

<strong>Slutprojekt för JavaScript 1-kursen </strong>

Projektet är en webbsida, där man kan se vilka filmer som är populära just nu och vilka som är topprankade. Det går också att söka på en film eller en person och får mer information om den med hjälp av The Movie Database (se länk nedan). Detta är med andra ord en väldigt förenklad version av IMdB.

The Movie Database: https://developer.themoviedb.org/reference/getting-started

Projektet innehåller följande filer: index.html, style.css, main.js, displayContent.js, functions.js och api.js

1. main.js är huvudlogiken för webbapplikationen som låter användaren att upptäcka, söka och utforska filmer och person via ett externt API. Koden ansvarar bland annat för sökfunktionalitet, visning av filmer och personer, sortering efter popularitet samt fel- och offline hantering. Detta med hjälp av importerade funktioner från olika moduler.

2. I displayContent.js presenteras innehåll för filmer och personner i applikationen där API-data läggs in i HTML-element. Även DOM-strukturer skapas och interaktivitet läggs till.

3.  functions.js innehåller återanvändbara hjälpfunktioner. Dessa funktioner kan rensa och bygga om DOM:en, styra navigering och visning av innehåll samt visa upp meddelanden.

4. api.js är applikationens API-lager och ansvarar för all kommunikation med The Movie Database. Med hjälp av en API-nyckel kan man hämta film- och persondata och returnera det.

5. index.html är grundstrukturen som talar om vad webbsidan består av

6. style.css bestämmer sidans utseende
