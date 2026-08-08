let input = document.getElementById("create-task");
let task_list = document.getElementById("tasks");


// TODO Функция создания задачи
function createTask(name) {
    let task = document.createElement("div");
    task.classList.add("task");
    task_list.appendChild(task);

    let checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.id = "checkbox";
    task.appendChild(checkbox);

    let task_name = document.createElement("a");
    task_name.classList.add("task-text");
    task_name.textContent = name;
    task.appendChild(task_name);

    let del = document.createElement("button");
    del.textContent = "🗑️";
    del.classList.add("delete");
    task.appendChild(del);


    // ! Удаление задачи
    del.addEventListener("click", function() {
        task.remove();

        let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

        tasks = tasks.filter(function(item) {
            return item !== name;
        });

        localStorage.setItem("tasks", JSON.stringify(tasks));
    });


    // * Выполнение задачи
    checkbox.addEventListener("click", function() {
        if (checkbox.checked) {
            console.log("task completed");
            task.classList.add("completed");
        } else {
            console.log("task is NOT completed");
            task.classList.remove("completed");
        }
    });
}


// TODO Создание новой задачи
input.addEventListener("change", function() {
    let name = input.value;

    createTask(name);

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push(name);

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
});


// TODO Загрузка сохранённых задач при открытии страницы
let savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];

savedTasks.forEach(function(name) {
    createTask(name);
});
let command = document.getElementById("command");
command.addEventListener("change", function() {
    let bg = document.getElementById("bg");
    let commandText = command.value 
    if (commandText === "switch") { 
        bg.classList.toggle("dark-mode");
        bg.classList.toggle("light-mode");
        task_list.classList.toggle("dark-mode");
        task_list.classList.toggle("light-mode");
        command.value = "";
    } else if (commandText === "clear") {
        localStorage.clear();
        task_list.innerHTML = "";
        command.value = "";
    }
})
