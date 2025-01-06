const form = document.querySelector("#listForm");
const list = document.querySelector("#userList");
const saveForm = document.querySelector("#saveListForm");
const savedListNameInput = document.querySelector("#savedListNameInput");
const savedUlList = document.querySelector("#savedUlList");
// [x] Jag sparar ner uppgifter som användaren skriver in i inputfältet,
//  jag sparar undan informationen i localStorage,
// jag skapar en array där jag lägger in den sparade informationen.
// [x] jag sparar även undan ändringar i listan när användaren tar bort en uppgift
// jag tar bort informationen från arrayen när användaren trycker "ta bort".
// hur kopplar jag klicket på label med det index som ska tas bort från arrayen?
// När sidan öppnas ritas det upp en lista utifrån det som finns sparat i localStorage.
// [x] create a function that creates and appends
// all elements. change send input as an argument
// [x] jag lägger till en möjlighet att spara undan en lista
// [x] när knappen att spara en lista klickas på sparas namnet på listan och arrayen undan i ett objekt.

// x[] när den sparade listan trycks på ritas den upp på canvasen.
// [x] när användaren skriver in ett namn så skapas en array med ett objekt
// där name nyckeln blir vad användaren skrivit in och list nyckeln det som fanns i listan.
// [] skapar en möjlighet att redigera en sparad lista
// [] användaren trycker fram sin lista, tar bort en uppgift och det sparas i localstorage

let variable;

let storedData = JSON.parse(localStorage.getItem("savedTasks")) || [];
// let savedArray = JSON.parse(localStorage.getItem("savedLists")) || [];
let savedStoredData = [];
let savedListName;

let savedListsArray = [];
let temporary = JSON.parse(localStorage.getItem("temp")) || [];
let temp = JSON.parse(localStorage.getItem("temp"));

console.log("temp: ", temp);

let test = [];
let savedList = {};
let savedListToClick;
console.log("storedData", storedData);
console.log("savedListArray", savedListsArray);
// let savedListOnLoad = JSON.parse(localStorage.getItem("savedList"));

// console.log(savedListOnLoad.name);

saveForm.addEventListener("submit", (event) => {
  event.preventDefault();

  savedStoredData = [];
  storedData.forEach((data) => {
    savedStoredData.push(data);
  });
  // console.log("savedStoredData: ", savedStoredData);

  savedList.name = savedListNameInput.value;
  savedList.list = savedStoredData;

  console.log("savedList", savedList);

  // localStorage.removeItem("savedTasks");

  // savedListsArray.push(savedList);

  // console.log("savedArray", savedListsArray);

  // localStorage.setItem("savedLists", JSON.stringify(savedListsArray));

  // variable = savedList.name;

  // localStorage.setItem(`${savedList.name}`, JSON.stringify(savedListsArray));

  localStorage.setItem(`${savedList.name}`, JSON.stringify(savedList));
  temp = JSON.parse(localStorage.getItem(`${savedList.name}`));

  console.log("temp-array: ", temp);
  temporary.push(temp);
  console.log(temporary);
  localStorage.setItem("temp", JSON.stringify(temporary));
  createSavedList(savedList);

  // console.log(savedList[0].name);
  // savedListToClick = document.createElement("li");
  // savedListToClick.textContent = savedList[0].name;
  // savedUlListToClick.appendChild(savedListToClick);

  // savedListToClick.addEventListener("click", () => {
  //   list.innerHTML = "";
  //   // const savedListItems = JSON.parse(localStorage.getItem("savedList"));
  //   savedList[0].list.forEach((data) => {
  //     createList(data);
  //   });
  // });
});

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const input = document.querySelector("#item").value;
  storedData.push(input);
  localStorage.setItem("savedTasks", JSON.stringify(storedData));

  if (input.trim() !== "") {
    createList(input);
  }
});

// let something = JSON.parse(localStorage.getItem("temp")) || [];

// console.log("something: ", something);
// // list.innerHTML = "";
// something.forEach((data) => {
//   createSavedList(data);
// });

if (temp) {
  savedUlList.innerHTML = "";
  temp.forEach((data) => {
    createSavedList(data);
    console.log("data", data);
  });
}

// if (storedData) {
//   storedData.forEach((data) => {
//     createList(data);
//   });
// }

function createSavedList(info) {
  // console.log("info", info);
  // list.innerHTML = "";
  const li = document.createElement("li");
  const container = document.createElement("div");
  container.classList.add("list-item");
  const textSpan = document.createElement("span");
  textSpan.textContent = info.name;
  textSpan.classList.add("list-item-text");
  // textSpan.style.border = "1px solid white";

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  const label = document.createElement("label");
  label.classList.add("container");
  label.style.border = "1px solid white";
  label.appendChild(checkbox);
  label.innerHTML += "Ta bort";

  container.appendChild(textSpan);
  container.appendChild(label);
  li.appendChild(container);
  savedUlList.appendChild(li);
  saveForm.reset();

  label.addEventListener("click", () => {
    // let i;
    // info.list.forEach((task, index) => {
    //   if (task === info) {
    //     i = index;
    //   }
    // });
    list.innerHTML = "";
    li.remove();
    localStorage.removeItem(`${info.name}`);
    // something.splice(i, 1);
    // console.log("temp array: ", something);
    // localStorage.setItem("temp", JSON.stringify(something));
    // console.log(JSON.parse(localStorage.getItem(`${[info.name]}`)));
    // let temp = JSON.parse(localStorage.getItem(`${[info.name]}`));
    // localStorage.setItem(`${info.name}`, JSON.stringify(temp));
    let something = JSON.parse(localStorage.getItem("temp"));
    let n;
    something.forEach((list, index) => {
      if (list === info) {
        n = index;
      }
    });
    something.splice(n, 1);
    localStorage.setItem("temp", JSON.stringify(something));
    // console.log(JSON.parse(localStorage.getItem(`${[info.name]}`)));
  });

  container.addEventListener("click", () => {
    list.innerHTML = "";
    localStorage.removeItem("savedTasks");

    info.list.forEach((li) => {
      console.log(li);
      createList(li);
    });

    // console.log("arr", arr);
    // arr.list.forEach((data) => {
    //   console.log(data);
    //   createList(data);
    // });
  });
}

// localStorage.clear();

function createList(info) {
  const li = document.createElement("li");
  const container = document.createElement("div");
  container.classList.add("list-item");
  const textSpan = document.createElement("span");
  textSpan.textContent = info;
  textSpan.classList.add("list-item-text");

  const checkbox = document.createElement("input");
  checkbox.type = "checkbox";
  checkbox.classList.add("checkbox");
  const label = document.createElement("label");
  label.classList.add("container");
  label.appendChild(checkbox);
  label.innerHTML += "Ta bort";

  container.appendChild(textSpan);
  container.appendChild(label);
  li.appendChild(container);
  list.appendChild(li);
  form.reset();

  // label.addEventListener("click", () => {
  //   let i
  //   something.list
  // })

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
