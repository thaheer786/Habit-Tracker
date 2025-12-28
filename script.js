// Data Storage
let tasks = JSON.parse(localStorage.getItem('tasks')) || [];
let habits = JSON.parse(localStorage.getItem('habits')) || [];
let dailyProgress = JSON.parse(localStorage.getItem('dailyProgress')) || {};
let currentCalendarMonth = new Date();

// Initialize App
document.addEventListener('DOMContentLoaded', () => {
    initializeSampleData();
    updateDate();
    loadTasks();
    loadHabits();
    updateStats();
    initializeCharts();
    renderCalendar();
    
    // Auto-save every 30 seconds
    setInterval(saveData, 30000);
});

// Initialize Sample Data (only on first load)
function initializeSampleData() {
    if (tasks.length === 0) {
        tasks = [
            {
                id: Date.now() + 1,
                text: 'Complete morning workout routine',
                completed: false,
                priority: 'high',
                xp: 25,
                date: new Date().toDateString()
            },
            {
                id: Date.now() + 2,
                text: 'Study programming for 2 hours',
                completed: false,
                priority: 'high',
                xp: 30,
                date: new Date().toDateString()
            },
            {
                id: Date.now() + 3,
                text: 'Review project documentation',
                completed: false,
                priority: 'medium',
                xp: 15,
                date: new Date().toDateString()
            },
            {
                id: Date.now() + 4,
                text: 'Organize workspace',
                completed: false,
                priority: 'low',
                xp: 10,
                date: new Date().toDateString()
            }
        ];
    }
    
    if (habits.length === 0) {
        habits = [
            {
                id: Date.now() + 1,
                name: 'Morning Exercise',
                icon: '💪',
                frequency: 'daily',
                target: 1,
                current: 0,
                streak: 0,
                history: {}
            },
            {
                id: Date.now() + 2,
                name: 'Read 30 Minutes',
                icon: '📚',
                frequency: 'daily',
                target: 1,
                current: 0,
                streak: 0,
                history: {}
            },
            {
                id: Date.now() + 3,
                name: 'Drink 8 Glasses of Water',
                icon: '💧',
                frequency: 'daily',
                target: 8,
                current: 0,
                streak: 0,
                history: {}
            },
            {
                id: Date.now() + 4,
                name: 'Code Practice',
                icon: '💻',
                frequency: 'daily',
                target: 1,
                current: 0,
                streak: 0,
                history: {}
            }
        ];
    }
    
    saveData();
}

// Update Current Date
function updateDate() {
    const dateElement = document.getElementById('currentDate');
    const options = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
    dateElement.textContent = new Date().toLocaleDateString('en-US', options);
}

// Tab Switching
function switchTab(tabName) {
    // Update tab buttons
    document.querySelectorAll('.tab-btn').forEach(btn => {
        btn.classList.remove('active');
    });
    document.querySelector(`[data-tab="${tabName}"]`).classList.add('active');
    
    // Update tab content
    document.querySelectorAll('.tab-content').forEach(content => {
        content.classList.remove('active');
    });
    document.getElementById(`${tabName}-tab`).classList.add('active');
    
    // Refresh charts if analytics tab
    if (tabName === 'analytics') {
        updateCharts();
    }
    
    // Refresh calendar if calendar tab
    if (tabName === 'calendar') {
        renderCalendar();
    }
}

// Task Management
function loadTasks() {
    const questList = document.getElementById('questList');
    questList.innerHTML = '';
    
    const today = new Date().toDateString();
    const todayTasks = tasks.filter(task => task.date === today);
    
    if (todayTasks.length === 0) {
        questList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px;">No quests for today. Click "New Quest" to add one! 🎮</p>';
        return;
    }
    
    todayTasks.forEach(task => {
        const questItem = document.createElement('div');
        questItem.className = `quest-item ${task.completed ? 'completed' : ''}`;
        questItem.innerHTML = `
            <div class="checkbox-wrapper">
                <input type="checkbox" class="quest-checkbox" ${task.completed ? 'checked' : ''} 
                    onchange="toggleTask(${task.id})">
            </div>
            <div class="quest-content">
                <div class="quest-text">${task.text}</div>
                <div class="quest-meta">
                    <span class="priority-badge priority-${task.priority}">
                        ${task.priority === 'high' ? '🔴' : task.priority === 'medium' ? '🟡' : '🟢'} 
                        ${task.priority}
                    </span>
                    <span class="xp-badge">⭐ ${task.xp} XP</span>
                </div>
            </div>
            <div class="quest-actions">
                <button class="action-btn edit-btn" onclick="showEditTaskModal(${task.id})" title="Edit">✏️</button>
                <button class="action-btn delete-btn" onclick="deleteTask(${task.id})" title="Delete">🗑️</button>
            </div>
        `;
        questList.appendChild(questItem);
    });
}

