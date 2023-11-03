"use strict";

const HABIT_KEY = "HABIT_KEY";

let habits = [];
let globalActiveHabitId;

/* page */
const page = {
  menu: {
    menuBox: document.querySelector(".menu__list"),
    menuOpenPopupBtn: document.querySelector(".menu__addBtn"),
  },
  header: {
    habitTitle: document.querySelector(".habitTitle"),
    progressPercent: document.querySelector(".progress__percent"),
    progressCoverBar: document.querySelector(".progress__cover-bar"),
  },
  content: {
    cover: document.querySelector(".contentCover"),
    coverOpenPopupBtn: document.querySelector(".contentCover__addBtn"),
    contentBox: document.querySelector(".content"),
    daysContainer: document.querySelector(".days"),
    nextDay: document.querySelector(".habit__day"),
    addDayForm: document.querySelector(".habit__form"),
  },
  popup: {
    cover: document.querySelector(".cover"),
    iconField: document.querySelector(".popup__form input[name='icon']"),
    addHabitForm: document.querySelector(".popup__form"),
    closePopupBtn: document.querySelector(".popup__closeBtn"),
    iconBtn: {
      sport: document.querySelector(".icon_sport"),
      water: document.querySelector(".icon_water"),
      food: document.querySelector(".icon_food"),
    },
  },
};

/* utils */
function loadData() {
  const habitsString = localStorage.getItem(HABIT_KEY);
  if (!habitsString) return false;

  const habitArray = JSON.parse(habitsString);
  if (Array.isArray(habitArray)) habits = habitArray;
  return true;
}

function saveData() {
  localStorage.setItem(HABIT_KEY, JSON.stringify(habits));
}

/* render */
function rerenderMenu(activeHabit) {
  if (!activeHabit) return;
  
  for (const habit of habits) {
    const existed = document.querySelector(`[menu-habit-id="${habit.id}"]`);

    if (!existed) {
      const element = createElement(
        "button",
        ["menu__item"],
        [["menu-habit-id", habit.id]],
        null
      ); 

      element.addEventListener("click", () => rerender(habit.id));
      element.innerHTML = `<img src="images/${habit.icon}.svg" alt="${habit.name}" menu-habit-id="1" />`;

      if (activeHabit.id === habit.id) element.classList.add("menu__item_active");

      page.menu.menuBox.appendChild(element);
      continue;
    }

    if (activeHabit.id === habit.id) {
      existed.classList.add("menu__item_active");
    } else {
      existed.classList.remove("menu__item_active");
    }
  }
}

function rerenderHead(activeHabit) {
  page.header.habitTitle.innerText = activeHabit.name;
  const progress =
    activeHabit.days.length / activeHabit.target > 1
      ? 100
      : (activeHabit.days.length / activeHabit.target) * 100;
  page.header.progressPercent.innerText = progress.toFixed(0) + "%";
  page.header.progressCoverBar.setAttribute("style", `width: ${progress}%`);
}

function rerenderContent(activeHabit) {
  page.content.daysContainer.innerHTML = "";

  for (const index in activeHabit.days) {
    //сам блок дня
    const elementHabit = createElement("div", ["habit"]);
    page.content.daysContainer.appendChild(elementHabit);

    //левая часть
    const elementHabitDay = createElement(
      "div",
      ["habit__day"],
      null,
      `День ${+index + 1}`
    );
    elementHabit.appendChild(elementHabitDay);

    //правая часть
    const elementHabitComment = createElement(
      "div",
      ["habit__comment"],
      null,
      activeHabit.days[index].comment
    );
    elementHabit.appendChild(elementHabitComment);

    //кнопка удаления
    const elementHabitButton = createElement("button", ["habit__deleteBtn"]);
    elementHabit.appendChild(elementHabitButton);
    elementHabitButton.addEventListener("click", () => deleteDay(+index));

    //картинка для кнопки
    const elementHabitButtonImg = createElement(
      "img",
      null,
      [
        ["src", `images/delete.svg`],
        ["alt", `Удалить день ${+index + 1}`],
      ]
    );
    elementHabitButton.appendChild(elementHabitButtonImg);
  }
  page.content.nextDay.innerHTML = `День ${+activeHabit.days.length + 1}`;
}

