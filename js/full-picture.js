// Отрисовка окна с полноразмерным изображением

import {miniatures, similarObjects} from './miniatures.js';
import {isEscapeKey} from './util.js';

const imgWindow = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const buttonClose = imgWindow.querySelector('.big-picture__cancel');

const addComments = (comments) => comments.forEach((element) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = element.avatar;
  comment.querySelector('.social__picture').alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;
  imgWindow.querySelector('.social__comments').append(comment);
});

const onImgWindowEscKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgWindow();
  }
};

const openImgWindow = (miniature, object, comments) => {
  miniature.addEventListener('click', () => {
    imgWindow.querySelector('.big-picture__img').querySelector('img').src = object.url;
    imgWindow.querySelector('.likes-count').textContent = object.likes;
    imgWindow.querySelector('.comments-count').textContent = object.comments.length;
    imgWindow.querySelector('.social__caption').textContent = object.description;
    imgWindow.querySelector('.social__comment-count').classList.add('hidden');
    imgWindow.querySelector('.comments-loader').classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
    addComments(comments);
    imgWindow.classList.remove('hidden');

    document.addEventListener('keydown', onImgWindowEscKeydown);
  });
};

function closeImgWindow () {
  const commentsList = imgWindow.querySelector('.social__comments');
  document.querySelector('body').classList.remove('modal-open');
  imgWindow.classList.add('hidden');
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
  document.removeEventListener('keydown', onImgWindowEscKeydown);
}

for (let i=0; i<miniatures.length; i++) {
  openImgWindow(miniatures[i], similarObjects[i], similarObjects[i].comments);
}

buttonClose.addEventListener('click', () => {
  closeImgWindow();
});
