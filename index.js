const form = document.querySelector("#listForm");
const list = document.querySelector("#userList");

// [x] Jag sparar ner uppgifter som användaren skriver in i inputfältet,
//  jag sparar undan informationen i localStorage,
// jag skapar en array där jag lägger in den sparade informationen.
// [x] jag sparar även undan ändringar i listan när användaren tar bort en uppgift
// jag tar bort informationen från arrayen när användaren trycker "ta bort".
// hur kopplar jag klicket på label med det index som ska tas bort från arrayen?
// När sidan öppnas ritas det upp en lista utifrån det som finns sparat i localStorage.
// [x] create a function that creates and appends
// all elements. change send input as an argument

let storedData = JSON.parse(localStorage.getItem("savedTasks")) || [];

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#item").value;
  storedData.push(input);
  localStorage.setItem("savedTasks", JSON.stringify(storedData));

  if (input.trim() !== "") {
    createList(input);
  }
});

if (storedData) {
  storedData.forEach((data) => {
    createList(data);
  });
}
function createList(info) {
  const li = document.createElement("li");
  const container = document.createElement("div");
  container.classList.add("list-item");
  const textSpan = document.createElement("span");
  textSpan.textContent = info;
  textSpan.classList.add("list-item-text");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  const label = document.createElement("label");
  label.classList.add("container");
  label.appendChild(checkbox);
  label.innerHTML += "Ta bort";

  container.appendChild(textSpan);
  container.appendChild(label);
  li.appendChild(container);
  list.appendChild(li);
  form.reset();

  label.addEventListener("click", () => {
    let i;
    storedData.forEach((task, index) => {
      if (task === info) {
        i = index;
      }
    });
    li.remove();
    storedData.splice(i, 1);
    localStorage.setItem("savedTasks", JSON.stringify(storedData));
  });
}
