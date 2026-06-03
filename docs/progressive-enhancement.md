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

Beschrijf per issue en sub-issue wat je al kunt prototypen met statische HTML, en wat je nog nodig hebt aan dynamische data. Denk aan Content First bouwen en itereren. Schrijf misschien alvast hints en ideeën voor jezelf over de _enhancements_ in de _usable_ en _pleasurable_ lagen, maar stel het werk zelf uit tot later.

### HTML prototype

Maak per component of issue een HTML prototype. Misschien heb je hier een route voor nodig, of een partial. Misschien kun je al wat dynamische data gebruiken, misschien maak je een eerste iteratie helemaal statisch. Koppel je commits aan het relevante issue, en ga door met een volgend issue, of werk dit component uit in een One Column Layout.

<!--
Teken Wireframes van de responsive layouts en geef aan of de content statisch of dynamisch is (dit kan je ook in Figma doen - jeweettoch). Onderzoek de API zodat je weet welke data je hebt en hoe je data kan fetchen. Maak een breakdown voor de HTML en CSS die je nodig denkt te hebben en noteer de bronnen die je hebt gebruikt.
-->

💡 Klaar met je HTML? Tag een docent in je issue voor een grondige review.

### One Column Layout

In de One Column Layout is alles uitgeklapt en zit nog geen interactie. Je gebruikt hiervoor baseline CSS.

### Interactie en User Generated Content

Heeft jouw component ook User Generated Content, of een interactie?

Om ervoor te zorgen dat jouw gebruikers iets kunnen achterlaten of toevoegen op jouw website heb je een POST interactie nodig. Volgens het principe van Progressive Enhancement ontwerp en bouw je eerst de POST interactie server-side. 

Schets een Wireflow van jouw interactie. Bedenk nette URLs voor je pagina's en routes, en schrijf deze erbij. Annoteer je Wireflow met hints voor je dynamische data, en bedenk ook hoe je de POST in het server.js script verwerkt. Onderzoek HTML-formulier-elementen die je kan gebruiken, en maak een breakdown voor de CSS en de HTML en noteer de bronnen.

<!--

## Aanpak

Goede HTML onderzoeken. Fomulieren met fieldsets. Server side afhandelen van User generated content.
Mobile first/one column layout met basis huisstijl.

Schetsen/prototypen:
Sitemap met url-design, routes en data fetch, wireframes met statische en dynamische data, wireflow voor interactie en animatie, High res in Figma responsive layouts.

-->
