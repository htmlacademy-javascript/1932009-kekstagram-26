// Работа формы загрузки фото
import {isEscapeKey, checkStrokeLength} from './util.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadWindow = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('#upload-file');
const closeButton = uploadWindow.querySelector('#upload-cancel');
const COMMENTS_AMOUNT = 5;

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && typeof evt.target.value !== 'string') {
    closeUploadWindow();
  }
};

const openUploadWindow = () => {
  uploadInput.addEventListener('change', (evt) => {
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
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
// const validateComments = (value) => value.length < 140;
const validateComments = (value) => checkStrokeLength(value, 140);
pristine.addValidator(commentsField, validateComments, 'Вы ввели более 140 символов!');

const hashtagsField = uploadForm.querySelector('#hashtags');
const validateHashtags = (value) => {
  const strings = value.split(' ');
  const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}/;

  const findDublicate = (array) => array.some((item) => array.indexOf(item) !== array.lastIndexOf(item));

  for (let i=0; i<strings.length; i++) {
    if (strings[i] === '') {
      return true;
    }
    if (re.test(strings[i]) && strings.length <= COMMENTS_AMOUNT && !strings.some((string) => string === '')) {
      const lowStrings = strings.map((string) => string.toLowerCase());
      if(findDublicate(lowStrings) === true) {
        return false;      // хэштэги не должны повторяться!
      }
      else {
        return true;    // ОК
      }
    } else {
      return false;     // введены некорректные данные/хэштегов более пяти
    }
  }
  return true;      // ОК
};
pristine.addValidator(hashtagsField, validateHashtags, 'Введенные данные неверные!');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
