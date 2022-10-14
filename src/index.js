const addTaskButton = document.querySelector('.addTask');
const contentBody = document.querySelector('#content'); 
let mainArray = [];

addTaskButton.addEventListener("click", createInputBox);

function createInputBox() {
    addTaskButton.removeEventListener("click", createInputBox);
    let inputBox = document.createElement('div');
    inputBox.classList.add('inputBox');
    contentBody.appendChild(inputBox);
    let inputForm = document.createElement('form');
    inputBox.appendChild(inputForm);
    let taskNameText = document.createElement('div');
    taskNameText.classList.add('taskNameText');
    taskNameText.innerText = "Task:  "
    inputForm.appendChild(taskNameText);
    let taskName = document.createElement('input');
    taskName.setAttribute("type", "text");
    taskName.setAttribute("id", "taskName");
    inputForm.appendChild(taskName);
    let taskDetail = document.createElement('div');
    taskDetail.classList.add('taskDetail');
    taskDetail.innerText = "Detail of task:  "
    inputForm.appendChild(taskDetail);
    let detailInput = document.createElement('textarea');
    detailInput.setAttribute("type", "text");
    detailInput.setAttribute("id", "detailInput");
    inputForm.appendChild(detailInput);
    let timeDetail = document.createElement('div');
    timeDetail.classList.add('timeDetail');
    timeDetail.innerText = "Due by:  "
    inputForm.appendChild(timeDetail);
    let timeInput = document.createElement('input');
    timeInput.setAttribute("type", "date");
    timeInput.setAttribute("id", "timeInput");
    inputForm.appendChild(timeInput);
    let priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.innerHTML = "<br>Task priority: "
    inputForm.appendChild(priorityLabel);
    let prioritySelect = document.createElement('select');
    prioritySelect.setAttribute('id', 'prioritySelect');
    prioritySelect.setAttribute('name', 'priority');
    inputForm.appendChild(prioritySelect);
    let normPriority = document.createElement('option');
    normPriority.setAttribute('value', 'Normal');
    normPriority.setAttribute('id', 'normal');
    normPriority.innerText = "Normal";
    prioritySelect.appendChild(normPriority);
    let highPriority = document.createElement('option');
    highPriority.setAttribute('value', 'High');
    highPriority.setAttribute('id', 'high');
    highPriority.innerText = "High";
    prioritySelect.appendChild(highPriority);
    let submitButton = document.createElement('button');
    submitButton.classList.add('submitButton');
    submitButton.setAttribute('id', 'submitButtonID')
    submitButton.innerText = "Submit";
    inputForm.appendChild(submitButton);
    submitButton.addEventListener("click", (a) => addToList(a));
    let deleteInputBox = document.createElement('button');
    deleteInputBox.classList.add('deleteInputBox');
    deleteInputBox.innerText = "X";
    inputBox.appendChild(deleteInputBox);
    deleteInputBox.addEventListener("click", (e) => deleteThis(e));
}

function deleteThis(e) {
    let deleteIcon = e.target;
    let parentOfDeleteIcon = deleteIcon.parentElement;
    contentBody.removeChild(parentOfDeleteIcon);
    addTaskButton.addEventListener("click", createInputBox);
}

function addToList(a) {
    let submitIcon = a.target;
    let parentOfSubmitIcon = submitIcon.parentElement;
    let parentOfParent = parentOfSubmitIcon.parentElement;
    event.preventDefault();
    let taskName = document.getElementById('taskName').value;
    let detailInput = document.getElementById('detailInput').value;
    let timeInput = document.getElementById('timeInput').value;
    let prioritySelect = document.getElementById('prioritySelect').selectedOptions[0].value;
    let enteredTask = document.createElement('div');
    enteredTask.setAttribute('id', 'enteredTask');
    contentBody.insertBefore(enteredTask, addTaskButton);
    let inputDetails = document.createElement('div');
    inputDetails.setAttribute('id', 'inputDetails');
    inputDetails.innerHTML = "Task: " + taskName + "<span>Priority: " + prioritySelect + " | Due by: " + timeInput + "</span>";
    enteredTask.appendChild(inputDetails);
    let bottomRow = document.createElement('div');
    bottomRow.setAttribute('id', 'bottomRow');
    enteredTask.appendChild(bottomRow);
    let taskDetail = document.createElement('div');
    taskDetail.setAttribute("id", "taskDetails");
    taskDetail.innerHTML = "";
    bottomRow.appendChild(taskDetail);
    let buttonList = document.createElement('div');
    buttonList.classList.add('buttonList');
    bottomRow.appendChild(buttonList);
    let describeTask = document.createElement('button');
    describeTask.classList.add('describeTask');
    describeTask.innerText = '☷';
    buttonList.appendChild(describeTask);
    let completedTask = document.createElement('button');
    completedTask.classList.add('completedTask');
    completedTask.innerText = '✓';
    buttonList.appendChild(completedTask);
    let editTask = document.createElement('button');
    editTask.classList.add('editTask');
    editTask.innerText = "✎";
    buttonList.appendChild(editTask);
    let deleteTask = document.createElement('button');
    deleteTask.classList.add('deleteTask');
    deleteTask.innerText = "X";
    buttonList.appendChild(deleteTask);
    let inputsFromBox = {
        button1: describeTask,
        button2: deleteTask,
        button3: completedTask,
        button4: editTask,
        div: enteredTask,
        inputs: inputDetails,
        description: taskDetail,
        task: taskName,
        detail: detailInput,
        time: timeInput,
        priority: prioritySelect
    }
    mainArray.push(inputsFromBox);
    console.log(mainArray);
    contentBody.removeChild(parentOfParent);
    describeTask.addEventListener("click", (b) => toggleDetail(b));
    completedTask.addEventListener("click", (d) => completeTaskBox(d));
    deleteTask.addEventListener("click", (c) => deleteTaskBox(c));
    editTask.addEventListener("click", (f) => editTaskBox(f));
    addTaskButton.addEventListener("click", createInputBox);
}

