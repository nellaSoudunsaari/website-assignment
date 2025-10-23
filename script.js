const navFrontpg = document.getElementById("front-page");
const navFirstpg = document.getElementById("first-page");
const navSecondpg = document.getElementById("second-page");
const navThirdpg = document.getElementById("third-page");
const navFourthpg = document.getElementById("fourth-page");

const conFrontpg = document.getElementById("fp-content");
const conFirstpg = document.getElementById("1p-content");
const conSecondpg = document.getElementById("2p-content");
const conThirdpg = document.getElementById("3p-content");
const conFourthpg = document.getElementById("4p-content");

const pgtitle = document.getElementById("title");

navFrontpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Front page";
    conFrontpg.style.display = "block";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "none";
});

navFirstpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "First page";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "block";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "none";
});

navSecondpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Second page";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "block";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "none";
});

navThirdpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Third page";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "block";
    conFourthpg.style.display = "none";
});

navFourthpg.addEventListener("click", () =>{
    pgtitle.innerHTML = "Fourth page";
    conFrontpg.style.display = "none";
    conFirstpg.style.display = "none";
    conSecondpg.style.display = "none";
    conThirdpg.style.display = "none";
    conFourthpg.style.display = "block";
});