// Importeert de 'path' module
import * as path from 'path';

// Importeert de fs module 
import fs from 'fs';

// Importeert de bodyParser module
import bodyParser from 'body-parser';

// Importeert de express module
import express from 'express';

// Initialiseer een express-applicatie
const app = express();

// Importeert de 'http' module
import http from 'http';

// Importeert het .env bestand
import dotenv from 'dotenv';

dotenv.config();

const collectionsJson = './course/collections.json';

// Start de server en luister naar de opgegeven poort
app.set("port", process.env.PORT || 8000);

const server = http.createServer(app);
server.listen(app.get("port"), () => {
  console.log(`Server is gestart op http://localhost:${app.get("port")}`);
});

// Stel de view engine in op "ejs"
app.set("view engine", "ejs");
app.set("views", "./views")

// Wijs de "public" map toe als de statische map voor het serveren van bestanden
app.use(express.static("public"));

// Definieer de route voor de hoofdpagina ("/")
app.get("/", (request, response) => {
    fs.readFile(collectionsJson, "utf8", (err, data) => {
      if (err) {
        console.error("Fout bij het lezen van het JSON-bestand:", err);
        response.status(500).render("error");
      } 
      else {
        try {
          // Parsen van JSON-gegevens naar een JavaScript-object of array
          const collectionsJson = JSON.parse(data);
          // Render de "index" view en geef de JSON-gegevens door als gegevens
          response.render("index", { data: collectionsJson });
        } catch (error) {
          console.error("Fout bij het parsen van JSON:", error);
          response.status(500).render("error");
        }
      }
    });
  });

// Definieert een route voor de 404-pagina
app.get("*", (request, response) => {
    // Render de "404" view
    response.status(404).render("404");
});

// Asynchrone functie om JSON-gegevens op te halen van een opgegeven URL
async function fetchJson(url) {
    // Doe een HTTP-verzoek naar de opgegeven URL
    const response = await fetch(url);
    // Wacht op de respons en converteer deze naar JSON-formaat
    const data = await response.json();
    // Geef de opgehaalde gegevens terug
    return data;
}

// Asynchrone functie om JSON-gegevens te verzenden naar een opgegeven URL
async function postJson(url, data) {
    // Doe een HTTP POST-verzoek naar de opgegeven URL met de opgegeven gegevens
    const response = await fetch(url, {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify(data)
    });
    // Wacht op de respons en converteer deze naar JSON-formaat
    const responseData = await response.json();
    // Geef de ontvangen gegevens terug
    return responseData;
}
