const taskForm = document.querySelector(".to-doTaskForm") as HTMLFormElement;
const taskList = document.querySelector(".task-list") as HTMLUListElement;

/** add new task */
//-----------------
taskForm?.addEventListener("submit", (event) => {
  event.preventDefault();
  interface ObjKeyTypes {
    taskName: string;
    dueDate: string;
  }
  const taskObj: ObjKeyTypes = {
    taskName: (document.getElementById("taskName") as HTMLInputElement).value,
    dueDate: (document.getElementById("dueDate") as HTMLInputElement).value,
  };

  const newLi = document.createElement("li") as HTMLLIElement;
  newLi.id = taskObj.taskName;

  newLi.innerHTML = `<input type="checkbox" class="statusCheckBox"></input> <span>${taskObj.taskName} - ${taskObj.dueDate}</span> <p class="taskStatus">(pending)</p>`;

  const checkbox = newLi.querySelector(".statusCheckBox") as HTMLInputElement;
  checkbox.addEventListener("change", statusUpdate);

  const dltBtn = document.createElement("button") as HTMLButtonElement;
  dltBtn.innerText = "delete";
  dltBtn.addEventListener("click", deleteTask);

  const taskStatus = newLi.querySelector(".taskStatus") as HTMLParagraphElement;
  newLi.insertBefore(dltBtn, taskStatus);

  taskList.appendChild(newLi);

  const serializedTaskObj: string = JSON.stringify(taskObj);

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
    const newLi = document.createElement("li") as HTMLLIElement;
    newLi.id = storedTask.taskName;

    newLi.innerHTML = `<input type="checkbox" class="statusCheckBox"></input> <span>${storedTask.taskName} - ${storedTask.dueDate}</span> <p class="taskStatus">(pending)</p>`;

    const checkbox = newLi.querySelector(".statusCheckBox") as HTMLInputElement;
    checkbox.addEventListener("change", statusUpdate);

    const dltBtn = document.createElement("button") as HTMLButtonElement;
    dltBtn.innerText = "delete";
    dltBtn.addEventListener("click", deleteTask);

    const taskStatus = newLi.querySelector(
      ".taskStatus",
    ) as HTMLParagraphElement;
    newLi.insertBefore(dltBtn, taskStatus);

    taskList.appendChild(newLi);
  }
});

function statusUpdate(event: Event) {
  if (event.target instanceof HTMLElement) {
    const currentTaskLi = event.target.parentElement as HTMLLIElement;
    const taskStatus = currentTaskLi.querySelector(
      ".taskStatus",
    ) as HTMLParagraphElement;
    if (taskStatus.innerText === "(Completed)") {
      taskStatus.innerText = "(pending)";
      taskStatus.style.color = "#92400e";
    } else {
      taskStatus.innerText = "(Completed)";
      taskStatus.style.color = "#15803d";
    }
  }
}

function deleteTask(event: MouseEvent) {
  if (event.target instanceof HTMLElement) {
    const currentTaskLi = event.target.parentElement as HTMLLIElement;
    console.log(currentTaskLi);
    taskList.removeChild(currentTaskLi);
    localStorage.removeItem(currentTaskLi.id);
  }
}
