// Retrieve tasks and nextId from localStorage
let taskList = JSON.parse(localStorage.getItem("tasks")) || [];
let nextId = JSON.parse(localStorage.getItem("nextId")) || 1;

// Color array for unique task colors
const colors = ['#FFB6C1', '#ADD8E6', '#90EE90', '#FFD700', '#FFA07A', '#9370DB'];
let colorIndex = 0;

// Function to generate a unique task id
function generateTaskId() {
  return nextId++;
}

// Function to create a task card
function createTaskCard(task) {
  let card = $(`
    <div class="card mb-3 task-card draggable" data-task-id="${task.id}">
      <div class="card-body" style="background-color: ${task.color};">
        <h5 class="card-title">${task.title}</h5>
        <p class="card-text">${task.description}</p>
        <p class="card-text"><small class="text-muted">Due: ${task.dueDate}</small></p>
        <button class="btn btn-danger btn-sm delete-task">Delete</button>
      </div>
    </div>
  `);

  let dueDate = dayjs(task.dueDate);
  let today = dayjs();
  if (dueDate.isBefore(today, 'day')) {
    card.addClass('border-danger');
  } else if (dueDate.isSame(today, 'day') || dueDate.isBefore(today.add(3, 'day'), 'day')) {
    card.addClass('border-warning');
  } else {
    card.addClass('border-success');
  }

  return card;
}

// Function to render the task list and make cards draggable
function renderTaskList() {
  $('#todo-cards, #in-progress-cards, #done-cards').empty();

  taskList.forEach(task => {
    let card = createTaskCard(task);
    $(`#${task.status}-cards`).append(card);
  });

  $('.draggable').draggable({
    revert: "invalid",
    helper: "original",
    opacity: 0.8,
    zIndex: 1000
  });

  $('.delete-task').on('click', handleDeleteTask);
}

// Function to handle adding a new task
function handleAddTask(event) {
  event.preventDefault();

  let task = {
    id: generateTaskId(),
    title: $('#taskTitle').val(),
    description: $('#taskDescription').val(),
    dueDate: $('#taskDueDate').val(),
    status: 'todo',
    color: colors[colorIndex]
  };

  colorIndex = (colorIndex + 1) % colors.length; // Update colorIndex for next task

  taskList.push(task);
  localStorage.setItem('tasks', JSON.stringify(taskList));
  localStorage.setItem('nextId', JSON.stringify(nextId));

  renderTaskList();
  $('#formModal').modal('hide');
  $('#taskForm')[0].reset();
}

// Function to handle deleting a task
function handleDeleteTask(event) {
  let taskId = $(this).closest('.task-card').data('task-id');
  taskList = taskList.filter(task => task.id !== taskId);

  localStorage.setItem('tasks', JSON.stringify(taskList));
  renderTaskList();
}

// Function to handle dropping a task into a new status lane
function handleDrop(event, ui) {
  let taskId = ui.draggable.data('task-id');
  let newStatus = $(this).attr('id').replace('-cards', '');

  let task = taskList.find(task => task.id === taskId);
  if (task) {
    task.status = newStatus;
    localStorage.setItem('tasks', JSON.stringify(taskList));
    renderTaskList();
  }
}

// When the page loads, render the task list, add event listeners, make lanes droppable, and make the due date field a date picker
$(document).ready(function () {
  renderTaskList();

  $('#taskDueDate').datepicker({
    dateFormat: 'yy-mm-dd'
  });

  $('.lane').droppable({
    accept: '.draggable',
    drop: handleDrop
  });

  $('#taskForm').on('submit', handleAddTask);
});
