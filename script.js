const inputBox = document.getElementById("input-box");
const listContainer = document.getElementById("list-container");
const laskuri = document.getElementById("laskuri");

function addTask() {
  if (inputBox.value === "") {
    alert("Sinun täytyy kirjoittaa jokin tehtävä!");
  } else if (inputBox.value.length < 3) {
    alert("Tehtävän on oltava vähintään kolme merkkiä pitkä!");
  } else {
    let li = document.createElement("li");
    li.innerHTML = inputBox.value;
    listContainer.appendChild(li);
    let span = document.createElement("span");
    span.innerHTML = "\u00d7";
    li.appendChild(span);
  }
  inputBox.value = "";
  saveData();
  updateLaskuri();
}

listContainer.addEventListener(
  "click",
  function (e) {
    if (e.target.tagName === "LI") {
      e.target.classList.toggle("valittu");
      saveData();
      updateLaskuri();
    } else if (e.target.tagName === "SPAN") {
      e.target.parentElement.remove();
      saveData();
      updateLaskuri();
    }
  },
  false
);
function updateLaskuri() {
  const tehtävät = document.querySelectorAll("#list-container li").length;
  const valmiitTehtävät = document.querySelectorAll("#list-container li.valittu").length;
  const tehtävätJäljellä = tehtävät - valmiitTehtävät;
  laskuri.innerHTML = "Tehtäviä yhteensä " + tehtävät + " <br>Suoritettuja tehtäviä " + valmiitTehtävät + "<br>Tehtäviä suorittamatta " + tehtävätJäljellä;

}

function saveData() {
  localStorage.setItem("data", listContainer.innerHTML);
}
function showTask() {
  listContainer.innerHTML = localStorage.getItem("data");
  updateLaskuri();
}
showTask();
