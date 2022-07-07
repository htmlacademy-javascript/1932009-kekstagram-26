// Отрисовка окна с полноразмерным изображением

import {miniatures, similarObjects} from './miniatures.js';
const imgWindow = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const buttonClose = imgWindow.querySelector('.big-picture__cancel');

const getUrls = (array) => {
  const urls = [];
  for (let i=0; i<array.length; i++) {
    urls[i] = array[i].querySelector('img').src;
  }
  return urls;
};

const URLS = getUrls(miniatures);

const addComments = (object) => {
  for (let i=0; i<object.comments.length; i++){
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = object.comments[i].avatar;
    comment.querySelector('.social__picture').alt = object.comments[i].name;
    comment.querySelector('.social__text').textContent = object.comments[i].message;
    imgWindow.querySelector('.social__comments').append(comment);
  }
};

const openFullPicture = function(miniature, url, object) {
  miniature.addEventListener('click', () => {
    imgWindow.classList.remove('hidden');
    imgWindow.querySelector('.big-picture__img').querySelector('img').src = url;
    imgWindow.querySelector('.likes-count').textContent = miniature.querySelector('.picture__likes').textContent;
    imgWindow.querySelector('.comments-count').textContent = miniature.querySelector('.picture__comments').textContent;
    imgWindow.querySelector('.social__caption').textContent = object.description;
    imgWindow.querySelector('.social__comment-count').classList.add('hidden');
    imgWindow.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
    addComments(object);
  });
};

for (let i=0; i<miniatures.length; i++) {
  openFullPicture(miniatures[i], URLS[i], similarObjects[i]);
}


buttonClose.addEventListener('click', () => {
  document.querySelector('body').classList.remove('modal-open');
  imgWindow.classList.add('hidden');
  while (imgWindow.querySelector('.social__comments').firstChild) {
    imgWindow.querySelector('.social__comments')
      .removeChild(imgWindow.querySelector('.social__comments').firstChild);
  }
});

document.addEventListener('keydown', (evt) => {
  if (evt.key === 'Escape') {
    document.querySelector('body').classList.remove('modal-open');
    imgWindow.classList.add('hidden');
    while (imgWindow.querySelector('.social__comments').firstChild) {
      imgWindow.querySelector('.social__comments')
        .removeChild(imgWindow.querySelector('.social__comments').firstChild);
    }
  }
});
