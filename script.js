function addTodo() {
  const input = document.getElementById("todoInput");
  const text = input.value;

  if (text === "") return;

  const li = document.createElement("li");
  li.textContent = text;

  li.onclick = function () {
    li.classList.toggle("completed");
  };

  document.getElementById("todoList").appendChild(li);
  input.value = "";
}
