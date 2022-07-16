// Вспомогательные функции.

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

// Проверка на нажатие Esc
const isEscapeKey = (evt) => evt.key === 'Escape';

export {getRandomElement, getRandomNumber, checkStrokeLength, isEscapeKey};
