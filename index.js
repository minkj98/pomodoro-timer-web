const savedMinutes = Number(localStorage.getItem("pomodoro-minutes"));
const DEFAULT_SECONDS = (savedMinutes >= 1 && savedMinutes <= 60 ? savedMinutes : 25) * 60;

const REMAINING_KEY = "pomodoro-remaining";
const savedRemaining = Number(localStorage.getItem(REMAINING_KEY));
let remaining =
  savedRemaining > 0 && savedRemaining <= DEFAULT_SECONDS ? savedRemaining : DEFAULT_SECONDS;
let intervalId = null;

const timeEl = document.getElementById("time");

function save() {
  localStorage.setItem(REMAINING_KEY, String(remaining));
}

function render() {
  const m = String(Math.floor(remaining / 60)).padStart(2, "0");
  const s = String(remaining % 60).padStart(2, "0");
  timeEl.textContent = `${m}:${s}`;
}

function start() {
  if (intervalId !== null) return;
  intervalId = setInterval(() => {
    if (remaining > 0) {
      remaining--;
      render();
      save();
    } else {
      stop();
    }
  }, 1000);
}

function stop() {
  clearInterval(intervalId);
  intervalId = null;
}

function reset() {
  stop();
  remaining = DEFAULT_SECONDS;
  render();
  save();
}

document.getElementById("start").onclick = start;
document.getElementById("stop").onclick = stop;
document.getElementById("reset").onclick = reset;
document.getElementById("settings").onclick = () => {
  location.href = "setting.html";
};

render();
