const d = document,
      $input = d.querySelector(".tasks-input input"),
      $tasksList = d.querySelector(".tasks-box .tasks"),
      $clearAll = d.querySelector(".clear-all")
      $filters = d.querySelectorAll(".filters span");

let toDos = JSON.parse(localStorage.getItem("tasks-list")),
    editingTask = [false, ""];

const displayTasks = (filter) => {
    let $li = "";
    if (toDos) {
        toDos.forEach((toDo, id) => {
            let completed = toDo.status === "completed" ? "checked" : "";
            if (filter === toDo.status || filter === "all") {
                $li += `
                    <li class="task">
                        <label for="${id}">
                            <input type="checkbox" id="${id}" onclick="updateStatus(this)" ${completed}>
                            <p>${toDo.name}</p>
                        </label>
                        <div class="settings">
                            <span class="material-symbols-outlined" onclick="showMenu(this)">more_horiz</span>
                            <ul class="menu">
                                <li class="edit" onclick="editTask(${id})">
                                    <span class="material-symbols-outlined">edit_note</span>
                                    <p>Edit</P>
                                </li>
                                <li class="delete" onclick="deleteTask(${id})">
                                    <span class="material-symbols-outlined">delete</span>
                                    <p>Delete</P>
                                </li>
                            </ul>
                        </div>
                    </li>
                `;
            };
       }); 
    };
    $tasksList.innerHTML = $li || "<span>There is not any task here<span>";
    let checkTasks = d.querySelectorAll(".task");
    !checkTasks.length ? $clearAll.classList.add("inactive") : $clearAll.classList.remove("inactive");
    console.log($tasksList.offsetHeight, $tasksList.offsetHeight >= 280);
    $tasksList.offsetHeight >= 272 ? $tasksList.classList.add("overflow") : $tasksList.classList.remove("overflow");
};

const showMenu = (clicked) => {
    let menu = clicked.parentElement.lastElementChild;
    menu.classList.add("show");
    d.addEventListener("click", e => {
        if (e.target !== clicked && 
            e.target !== "LI") {
                menu.classList.remove("show");
            }
    });
};

const editTask = (id) => {
    let taskName = toDos[id].name;
    editingTask = [true, id];
    $input.value = taskName;
    $input.classList.add("active");
};

const deleteTask = (id) => {
    toDos.splice(id, 1);
    localStorage.setItem("tasks-list", JSON.stringify(toDos));
    displayTasks(d.querySelector("span.active").id);
};

const updateStatus = (clicked) => {
    let taskName = clicked.parentElement.lastElementChild,
        id = clicked.id;
    if (clicked.checked) {
        taskName.classList.add("checked");
        toDos[id].status = "completed";
    } else {
        taskName.classList.remove("checked");
        toDos[id].status = "pending";
    };
    localStorage.setItem("tasks-list", JSON.stringify(toDos));
};

$filters.forEach(filter => {
    d.addEventListener("click", e => {
        if (e.target === filter) {
            d.querySelector("span.active").classList.remove("active");
            filter.classList.add("active");
            displayTasks(filter.id);
        }
    });
});

d.addEventListener("click", e => {
    if (e.target.matches(".clear-all")) {
        toDos = [];
        localStorage.setItem("tasks-list", JSON.stringify(toDos));
        displayTasks(d.querySelector("span.active").id);
    };
});

d.addEventListener("keyup", e => {
    if (e.key === "Enter") {
        if ($input.value) {
            let userTask = $input.value;
            if (!editingTask[0]) {
                let taskInfo = {name: userTask, status: "pending"};
                toDos = !toDos ? [] : toDos;
                toDos.push(taskInfo);
            } else {
                let id = editingTask[1];
                toDos[id].name = userTask;
                editingTask = [false, ""];
                $input.classList.remove("active");
            };
            localStorage.setItem("tasks-list", JSON.stringify(toDos));
            $input.value = "";
            displayTasks(d.querySelector("span.active").id);
        };
    };
});

displayTasks(d.querySelector("span.active").id);