/*  main.js - точка входа. задача - подключает и настраивает скрипты на странице.
    Импорты других модулей
    Вызовы общих функций
    Настройка скриптов
    ...
*/
import {showAlert, debounce} from './util.js';
import {createMiniatures, setFilterClick} from './miniatures.js';
import {getData} from './api.js';
import './upload-form.js';

const RERENDER_DELAY = 500;

let objects;

getData(
  (similarObjects) => {
    createMiniatures(similarObjects);
    objects = similarObjects;
    setFilterClick(debounce(createMiniatures, RERENDER_DELAY), objects);
  },
  () => showAlert('Что-то пошло не так!')
);
