// todo Пути и подключение
const filePath_1 = "./src/json/round-1/categories_round_1.json"; // Путь к файлу JSON
const filePath_2 = "./src/json/round-2/categories_round_2.json"; // Путь к файлу JSON

// todo получение и создание - тегов html

const timer = document.querySelector(".timer__p"); // таймер
const timerSubstrate = document.querySelector(".timer-substrate");
const timerDiv = document.querySelector(".timer"); // нажатие на сам таймер
const audio = document.getElementById("myAudio"); // звук таймера
const circleTimer = document.querySelector(".progress-ring__circle"); // таймер кольцо прогресса
// * настройка отображения страниц
const main_Page = document.querySelector(".main-page");
const round_1_Page = document.querySelector(".round-1");
const round_2_Page = document.querySelector(".round-2");
const round_3_Page = document.querySelector(".round-3");
const question_Page = document.querySelector(".question");
const question_Page_Two = document.querySelector(".question-two");

const btnHome = document.querySelector(".btn-home"); // кнопка домой
const btnRounds = document.querySelectorAll(".main-page button"); // кнопка раундов

const returnRound_1_Btn = document.querySelector(".return-round-1-btn"); // кнопка возврата к раунду 1
const returnRound_2_Btn = document.querySelector(".return-round-2-btn"); // кнопка возврата к раунду 2
const returnRound_3_Btn = document.querySelector(".return-round-3-btn"); // кнопка возврата к раунду 3

// страница с вопросами шаблон 2
const questionTwoPDiv = document.querySelector(".question-two-p-div");
const questionTwoImgDiv = document.querySelector(".question-two-img-div");
const questionTwoOptionsDiv = document.querySelector(
  ".question-two-options-div"
);

// звуковые эффекты
const guidance = document.getElementById("guidance-01");
// рендеринг элементов
const questionImgDiv = document.querySelector(".question__img");
const questionDivP = document.querySelector(".question-div-p");
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx

// todo переменные

const timerTime = 20; // таймер 20 сек
let intervalId;
// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// todo обработчики кнопок, клавиатуры на странице

// * кнопка домой
btnHome.addEventListener("click", () => {
  pageSelection("main-page");
  stopTimer();
  returnRound_1_Btn.classList.add("hide");
  returnRound_2_Btn.classList.add("hide");
  returnRound_3_Btn.classList.add("hide");
});

// * нажатие на сам таймер
timerDiv.addEventListener("click", () => {
  startTimer();
});

// * кнопка возврата к раунду 1
returnRound_1_Btn.addEventListener("click", () => {
  pageSelection("round-1");
  returnRound_1_Btn.classList.add("hide");
  stopTimer();
});

// * кнопка возврата к раунду 2
returnRound_2_Btn.addEventListener("click", () => {
  pageSelection("round-2");
  returnRound_2_Btn.classList.add("hide");
  stopTimer();
});

// * кнопка возврата к раунду 3
returnRound_3_Btn.addEventListener("click", () => {
  pageSelection("round-3");
  returnRound_3_Btn.classList.add("hide");
  stopTimer();
});

// * обработчик клавиатуры
document.addEventListener("keydown", (event) => {
  //   console.log(event.key);
  if (event.key === " ") {
    console.log("space");
    startTimer();
  }
});

