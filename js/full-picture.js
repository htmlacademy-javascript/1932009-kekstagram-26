// Отрисовка окна с полноразмерным изображением

import {miniatures, similarObjects} from './miniatures.js';
import {isEscapeKey} from './util.js';

const imgWindow = document.querySelector('.big-picture');
const commentTemplate = document.querySelector('#comment').content.querySelector('.social__comment');
const buttonClose = imgWindow.querySelector('.big-picture__cancel');
const buttonLoader = imgWindow.querySelector('.comments-loader');
const commentsList = imgWindow.querySelector('.social__comments');
const commentsBlock = document.querySelector('.social__comment-count');
const commentsOnScreen = commentsBlock.querySelector('.comments-on-screen');

let publicComments = [];
let step = 0;
let commentsAmount;


const createComments = (comments) => comments.forEach((element) => {
  const comment = commentTemplate.cloneNode(true);
  comment.querySelector('.social__picture').src = element.avatar;
  comment.querySelector('.social__picture').alt = element.name;
  comment.querySelector('.social__text').textContent = element.message;
  publicComments.push(comment);
  // imgWindow.querySelector('.social__comments').append(comment);
});

const onDocumentKeydown = (evt) => {
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
    commentsBlock.classList.add('hidden');
    buttonLoader.classList.add('hidden');
    document.querySelector('body').classList.add('modal-open');
    createComments(comments);
    console.log(publicComments.length);
    for (let i = step; i<5 && i<publicComments.length; i++) {
      commentsList.append(publicComments[i]);
      console.log(i);
    }
    if (commentsList.children.length === 5) {
      commentsAmount = 5;
      commentsOnScreen.textContent = commentsAmount;
    } else {
      commentsAmount = object.comments.length;
      commentsOnScreen.textContent = commentsAmount;
    }
    commentsBlock.classList.remove('hidden');
    console.log(publicComments);
    if (publicComments.length > 5) {
      buttonLoader.classList.remove('hidden');
      buttonLoader.addEventListener('click', () => {
        console.log(publicComments);
        step +=5;
        console.log(step);
        if (publicComments.length >= step+5) {
          commentsAmount += 5;
          commentsOnScreen.textContent = commentsAmount;
        }
        for (let i=step; i<step+5 && i<publicComments.length; i++) {
          commentsList.append(publicComments[i]);
          console.log(i);
          if (commentsList.children.length === publicComments.length) {
            buttonLoader.classList.add('hidden');
          }
        }
      });
    }
    imgWindow.classList.remove('hidden');

    document.addEventListener('keydown', onDocumentKeydown);
  });
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

for (let i=0; i<miniatures.length; i++) {
  openImgWindow(miniatures[i], similarObjects[i], similarObjects[i].comments);
}

buttonClose.addEventListener('click', () => {
  closeImgWindow();
});
