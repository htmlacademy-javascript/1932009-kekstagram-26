//Функция, возвращающая случайное целое число из переданного диапазона включительно.

//диапазон может быть только положительный, включая ноль.
//придумайте, как функция должна вести себя, если передать значение «до» меньшее, чем значение «от», или равное ему.
//Функция может не гарантировать верный результат, если в переданном диапазоне нет ни одного подходящего числа.

//источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

function getRandomNumber(min, max) {
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
}

//Функция для проверки максимальной длины строки.
//длина комментария не может составлять больше 140 символов;
//должна быть универсальна.

function checkStrokeLength(stroke, maxLength) {
  return (stroke.length <= maxLength);
}
