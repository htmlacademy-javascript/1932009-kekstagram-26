// Работа формы загрузки фото
import {isEscapeKey} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadWindow = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('#upload-file');
const closeButton = uploadWindow.querySelector('#upload-cancel');

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt)) {
    closeUploadWindow();
  }
};

const openUploadWindow = () => {
  uploadInput.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = function () {
      uploadWindow.querySelector('.img-upload__preview').querySelector('img').src = reader.result;
    };
    uploadWindow.classList.remove('hidden');
    document.querySelector('body').classList.add('modal-open');

    document.addEventListener('keydown', onDocumentKeydown);
  });
};
openUploadWindow();

function closeUploadWindow() {
  uploadWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  uploadInput.value = '';
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadWindow();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field--invalid',
  successClass: 'field--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'field__error'
});

const commentsField = uploadForm.querySelector('#description');
const validateComments = (value) => value.length < 140;
pristine.addValidator(commentsField, validateComments, 'Вы ввели больше 140 символов!');

const hashtagsField = uploadForm.querySelector('#hashtags');
const validateHashtags = (value) => value.length > 0;
pristine.addValidator(hashtagsField, validateHashtags, 'Поле пустое!');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
