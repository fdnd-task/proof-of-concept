import express from 'express'

import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.json())

app.use(express.static('public'))

const engine = new Liquid()
app.engine('liquid', engine.express())

app.set('views', './views')

const directusBase = 'https://fdnd-agency.directus.app/items/'

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

  const pogRes = await fetch(directusBase + 'teylers_museum_quiz_attempts?filter%5Bscore%5D%5B_nnull%5D=true&sort=-completed_at&limit=100')
  const { data: allePogingen } = await pogRes.json()
  const aantalQuizVragen = Object.keys(vragenPerSectie).length
  const pogingen = allePogingen.filter(p => p.total_questions === aantalQuizVragen).slice(0, 20)

  response.render('index.liquid', { secties, vragenPerSectie, sectiesJson: JSON.stringify(secties), pogingen })
})

// Toon de scorebord pagina
app.get('/scores', async function (request, response) {
  const res = await fetch(directusBase + 'teylers_museum_quiz_attempts?filter%5Bscore%5D%5B_nnull%5D=true&sort=-completed_at&limit=20')
  const { data: pogingen } = await res.json()
  response.render('scores.liquid', { pogingen })
})

// Maak een nieuw quiz-attempt aan en geef het id terug
app.post('/quiz/attempt', async function (request, response) {
  const res = await fetch(directusBase + 'teylers_museum_quiz_attempts', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ started_at: new Date().toISOString() })
  })
  const json = await res.json()
  response.json({ attemptId: json.data.id })
})

// Sla een individueel antwoord op
app.post('/quiz/answer', async function (request, response) {
  const { attemptId, questionId, answerKey, isCorrect } = request.body
  await fetch(directusBase + 'teylers_museum_quiz_answers', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      attempt: attemptId,
      question: questionId,
      chosen_option: answerKey,
      is_correct: isCorrect,
      answered_at: new Date().toISOString()
    })
  })
  response.json({ ok: true })
})

// Markeer het attempt als voltooid met eindscore
app.post('/quiz/complete', async function (request, response) {
  const { attemptId, score, totalQuestions } = request.body
  await fetch(directusBase + 'teylers_museum_quiz_attempts/' + attemptId, {
    method: 'PATCH',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({
      score,
      total_questions: totalQuestions,
      completed_at: new Date().toISOString()
    })
  })
  response.json({ ok: true })
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}`)
})