function toggleTask(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (task) {
        task.completed = !task.completed;
        
        // Add completion animation
        if (task.completed) {
            showXPGain(task.xp);
        }
        
        saveData();
        loadTasks();
        updateStats();
        recordDailyProgress();
    }
}

function showXPGain(xp) {
    // Create floating XP notification
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        background: linear-gradient(135deg, var(--neon-green), var(--neon-blue));
        color: var(--bg-dark);
        padding: 20px 40px;
        border-radius: 15px;
        font-size: 2rem;
        font-weight: bold;
        z-index: 10000;
        animation: xpGain 2s ease-out forwards;
        box-shadow: 0 0 50px rgba(0, 255, 136, 0.8);
        font-family: 'Orbitron', sans-serif;
    `;
    notification.textContent = `+${xp} XP! 🎉`;
    document.body.appendChild(notification);
    
    setTimeout(() => notification.remove(), 2000);
}

function showAddTaskModal() {
    document.getElementById('addTaskModal').classList.add('active');
}

function closeModal(modalId) {
    document.getElementById(modalId).classList.remove('active');
}

function addTask() {
    const name = document.getElementById('taskName').value.trim();
    const priority = document.getElementById('taskPriority').value;
    const xp = parseInt(document.getElementById('taskXP').value);
    
    if (!name) {
        alert('Please enter a quest name!');
        return;
    }
    
    const newTask = {
        id: Date.now(),
        text: name,
        completed: false,
        priority: priority,
        xp: xp,
        date: new Date().toDateString()
    };
    
    tasks.push(newTask);
    saveData();
    loadTasks();
    closeModal('addTaskModal');
    
    // Reset form
    document.getElementById('taskName').value = '';
    document.getElementById('taskPriority').value = 'medium';
    document.getElementById('taskXP').value = '10';
}

function showEditTaskModal(taskId) {
    const task = tasks.find(t => t.id === taskId);
    if (!task) return;
    
    document.getElementById('editTaskId').value = task.id;
    document.getElementById('editTaskName').value = task.text;
    document.getElementById('editTaskPriority').value = task.priority;
    document.getElementById('editTaskXP').value = task.xp;
    
    document.getElementById('editTaskModal').classList.add('active');
}

function updateTask() {
    const taskId = parseInt(document.getElementById('editTaskId').value);
    const task = tasks.find(t => t.id === taskId);
    
    if (task) {
        task.text = document.getElementById('editTaskName').value.trim();
        task.priority = document.getElementById('editTaskPriority').value;
        task.xp = parseInt(document.getElementById('editTaskXP').value);
        
        saveData();
        loadTasks();
        closeModal('editTaskModal');
    }
}

function deleteTask(taskId) {
    if (confirm('Delete this quest? 🗑️')) {
        tasks = tasks.filter(t => t.id !== taskId);
        saveData();
        loadTasks();
        updateStats();
    }
}

// Habit Management
function loadHabits() {
    const habitsList = document.getElementById('habitsList');
    habitsList.innerHTML = '';
    
    if (habits.length === 0) {
        habitsList.innerHTML = '<p style="text-align: center; color: var(--text-secondary); padding: 40px; grid-column: 1/-1;">No habits yet. Start building good habits! 💪</p>';
        return;
    }
    
    habits.forEach(habit => {
        const progress = (habit.current / habit.target) * 100;
        const habitCard = document.createElement('div');
        habitCard.className = 'habit-card';
        habitCard.innerHTML = `
            <div class="habit-header">
                <div class="habit-title">
                    <span class="habit-icon">${habit.icon}</span>
                    <span>${habit.name}</span>
                </div>
                <button class="action-btn delete-btn" onclick="deleteHabit(${habit.id})" title="Delete">🗑️</button>
            </div>
            <div class="habit-progress">
                <div class="progress-bar">
                    <div class="progress-fill" style="width: ${progress}%"></div>
                </div>
                <div class="progress-text">${habit.current} / ${habit.target} ${habit.frequency === 'daily' ? 'today' : 'this week'}</div>
            </div>
            <div class="habit-streak">
                <span>🔥 ${habit.streak} day streak</span>
            </div>
            <div class="habit-actions">
                <button class="habit-btn" onclick="incrementHabit(${habit.id})">
                    ✓ Mark Complete
                </button>
                <button class="habit-btn" onclick="resetHabitProgress(${habit.id})">
                    ↺ Reset
                </button>
            </div>
        `;
        habitsList.appendChild(habitCard);
    });
}

function showAddHabitModal() {
    document.getElementById('addHabitModal').classList.add('active');
}

function addHabit() {
    const name = document.getElementById('habitName').value.trim();
    const frequency = document.getElementById('habitFrequency').value;
    const target = parseInt(document.getElementById('habitTarget').value);
    const icon = document.getElementById('habitIcon').value;
    
    if (!name) {
        alert('Please enter a habit name!');
        return;
    }
    
    const newHabit = {
        id: Date.now(),
        name: name,
        icon: icon,
        frequency: frequency,
        target: target,
        current: 0,
        streak: 0,
        history: {}
    };
    
    habits.push(newHabit);
    saveData();
    loadHabits();
    closeModal('addHabitModal');
    
    // Reset form
    document.getElementById('habitName').value = '';
    document.getElementById('habitFrequency').value = 'daily';
    document.getElementById('habitTarget').value = '1';
    document.getElementById('habitIcon').value = '💪';
}

function incrementHabit(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (habit && habit.current < habit.target) {
        habit.current++;
        
        // Record in history
        const today = new Date().toDateString();
        if (!habit.history[today]) {
            habit.history[today] = 0;
        }
        habit.history[today] = habit.current;
        
        // Update streak
        if (habit.current >= habit.target) {
            habit.streak++;
            showXPGain(20);
        }
        
        saveData();
        loadHabits();
        updateStats();
    }
}

function resetHabitProgress(habitId) {
    const habit = habits.find(h => h.id === habitId);
    if (habit) {
        habit.current = 0;
        saveData();
        loadHabits();
    }
}

function deleteHabit(habitId) {
    if (confirm('Delete this habit? 🗑️')) {
        habits = habits.filter(h => h.id !== habitId);
        saveData();
        loadHabits();
        updateStats();
    }
}

// Stats Update
function updateStats() {
    const today = new Date().toDateString();
    const todayTasks = tasks.filter(t => t.date === today);
    const completedTasks = todayTasks.filter(t => t.completed);
    
    // Daily Progress
    const dailyProgressPercent = todayTasks.length > 0 
        ? Math.round((completedTasks.length / todayTasks.length) * 100) 
        : 0;
    document.getElementById('dailyProgress').textContent = `${dailyProgressPercent}%`;
    
    // Current Streak (calculate based on consecutive days with 100% completion)
    const streak = calculateStreak();
    document.getElementById('currentStreak').textContent = streak;
    
    // Total XP
    const totalXP = completedTasks.reduce((sum, task) => sum + task.xp, 0);
    const lifetimeXP = parseInt(localStorage.getItem('lifetimeXP') || '0') + totalXP;
    document.getElementById('totalXP').textContent = `${lifetimeXP} XP`;
    
    // Weekly Average
    const weeklyAvg = calculateWeeklyAverage();
    document.getElementById('weeklyComplete').textContent = `${weeklyAvg}%`;
}

function calculateStreak() {
    const dates = Object.keys(dailyProgress).sort((a, b) => new Date(b) - new Date(a));
    let streak = 0;
    
    for (let i = 0; i < dates.length; i++) {
        if (dailyProgress[dates[i]] >= 100) {
            streak++;
        } else {
            break;
        }
    }
    
    return streak;
}

function calculateWeeklyAverage() {
    const last7Days = [];
    const today = new Date();
    
    for (let i = 0; i < 7; i++) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        last7Days.push(dailyProgress[dateStr] || 0);
    }
    
    const avg = last7Days.reduce((sum, val) => sum + val, 0) / 7;
    return Math.round(avg);
}

function recordDailyProgress() {
    const today = new Date().toDateString();
    const todayTasks = tasks.filter(t => t.date === today);
    const completedTasks = todayTasks.filter(t => t.completed);
    
    dailyProgress[today] = todayTasks.length > 0 
        ? Math.round((completedTasks.length / todayTasks.length) * 100) 
        : 0;
    
    localStorage.setItem('dailyProgress', JSON.stringify(dailyProgress));
}

// Charts
let dailyChart, weeklyChart, monthlyChart;

function initializeCharts() {
    const commonOptions = {
        responsive: true,
        maintainAspectRatio: true,
        plugins: {
            legend: {
                labels: {
                    color: '#a8b2d1',
                    font: {
                        family: 'Rajdhani',
                        size: 14
                    }
                }
            }
        },
        scales: {
            y: {
                beginAtZero: true,
                max: 100,
                ticks: {
                    color: '#a8b2d1',
                    font: {
                        family: 'Rajdhani'
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            },
            x: {
                ticks: {
                    color: '#a8b2d1',
                    font: {
                        family: 'Rajdhani'
                    }
                },
                grid: {
                    color: 'rgba(255, 255, 255, 0.1)'
                }
            }
        }
    };
    
    // Daily Chart
    const dailyCtx = document.getElementById('dailyChart').getContext('2d');
    dailyChart = new Chart(dailyCtx, {
        type: 'line',
        data: {
            labels: [],
            datasets: [{
                label: 'Completion %',
                data: [],
                borderColor: '#00ff88',
                backgroundColor: 'rgba(0, 255, 136, 0.1)',
                borderWidth: 3,
                tension: 0.4,
                fill: true
            }]
        },
        options: commonOptions
    });
    
    // Weekly Chart
    const weeklyCtx = document.getElementById('weeklyChart').getContext('2d');
    weeklyChart = new Chart(weeklyCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Habit Completion',
                data: [],
                backgroundColor: [
                    'rgba(0, 255, 136, 0.7)',
                    'rgba(0, 212, 255, 0.7)',
                    'rgba(178, 75, 243, 0.7)',
                    'rgba(255, 46, 151, 0.7)'
                ],
                borderColor: [
                    '#00ff88',
                    '#00d4ff',
                    '#b24bf3',
                    '#ff2e97'
                ],
                borderWidth: 2
            }]
        },
        options: {
            ...commonOptions,
            scales: {
                ...commonOptions.scales,
                y: {
                    ...commonOptions.scales.y,
                    max: 100
                }
            }
        }
    });
    
    // Monthly Chart
    const monthlyCtx = document.getElementById('monthlyChart').getContext('2d');
    monthlyChart = new Chart(monthlyCtx, {
        type: 'bar',
        data: {
            labels: [],
            datasets: [{
                label: 'Daily Completion %',
                data: [],
                backgroundColor: 'rgba(0, 212, 255, 0.6)',
                borderColor: '#00d4ff',
                borderWidth: 2
            }]
        },
        options: commonOptions
    });
    
    updateCharts();
}

function updateCharts() {
    // Update Daily Chart (Last 7 Days)
    const last7Days = [];
    const last7Values = [];
    const today = new Date();
    
    for (let i = 6; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        const shortDate = date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' });
        
        last7Days.push(shortDate);
        last7Values.push(dailyProgress[dateStr] || 0);
    }
    
    dailyChart.data.labels = last7Days;
    dailyChart.data.datasets[0].data = last7Values;
    dailyChart.update();
    
    // Update Weekly Chart (Habits)
    const habitNames = habits.map(h => h.name.substring(0, 15));
    const habitProgress = habits.map(h => (h.current / h.target) * 100);
    
    weeklyChart.data.labels = habitNames;
    weeklyChart.data.datasets[0].data = habitProgress;
    weeklyChart.update();
    
    // Update Monthly Chart (Last 30 Days)
    const last30Days = [];
    const last30Values = [];
    
    for (let i = 29; i >= 0; i--) {
        const date = new Date(today);
        date.setDate(date.getDate() - i);
        const dateStr = date.toDateString();
        const shortDate = date.getDate();
        
        last30Days.push(shortDate);
        last30Values.push(dailyProgress[dateStr] || 0);
    }
    
    monthlyChart.data.labels = last30Days;
    monthlyChart.data.datasets[0].data = last30Values;
    monthlyChart.update();
}

// Calendar
function renderCalendar() {
    const calendar = document.getElementById('calendar');
    const monthDisplay = document.getElementById('calendarMonth');
    
    const year = currentCalendarMonth.getFullYear();
    const month = currentCalendarMonth.getMonth();
    
    monthDisplay.textContent = currentCalendarMonth.toLocaleDateString('en-US', { 
        month: 'long', 
        year: 'numeric' 
    });
    
    // Get first day of month and number of days
    const firstDay = new Date(year, month, 1).getDay();
    const daysInMonth = new Date(year, month + 1, 0).getDate();
    
    calendar.innerHTML = '';
    
    // Add day headers
    const dayHeaders = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
    dayHeaders.forEach(day => {
        const header = document.createElement('div');
        header.style.cssText = 'text-align: center; font-weight: 700; color: var(--neon-blue); padding: 10px;';
        header.textContent = day;
        calendar.appendChild(header);
    });
    
    // Add empty cells for days before month starts
    for (let i = 0; i < firstDay; i++) {
        const emptyDay = document.createElement('div');
        calendar.appendChild(emptyDay);
    }
    
    // Add days of month
    const today = new Date();
    for (let day = 1; day <= daysInMonth; day++) {
        const date = new Date(year, month, day);
        const dateStr = date.toDateString();
        const isToday = dateStr === today.toDateString();
        
        const completion = dailyProgress[dateStr] || 0;
        let completionClass = '';
        if (completion >= 80) completionClass = 'high-complete';
        else if (completion >= 50) completionClass = 'medium-complete';
        else if (completion > 0) completionClass = 'low-complete';
        
        const dayElement = document.createElement('div');
        dayElement.className = `calendar-day ${completionClass} ${isToday ? 'today' : ''}`;
        dayElement.innerHTML = `
            <div class="day-number">${day}</div>
            <div class="day-completion">${completion}%</div>
        `;
        
        calendar.appendChild(dayElement);
    }
}

function changeMonth(direction) {
    currentCalendarMonth.setMonth(currentCalendarMonth.getMonth() + direction);
    renderCalendar();
}

// Data Persistence
function saveData() {
    localStorage.setItem('tasks', JSON.stringify(tasks));
    localStorage.setItem('habits', JSON.stringify(habits));
    localStorage.setItem('dailyProgress', JSON.stringify(dailyProgress));
    recordDailyProgress();
    updateStats();
}

// Add CSS for XP animation
const style = document.createElement('style');
style.textContent = `
    @keyframes xpGain {
        0% {
            opacity: 0;
            transform: translate(-50%, -50%) scale(0.5);
        }
        50% {
            opacity: 1;
            transform: translate(-50%, -50%) scale(1.2);
        }
        100% {
            opacity: 0;
            transform: translate(-50%, -80%) scale(1);
        }
    }
`;
document.head.appendChild(style);

// Reset daily progress at midnight
function checkDateChange() {
    const lastDate = localStorage.getItem('lastDate');
    const today = new Date().toDateString();
    
    if (lastDate !== today) {
        // Reset daily habit progress
        habits.forEach(habit => {
            if (habit.frequency === 'daily') {
                habit.current = 0;
            }
        });
        
        // Save lifetime XP
        const todayTasks = tasks.filter(t => t.date === lastDate);
        const completedTasks = todayTasks.filter(t => t.completed);
        const totalXP = completedTasks.reduce((sum, task) => sum + task.xp, 0);
        const currentLifetimeXP = parseInt(localStorage.getItem('lifetimeXP') || '0');
        localStorage.setItem('lifetimeXP', currentLifetimeXP + totalXP);
        
        localStorage.setItem('lastDate', today);
        saveData();
        loadHabits();
    }
}

// Check date change on load and every minute
checkDateChange();
setInterval(checkDateChange, 60000);
