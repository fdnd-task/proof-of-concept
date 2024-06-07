// Importeer het npm pakket express uit de node_modules map
import express, { application, json, request } from "express";

// Importeer de zelfgemaakte functie fetchJson uit de ./helpers map
import fetchJson from "./helpers/fetch-json.js";

// Maak een nieuwe express app aan
const app = express();

// Stel ejs in als template engine
app.set("view engine", "ejs");

// Stel de map met ejs templates in
app.set("views", "./views");

// Gebruik de map 'public' voor statische resources, zoals stylesheets, afbeeldingen en client-side JavaScript
app.use(express.static("public"));

app.use(express.urlencoded({ extended: true }));

// Stel het basis endpoint in
const apiUrl = "https://fdnd-agency.directus.app/items/deloitte_";

// Home pagina
app.get("/", function (request, response) {
  fetchJson(apiUrl + "categories").then((items) => { console.log(items.data)
    response.render("home", {
      categories: items.data,
      subcategories: items.data,
    });
  });
});

// audit

app.get('/audit', function (request, response) {
    fetchJson(apiUrl + "prompts").then((items) => { console.log(items.data)
      response.render('audit', {
        prompts: items.data,
      });
    });
  });

// innovation
  app.get('/innovation', function (request, response) {
    fetchJson(apiUrl + "subcategories").then((items) => { 
      response.render('innovation', {
        subcategories: items.data,
      });
    });
  });

  // consulting
  app.get('/consulting', function (request, response) {
    fetchJson(apiUrl).then((items) => { 
      response.render('consulting', {
        categories: items.data,
      });
    });
  });

app.get('/home/:id', function(request, response) {
    fetchJson(apiUrl + "categories").then((items) => { 
        response.render("home", {
            categories: items.data
        });
    })
})




// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8002);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});
