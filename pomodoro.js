document.addEventListener('DOMContentLoaded', function() {
    const pomodoroTimer = document.querySelector('.pomodoro-timer');
    const pomodoroCountdown = document.querySelector('.countdown');
    const pomodoroStartButton = document.querySelector('#pomodoro-start');
    const pomodoroPauseButton = document.querySelector('#pomodoro-pause');
    const pomodoroResetButton = document.querySelector('#pomodoro-reset');

    let pomodoroInterval;
    let pomodoroTime = 25 * 60;
    let isPomodoroRunning = false;

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
                    playSound('work-end');
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

    function playSound(type) {
        const audio = new Audio(`sounds/${type}.mp3`);
        audio.play();
    }

    pomodoroStartButton.addEventListener('click', startPomodoro);
    pomodoroPauseButton.addEventListener('click', pausePomodoro);
    pomodoroResetButton.addEventListener('click', resetPomodoro);

    updatePomodoroDisplay();
});
