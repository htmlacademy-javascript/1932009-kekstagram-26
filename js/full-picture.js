// Отрисовка окна с полноразмерным изображением

import {isEscapeKey} from './util.js';

const imgWindow = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const buttonClose = imgWindow.querySelector('.big-picture__cancel');
const buttonLoader = imgWindow.querySelector('.comments-loader');
const commentsList = imgWindow.querySelector('.social__comments');
const commentsBlock = document.querySelector('.social__comment-count');
const commentsOnScreen = commentsBlock.querySelector('.comments-on-screen');
const MAX_LOADED_COMMENTS = 5;
let publicComments = [];
let step = 0;
let commentsAmount;


const createComments = (comments) => comments.forEach((element) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = element.avatar;
  comment.querySelector('.social__picture').alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;
  publicComments.push(comment);
});

const onLoadButtonClick = (evt) => {
  if (evt.target === buttonLoader) {
    step +=5;
    for (let i=step; i<step+5 && i<publicComments.length; i++) {
      commentsList.append(publicComments[i]);
      commentsAmount += 1;
    }
  }
  commentsOnScreen.textContent = commentsAmount;
  if (commentsList.children.length === publicComments.length) {
    buttonLoader.classList.add('hidden');
  }
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    evt.preventDefault();
    closeImgWindow();
  }
};

const openImgWindow = ({url, likes, description, comments}) => {
  imgWindow.querySelector('.big-picture__img img').src = url;
  imgWindow.querySelector('.likes-count').textContent = likes;
  imgWindow.querySelector('.comments-count').textContent = comments.length;
  imgWindow.querySelector('.social__caption').textContent = description;
  commentsBlock.classList.add('hidden');
  buttonLoader.classList.add('hidden');
  document.querySelector('body').classList.add('modal-open');
  createComments(comments);
  for (let i = step; i<MAX_LOADED_COMMENTS && i<publicComments.length; i++) {
    commentsList.append(publicComments[i]);
  }
  commentsAmount = commentsList.children.length === 5 ? 5 : comments.length;
  commentsOnScreen.textContent = commentsAmount;
  commentsBlock.classList.remove('hidden');
  if (publicComments.length > 5) {
    buttonLoader.classList.remove('hidden');
    buttonLoader.addEventListener('click', onLoadButtonClick);
  }
  imgWindow.classList.remove('hidden');
  document.addEventListener('keydown', onDocumentKeydown);
};


function closeImgWindow () {
  document.querySelector('body').classList.remove('modal-open');
  imgWindow.classList.add('hidden');
  while (commentsList.firstChild) {
    commentsList.removeChild(commentsList.firstChild);
  }
  step = 0;
  publicComments = [];
  document.removeEventListener('keydown', onDocumentKeydown);
}

buttonClose.addEventListener('click', () => {
  closeImgWindow();
});

export {openImgWindow};
