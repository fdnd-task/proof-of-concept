# Proof of Concept

## Progressive Enhancement

<!--Over het bouwen van je website in lagen, en onderzoeken van de functional en reliable laag.-->

Progressive Enhancement is één van de principes waarmee je robuuste, betrouwbare websites kan ontwerpen en bouwen die het altijd doen, voor iedereen, in elke browser.

En dat is ook de focus voor deze week. Komende vrijdag ga je je website testen op de _functional_ en _reliable_ lagen.

<!--
TODO; issue refinement op basis van briefing maandag?

Content first -> Wat kun je nu al statisch maken?
Welke comoponenten worden dynamisch?
Hoe maak je daarvoor issues aan?
Wat kun je vrijdag al testen?
Laten zien hoe je issues goed opsplit
Moet elk component dynamische user data hebben?
Moet elk component URL design hebben?
Wanneer is een component 'af'? Hoe zet je dat in je issue?
Welke componenten wil je vrijdag kunnen testen?
-->

### Aanpak

Bouwen volgens het principe van Progressive Enhancement betekent dat je de website en componenten opbouwt in lagen: 

1. Bouw de functionaliteit robuust, met de simpelste techniek​ in HTML en met Server-Side Rendering​
2. Voeg Baseline CSS voor de huisstijl toe​
3. Enhance de functionaliteit geleidelijk voor een betere User Experience

Begin met stap 1 en 2, voordat je met de enhancements aan de slag gaat. Het gaat zeker tijd schelen als je eerst de basis goed opzet.

Begin _per component_ met ontwerpen en schetsen van de One Column Layout met data en GET routes.
Ga daarna verder met de User Generated Content en de POST. 
Bespreek je planning en aanpak met een docent. 

<!--
Stundenten komen langs bij Krijn, Sanne, Suus en Koop:

Hoe ging de sprint review, wat is de opdracht/ontwerpvraag/design challenge?
> studenten niet te veel laten hangen, maar vragen wat zij zelf gaan doen aan de “problemen”

Planning bespreken adhv projectboard
> Vragen naar wat ze willen opleveren (onderdeel van de debrief)

Aanpak project opzetten volgens PE principes bespreken
> doen ze de worshop van vandaag?
> Hebben ze hulp nodig voor het schetsen van de User generated content? Zelf proberen of samen schetsen? 
-->

## Denken in componenten

Maandag heb je een ruwe planning gemaakt voor deze sprint. Waarschijnlijk heb je door de briefing beter inzicht gekregen in wat er van je verwacht wordt. Dit is een goed moment om even naar je issues of project board te kijken, en je planning voor deze week bij te werken.

Teken voor jezelf een sitemap, zodat je goed grip krijgt op wat je gaat maken. Bedenk welke URL's/routes de pagina's krijgen.

Maak voor de verschillende pagina's issues aan. Voeg een snelle schets toe, of een ontwerp als je dat al hebt gemaakt. Bedenk welke onderdelen je op kunt splitsen in verschillende componenten, die herbruikbaar zijn op meerdere pagina's. Maak hiervoor _sub-issues_ aan, zodat je het werk kleiner maakt.

Beschrijf per issue en sub-issue wat je al kunt prototypen met statische HTML, en wat je nog nodig hebt aan dynamische data. Denk aan _Content First_ bouwen en itereren. Schrijf misschien alvast hints en ideeën voor jezelf over de _enhancements_ in de _usable_ en _pleasurable_ lagen, maar stel het werk zelf uit tot later; _“Plan for enhancements from the start, implement at the end”_.

Schets per component een wireframes van de responsive layouts en geef aan of de content statisch of dynamisch is (dit kan je ook in Figma doen). Onderzoek de API, zodat je weet welke data je hebt en hoe je data kan fetchen. Maak een breakdown voor de HTML en CSS die je nodig denkt te hebben en noteer de bronnen die je hebt gebruikt.

### HTML prototype

Maak per component of issue een HTML prototype. Misschien heb je hier een route voor nodig, of een partial. Misschien kun je al wat dynamische data gebruiken, misschien maak je een eerste iteratie helemaal statisch. Koppel je commits aan het relevante issue, en ga door met een volgend issue, of werk dit component uit in een One Column Layout.

💡 Tip: vaak werkt het prettig om eerst in grote lijnen verschillende componenten uit te werken in HTML, voordat je met de verdere details verder gaat.

👉 Klaar met je HTML? Tag een docent in je issue voor een grondige review.


### Interactie en User Generated Content

Heeft jouw component ook User Generated Content, of een interactie? Denk aan een wireflow en UI states, en werk dit ook gelaagd uit. Bedenk hoe je interactie met alleen HTML en server-side rendering zo _functioneel_ en _betrouwbaar_ mogelijk gemaakt kan worden.

Schets een Wireflow van jouw interactie. Bedenk nette URLs voor je pagina's en routes, en schrijf deze erbij. Annoteer je Wireflow met hints voor je dynamische data, en bedenk ook hoe je de POST in het server.js script verwerkt. Onderzoek HTML-formulier-elementen die je kan gebruiken, en maak een breakdown voor de HTML en CSS en noteer de bronnen.

👉 Wil je iets gaan maken, maar weet je nog niet hoe en of dat kan? Beschrijf je probleem en tag een docent.


### One Column Layout

In de One Column Layout is alles onder elkaar uitgeklapt en zit nog vrijwel geen interactie. Je gebruikt hiervoor waarschijnlijk baseline CSS, en de huisstijl van de opdrachtgever.

Probeer ook hier dus nog niet te veel te doen, maar je te concentreren op een goede, solide basis.


### Code & Design review

Komende vrijdag gaan we de eerste twee lagen van je website testen tijdens de Code & Design Review. Zorg er in je planning voor dat je van al je componenten een eerste versie hebt.

Volgende week gaan we verder om je project meer _usable_ en _pleasurable_ te maken.
