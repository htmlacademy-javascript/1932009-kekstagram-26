// Вспомогательные функции.

const ALERT_SHOW_TIME = 5000;

// Сравнение длины строки
const checkStrokeLength = (stroke, maxLength) => (stroke.length <= maxLength);

// Получение случайного положительного целого числа
// источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random
const getRandomNumber = (min, max) => {
  if (Number.isFinite(min) && Number.isFinite(max) && (max > min) && (Math.sign(min) >= 0) && (Math.sign(max) >= 0)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (Number.isFinite(min) && Number.isFinite(max) && (max < min) && (Math.sign(min) >= 0) && (Math.sign(max) >= 0)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
  if (Number.isFinite(min) && Number.isFinite(max) && (max === min) && (Math.sign(min) >= 0) && (Math.sign(max) >= 0)) {
    max = Math.floor(max);
    return max;
  }
  return 'В переданном диапазоне нет ни одного подходящего числа!';
};

// Получение случайного элемента из массива
const getRandomElement = (array) => array[getRandomNumber(0, array.length - 1)];


// https://learn.javascript.ru/task/shuffle Перемешивание массива случайным образом
const shuffleArray = (array) => {
  for (let i = array.length - 1; i>0; i--) {
    const j = getRandomNumber(0, i);
    [array[i], array[j]] = [array[j], array[i]];
  }
};

// устранение дребезга от Кекса
const debounce = (callback, timeoutDelay = 500) => {
  let timeoutId;
  return (...rest) => {
    clearTimeout(timeoutId);
    timeoutId = setTimeout(() => callback.apply(this, rest), timeoutDelay);
  };
};

// Проверка на нажатие Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

const showAlert = (message) => {
  const alertContainer = document.createElement('div');
  alertContainer.style.zIndex = '100';
  alertContainer.style.position = 'absolute';
  alertContainer.style.left = '0';
  alertContainer.style.top = '0';
  alertContainer.style.right = '0';
  alertContainer.style.padding = '10px 3px';
  alertContainer.style.fontSize = '30px';
  alertContainer.style.textAlign = 'center';
  alertContainer.style.backgroundColor = 'red';

  alertContainer.textContent = message;

  document.body.append(alertContainer);

  setTimeout(() => {
    alertContainer.remove();
  }, ALERT_SHOW_TIME);
};

export {getRandomElement, getRandomNumber, checkStrokeLength, isEscapeKey, showAlert, shuffleArray, debounce};
