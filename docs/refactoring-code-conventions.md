# Proof of Concept

## Refactoring en Code Conventions

Over het netjes en presentabel maken van jouw code zodat iedereen er zonder problemen in verder kan werken.

### Refactoring

Tijdens een _refactor_ verandert er geen functionaliteit, zoals je weet. Je maakt alleen je code schoner en netter. Een opdrachtgever of eindgebruiker heeft hier niet direct wat aan (tenzij je de code uiteindelijk overdraagt). Waarschijnlijk doe je dit dus helemaal voor jezelf, of je team als je in een team werkt. Als je over een jaar nog eens naar je code kijkt, wil je het meteen kunnen begrijpen.

> It is much easier to understand a large codebase when all the code in it is in a consistent style. - [Google Style Guides](https://google.github.io/styleguide/)

Tijd vrijmaken voor dit soort “onzichtbare” verbeterslagen is een belangrijk onderdeel van software ontwikkeling. Als je dit nooit doet, ontstaat er op termijn _technical debt_. Hierdoor wordt het in de toekomst moeilijker om nieuwe functionaliteiten (waar opdrachtgevers en eindgebruikers wél wat aan hebben) toe te voegen. Zorg dus dat je regelmatig je eigen code “onderhoudt”.

### Code conventies

👉 Neem de [HTML/CSS code conventies](https://google.github.io/styleguide/htmlcssguide.html) en/of [JavaScript code conventies](https://google.github.io/styleguide/jsguide.html) van Google door, en bepaal voor jezelf welke conventies jij al aanhoudt, anders doet of over wilt nemen. Welke conventies hou je in Liquid aan?

> Be consistent.

_Code conventies_ kun je ook gebruiken voor code reviews door anderen. Als iemand jouw code reviewt, is het handig om te weten welke conventies je aanhoudt. Zorg er dus voor dat je je eigen conventies opneemt in bijvoorbeeld de Readme van je repository, onder een specifieke kop. Hiermee lever je je werk deze week netjes op voor een opdrachtgever.

> The point is to have a common vocabulary of coding so people can concentrate on what you’re saying rather than on how you’re saying it.


## Voeg commentaar toe aan je JavasScript

Welke volgorde hou je in je server aan? Volg je de sitemap in je routes, of staan ze kriskras door elkaar? Probeer hier een logische structuur in te vinden, en pas deze meteen toe. Heb je met [commentaar](https://eloquentjavascript.net/02_program_structure.html#h-/OBuIOX390) uitgelegd wat de verschillende routes en functies doen? Hoe ziet je client-side JavaScript er uit? Kun je alle code uitleggen?

💡 Pro-tip: Gebruik JSDoc om je JavaScript van commentaar te voorzien https://jsdoc.app/


<!-- Herhaling van Sprint 6: -->

## Ademruimte en inspringen

Welke conventies hou je zelf aan? Gebruik je voor inspringen altijd tabs? Gebruik je altijd 2 spaties, of 4? Hou je richtlijnen aan voor inline-level en block-level elementen in HTML? Wanneer gebruik je meer ademruimte? Hoe pas je ademruimte en inspringen toe in je Liquid code? Hoe in je server-side en client-side JavaScript code? Probeer je eigen conventies en voorkeuren te herkennen. Schoon inconsequente code op, en commit deze. Zet in je commit message bijvoorbeeld “Refactor HTML”. Zorg er tijdens deze refactorslag voor dat je geen functionaliteit verandert.

<!-- Maak in je Readme een kopje aan met “Ademruimte en inspringen” en leg uit hoe je dit in je Liquid en HTML files hebt gedaan. Link naar voorbeelden in je code. -->


## Volgorde en nesten van CSS selectors

Hoe consequent nest jij je CSS selectors? Hoe ga je om met inspringen van geneste selectors? Doe je dat altijd hetzelfde? Welke volgorde hou je aan bij je selectors? Is dat ook de volgorde in je HTML? Hoe ga je om met partials? Of met _componenten_? Tegen welke problemen loop je aan als je je CSS netjes wilt structureren? Welke volgorde volg je bij je properties? Groepeer je die op een bepaalde manier? Hoe ga je om met inheritance? Hoe zet je de _cascade_ in om zo min mogelijk CSS te schrijven? Het DRY principe is er niet voor niets; Don't Repeat Yourself. Zoek naar plekken waar je je CSS kunt refactoren, zodat deze beter onderhoudbaar wordt. Commit deze wijzigingen bijvoorbeeld als “Refactor CSS”. Zorg er ook hier voor dat er geen functionaliteit verandert of breekt hierdoor.

<!-- Maak in je Readme een kopje aan met “Volgorde en nesten van CSS selectors” en leg uit hoe je je CSS code hebt gestructureerd. Link naar voorbeelden in je CSS. -->


## Nesten van media queries

Wat is complexer? De juiste selector schrijven, of de juiste media query schrijven? Hoe kun je je werk makkelijker onderhouden? Als alle styling voor een bepaald onderdeel (component) bij elkaar staat, inclusief media queries? Of wanneer de styling voor een bepaald component op totaal verschillende plekken in je stylesheet staat? Hoe werkt de cascade door in geneste media queries? Welke (dubbele) properties kun je weghalen nu je ziet dat je die een paar regels eerder al hebt gedeclareerd? Zoek naar plekken waar je door media queries slimmer in te zetten je CSS kunt refactoren. Commit je wijzigingen bijvoorbeeld als “Refactor media queries”. Hou er ook hier rekening mee dat je geen functionaliteit verandert. Anders is het geen refactor. Als je bijvoorbeeld besluit met Container Queries te gaan werken, verander je daarmee ook de functionaliteit. Dit hoort dus niet bij refactoren.

<!-- Maak in je Readme een kopje aan met “Nesten van media queries”, leg uit hoe je in CSS je code hebt opgebouwd voor Responsive Design en leg de media queries uit. Link naar voorbeelden in je CSS. -->


## Naamgeving

Dingen een naam geven is één van de moeilijkste dingen in ons vakgebied. Bij het bedenken van een `id`, `class`, custom property in CSS, partial in Liquid, of variabele in JavaScript heb je dat al vaker gemerkt. Een goede manier om er achter te komen of je “goede” namen hebt gekozen, is door ze uit te leggen aan iemand anders. En door vragen te stellen over naamgeving aan anderen.

Bespreek met je buur je gekozen naamgeving in HTML, CSS en JS. Stel elkaar kritische vragen. “Waarom noem je dit zo, en niet zo?”, “Waarom gebruik je hier een Engelse variabele, en daar een Nederlandse?”, “Is het niet beter om dit primary-color te noemen, in plaats van color-red?”, “Waarom kort je deze naam af, maar deze niet?”, “Waarom gebruik je hier kebab-casing, en daar camelCase?” etc. Doel is om je code beter leesbaar, begrijpelijker en beter onderhoudbaar te maken. Refactor je code naar aanleiding van dit overleg, en commit dit als “Refactor naming”. Ook hierbij: verander niet de functionaliteit.

<!-- Maak in je Readme een kopje “Naamgeving” en beschrijf de conventies die je hiervoor hebt aangehouden, in je HTML, CSS en JS. Link naar concrete voorbeelden in je code. -->