function rerender(activeHabitId) {
  globalActiveHabitId = activeHabitId;
  const activeHabit = habits.find((habit) => habit.id === activeHabitId);
  if (!activeHabit) {
    return;
  }
  document.location.replace(document.location.pathname + "#" + activeHabitId);
  page.content.cover.classList.add("contentCover_hidden");
  page.content.contentBox.classList.remove("content_hidden");
  rerenderMenu(activeHabit);
  rerenderHead(activeHabit);
  rerenderContent(activeHabit);
}

/* work with days */
function addDays(event) {
  event.preventDefault();

  const data = validateAndGetFormData(event.target, ["comment"]);
  if (!data) return;

  habits = habits.map((habit) => {
    if (habit.id === globalActiveHabitId) {
      return {
        ...habit,
        days: habit.days.concat([{ comment: data.comment }]),
      };
    }
    return habit;
  });
  resetForm(event.target, ["comment"]);
  rerender(globalActiveHabitId);
  saveData();
}

function deleteDay(index) {
  habits = habits.map((habit) => {
    if (habit.id === globalActiveHabitId) {
      habit.days.splice(index, 1);
    }

    return habit;
  });

  rerender(globalActiveHabitId);
  saveData();
}

/* working with habits */
function setIcon(event, icon) {
  page.popup.iconField.value = icon;
  const activeIcon = document.querySelector(".icon_active");
  activeIcon.classList.remove("icon_active");
  event.target.closest("button").classList.add("icon_active");
}

function togglePopup() {
  page.popup.cover.classList.toggle("cover_hidden");
}

function addHabbit(event) {
  event.preventDefault();

  const data = validateAndGetFormData(event.target, ["name", "icon", "target"]);
  if (!data) return;

  const maxId = habits.reduce((acc, habit) => acc > habit.id ? acc : habit.id, 0);

  const newHabit = {
    id: maxId + 1,
    icon: data.icon,
    name: data.name,
    target: data.target,
    days: [],
  };

  habits.push(newHabit);

  resetForm(event.target, ["name", "target"]);

  rerender(maxId + 1);
  saveData();
  togglePopup();
}

function validateAndGetFormData(form, fields) {
  const formData = new FormData(form);
  const res = {};

  for (const field of fields) {
    const fieldValue = formData.get(field);
    form[field].classList.remove("input_error");

    if (!fieldValue) {
      form[field].classList.add("input_error");
    }

    res[field] = fieldValue;
  }

  let isValid = true;

  for (const field of fields) {
    if (!res[field]) {
      isValid = false;
    }
  }

  if (!isValid) {
    return;
  }

  return res;
}

function createElement(tag, classArray, attributeArray, text) {
  const element = document.createElement(tag);

  if (classArray) {
    for (const cl of classArray) {
      element.classList.add(cl);
    }
  }

  if (attributeArray) {
    for (const attr of attributeArray) {
      element.setAttribute(attr[0], attr[1]);
    }
  }

  if (text) element.textContent = text;

  return element;
}

function resetForm(form, fields) {
  for (const field of fields) {
    form[field].value = "";
  }
}

/* init*/
(() => {
  const hasData = loadData();

  if (hasData) {
    const hashId = Number(document.location.hash.replace("#", ""));
    const urlHabit = habits.find((habit) => habit.id === hashId);

    if (urlHabit) {
      rerender(urlHabit.id);
    } else {
      rerender(habits[0].id);
    }

  } else {
    page.content.cover.classList.remove("contentCover_hidden");
    page.content.contentBox.classList.add("content_hidden");
  }

})();


page.menu.menuOpenPopupBtn.addEventListener("click", togglePopup);
page.content.coverOpenPopupBtn.addEventListener("click", togglePopup);
page.popup.closePopupBtn.addEventListener("click", togglePopup);

page.content.addDayForm.addEventListener("submit", addDays);
page.popup.addHabitForm.addEventListener("submit", addHabbit);

page.popup.iconBtn.sport.addEventListener("click", () => setIcon(event, "sport"));
page.popup.iconBtn.water.addEventListener("click", () => setIcon(event, "water"));
page.popup.iconBtn.food.addEventListener("click", () => setIcon(event, "food"));
