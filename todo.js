let tasks = JSON.parse(localStorage.getItem("stufoTasks")) || [];

function saveTasks() {
  localStorage.setItem("stufoTasks", JSON.stringify(tasks));
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  tasks.forEach((task, index) => {
    const li = document.createElement("li");
    if (task.completed) li.classList.add("completed");

    li.innerHTML = `
      <div>
        <input type="checkbox" ${task.completed ? "checked" : ""} 
          onchange="toggleTask(${index})" />
        <span>${task.text}</span>
        <div class="task-time">${task.time || ""}</div>
      </div>
      <button onclick="deleteTask(${index})">X</button>
    `;

    taskList.appendChild(li);
  });
}

function addTask() {
  const text = document.getElementById("taskInput").value;
  const time = document.getElementById("taskTime").value;

  if (!text.trim()) return;

  tasks.push({
    text: text,
    time: time,
    completed: false
  });

  document.getElementById("taskInput").value = "";
  document.getElementById("taskTime").value = "";

  saveTasks();
  renderTasks();
}

function toggleTask(index) {
  tasks[index].completed = !tasks[index].completed;
  saveTasks();
  renderTasks();
}

function deleteTask(index) {
  tasks.splice(index, 1);
  saveTasks();
  renderTasks();
}

renderTasks();
