// Importeer het npm pakket express uit de node_modules map
import express from 'express'

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from './helpers/fetch-json.js'

// // Stel het basis endpoint in
const apiUrl = "https://fdnd-agency.directus.app/items/"
const apiUrlWeeksAssignments = apiUrl + "anwb_week?fields=*,anwb_assignments.*"
const apiUrlWeeksAssignmentsPersons = apiUrl + "anwb_week?fields=*,anwb_assignments.*,anwb_assignments.person.*"
const anwbWeek = apiUrl + "anwb_week"
// Maak een nieuwe express app aan
const app = express()

// Stel ejs in als template engine
app.set('view engine', 'ejs')

// Stel de map met ejs templates in
app.set('views', './views')

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static('public'))

// Zorg dat werken met request data makkelijker wordt
app.use(express.urlencoded({extended: true}))
app.get('/', function (request, response) {
    Promise.all([fetchJson(anwbWeek), fetchJson(apiUrlWeeksAssignments), fetchJson(apiUrlWeeksAssignmentsPersons)])
        .then(([weeks, weeksAsignments, weeksAsignmentsPersons]) => {
            // Render the index page and pass the fetched data to the template
            response.render('index', {
                weeks: weeks.data,
                weeksAsignments: weeksAsignments.data,
                weeksAssignmentsPersons: weeksAsignmentsPersons.data
            });
            console.log(weeks);
            console.log(weeksAsignments);
            console.log(weeksAsignmentsPersons);
        })
        .catch((error) => {
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching data');
        });
});

app.set('port', process.env.PORT || 8001)

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get('port'), function () {
    // Toon een bericht in de console en geef het poortnummer door
    console.log(`Application started on http://localhost:${app.get('port')}`)
})

// Routes
