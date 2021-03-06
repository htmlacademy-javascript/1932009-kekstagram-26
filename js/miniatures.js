// Отрисовка миниатюр
import {openImgWindow} from './full-picture.js';
import {shuffleArray} from './util.js';

const filtersBlock = document.querySelector('.img-filters');
const defaultFilterButton = filtersBlock.querySelector('#filter-default');
const randomFilterButton = filtersBlock.querySelector('#filter-random');
const discussedFilterButton = filtersBlock.querySelector('#filter-discussed');

const compareMiniatures = (miniatureA, miniatureB) => {
  const commentsA = miniatureA.comments.length;
  const commentsB = miniatureB.comments.length;

  return commentsB - commentsA;
};

const setFilterClick = (cb, objects) => {
  filtersBlock.addEventListener('click', (evt) => {
    let sortedObjects = objects.slice();
    if (evt.target.matches('#filter-discussed')) {
      sortedObjects = objects.slice().sort(compareMiniatures);
      defaultFilterButton.classList.remove('img-filters__button--active');
      randomFilterButton.classList.remove('img-filters__button--active');
      discussedFilterButton.classList.add('img-filters__button--active');
    }
    if (evt.target.matches('#filter-default')) {
      defaultFilterButton.classList.add('img-filters__button--active');
      randomFilterButton.classList.remove('img-filters__button--active');
      discussedFilterButton.classList.remove('img-filters__button--active');
    }
    if (evt.target.matches('#filter-random')) {
      shuffleArray(sortedObjects);
      defaultFilterButton.classList.remove('img-filters__button--active');
      randomFilterButton.classList.add('img-filters__button--active');
      discussedFilterButton.classList.remove('img-filters__button--active');
    }
    cb(sortedObjects);
  });
};

const createMiniatures = (objects) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();
  const picturesSection = document.querySelector('.pictures');
  const pictures = picturesSection.querySelectorAll('.picture');
  pictures.forEach((picture) => {
    picture.remove();
  });
  objects
    .forEach((object) => {
      const {url, likes, comments} = object;
      const pictureElement = pictureTemplate.cloneNode(true);
      pictureElement.querySelector('.picture__img').src = url;
      pictureElement.querySelector('.picture__comments').textContent = comments.length;
      pictureElement.querySelector('.picture__likes').textContent = likes;

      pictureElement.addEventListener('click', () => {
        openImgWindow(object);
      });

      picturesFragment.appendChild(pictureElement);
    });

  picturesSection.appendChild(picturesFragment);
};

export {createMiniatures, setFilterClick, filtersBlock};

