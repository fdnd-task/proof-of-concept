import express from 'express'
import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const engine = new Liquid()

app.engine('liquid', engine.express())
app.set('views', './views')

const exhibitUrl       = 'https://fdnd-agency.directus.app/items/teylers_museum_exhibits'
const sectionsUrl      = 'https://fdnd-agency.directus.app/items/teylers_museum_exhibits_sections'
const personsUrl       = 'https://fdnd-agency.directus.app/items/teylers_museum_persons'
const sourcesUrl       = 'https://fdnd-agency.directus.app/items/teylers_museum_sources'
const quizQuestionsUrl = 'https://fdnd-agency.directus.app/items/teylers_museum_quiz_questions'
const quizAnswersUrl   = 'https://fdnd-agency.directus.app/items/teylers_museum_quiz_answers'
const quizAttemptsUrl  = 'https://fdnd-agency.directus.app/items/teylers_museum_quiz_attempts'

app.get('/', async function (request, response) {
  const fetchResponse = await fetch(exhibitUrl)
  const fetchResponseJSON = await fetchResponse.json()

  response.redirect(`/exhibits/${fetchResponseJSON.data[0].slug}`)
})

app.get('/exhibits/:slug', async function (request, response) {
  // exhibit ophalen en creators 
  const fetchResponse = await fetch(`${exhibitUrl}?filter[slug][_eq]=${request.params.slug}&fields=*,creators.teylers_museum_persons_id.*`)
  const fetchResponseJSON = await fetchResponse.json()
  const exhibit = fetchResponseJSON.data[0]

  response.render('exhibit-detail.liquid', { 
    exhibit 
  })
})

app.get('/niet-beschikbaar', async function (request, response) {
  response.render('partials/niet-beschikbaar.liquid')
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}`)
})