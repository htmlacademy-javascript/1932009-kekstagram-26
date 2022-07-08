// Отрисовка окна с полноразмерным изображением

import {miniatures, similarObjects} from './miniatures.js';

const imgWindow = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const buttonClose = imgWindow.querySelector('.big-picture__cancel');

const addComments = (object) => {
  for (let i=0; i<object.comments.length; i++){
    const comment = commentTemplate.cloneNode(true);
    comment.querySelector('.social__picture').src = object.comments[i].avatar;
    comment.querySelector('.social__picture').alt = object.comments[i].name;
    comment.querySelector('.social__text').textContent = object.comments[i].message;
    imgWindow.querySelector('.social__comments').append(comment);
  }
};

const openFullPicture = function(miniature, object) {
  miniature.addEventListener('click', () => {
    imgWindow.classList.remove('hidden');
    imgWindow.querySelector('.big-picture__img').querySelector('img').src = object.url;
    imgWindow.querySelector('.likes-count').textContent = object.likes;
    imgWindow.querySelector('.comments-count').textContent = object.comments.length;
    imgWindow.querySelector('.social__caption').textContent = object.description;
    imgWindow.querySelector('.social__comment-count').classList.add('hidden');
    imgWindow.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
    addComments(object);
  });
};

for (let i=0; i<miniatures.length; i++) {
  openFullPicture(miniatures[i], similarObjects[i]);
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
