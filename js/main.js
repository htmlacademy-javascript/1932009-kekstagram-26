/*  main.js - точка входа. задача - подключает и настраивает скрипты на странице.
    Импорты других модулей
    Вызовы общих функций
    Настройка скриптов
    ...
*/
import {showAlert} from './util.js';
import {createMiniatures} from './miniatures.js';
import {getData} from './api.js';
import './upload-form.js';

getData(
  createMiniatures,
  () => showAlert('Что-то пошло не так!')
);

