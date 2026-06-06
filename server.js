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
  const exhibitFetchResponse = await fetch(exhibitUrl)
  const exhibitFetchResponseJSON = await exhibitFetchResponse.json()

  response.redirect(`/exhibit/${exhibitFetchResponseJSON.data[0].slug}`)
})

app.get('/exhibit/:slug', async function (request, response) { 
  const exhibitFetchResponse = await fetch(`${exhibitUrl}?filter[slug][_eq]=${request.params.slug}&fields=*,creators.teylers_museum_persons_id.*`)
  const exhibitFetchResponseJSON = await exhibitFetchResponse.json()
  const exhibit = exhibitFetchResponseJSON.data[0]

  const sectionsFetchResponse = await fetch(`${sectionsUrl}?filter[exhibit][_eq]=${exhibit.id}&sort=start_year`)
  const sectionsFetchResponseJSON = await sectionsFetchResponse.json()
  const sections = sectionsFetchResponseJSON

  const questionsFetchResponse = await fetch(`${quizQuestionsUrl}?filter[exhibit][_eq]=${exhibit.id}&fields=*`)
  const questionsFetchResponseJSON = await questionsFetchResponse.json()
  const question = questionsFetchResponseJSON.data[0]

  response.render('exhibit-detail.liquid', { 
    exhibit,
    sections
  })
})

app.get('/exhibit/:slug/timeline', async function (request, response) {
  const exhibitFetchResponse = await fetch(`${exhibitUrl}?filter[slug][_eq]=${request.params.slug}&fields=*,creators.teylers_museum_persons_id.*`)
  const exhibitFetchResponseJSON = await exhibitFetchResponse.json()
  const exhibit = exhibitFetchResponseJSON.data[0]

  const sectionsFetchResponse = await fetch(`${sectionsUrl}?filter[exhibit][_eq]=${exhibit.id}&sort=start_year`)
  const sectionsFetchResponseJSON = await sectionsFetchResponse.json()
  const sections = sectionsFetchResponseJSON

  const questionsFetchResponse = await fetch(`${quizQuestionsUrl}?filter[exhibit][_eq]=${exhibit.id}&fields=*`)
  const questionsFetchResponseJSON = await questionsFetchResponse.json()
  const question = questionsFetchResponseJSON.data[0]

  response.render('exhibit-timeline.liquid', { 
    exhibit,
    sections
  })
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}`)
})