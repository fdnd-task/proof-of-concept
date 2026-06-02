import express from 'express'
import { Liquid } from 'liquidjs';

const app = express()

app.use(express.urlencoded({extended: true}))
app.use(express.static('public'))

const engine = new Liquid()

app.engine('liquid', engine.express())
app.set('views', './views')

const baseUrl = ''

app.get('/', async function (request, response) {
  response.render('home.liquid')
})

app.get('/niet-beschikbaar', async function (request, response) {
  response.render('partials/niet-beschikbaar.liquid')
})

app.set('port', process.env.PORT || 8000)

app.listen(app.get('port'), function () {
  console.log(`Project draait via http://localhost:${app.get('port')}`)
})