const navFrontpg = document.getElementById("front-page");
const navFirstpg = document.getElementById("first-page");
const navSecondpg = document.getElementById("second-page");
const navThirdpg = document.getElementById("third-page");
const navFourthpg = document.getElementById("fourth-page");

const conFrontpg = document.getElementsByClassName("first-page");
const pgtitle = document.getElementsByClassName("title");

frontpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Front page";
    conFrontpg.style.display = "block";
});