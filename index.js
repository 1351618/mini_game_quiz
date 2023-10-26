// >>>>>>>>>>>>>>>>>>
// таймер
const timer = document.querySelector(".timer__p");

const timerSubstrate = document.querySelector(".timer-substrate");
// нажатие на сам таймер
const timerDiv = document.querySelector(".timer");
timerDiv.addEventListener("click", () => {
  startTimer();
});

// звук таймера
const audio = document.getElementById("myAudio");

const timerTime = 20; // таймер 20 сек

// function startTimer() {
//   //   console.log("запуск таймера");
//   let i = timerTime;
//   timer.style.textShadow =
//     "0px 0px 2px #fff900, 0px 0px 6px #fff900, 0px 0px 15px #fff900";
//   timer.textContent = `${i}`;

//   const intervalId = setInterval(() => {
//     --i;
//     timerSubstrate.style.backgroundColor = "#00cf17";
//     procentBarr(i);
//     audio.play();
//     timer.textContent = `${i.toString().length < 2 ? `0${i}` : i}`;

//     // Остановка интервала при достижении 0
//     if (i === 0) {
//       clearInterval(intervalId);
//       //   console.log("Таймер завершен");
//       setTimeout(() => {
//         timer.textContent = `${timerTime}`;
//         setProgress(0);
//         timerSubstrate.style.backgroundColor = "#313131";
//         timer.style.textShadow = "none";
//         audio.pause();
//         audio.currentTime = 0;
//       }, 700);
//     }
//   }, 1000);
// }

let intervalId;

function startTimer() {
  stopTimer();
  //   console.log("запуск таймера");
  let i = timerTime;
  timer.style.textShadow =
    "0px 0px 2px #fff900, 0px 0px 6px #fff900, 0px 0px 15px #fff900";
  timer.textContent = `${i}`;

  intervalId = setInterval(() => {
    --i;
    timerSubstrate.style.backgroundColor = "#00cf17";
    procentBarr(i);
    audio.play();
    timer.textContent = `${i.toString().length < 2 ? `0${i}` : i}`;

    // Остановка интервала при достижении 0
    if (i === 0) {
      stopTimer();
    }
  }, 1000);
}

function stopTimer() {
  clearInterval(intervalId);
  //   console.log("Таймер завершен");
  timer.style.textShadow = "none"; // Сброс тени перед остановкой
  setTimeout(() => {
    timer.textContent = `${timerTime}`;
    setProgress(0);
    timerSubstrate.style.backgroundColor = "#313131";
    audio.pause();
    audio.currentTime = 0;
  }, 0);
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
// todo обработчик клавиатуры
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
// pageSelection("round-1");

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
// ================================================
// todo получение JSON
// Путь к файлу JSON
const filePath = "./src/json/round-1/categories_round_1.json";

// Загрузка файла
fetch(filePath)
  .then((response) => response.json())
  .then((jsonData) => {
    // Вывод данных в консоль
    // console.log(jsonData);
    createRoundContent(jsonData);
  })
  .catch((error) => {
    console.error("Ошибка загрузки файла:", error);
  });

// ================================================
// todo страница первого раунда
// функция для создания контента
function createRoundContent(jsonData) {
  jsonData = JSON.stringify(jsonData, null, 2);
  //   const names = jsonData[0];
  console.log(jsonData);
  console.log(jsonData[0]);

  const roundContentDiv = document.createElement("div");
  roundContentDiv.textContent = jsonData;

  round_1_Page.appendChild(roundContentDiv);
}
