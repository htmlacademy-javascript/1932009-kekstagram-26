// Работа формы загрузки фото
import {isEscapeKey, checkStrokeLength} from './util.js';
import {setDefaultEffects} from './add-effects.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadWindow = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('#upload-file');
const closeButton = uploadWindow.querySelector('#upload-cancel');
const uploadImg = uploadWindow.querySelector('.img-upload__preview').querySelector('img');
const HASHTAGS_AMOUNT = 5;

// Открытие и закрытие формы
const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && typeof evt.target.value !== 'string') {
    closeUploadWindow();
  }
};

const openUploadWindow = () => {
  uploadInput.addEventListener('change', (evt) => {
    setDefaultEffects();
    const file = evt.target.files[0];
    const reader = new FileReader();
    reader.readAsDataURL(file);
    reader.onloadend = () => {
      uploadImg.src = reader.result;
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
  setDefaultEffects();
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeUploadWindow();
});

// Валидация формы
const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field--invalid',
  successClass: 'field--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'field__error'
});

const commentsField = uploadForm.querySelector('#description');
const validateComments = (value) => checkStrokeLength(value, 140);
pristine.addValidator(commentsField, validateComments, 'Вы ввели более 140 символов!');

const hashtagsField = uploadForm.querySelector('#hashtags');
const validateHashtags = (value) => {
  const strings = value.split(' ');
  const re = /^#[A-Za-zА-Яа-яЕё0-9]{1,19}$/;
  const findDublicate = (array) => array.some((item) => array.indexOf(item) !== array.lastIndexOf(item));
  if (strings.every((string) => string === '')) {
    return true;   //если поле пустое - ОК
  }
  for (let i=0; i<strings.length; i++) {
    if (re.test(strings[i]) && strings.length <= HASHTAGS_AMOUNT) {
      const lowStrings = strings.map((string) => string.toLowerCase());
      if(findDublicate(lowStrings) === true) {
        return false;      // хэштэги не должны повторяться
      }
      else {
        continue;    // один тег проверен
      }
    } else {
      return false;     // введены некорректные данные/хэштегов более пяти
    }
  }
  return true;      // ОК - все теги проверены
};
pristine.addValidator(hashtagsField, validateHashtags, 'Введенные данные неверные!');

uploadForm.addEventListener('submit', (evt) => {
  evt.preventDefault();
  pristine.validate();
});
