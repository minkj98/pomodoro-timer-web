const MIN = 1;
const MAX = 60;
const STORAGE_KEY = "pomodoro-minutes";

const input = document.getElementById("minutes");
const doneBtn = document.getElementById("done");

const saved = localStorage.getItem(STORAGE_KEY);
if (saved !== null) input.value = saved;

function isValid() {
  if (input.value.trim() === "") return false;
  const n = Number(input.value);
  return Number.isInteger(n) && n >= MIN && n <= MAX;
}

function sync() {
  doneBtn.disabled = !isValid();
}

input.oninput = sync;

doneBtn.onclick = () => {
  if (!isValid()) return;
  localStorage.setItem(STORAGE_KEY, String(Number(input.value)));
  localStorage.removeItem("pomodoro-remaining");
  location.href = "index.html";
};

sync();
