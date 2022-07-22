import {showAlert, debounce} from './util.js';
import {createMiniatures, setFilterClick, filtersBlock} from './miniatures.js';
import {getData} from './api.js';
import './upload-form.js';

const RERENDER_DELAY = 500;

let objects;

getData(
  (similarObjects) => {
    filtersBlock.classList.remove('img-filters--inactive');
    createMiniatures(similarObjects);
    objects = similarObjects;
    setFilterClick(debounce(createMiniatures, RERENDER_DELAY), objects);
  },
  () => showAlert('Что-то пошло не так!')
);
