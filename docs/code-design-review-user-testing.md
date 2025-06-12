# Proof of Concept

Deze week ben je verder gaan bouwen aan de usable en de pleasurable laag van jouw website voor de opdrachtgever. Volgende week is de laatste week om de website af te ronden voor sprint 12. 

## 1. Code/Design-review - Testen van de verschillende lagen

Vandaag ga je in kaart brengen welke componenten je hebt gemaakt voor jouw website en welke verschillende lagen je per component hebt gebouwd en/of ontworpen. Hierop ontvang je een code/design review.

### Bepaal welke component je hebt gemaakt

Ga door je website heen en bepaal welke componenten jij hebt gemaakt. Denk bijvoorbeeld aan een menu, een carrousel, een contact formulier, het achterlaten van een bericht, paginatie of een detail pagina bekijken. Maak een issue aan en noteer al jouw componenten onder elkaar in onderstaande tabel. Gebruik hiervoor onderstaand template:


|                    | **Functional** | **Reliable** | **Usable** | **Pleasurable** |
|----------------    |----------------|--------------|------------|-----------------|
| **Component 1**    |                |              |            |                 |
| **Component 2**    |                |              |            |                 |
| **Component 3**    |                |              |            |                 |

### Bepalen welke lagen er zijn gemaakt
Pak de tabel er nog eens bij en vul nu per component in hoe jij de verschillende lagen hebt geïmplementeerd (of hoe je dit zou kunnen doen). Het hoeft niet zo te zijn dat je voor elk component alle lagen hebt uitgewerkt. Het ziet er dan bijvoorbeeld zo uit:

|                    | **Functional** | **Reliable** | **Usable** | **Pleasurable** |
|----------------    |----------------|--------------|------------|-----------------|
| **Menu**    |    `<a>` link naar nav            |    smooth scroll naar nav, met `:target` om het uit te lichten          |      de rest van de pagina verbergen/overlay, transities en easing      |        blije geluidjes en confetti als je het menu opent en sluit         |
| **Berichten achterlaten**    |     `<form>` met post en server side fetch           |        verschillende states (zero, empty)     |       perf enhancement met client side JS, view transitions om de states lekker te laten smoelen     |            het formulier als een soort envelop opvouwen, weg laten vliegen met een swoosh, en de reactie letter voor letter laten uittypen als een soort typmachine     |
| **Carrousel**    |         een lijst met images onder elkaar, waar je van boven naar onder doorheen kunt scrollen       |     scroll snap naast elkaar         |      responsive images, performance enhancements, misschien wat knopjes en affordances toevoegen/css carrousel met nieuwe dingen      |       geluidjes als je scrollt, scroll markers die animeren          |



### Feedback ontvangen van peers
Tag in het issue per component minimaal één peer die jouw component gaat reviewen. Zorg dat je voor elk component iemand anders vraagt voor een review. 

### Feedback geven aan peers
Als het goed is heb je nu van meerdere studenten de vraag gekregen om een component te reviewen. Maak voor jezelf een checklist waar je op wilt gaan reviewen aan de hand van de workshops uit sprint 10, 11 en 12. Dit helpt jou ook om een goed beeld te krijgen wat er voor het assessment van jou wordt verwacht. Handig dus voor de voorbereiding op het end-term! 


## 2. Code/Design-review - User Testing
Je hebt in jouw website gewerkt aan een interactie. Vandaag verzamel je feedback op jouw interactie door een User Test te gaan uitvoeren.

Het ontwerpen van een goede gebruikerservaring (UX) gaat niet alleen over iets bouwen dat werkt, maar vooral over iets maken dat intuïtief en prettig te gebruiken is. Misschien denk je dat jouw micro-interactie perfect is – alles functioneert precies zoals jij het had bedacht – maar hoe ervaart een gebruiker jouw werk? Om dat te ontdekken, gebruik je user testing. Het doel is om te achterhalen hoe een echte gebruiker, iemand die jouw code niet kent, jouw werk ervaart.

Voer een User Test uit met minimaal 2 users, waarvan één met een docent. 

Pak voor de User Test de instructies van de 'Code/design review User Test' er opnieuw bij. Deze kun je vinden in sprint 5 bij de workshop [Code/Design User Testing](https://github.com/fdnd-task/fix-the-flow-interactive-website/blob/main/docs/code-design-review-user-testing.md). 

