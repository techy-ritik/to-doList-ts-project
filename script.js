"use strict";
const taskForm = document.querySelector(".to-doTaskForm");
const taskList = document.querySelector(".task-list");
/** add new task */
//-----------------
taskForm?.addEventListener("submit", (event) => {
    event.preventDefault();
    const taskObj = {
        taskName: document.getElementById("taskName").value,
        dueDate: document.getElementById("dueDate").value,
    };
    const newLi = document.createElement("li");
    newLi.id = taskObj.taskName;
    newLi.innerHTML = `<input type="checkbox" class="statusCheckBox"></input> <span>${taskObj.taskName} - ${taskObj.dueDate}</span> <p class="taskStatus">(pending)</p>`;
    const checkbox = newLi.querySelector(".statusCheckBox");
    checkbox.addEventListener("change", statusUpdate);
    const dltBtn = document.createElement("button");
    dltBtn.innerText = "delete";
    dltBtn.addEventListener("click", deleteTask);
    const taskStatus = newLi.querySelector(".taskStatus");
    newLi.insertBefore(dltBtn, taskStatus);
    taskList.appendChild(newLi);
    const serializedTaskObj = JSON.stringify(taskObj);
    console.log("serializedTaskObj", serializedTaskObj);
    localStorage.setItem(`${taskObj.taskName}`, serializedTaskObj);
    taskForm.reset();
});
/** retrive and fetch task data and display on page reload*/
//---------------------------------------------------------
const storedTasksKeys = Object.keys(localStorage);
storedTasksKeys.forEach((key) => {
    console.log(key);
    const storedTaskObj = localStorage.getItem(key);
    if (storedTaskObj != null) {
        const storedTask = JSON.parse(storedTaskObj);
        const newLi = document.createElement("li");
        newLi.id = storedTask.taskName;
        newLi.innerHTML = `<input type="checkbox" class="statusCheckBox"></input> <span>${storedTask.taskName} - ${storedTask.dueDate}</span> <p class="taskStatus">(pending)</p>`;
        const checkbox = newLi.querySelector(".statusCheckBox");
        checkbox.addEventListener("change", statusUpdate);
        const dltBtn = document.createElement("button");
        dltBtn.innerText = "delete";
        dltBtn.addEventListener("click", deleteTask);
        const taskStatus = newLi.querySelector(".taskStatus");
        newLi.insertBefore(dltBtn, taskStatus);
        taskList.appendChild(newLi);
    }
});
function statusUpdate(event) {
    if (event.target instanceof HTMLElement) {
        const currentTaskLi = event.target.parentElement;
        const taskStatus = currentTaskLi.querySelector(".taskStatus");
        if (taskStatus.innerText === "(Completed)") {
            taskStatus.innerText = "(pending)";
            taskStatus.style.color = "#92400e";
        }
        else {
            taskStatus.innerText = "(Completed)";
            taskStatus.style.color = "#15803d";
        }
    }
}
function deleteTask(event) {
    if (event.target instanceof HTMLElement) {
        const currentTaskLi = event.target.parentElement;
        console.log(currentTaskLi);
        taskList.removeChild(currentTaskLi);
        localStorage.removeItem(currentTaskLi.id);
    }
}
//# sourceMappingURL=script.js.map