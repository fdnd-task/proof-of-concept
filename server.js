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

const apiPrompts = apiUrl + "prompts";

const ApiSub = apiUrl + "subcategories";

const ApiPromptsId = apiUrl + "prompts?filter[id][_eq]=1";
const ApiPromptsIdTwo = apiUrl + "prompts?filter[id][_eq]=2";


// Home pagina
// laadt in wanneer dat nodig is
app.get("/", async function (request, response) {
  try {
    // Ophalen van categorieën
    const categories = await fetchJson(apiUrl + "categories");

    // Mappen van categorieën naar een formaat dat de front-end kan verwerken
    const categoriesWithSubcategories = await Promise.all(
      categories.data.map(async (category) => {
        const subcategories = await Promise.all(
          category.subcategories.map(async (subcategoryId) => {
            const subcategory = await fetchJson(
              `${apiUrl}subcategories/${subcategoryId}`
            );
            // console.log("subcategory" + subcategory.data.name);
            console.log("subcategory object" + subcategory);
            return subcategory;
          })
        );
        console.log(subcategories);
        return {
          id: category.id,
          name: category.name,
          subcategories: subcategories,
        };
      })
    );
    console.log(categoriesWithSubcategories);
    // Ophalen van prompts
    const promptsResponse = await fetchJson(apiUrl + "prompts");

    // Renderen van de home pagina met de opgehaalde gegevens
    response.render("home", {
      categories: categoriesWithSubcategories,
      prompts: promptsResponse.data,
      // prompts: promptsWithSubcategories
    });
    
  } catch (error) {
    console.error("Er was een probleem met het ophalen van gegevens:", error);
    response
      .status(500)
      .send("Er is een fout opgetreden bij het ophalen van gegevens.");
  }
});


app.get("/audit", async function (request, response) {
  try {
    const items = await fetchJson(apiUrl + "subcategories");
    const filteredData = items.data.filter((item) => {
      return item.category == 1;
    });
    const promptsResponse = await fetchJson(apiUrl + "prompts");

    const filteredPrompts = promptsResponse.data.filter((item) => {
      return item.subcategorie == 2;
    })

    response.render("audit", {
      subcategories: filteredData,
      prompts: filteredPrompts,
    });
  } catch (error) {
    console.error("Er was een probleem met het ophalen van gegevens:", error);
    response
      .status(500)
      .send("Er is een fout opgetreden bij het ophalen van gegevens.");
  }
});

app.get("/innovation", async function (request, response) {
  try {
    const items = await fetchJson(apiUrl + "subcategories");
    var subCategoryId = [];
    const filteredData = items.data.filter((item) => {
      console.log(item);
      if(item.category == 2) {
        subCategoryId.push(item.subcategory_id);
      }

      return item.category == 2;
    });
    const promptsResponse = await fetchJson(apiUrl + "prompts");
    const filteredPrompts = promptsResponse.data.filter((item) => {
      return subCategoryId.includes(item.subcategory_id);
    })

    console.log(filteredPrompts);

    response.render("innovation", {
      subcategories: filteredData,
      prompts: filteredPrompts,
    });
  } catch (error) {
    console.error("Er was een probleem met het ophalen van gegevens:", error);
    response
      .status(500)
      .send("Er is een fout opgetreden bij het ophalen van gegevens.");
  }
});

app.get("/consulting", async function (request, response) {
  try {
    const items = await fetchJson(apiUrl + "subcategories");
    const filteredData = items.data.filter((item) => {
      return item.category == 3;
    });
    const promptsResponse = await fetchJson(apiUrl + "prompts");

    const filteredPrompts = promptsResponse.data.filter((item) => {
      return item.subcategorie == 2;
    })

    response.render("consulting", {
      subcategories: filteredData,
      prompts: filteredPrompts,
    });
  } catch (error) {
    console.error("Er was een probleem met het ophalen van gegevens:", error);
    response
      .status(500)
      .send("Er is een fout opgetreden bij het ophalen van gegevens.");
  }
});

// // audit
// app.get("/audit/:id", function (request, response) {

//   const categoryId = request.params.id;
//   console.log("categoryId" + categoryId);
//   fetchJson(apiUrl + "prompts").then((items) => { 
//     const prompts = items.data.filter((item) => {
//       console.log("audit log item" + item);
//       return item.subcategorie == categoryId;
//     });
//     console.log(prompts);
//     response.render("audit", {
//       prompts: prompts,
//     });
//   });
// });

// app.get("/innovation/:id", function (request, response) {
//   const categoryId = request.params.id;
//   console.log("categoryId" + categoryId);
//   fetchJson(apiUrl + "prompts").then((items) => { 
//     const prompts = items.data.filter((item) => {
//       console.log(item);
//       return item.subcategorie == categoryId;
//     });
//     console.log(prompts);
//     response.render("innovation", {
//       prompts: prompts,
//     });
//   });
// });

// app.get("/consulting/:id", function (request, response) {
//   const categoryId = request.params.id;
//   console.log("categoryId" + categoryId);
//   fetchJson(apiUrl + "prompts").then((items) => { 
//     const prompts = items.data.filter((item) => {
//       console.log(item);
//       return item.subcategorie == categoryId;
//     });
//     console.log(prompts);
//     response.render("consulting", {
//       prompts: prompts,
//     });
//   });
// });




// audit
// app.get("/audit", function (request, response) {
//   // fetchJson(apiUrl + "subcategories").then((items) => {
//   fetchJson(apiUrl + "prompts").then((items) => {
//     console.log(items.data);
//     response.render("audit", {
//       prompts: items.data,
//     });
//   });
// });

// // innovation
// app.get("/innovation", function (request, response) {
//   // fetchJson(apiUrl + "subcategories").then((items) => {
//   fetchJson(apiUrl + "prompts").then((items) => {
//     console.log(items.data);
//     response.render("innovation", {
//       prompts: items.data,
//     });
//   });
// });


// // consulting
// app.get("/consulting", function (request, response) {
//   // fetchJson(apiUrl + "subcategories").then((items) => {
//   fetchJson(apiUrl + "prompts").then((items) => {
//     console.log(items.data);
//     response.render("audit", {
//       prompts: items.data,
//     });
//   });
// });


// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8002);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});