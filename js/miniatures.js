// Отображение фотографий других пользователей.

import {createObjects} from './data.js';
import {createMiniatures} from './util.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesSection = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

const similarObjects = createObjects(25);
createMiniatures(similarObjects, pictureTemplate, picturesFragment);

picturesSection.appendChild(picturesFragment);

const miniatures = picturesSection.querySelectorAll('.picture')
export {miniatures, similarObjects}


/*
similarObjects.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  picturesFragment.appendChild(pictureElement);
}); */



