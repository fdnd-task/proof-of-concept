const interfaceSound = new Audio("./assets/interface-124464.mp3");
const interfaceClicks = document.querySelectorAll(".default-link");

interfaceClicks.forEach((interfaceClick) => {
  interfaceClick.addEventListener("click", (event) => {
    event.preventDefault(); // Voorkomt dat de standaard linkactie wordt uitgevoerd

    interfaceSound.play();

    setTimeout(() => {
      window.location.href = event.target.href; // Doorsturen naar de volgende pagina
    }, 800); // Wacht 0.8 seconden voordat de doorstuuring plaatsvindt
  });
});
