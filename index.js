console.log("hej");

const form = document.querySelector("#listForm");
const list = document.querySelector("#userList");

form.addEventListener("submit", (event) => {
  event.preventDefault();
  const input = document.querySelector("#item").value;
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
    label.appendChild(checkbox);
    label.innerHTML += "Ta bort";

    container.appendChild(textSpan);
    container.appendChild(label);
    li.appendChild(container);
    list.appendChild(li);
    form.reset();

    label.addEventListener("click", () => {
      console.log(li);
      li.remove();
    });
  }
});
