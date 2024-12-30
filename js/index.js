// Create a new instance of TaskManager with currentId set to 0
const taskManager = new TaskManager(0);

// Load tasks and currentId from localStorage
taskManager.load();

// Render tasks on the webpage
taskManager.render();

// Get the form element with id 'newTaskForm'
const newTaskForm = document.querySelector('#newTaskForm');

// Add an event listener for form submission
newTaskForm.addEventListener('submit', (event) => {
    event.preventDefault();

    // Get input values from the form
    const newTaskNameInput = document.querySelector('#newTaskNameInput');
    const newTaskDescription = document.querySelector('#newTaskDescription');
    const newTaskAssignedTo = document.querySelector('#newTaskAssignedTo');
    const newTaskDueDate = document.querySelector('#newTaskDueDate');

    // Extract values from form inputs
    const name = newTaskNameInput.value;
    const description = newTaskDescription.value;
    const assignedTo = newTaskAssignedTo.value;
    const dueDate = newTaskDueDate.value;

    // Add a new task using input values
    taskManager.addTask(name, description, assignedTo, dueDate);

    // Save tasks to localStorage
    taskManager.save();

    // Render updated tasks on the webpage
    taskManager.render();

    // Clear input fields after adding a task
    newTaskNameInput.value = '';
    newTaskDescription.value = '';
    newTaskAssignedTo.value = '';
    newTaskDueDate.value = '';
});

// Get the tasksList element
const tasksList = document.querySelector('#tasksList');

// Add event listener for clicks on the tasksList
tasksList.addEventListener('click', (event) => {
    // Check if a "Mark As Done" button was clicked
    if (event.target.classList.contains('done-button')) {
        // Get the parent task element
        const parentTask = event.target.parentElement.parentElement;

        // Extract taskId from the parent task element's data attribute
        const taskId = Number(parentTask.dataset.taskId);

        // Get the task object by taskId
        const task = taskManager.getTaskById(taskId);

        // Update task status to 'DONE'
        task.status = 'DONE';

        // Save updated tasks to localStorage
        taskManager.save();

        // Render updated tasks on the webpage
        taskManager.render();
    }

    // Check if a "Delete" button was clicked
    if (event.target.classList.contains('delete-button')) {
        // Get the parent Task element
        const parentTask = event.target.parentElement.parentElement;

        // Get the taskId of the parent Task.
        const taskId = Number(parentTask.dataset.taskId);

        // Delete the task by taskId
        taskManager.deleteTask(taskId);

        // Save updated tasks to localStorage
        taskManager.save();

        // Render updated tasks on the webpage
        taskManager.render();
    }
});