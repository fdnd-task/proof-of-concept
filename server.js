// Importeer het npm pakket express uit de node_modules map
import express from 'express';
import fetchJson from './helpers/fetch-json.js';

const apiUrl = "https://fdnd-agency.directus.app/items/";
const anwbWeek = apiUrl + "anwb_week?fields=*,assignments.*,assignments.anwb_assignments_id.*,assignments.anwb_assignments_id.role.anwb_roles_id.role,assignments.anwb_assignments_id.person.anwb_persons_id.name";

// Maak een nieuwe express app aan
const app = express();

app.set('view engine', 'ejs');

// Stel de map met ejs templates in
app.set('views', './views');

// Gebruik de map 'public'
app.use(express.static('public'));

app.use(express.urlencoded({ extended: true }));

// Route voor de homepagina
app.get('/', function (request, response) {
    // Haal de data op van de API
    fetchJson(anwbWeek)
        .then((weeksData) => {
            // Voorbewerk de data
            // Voor elke week, map de week naar een nieuw object waarbij de assignments worden bijgewerkt
            const weeks = weeksData.data.map(week => {
                return {
                    // neem alle bestaande data van week
                    ...week,
                    assignments: week.assignments.map(assignment => {
                        // Voor elke rol en persoon in de assignment, maak een nieuw object dat zowel de rol als de naam bevat
                        const rolesAndPersons = assignment.anwb_assignments_id.role.map((roleObj, i) => {
                            return {
                                role: roleObj.anwb_roles_id.role, // Verkrijg de rolnaam
                                name: assignment.anwb_assignments_id.person[i].anwb_persons_id.name // Verkrijg de persoonsnaam
                            };
                        });
                        return {
                            ...assignment,
                            rolesAndPersons // Voeg de nieuwe array toe aan de assignment en geef deze terug
                        };
                    })
                };
            });

            // Render de index-pagina en geef de voorbereide data door aan de template
            response.render('index', {
                weeks
            });
        })
        .catch((error) => {
            // Log eventuele fouten en geef een foutmelding terug
            console.error('Error fetching data:', error);
            response.status(500).send('Error fetching data');
        });
});

// Route voor het ophalen van weekdata op basis van weekId
app.get('/week/:weekId', function (request, response) {
    const weekId = request.params.weekId;
    fetchJson(`${apiUrl}/anwb_week/${weekId}?fields=*,assignments.*,assignments.anwb_assignments_id.*,assignments.anwb_assignments_id.role.anwb_roles_id.*,assignments.anwb_assignments_id.role.anwb_roles_id.role,assignments.anwb_assignments_id.person.anwb_persons_id.name`)
        .then((weekData) => {
            const week = weekData.data;
            const processedWeek = {
                ...week,
                assignments: week.assignments.map(assignment => {
                    const rolesAndPersons = assignment.anwb_assignments_id.role.map((roleObj, i) => {
                        return {
                            role: roleObj.anwb_roles_id.role,
                            name: assignment.anwb_assignments_id.person[i].anwb_persons_id.name
                        };
                    });
                    return {
                        ...assignment,
                        rolesAndPersons
                    };
                })
            };
            response.json(processedWeek);
        })
        .catch((error) => {
            console.error('Error fetching week data:', error);
            response.status(500).send('Error fetching week data');
        });
});


// Stel de poort in waarop de server luistert
app.set('port', process.env.PORT || 8001);

// Start express op en haal daarbij het ingestelde poortnummer op
app.listen(app.get('port'), function () {
    console.log(`Application started on http://localhost:${app.get('port')}`);
});
