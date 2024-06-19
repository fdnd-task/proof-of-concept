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

// // audit
// app.get("/audit/:id", function (request, response) {

//   const categoryId = request.params.id;
//   console.log("categoryId" + categoryId);
//   fetchJson(apiUrl + "prompts").then((items) => { 
//     const prompts = items.data.filter((item) => {
//       console.log("audit log item" + item);
//       return item.subcategorie == categoryId;
//     });

//     const variablesIds = prompts[0].variables;
//     console.log("variables" + variablesIds);
  
//     fetchJson(apiUrl + "variables").then((items) => { 
//       const variables = items.data.filter((item) => {
//         console.log("audit log item" + item.id);
//         return variablesIds.includes(item.id);
//       });
//     console.log(variables);
//     console.log(prompts);
//     response.render("audit", {
//       prompts: prompts,
//       variables: variables, 
//     });
//   });
// });
// });


app.get("/audit/:id", async (request, response) => {
  const categoryId = request.params.id;
  console.log("categoryId: " + categoryId);
  const fetchJson = (url) => fetch(url).then(response => response.json());

  try {
    // Fetch prompts and variables concurrently
    const [promptsData, variablesData] = await Promise.all([
      fetchJson(apiUrl + "prompts"),
      fetchJson(apiUrl + "variables")
    ]);

    // Filter prompts by category
    const prompts = promptsData.data.filter(item => item.subcategorie == categoryId);
    if (prompts.length === 0) {
      return response.render("audit", { prompts: [], variables: [] });
    }

    // Map variable IDs to their details
    const variableMap = variablesData.data.reduce((map, variable) => {
      map[variable.id] = { label: variable.label, type: variable.type };
      return map;
    }, {});

    // Replace placeholders in prompts with input fields
    const formattedPrompts = prompts.map(prompt => {
      let formattedText = prompt.text;
      prompt.variables.forEach(variableId => {
        const variable = variableMap[variableId];
        let inputField;
        switch (variable.type) {
          case 'FILE':
            inputField = `<input type="file" name="${variable.label}" />`;
            break;
          case 'DATETIME_LOCAL':
            inputField = `<input type="datetime-local" name="${variable.label}" />`;
            break;
          case 'TEXT':
            inputField = `<input type="text" name="${variable.label}" placeholder="Enter ${variable.label}" />`;
            break;
          default:
            inputField = `<input type="text" name="${variable.label}" />`;
        }
        const placeholder = new RegExp(`{{\\s*${variable.label}\\s*}}`, 'g');
        formattedText = formattedText.replace(placeholder, inputField);
      });
      return { ...prompt, text: formattedText };
    });

    response.render("audit", {
      prompts: formattedPrompts,
      variables: variablesData.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.get("/innovation/:id", async (request, response) => {
  const categoryId = request.params.id;
  console.log("categoryId: " + categoryId);
  const fetchJson = (url) => fetch(url).then(response => response.json());

  try {
    // Fetch prompts and variables concurrently
    const [promptsData, variablesData] = await Promise.all([
      fetchJson(apiUrl + "prompts"),
      fetchJson(apiUrl + "variables")
    ]);

    // Filter prompts by category
    const prompts = promptsData.data.filter(item => item.subcategorie == categoryId);
    if (prompts.length === 0) {
      return response.render("innovation", { prompts: [], variables: [] });
    }

    // Map variable IDs to their details
    const variableMap = variablesData.data.reduce((map, variable) => {
      map[variable.id] = { label: variable.label, type: variable.type };
      return map;
    }, {});

    // Replace placeholders in prompts with input fields
    const formattedPrompts = prompts.map(prompt => {
      let formattedText = prompt.text;
      prompt.variables.forEach(variableId => {
        const variable = variableMap[variableId];
        let inputField;
        switch (variable.type) {
          case 'FILE':
            inputField = `<input type="file" name="${variable.label}" />`;
            break;
          case 'DATETIME_LOCAL':
            inputField = `<input type="datetime-local" name="${variable.label}" />`;
            break;
          case 'TEXT':
            inputField = `<input type="text" name="${variable.label}" placeholder="Enter ${variable.label}" />`;
            break;
          default:
            inputField = `<input type="text" name="${variable.label}" />`;
        }
        const placeholder = new RegExp(`{{\\s*${variable.label}\\s*}}`, 'g');
        formattedText = formattedText.replace(placeholder, inputField);
      });
      return { ...prompt, text: formattedText };
    });

    response.render("innovation", {
      prompts: formattedPrompts,
      variables: variablesData.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).send("Internal Server Error");
  }
});

app.get("/consulting/:id", async (request, response) => {
  const categoryId = request.params.id;
  console.log("categoryId: " + categoryId);
  const fetchJson = (url) => fetch(url).then(response => response.json());

  try {
    // Fetch prompts and variables concurrently
    const [promptsData, variablesData] = await Promise.all([
      fetchJson(apiUrl + "prompts"),
      fetchJson(apiUrl + "variables")
    ]);

    // Filter prompts by category
    const prompts = promptsData.data.filter(item => item.subcategorie == categoryId);
    if (prompts.length === 0) {
      return response.render("consulting", { prompts: [], variables: [] });
    }

    // Map variable IDs to their details
    const variableMap = variablesData.data.reduce((map, variable) => {
      map[variable.id] = { label: variable.label, type: variable.type };
      return map;
    }, {});

    // Replace placeholders in prompts with input fields
    const formattedPrompts = prompts.map(prompt => {
      let formattedText = prompt.text;
      prompt.variables.forEach(variableId => {
        const variable = variableMap[variableId];
        let inputField;
        switch (variable.type) {
          case 'FILE':
            inputField = `<input type="file" name="${variable.label}" />`;
            break;
          case 'DATETIME_LOCAL':
            inputField = `<input type="datetime-local" name="${variable.label}" />`;
            break;
          case 'TEXT':
            inputField = `<input type="text" name="${variable.label}" placeholder="Enter ${variable.label}" />`;
            break;
          default:
            inputField = `<input type="text" name="${variable.label}" />`;
        }
        const placeholder = new RegExp(`{{\\s*${variable.label}\\s*}}`, 'g');
        formattedText = formattedText.replace(placeholder, inputField);
      });
      return { ...prompt, text: formattedText };
    });

    response.render("consulting", {
      prompts: formattedPrompts,
      variables: variablesData.data,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    response.status(500).send("Internal Server Error");
  }
});

// Stel het poortnummer in waar express op moet gaan luisteren
app.set("port", process.env.PORT || 8002);

// Start express op, haal daarbij het zojuist ingestelde poortnummer op
app.listen(app.get("port"), function () {
  // Toon een bericht in de console en geef het poortnummer door
  console.log(`Application started on http://localhost:${app.get("port")}`);
});