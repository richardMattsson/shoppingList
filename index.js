const form = document.querySelector("#listForm");
const list = document.querySelector("#userList");

// [x] Jag sparar ner uppgifter som användaren skriver in i inputfältet,
//  jag sparar undan informationen i localStorage,
// jag skapar en array där jag lägger in den sparade informationen.
// [x] jag sparar även undan ändringar i listan när användaren tar bort en uppgift
// jag tar bort informationen från arrayen när användaren trycker "ta bort".
// hur kopplar jag klicket på label med det index som ska tas bort från arrayen?
// När sidan öppnas ritas det upp en lista utifrån det som finns sparat i localStorage.

let storedData = JSON.parse(localStorage.getItem("savedTasks"));
console.log(storedData);
// can take away arr and only use stored data
let arr = storedData || [];
let i;

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#item").value;
  console.log(input); 
// push stored data instead 
  arr.push(input);
  localStorage.setItem("savedTasks", JSON.stringify(arr));
// create a function that creates and appends
// all elements. change send input as an argument
  console.log(arr);
  if (input.trim() !== "") {
    const li = document.createElement("li");
    const container = document.createElement("div");
    container.classList.add("list-item");
    const textSpan = document.createElement("span");
    textSpan.textContent = input;
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
      arr.forEach((task, index) => {
        console.log(task, index);
        if (task === input) {
          console.log("hej");
          i = index;
          console.log(i);
        }
      });
      console.log(input);
      li.remove();
      arr.splice(i, 1);
      console.log(arr);

      localStorage.setItem("savedTasks", JSON.stringify(arr));
    });
  }
});

if (storedData) {
  storedData.forEach((data) => {
    const li = document.createElement("li");
    const container = document.createElement("div");
    container.classList.add("list-item");
    const textSpan = document.createElement("span");
    textSpan.textContent = data;
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
      storedData.forEach((task, index) => {
        console.log(task, index);
        if (task === data) {
          console.log("hej");
          i = index;
          console.log(i);
        }
      });
      console.log(data);
      li.remove();
      storedData.splice(i, 1);
      console.log(storedData);

      localStorage.setItem("savedTasks", JSON.stringify(storedData));
    });
  });
}
