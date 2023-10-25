console.log(444);
// таймер
const timer = document.querySelector(".timer__p");
const timerSubstrate = document.querySelector(".timer-substrate");

const timerTime = 20; // таймер 20 сек

function startTimer() {
  console.log("запуск таймера");
  let i = timerTime;
  timer.textContent = `${i}`;

  const intervalId = setInterval(() => {
    --i;
    timerSubstrate.style.backgroundColor = "#00ff00";
    procentBarr(i);
    timer.textContent = `${i.toString().length < 2 ? `0${i}` : i}`;
    if (i === 0) {
      clearInterval(intervalId); // Остановка интервала при достижении 0
      console.log("Таймер завершен");
      setTimeout(() => {
        timer.textContent = `${timerTime}`;
        setProgress(0);
        timerSubstrate.style.backgroundColor = "#313131";
      }, 700);
    }
  }, 1000);
}
// таймер кольцо прогресса
const circleTimer = document.querySelector(".progress-ring__circle");
const radiusCircleTimer = circleTimer.r.baseVal.value;
const circumference = 2 * Math.PI * radiusCircleTimer;
console.log(circumference);

circleTimer.style.strokeDasharray = `${circumference} ${circumference}`;
circleTimer.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circleTimer.style.strokeDashoffset = offset;
}

// соотношение 30 к 0% и 0 К 100%
function procentBarr(i) {
  let percentage = ((timerTime - i) / timerTime) * 100;
  setProgress(percentage);
}

// =======================================================
// обработчик клавиатуры
document.addEventListener("keydown", (event) => {
  console.log(event.key);
  if (event.key === " ") {
    console.log("space");
    startTimer();
  }
});
