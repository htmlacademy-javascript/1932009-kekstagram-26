import {isEscapeKey, checkStrokeLength} from './util.js';
import {setDefaultEffects, sliderBlock} from './add-effects.js';
import {sendData} from './api.js';

const uploadForm = document.querySelector('.img-upload__form');
const uploadWindow = uploadForm.querySelector('.img-upload__overlay');
const uploadInput = document.querySelector('#upload-file');
const closeButton = uploadWindow.querySelector('#upload-cancel');
const uploadImg = uploadWindow.querySelector('.img-upload__preview img');
const submitButton = document.querySelector('#upload-submit');
const HASHTAGS_AMOUNT = 5;

const completeMessage = document.querySelector('#success').content.querySelector('.success');
const errorMessage = document.querySelector('#error').content.querySelector('.error');
const buttonCloseCompleteMessage = completeMessage.querySelector('.success__button');
const buttonCloseErrorMessege = errorMessage.querySelector('.error__button');
const hashtagsField = uploadForm.querySelector('#hashtags');
const commentsField = uploadForm.querySelector('#description');
const body = document.body;

const clearTextInputs = () => {
  hashtagsField.value = '';
  commentsField.value = '';
};

const onDocumentKeydown = (evt) => {
  if (isEscapeKey(evt) && typeof evt.target.value !== 'string' && !body.querySelector('.error') && !body.querySelector('.success')) {
    closeForm();
  }
  if (isEscapeKey(evt) && (body.querySelector('.success') || body.querySelector('.error'))) {
    closeMessage();
  }
};

const onDocumentClick = (evt) => {
  if (evt.target.matches('.success') || evt.target.matches('.error')) {
    closeMessage();
  }
};

const showMessage = (message) => {
  body.append(message);
  document.addEventListener('keydown', onDocumentKeydown);
  document.addEventListener('click', onDocumentClick);
};

function closeMessage() {
  body.removeChild(body.lastChild);
  document.removeEventListener('click', onDocumentClick);
}

buttonCloseCompleteMessage.addEventListener('click', () => {
  closeMessage();
});

buttonCloseErrorMessege.addEventListener('click', () => {
  closeMessage();
});

const blockSubmitbutton = () => {
  submitButton.disabled = true;
  submitButton.textContent = 'Загрузка...';
};

const unblockSubmitButton = () => {
  submitButton.disabled = false;
  submitButton.textContent = 'Опубликовать';
};

function closeForm() {
  clearTextInputs();
  setDefaultEffects();
  uploadInput.value = '';
  uploadWindow.classList.add('hidden');
  document.querySelector('body').classList.remove('modal-open');
  document.removeEventListener('keydown', onDocumentKeydown);
}

closeButton.addEventListener('click', (evt) => {
  evt.preventDefault();
  closeForm();
});

const pristine = new Pristine(uploadForm, {
  classTo: 'img-upload__field-wrapper',
  errorClass: 'field--invalid',
  successClass: 'field--valid',
  errorTextParent: 'img-upload__field-wrapper',
  errorTextTag: 'span',
  errorTextClass: 'field__error'
}, true);

const validateComments = (value) => checkStrokeLength(value, 140);
pristine.addValidator(commentsField, validateComments, 'Вы ввели более 140 символов!');

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

const setUserPictureSubmit = (onSuccess) => {
  uploadForm.addEventListener('submit', (evt) => {
    evt.preventDefault();

    const isValid = pristine.validate();
    if (isValid) {
      blockSubmitbutton();
      sendData(
        () => {
          onSuccess();
          showMessage(completeMessage);
          unblockSubmitButton();
        },
        () => {
          showMessage(errorMessage);
          unblockSubmitButton();
        },
        new FormData(evt.target),
      );
    }
  });
};

const openForm = (evt) => {
  const fileImg = evt.target.files[0];
  const reader = new FileReader();
  reader.readAsDataURL(fileImg);
  reader.onloadend = () => {
    uploadImg.src = reader.result;
  };
  sliderBlock.classList.add('hidden');
  uploadWindow.classList.remove('hidden');
  document.querySelector('body').classList.add('modal-open');
  pristine.validate();

  document.addEventListener('keydown', onDocumentKeydown);
};

uploadInput.addEventListener('change', (evt) => {
  if (uploadInput.value !== '') {
    setDefaultEffects();
    openForm(evt);
  }
});

setUserPictureSubmit(closeForm);