// * кнопка раундов
btnRounds.forEach((button) => {
  button.addEventListener("click", () => {
    // console.log(button.textContent);
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

// xxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxxx
// todo функции

// * запуск таймера
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

// * остановка таймера
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
// todo настройка отображения страниц

function pageSelection(page) {
  showPage = page;
  main_Page.classList.toggle("hide", showPage !== "main-page");
  // returnRound_1_Btn.classList.toggle("hide", showPage !== "question");
  round_1_Page.classList.toggle("hide", showPage !== "round-1");
  round_2_Page.classList.toggle("hide", showPage !== "round-2");
  round_3_Page.classList.toggle("hide", showPage !== "round-3");
  question_Page.classList.toggle("hide", showPage !== "question");

  question_Page_Two.classList.toggle("hide", showPage !== "question-two");
}

// выбор начальной страницы
pageSelection("main-page");
// pageSelection("question");
// pageSelection("round-1");

// ======================================================

// todo получение JSON
// Загрузка файла
fetch(filePath_1)
  .then((response) => response.json())
  .then((jsonData) => {
    handlerJsondata(jsonData);
  })
  .catch((error) => {
    console.error("Ошибка загрузки файла:", error);
  });

//   >>>>>>>>>>>>>>>>>>>>>>>>>
// todo фильтрация данных с json
function handlerJsondata(jsonData) {
  jsonData = jsonData[0].categories;
  createRoundContent(jsonData);
}

// ================================================

// todo страница 1 раунда
// функция для создания контента
function createRoundContent(jsonData) {
  // console.log(jsonData);
  // const jsonDataOBJ = { ...jsonData };
  // console.log(jsonDataOBJ);
  jsonData.forEach((val) => {
    // console.log(val.name);
    const name = val.name;
    // console.log(val.difficulties);
    const difficulties = val.difficulties;

    const categoryDiv = document.createElement("div");
    categoryDiv.classList.add("category");

    const categoryDivP = document.createElement("p");
    categoryDivP.textContent = name;
    categoryDiv.appendChild(categoryDivP);

    difficulties.forEach((val) => {
      // console.log(val.difficultiesName);
      // console.log(val);
      const exerciseButton = document.createElement("button");
      exerciseButton.classList.add("exerciseBtn");
      exerciseButton.textContent = val.difficultiesName;
      // обработчики кликов на каждую кнопку
      clickExerciseButton(exerciseButton, val);
      // действие при наведении
      exerciseButton.addEventListener("mouseenter", () => {
        soundGuidance(guidance, 150);
      });

      categoryDiv.appendChild(exerciseButton);
    });

    round_1_Page.appendChild(categoryDiv);
  });
}

function clickExerciseButton(exerciseButton, val) {
  exerciseButton.addEventListener("click", (event) => {
    pageSelection("question");
    returnRound_1_Btn.classList.remove("hide");

    // const questionImgDiv = document.querySelector(".question__img");
    // console.log(val);

    // Находим тег <img> внутри questionImgDiv
    const imgElement = questionImgDiv.querySelector("img");
    if (imgElement) {
      imgElement.remove(); // Удаляем существующий тег <img>
    }

    const questionImg = document.createElement("img");
    questionImg.src = val.questionImg;
    questionImgDiv.appendChild(questionImg);

    //
    // const questionDivP = document.querySelector(".question-div-p");
    // Находим тег <p> внутри questionImgDiv
    const pElement = questionDivP.querySelector("p");
    if (pElement) {
      pElement.remove(); // Удаляем существующий тег <p>
    }

    const questionP = document.createElement("p");
    questionP.classList.add("question__p");
    questionP.textContent = val.questionText;

    questionDivP.appendChild(questionP);

    // заполняем ответы
    // console.log(val.answerOptions);
    const optionsDiv = document.querySelector(".options");
    // Находим все кнопки внутри optionsDiv
    const buttons = optionsDiv.querySelectorAll("button");

    buttons.forEach((button) => {
      button.remove(); // Удаляем каждую найденную кнопку
    });
    // добавляем новые
    val.answerOptions.forEach((val) => {
      // console.log(val.answer);
      const answerBtn = document.createElement("button");
      answerBtn.classList.add("options-btn");
      answerBtn.textContent = val.answer;
      answerBtn.addEventListener("click", () => {
        // console.log(val);
        actionsToRespond(val, answerBtn);
      });

      optionsDiv.appendChild(answerBtn);
    });
  });
}

// ================================================
// todo действия при выборе ответа
function actionsToRespond(val, answerBtn) {
  // console.log(answerBtn);

  // console.log(val, ">>>>>>>>>>>>>>>>>>");
  if (val.correctAnswer) {
    answerBtn.style.backgroundColor = "#00ff00";
  } else {
    answerBtn.style.backgroundColor = "#595959";
  }
  // показ изображения
  const showImag = document.createElement("img");
  showImag.classList.add("showImag");
  showImag.src = val.answerFoto;
  question_Page.appendChild(showImag);
  setTimeout(() => {
    showImag.remove();
  }, 1500);

  // отключаем курсор после нажатия
  answerBtn.style.cursor = "not-allowed";
  answerBtn.disabled = true;
}

// =================================================

// soundGuidance(guidance, 300); // (тег со звуком, длительность)
// todo функция для воспроизведения звука
function soundGuidance(soundTag, duration) {
  soundTag.play();
  setTimeout(() => {
    soundTag.pause();
    soundTag.load();
  }, duration);
}

// ====================================================
// todo раунд 2
// получение json
fetch(filePath_2)
  .then((response) => response.json())
  .then((jesonData) => {
    renderPageRound_2(jesonData[0].categories);
  })
  .catch((error) => {
    console.error("Ошибка загрузки файла:", error);
  });

// рендеринг на страницу
function renderPageRound_2(jesonDataRound2) {
  // console.log(jesonDataRound2); // данные с json
  let roundCategories2 = [...jesonDataRound2]; // новая переменная чтоб не трогать исходные данные

  // перебор
  roundCategories2.forEach((val) => {
    // console.log(val);
    // создаем блок div для отображения
    const categoruRound2_div = document.createElement("div");
    categoruRound2_div.classList.add("categoruRound2_div");

    // создаем блок <p> для названия
    const categoruRound2_p = document.createElement("p");
    categoruRound2_p.classList.add("categoruRound2_p");
    categoruRound2_p.textContent = val.name;

    categoruRound2_div.appendChild(categoruRound2_p); // добавление в блок <p> название

    // console.log(val.difficulties, "...............");
    val.difficulties.forEach((val) => {
      // console.log(val.difficultiesName);
      const categoruRound2_button = document.createElement("button");
      categoruRound2_button.classList.add("categoruRound2_button");
      categoruRound2_button.textContent = val.difficultiesName;
      categoruRound2_button.addEventListener("click", () => {
        // console.log(val);
        // ! функция для обработки кнопок
        onClickBtnRound2(val);
      });

      categoruRound2_div.appendChild(categoruRound2_button);
    });

    round_2_Page.appendChild(categoruRound2_div); // добавление на страницу
  });
}

// ! функция для обработки кнопок
function onClickBtnRound2(jsonDataForBtn) {
  jsonDataForBtn.template === 2
    ? templateTwo(jsonDataForBtn)
    : templateOne(jsonDataForBtn);
}

// второй шаблон
function templateTwo(jsonDataForBtn) {
  console.log("template---2");
  pageSelection("question-two");
  returnRound_2_Btn.classList.remove("hide");

  // удаляем вопрос для перезаписи тег-<p> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  let questionTwoPDiv_P = questionTwoPDiv.querySelector(
    ".question-two-p-div__p"
  );
  if (questionTwoPDiv_P) {
    questionTwoPDiv.removeChild(questionTwoPDiv_P);
  }

  // снова добавляем
  questionTwoPDiv_P = document.createElement("p");
  questionTwoPDiv_P.classList.add("question-two-p-div__p");
  // console.log(jsonDataForBtn.questionText);
  questionTwoPDiv_P.textContent = jsonDataForBtn.questionText;
  questionTwoPDiv.appendChild(questionTwoPDiv_P);

  // удаляем фото  для перезаписи тег-<img> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  let questionTwoImgDiv_img = questionTwoImgDiv.querySelector(
    ".question-two-p-div__img"
  );
  if (questionTwoImgDiv_img) {
    questionTwoImgDiv.removeChild(questionTwoImgDiv_img);
  }
  questionTwoImgDiv_img = document.createElement("img");
  questionTwoImgDiv_img.classList.add("question-two-p-div__img");
  // console.log(jsonDataForBtn.questionImg);
  questionTwoImgDiv_img.src = jsonDataForBtn.questionImg;

  questionTwoImgDiv.appendChild(questionTwoImgDiv_img);

  // удаляем тарые вопросы   для перезаписи теги-<button> >>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>
  let questionTwoOptionsDiv_btn = questionTwoOptionsDiv.querySelectorAll(
    ".question-two-options-div__Btn"
  );
  if (questionTwoOptionsDiv_btn.length > 0) {
    questionTwoOptionsDiv_btn.forEach((val) => {
      val.remove();
    });
  }
  // console.log(jsonDataForBtn.answerOptions);
  jsonDataForBtn.answerOptions.forEach((val) => {
    questionTwoOptionsDiv_btn = document.createElement("button");
    questionTwoOptionsDiv_btn.classList.add("question-two-options-div__Btn");
    // console.log(val.answer, ">>>>>>>>>>>>>>>>>>>>>>>>>>>>>");
    questionTwoOptionsDiv_btn.textContent = val.answer;
    questionTwoOptionsDiv_btn.addEventListener("click", () => {
      // ! действия по нажатию на кнопку - функция
      console.log(val);
    });

    questionTwoOptionsDiv.appendChild(questionTwoOptionsDiv_btn);
  });
}

// первый шаблон
function templateOne(jsonDataForBtn) {
  console.log("template---1");
  pageSelection("question");
  returnRound_2_Btn.classList.remove("hide");
}
