// >>>>>>>>>>>>>>>>>>
// таймер
const timer = document.querySelector(".timer__p");
const timerSubstrate = document.querySelector(".timer-substrate");
// звук таймера
const audio = document.getElementById("myAudio");

const timerTime = 20; // таймер 20 сек

function startTimer() {
  //   console.log("запуск таймера");
  let i = timerTime;
  timer.style.textShadow =
    "0px 0px 2px #fff900, 0px 0px 6px #fff900, 0px 0px 15px #fff900";
  timer.textContent = `${i}`;

  const intervalId = setInterval(() => {
    --i;
    timerSubstrate.style.backgroundColor = "#00cf17";
    procentBarr(i);
    audio.play();
    timer.textContent = `${i.toString().length < 2 ? `0${i}` : i}`;
    if (i === 0) {
      clearInterval(intervalId); // Остановка интервала при достижении 0
      //   console.log("Таймер завершен");
      setTimeout(() => {
        timer.textContent = `${timerTime}`;
        setProgress(0);
        timerSubstrate.style.backgroundColor = "#313131";
        timer.style.textShadow = "none";
        audio.pause();
        audio.currentTime = 0;
      }, 700);
    }
  }, 1000);
}

// >>>>>>>>>>>>>>>>>>
// таймер кольцо прогресса
const circleTimer = document.querySelector(".progress-ring__circle");
const radiusCircleTimer = circleTimer.r.baseVal.value;
const circumference = 2 * Math.PI * radiusCircleTimer;
// console.log(circumference);

circleTimer.style.strokeDasharray = `${circumference} ${circumference}`;
circleTimer.style.strokeDashoffset = circumference;

function setProgress(percent) {
  const offset = circumference - (percent / 100) * circumference;
  circleTimer.style.strokeDashoffset = offset;
}

// >>>>>>>>>>>>>>>>>>

// соотношение 30 к 0% и 0 К 100%
function procentBarr(i) {
  let percentage = ((timerTime - i) / timerTime) * 100;
  setProgress(percentage);
}

// =======================================================
// обработчик клавиатуры
document.addEventListener("keydown", (event) => {
  //   console.log(event.key);
  if (event.key === " ") {
    console.log("space");
    startTimer();
  }
});

// =======================================================
// todo настройка отображения страниц
const main_Page = document.querySelector(".main-page");
const round_1_Page = document.querySelector(".round-1");
const round_2_Page = document.querySelector(".round-2");
const round_3_Page = document.querySelector(".round-3");
const question_Page = document.querySelector(".question");

function pageSelection(page) {
  showPage = page;
  main_Page.classList.toggle("hide", showPage !== "main-page");
  round_1_Page.classList.toggle("hide", showPage !== "round-1");
  round_2_Page.classList.toggle("hide", showPage !== "round-2");
  round_3_Page.classList.toggle("hide", showPage !== "round-3");
  question_Page.classList.toggle("hide", showPage !== "question");
}
// pageSelection("main-page");
pageSelection("question");

// ======================================================
// кнопка домой
const btnHome = document.querySelector(".btn-home");

btnHome.addEventListener("click", () => {
  pageSelection("main-page");
});

// кнопка раундов
const btnRounds = document.querySelectorAll(".main-page button");

btnRounds.forEach((button) => {
  button.addEventListener("click", () => {
    console.log(button.textContent);
    if (button.textContent === "РАУНД 1") {
      pageSelection("round-1");
    }
    if (button.textContent === "РАУНД 2") {
      pageSelection("round-2");
    }
    if (button.textContent === "РАУНД 3") {
      pageSelection("round-3");
    }
  });
});
