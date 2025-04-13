// --- Task Quote Engine ---
const quotes = [
    "Keep going, you're doing great!",
    "Small steps lead to big progress.",
    "You don’t have to be extreme, just consistent.",
    "Focus on progress, not perfection.",
    "Done is better than perfect.",
    "Discipline > Motivation."
  ];
  document.getElementById("quote").textContent =
    quotes[Math.floor(Math.random() * quotes.length)];
  
  // --- Task LocalStorage Helpers ---
  function getTasks() {
    return JSON.parse(localStorage.getItem("tasks")) || [];
  }
  
  function saveTasks(tasks) {
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
  
  // --- Add Task ---
  function addTask() {
    const taskInput = document.getElementById("taskInput");
    const categoryInput = document.getElementById("taskCategory");
    const dueDateInput = document.getElementById("taskDueDate");
  
    const taskText = taskInput.value.trim();
    const category = categoryInput.value;
    const dueDate = dueDateInput.value;
  
    if (!taskText) return alert("Please enter a task.");
  
    const tasks = getTasks();
    tasks.push({ text: taskText, category, dueDate });
    saveTasks(tasks);
  
    taskInput.value = "";
    dueDateInput.value = "";
    categoryInput.value = "General";
  
    renderTasks();
  }
  
  // --- Render Tasks ---
  function renderTasks() {
    const taskList = document.getElementById("taskList");
    const tasks = getTasks();
    taskList.innerHTML = "";
  
    tasks.forEach((task, index) => {
      const li = document.createElement("li");
      li.className =
        "flex flex-col md:flex-row justify-between md:items-center gap-2 bg-white px-4 py-2 border border-gray-300 rounded shadow-sm hover:bg-indigo-50 transition";
  
      const left = document.createElement("div");
      left.className = "flex flex-col";
  
      const taskText = document.createElement("span");
      taskText.textContent = task.text;
      taskText.className = "font-medium text-black";
  
      const meta = document.createElement("span");
      meta.className = "text-sm text-gray-600";
      meta.textContent = `Category: ${task.category} | Due: ${task.dueDate || "N/A"}`;
  
      left.appendChild(taskText);
      left.appendChild(meta);
  
      const btn = document.createElement("button");
      btn.textContent = "Delete";
      btn.className = "text-red-500 hover:underline text-sm self-start md:self-center";
      btn.onclick = () => {
        const tasks = getTasks();
        tasks.splice(index, 1);
        saveTasks(tasks);
        renderTasks();
      };
  
      li.appendChild(left);
      li.appendChild(btn);
      taskList.appendChild(li);
    });
  }
  
  // --- Init on Page Load ---
  window.onload = () => {
    renderTasks();
  };
  