import express from 'express'

import { Liquid } from 'liquidjs';

import dotenv from "dotenv";

dotenv.config();

const app = express()

const engine = new Liquid();
app.engine('liquid', engine.express()); 

  const response = await fetch ('https://the-sprint-api.onrender.com/people')

app.get('/', async (req, res) => {

  try {
    const response = await fetch ('https://the-sprint-api.onrender.com/people', {
      headers: {
        'X-API-Key':`${process.env.API_KEY}`
      }
    });

  const data = await response.json();
  console.log(data)

  res.render('index.liquid', { users:data}); 
  } catch (err) {
  console.error('Fout bij ophalen:', err);
  res.status(500).send('Fout bij het ophalen van data');
  }

});
app.set('port', process.env.PORT || 7000)

app.listen(app.get('port'), function () {
  console.log(`Application started on http://localhost:${app.get('port')}`)
})