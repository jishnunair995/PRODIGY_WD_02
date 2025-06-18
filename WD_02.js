        let startTime = 0;
        let elapsedTime = 0;
        let timerInterval;
        let running = false;

        const display = document.getElementById('display');
        const lapsList = document.getElementById('lapsList');

        function formatTime(ms) {
            let centiseconds = Math.floor((ms % 1000) / 10);
            let seconds = Math.floor((ms / 1000) % 60);
            let minutes = Math.floor((ms / (1000 * 60)) % 60);
            let hours = Math.floor(ms / (1000 * 60 * 60));
            return (
                (hours < 10 ? "0" : "") + hours + ":" +
                (minutes < 10 ? "0" : "") + minutes + ":" +
                (seconds < 10 ? "0" : "") + seconds + "." +
                (centiseconds < 10 ? "0" : "") + centiseconds
            );
        }

        function updateDisplay() {
            display.textContent = formatTime(elapsedTime);
        }

        function startStopwatch() {
            if (!running) {
                running = true;
                startTime = Date.now() - elapsedTime;
                timerInterval = setInterval(() => {
                    elapsedTime = Date.now() - startTime;
                    updateDisplay();
                }, 10);
            }
        }

        function pauseStopwatch() {
            if (running) {
                running = false;
                clearInterval(timerInterval);
            }
        }

        function resetStopwatch() {
            running = false;
            clearInterval(timerInterval);
            elapsedTime = 0;
            updateDisplay();
            lapsList.innerHTML = '';
        }

        function lapStopwatch() {
            if (running) {
                const li = document.createElement('li');
                li.textContent = formatTime(elapsedTime);
                lapsList.appendChild(li);
            }
        }

        document.getElementById('start').addEventListener('click', startStopwatch);
        document.getElementById('pause').addEventListener('click', pauseStopwatch);
        document.getElementById('reset').addEventListener('click', resetStopwatch);
        document.getElementById('lap').addEventListener('click', lapStopwatch);

        updateDisplay();