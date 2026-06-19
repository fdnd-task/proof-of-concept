import express from 'express'

import { Liquid } from 'liquidjs'; 

const app = express() 

app.use(express.urlencoded({extended: true})) 

app.use(express.static('public')) 

const engine = new Liquid() 
app.engine('liquid', engine.express()) 

app.set('views', './views') /

// Verwerk GET requests naar de homepage
app.get('/', async function (request, response) { 
  const [sectiesRes, vragenRes] = await Promise.all([

    // Haal alle tijdlijn secties op uit de API
    fetch('https://fdnd-agency.directus.app/items/teylers_museum_exhibits_sections?fields=id,title,start_year,end_year,summary,era,content_blocks,cover&sort=start_year'),

    // Haal alle quiz vragen op uit de API
    fetch('https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions?fields=id,question,exhibit_section,options,explanation_correct,explanation_wrong') 
  ])

   // Parse de secties uit het JSON response
  const { data: secties } = await sectiesRes.json()

  // Parse de vragen uit het JSON response
  const { data: vragen } = await vragenRes.json() 

  // Maak een leeg object aan om vragen per sectie op te slaan
  const vragenPerSectie = {} 

  for (const vraag of vragen) {
    // Koppel elke vraag aan het bijbehorende sectie id
    vragenPerSectie[vraag.exhibit_section] = vraag
  }

  response.render('index.liquid', { secties, vragenPerSectie, sectiesJson: JSON.stringify(secties) })
})

app.set('port', process.env.PORT || 8000) 

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}`)
})
