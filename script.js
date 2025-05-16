document.addEventListener('DOMContentLoaded', function() {
    const taskInput = document.getElementById('taskInput');
    const addButton = document.getElementById('addButton');
    const taskList = document.getElementById('taskList');
    
    // Load tasks from localStorage
    function loadTasks() {
        const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
        tasks.forEach(task => {
            if (typeof task === 'string') {
                // Handle old format (just in case)
                addTaskToList(task);
            } else {
                // Handle new format with categories
                addTaskToListWithCategory(task.text, task.category);
            }
        });  // This should be the closing of forEach
    }  // This should be the closing of loadTasks

    // Add task with category helper function
    function addTaskToListWithCategory(taskText, category) {
        if (taskText.trim() === '') return;
        
        const li = document.createElement('li');
        li.className = category;
        
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);
        
        // Add a category badge
        const badge = document.createElement('small');
        badge.textContent = category;
        badge.className = 'category-badge';
        li.appendChild(badge);
        
        const deleteBtn = document.createElement('button');
        deleteBtn.textContent = 'Delete';
        deleteBtn.className = 'delete-btn';
        deleteBtn.onclick = function() {
            li.remove();
            saveTasks();
        };
        li.appendChild(deleteBtn);
        
        taskList.appendChild(li);
    }
    
    // Save tasks to localStorage
    function saveTasks() {
        const tasks = [];
        document.querySelectorAll('#taskList li').forEach(taskItem => {
            tasks.push({
                text: taskItem.querySelector('span').textContent,
                category: taskItem.className
            });
        });
        localStorage.setItem('tasks', JSON.stringify(tasks));
    }
    
    // Add task to the list
    function addTaskToList(taskText) {
        if (taskText.trim() === '') return;
        
        // Get the selected category
        const category = document.getElementById('categorySelect').value;
        
        const li = document.createElement('li');
        li.className = category; // Add the category as a class
        
        const span = document.createElement('span');
        span.textContent = taskText;
        li.appendChild(span);