function toggleDetail(b) {
    let divvy = b.target;
    let index = mainArray.findIndex(obj => obj.button1 === divvy);
    let displayDetail = mainArray[index].description;
    if (displayDetail.innerHTML === "") {
        displayDetail.innerHTML = "Detail: " + mainArray[index].detail;
      } else {
        displayDetail.innerHTML = "";
      }
}

function deleteTaskBox(c) {
    let dbutton = c.target;
    let index = mainArray.findIndex(obj => obj.button2 === dbutton);
    let parentOfButton = dbutton.parentElement;
    let divOfButton = parentOfButton.parentElement;
    let divOfDiv = divOfButton.parentElement;
    mainArray.splice(index, 1);
    contentBody.removeChild(divOfDiv);
}

function completeTaskBox(d) {
    let cbutton = d.target;
    let index = mainArray.findIndex(obj => obj.button3 === cbutton);
    let enteredTaskDiv = mainArray[index].div;
    enteredTaskDiv.classList.toggle("completed");
    let inputDetail = mainArray[index].inputs;
    if (inputDetail.innerHTML === "Task: " + mainArray[index].task + "<span>Priority: " + mainArray[index].priority + " | Due by: " + mainArray[index].time + "</span>") {
        inputDetail.innerHTML = "<s>Task: " + mainArray[index].task + "</s><span><s>Priority: " + mainArray[index].priority + " | Due by: " + mainArray[index].time + "</span></s>";
      } else {
        inputDetail.innerHTML = "Task: " + mainArray[index].task + "<span>Priority: " + mainArray[index].priority + " | Due by: " + mainArray[index].time + "</span>";
      }
}

function editTaskBox(f) {
    let ebutton = f.target;
    let index = mainArray.findIndex(obj => obj.button4 === ebutton);
    addTaskButton.removeEventListener("click", createInputBox);
    let inputBox = document.createElement('div');
    inputBox.classList.add('inputBox');
    contentBody.appendChild(inputBox);
    let inputForm = document.createElement('form');
    inputBox.appendChild(inputForm);
    let taskNameText = document.createElement('div');
    taskNameText.classList.add('taskNameText');
    taskNameText.innerText = "Task:  "
    inputForm.appendChild(taskNameText);
    let taskName = document.createElement('input');
    taskName.setAttribute("type", "text");
    taskName.setAttribute("id", "taskName");
    inputForm.appendChild(taskName);
    let taskDetail = document.createElement('div');
    taskDetail.classList.add('taskDetail');
    taskDetail.innerText = "Detail of task:  "
    inputForm.appendChild(taskDetail);
    let detailInput = document.createElement('textarea');
    detailInput.setAttribute("type", "text");
    detailInput.setAttribute("id", "detailInput");
    inputForm.appendChild(detailInput);
    let timeDetail = document.createElement('div');
    timeDetail.classList.add('timeDetail');
    timeDetail.innerText = "Due by:  "
    inputForm.appendChild(timeDetail);
    let timeInput = document.createElement('input');
    timeInput.setAttribute("type", "date");
    timeInput.setAttribute("id", "timeInput");
    inputForm.appendChild(timeInput);
    let priorityLabel = document.createElement('label');
    priorityLabel.setAttribute('for', 'priority');
    priorityLabel.innerHTML = "<br>Task priority: "
    inputForm.appendChild(priorityLabel);
    let prioritySelect = document.createElement('select');
    prioritySelect.setAttribute('id', 'prioritySelect');
    prioritySelect.setAttribute('name', 'priority');
    inputForm.appendChild(prioritySelect);
    let normPriority = document.createElement('option');
    normPriority.setAttribute('value', 'Normal');
    normPriority.setAttribute('id', 'normal');
    normPriority.innerText = "Normal";
    prioritySelect.appendChild(normPriority);
    let highPriority = document.createElement('option');
    highPriority.setAttribute('value', 'High');
    highPriority.setAttribute('id', 'high');
    highPriority.innerText = "High";
    prioritySelect.appendChild(highPriority);
    let submitButton = document.createElement('button');
    submitButton.classList.add('submitButton');
    submitButton.setAttribute('id', 'submitButtonID')
    submitButton.innerText = "Submit";
    inputForm.appendChild(submitButton);
    let deleteInputBox = document.createElement('button');
    deleteInputBox.classList.add('deleteInputBox');
    deleteInputBox.innerText = "X";
    inputBox.appendChild(deleteInputBox);
    deleteInputBox.addEventListener("click", (e) => deleteThis(e));
    taskName.value = mainArray[index].task;
    detailInput.value = mainArray[index].detail;
    timeInput.value = mainArray[index].time;
    if (mainArray[index].priority === "Normal") {
        normPriority.selected = "selected";
    } else highPriority.selected = "selected";
    submitButton.addEventListener("click", () => {
        event.preventDefault();
        let inputDetails = mainArray[index].inputs;
        let taskDetail = mainArray[index].description;
        mainArray[index].task = taskName.value;
        mainArray[index].detail = detailInput.value;
        mainArray[index].time = timeInput.value;
        mainArray[index].priority = prioritySelect.selectedOptions[0].value;
        inputDetails.innerHTML = "Task: " + mainArray[index].task + "<span>Priority: " + mainArray[index].priority + " | Due by: " + mainArray[index].time + "</span>";
        taskDetail.innerHTML = "";
        contentBody.removeChild(inputBox);
        addTaskButton.addEventListener("click", createInputBox);
    });
}

