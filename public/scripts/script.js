const interfaceSound = new Audio("./assets/interface-124464.mp3");
const interfaceClick = document.querySelector(".interface-link");

interfaceClick.addEventListener("click", () => {
    interfaceSound.play();
});