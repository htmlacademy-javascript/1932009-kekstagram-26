// Создание и отрисовка миниатюр
import {openImgWindow} from './full-picture.js';

const createMiniatures = (objectsArray) => {
  const pictureTemplate = document.querySelector('#picture').content.querySelector('.picture');
  const picturesFragment = document.createDocumentFragment();
  const picturesSection = document.querySelector('.pictures');
  objectsArray.forEach((object) => {
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

export {createMiniatures};

