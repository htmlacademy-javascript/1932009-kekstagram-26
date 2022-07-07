// Отображение фотографий других пользователей.

import {createObjects} from './data.js';
const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesSection = document.querySelector('.pictures');
const similarObjects = createObjects(25);
const picturesFragment = document.createDocumentFragment();

similarObjects.forEach(({url, likes, comments}) => {
  const pictureElement = pictureTemplate.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  picturesFragment.appendChild(pictureElement);
});

picturesSection.appendChild(picturesFragment);




