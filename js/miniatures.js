// Отображение фотографий других пользователей.

import {createObjects} from './data.js';

const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
const picturesSection = document.querySelector('.pictures');
const picturesFragment = document.createDocumentFragment();

// Создание миниатюр из генерируемых данных и добавление их в фрагмент
const createMiniatures = (objectsArray, template, fragment) => objectsArray.forEach(({url, likes, comments}) => {
  const pictureElement = template.cloneNode(true);
  pictureElement.querySelector('.picture__img').src = url;
  pictureElement.querySelector('.picture__comments').textContent = comments.length;
  pictureElement.querySelector('.picture__likes').textContent = likes;

  fragment.appendChild(pictureElement);
});

const similarObjects = createObjects(25);
createMiniatures(similarObjects, pictureTemplate, picturesFragment);

picturesSection.appendChild(picturesFragment);

const miniatures = picturesSection.querySelectorAll('.picture');
export {miniatures, similarObjects};

