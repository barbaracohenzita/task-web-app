document.addEventListener('DOMContentLoaded', function() {
    const taskList = document.querySelector('.task-list');
    const taskForm = document.querySelector('#task-form');
    const taskInput = document.querySelector('#task-input');
    const taskCategory = document.querySelector('#task-category');
    const taskDeadline = document.querySelector('#task-deadline');
    const taskProject = document.querySelector('#task-project');
    const progressBar = document.querySelector('.progress-bar-inner');
    const progressPercentage = document.querySelector('.progress-percentage');
    const reminder = document.querySelector('.reminder');
    const notification = document.querySelector('.notification');
    const pomodoroTimer = document.querySelector('.pomodoro-timer');
    const pomodoroCountdown = document.querySelector('.countdown');
    const pomodoroStartButton = document.querySelector('#pomodoro-start');
    const pomodoroPauseButton = document.querySelector('#pomodoro-pause');
    const pomodoroResetButton = document.querySelector('#pomodoro-reset');
    const dailyGoalInput = document.querySelector('#daily-goal-input');
    const dailyGoalButton = document.querySelector('#daily-goal-button');
    const motivationalQuote = document.querySelector('.motivational-quote');
    const rewardSystem = document.querySelector('.reward-system');
    const shareTaskButton = document.querySelector('#share-task-button');
    const assignTaskButton = document.querySelector('#assign-task-button');
    const chatSystem = document.querySelector('.chat-system');
    const calendarView = document.querySelector('.calendar-view');
    const socialMediaShareButton = document.querySelector('#social-media-share-button');

    let tasks = [];
    let pomodoroInterval;
    let pomodoroTime = 25 * 60;
    let isPomodoroRunning = false;

    taskForm.addEventListener('submit', function(event) {
        event.preventDefault();
        addTask(taskInput.value, taskCategory.value, taskDeadline.value, taskProject.value);
        taskInput.value = '';
        taskCategory.value = '';
        taskDeadline.value = '';
        taskProject.value = '';
    });

    document.getElementById('task-form').addEventListener('submit', function(event) {
        event.preventDefault();
        const taskInput = document.getElementById('task-input').value;
        const taskCategory = document.getElementById('task-category').value;
        const taskDeadline = document.getElementById('task-deadline').value;
        const taskProject = document.getElementById('task-project').value;

        // Create a new task element
        const li = document.createElement('li');
        li.textContent = `${taskInput} - ${taskCategory} - ${taskDeadline || 'No deadline'} - ${taskProject || 'No project'}`;
        
        document.getElementById('tasks').appendChild(li);

        // Clear the form
        event.target.reset();
    });

    function addTask(name, category, deadline, project) {
        const task = {
            id: Date.now(),
            name,
            category,
            deadline,
            project,
            completed: false,
            timeSpent: 0
        };
        tasks.push(task);
        renderTasks();
    }

    function editTask(id, newName, newCategory, newDeadline, newProject) {
        const task = tasks.find(task => task.id === id);
        if (task) {
            task.name = newName;
            task.category = newCategory;
            task.deadline = newDeadline;
            task.project = newProject;
            renderTasks();
        }
    }

    function deleteTask(id) {
        tasks = tasks.filter(task => task.id !== id);
        renderTasks();
    }

    function renderTasks() {
        taskList.innerHTML = '';
        tasks.forEach(task => {
            const taskItem = document.createElement('li');
            taskItem.classList.add('task-item');
            taskItem.innerHTML = `
                <span class="task-name">${task.name}</span>
                <span class="task-category ${task.category}">${task.category}</span>
                <span class="task-deadline">${task.deadline}</span>
                <span class="task-project">${task.project}</span>
                <button class="edit-task-button" data-id="${task.id}">Edit</button>
                <button class="delete-task-button" data-id="${task.id}">Delete</button>
            `;
            taskList.appendChild(taskItem);
        });
    }

    function updateProgress() {
        const completedTasks = tasks.filter(task => task.completed).length;
        const totalTasks = tasks.length;
        const progress = totalTasks ? (completedTasks / totalTasks) * 100 : 0;
        progressBar.style.width = `${progress}%`;
        progressPercentage.textContent = `${progress.toFixed(2)}%`;
    }

    function showReminder(message) {
        reminder.textContent = message;
        reminder.style.display = 'block';
    }

    function showNotification(message) {
        notification.textContent = message;
        notification.style.display = 'block';
    }

    function startPomodoro() {
        if (!isPomodoroRunning) {
            isPomodoroRunning = true;
            pomodoroInterval = setInterval(() => {
                if (pomodoroTime > 0) {
                    pomodoroTime--;
                    updatePomodoroDisplay();
                } else {
                    clearInterval(pomodoroInterval);
                    isPomodoroRunning = false;
                    showNotification('Pomodoro session completed!');
                }
            }, 1000);
        }
    }

    function pausePomodoro() {
        if (isPomodoroRunning) {
            clearInterval(pomodoroInterval);
            isPomodoroRunning = false;
        }
    }

    function resetPomodoro() {
        clearInterval(pomodoroInterval);
        isPomodoroRunning = false;
        pomodoroTime = 25 * 60;
        updatePomodoroDisplay();
    }

    function updatePomodoroDisplay() {
        const minutes = Math.floor(pomodoroTime / 60);
        const seconds = pomodoroTime % 60;
        pomodoroCountdown.textContent = `${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    }

    pomodoroStartButton.addEventListener('click', startPomodoro);
    pomodoroPauseButton.addEventListener('click', pausePomodoro);
    pomodoroResetButton.addEventListener('click', resetPomodoro);

    dailyGoalButton.addEventListener('click', function() {
        const dailyGoal = dailyGoalInput.value;
        showNotification(`Daily goal set: ${dailyGoal}`);
    });

    function showMotivationalQuote() {
        const quotes = [
            "The only way to do great work is to love what you do. - Steve Jobs",
            "The future depends on what you do today. - Mahatma Gandhi",
            "Don't watch the clock; do what it does. Keep going. - Sam Levenson",
            "Success is not the key to happiness. Happiness is the key to success. - Albert Schweitzer",
            "The secret of getting ahead is getting started. - Mark Twain"
        ];
        const randomQuote = quotes[Math.floor(Math.random() * quotes.length)];
        motivationalQuote.textContent = randomQuote;
    }

    showMotivationalQuote();

    function updateRewardSystem() {
        const completedTasks = tasks.filter(task => task.completed).length;
        rewardSystem.textContent = `You have completed ${completedTasks} tasks!`;
    }

    shareTaskButton.addEventListener('click', function() {
        showNotification('Task shared successfully!');
    });

    assignTaskButton.addEventListener('click', function() {
        showNotification('Task assigned successfully!');
    });

    socialMediaShareButton.addEventListener('click', function() {
        showNotification('Task progress shared on social media!');
    });

    // Initial render
    renderTasks();
    updateProgress();
    updatePomodoroDisplay();
    updateRewardSystem();
});
