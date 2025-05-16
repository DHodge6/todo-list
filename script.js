document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => addTaskToList(task));
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li span').forEach(task => {
            tasks.push(task.textContent);
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Add a task to the list
    function addTaskToList(taskText) {
        if (taskText.trim() === '') return;
        
        const li = document.createElement('li');
        
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks();
        };
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
        saveTasks();
    }
    
    // Add task when button is clicked
    addButton.addEventListener('click', function() {
        addTaskToList(taskInput.value);
        taskInput.value = '';
        taskInput.focus();
    });
    
    // Add task when Enter key is pressed
    taskInput.addEventListener('keypress', function(e) {
        if (e.key === 'Enter') {
            addTaskToList(taskInput.value);
            taskInput.value = '';
        }
    });
    
    // Load tasks when page loads
    loadTasks();
});