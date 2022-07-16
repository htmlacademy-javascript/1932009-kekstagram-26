// кнопки изменения масштаба, инпут значения масштаба
const buttonScaleMin = document.querySelector('.scale__control--smaller');
const buttonScaleMax = document.querySelector('.scale__control--bigger');
const scaleInput = document.querySelector('.scale__control--value');

// блок со слайдером, скрытый input, div для отрисовки noUiSlider
const sliderBlock = document.querySelector('.effect-level');
const slider = sliderBlock.querySelector('.effect-level__slider');
const slidertInput = sliderBlock.querySelector('.effect-level__value');

// константы
const DEFAULT_SCALE = 1;
const SCALE_STEP = 25;

// изображение
const img = document.querySelector('.img-upload__preview').querySelector('img');

// чекбоксы
const checkboxOriginal = document.querySelector('#effect-none');
const checkboxChrome = document.querySelector('#effect-chrome');
const checkboxSepia = document.querySelector('#effect-sepia');
const checkboxMarvin = document.querySelector('#effect-marvin');
const checkboxPhobos = document.querySelector('#effect-phobos');
const checkboxHeat = document.querySelector('#effect-heat');

// создание слайдера
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: function (value) {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: function (value) {
      return parseFloat(value);
    },
  },
});

// Применение фильтров
// черно-белое
const addChromeEffect = () => {
  img.className = 'effects__preview--chrome';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    start: 1,
  });
  slidertInput.value = 1;
  slider.noUiSlider.on('update', () => {
    slidertInput.value = slider.noUiSlider.get();
    img.style.filter = `grayscale(${slidertInput.value})`;
  });
  sliderBlock.classList.remove('hidden');
};

// сепия
const addSepiaEffect = () => {
  img.className = 'effects__preview--sepia';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 1
    },
    step: 0.1,
    start: 1,
  });
  slidertInput.value = 1;
  slider.noUiSlider.on('update', () => {
    slidertInput.value = slider.noUiSlider.get();
    img.style.filter = `sepia(${slidertInput.value})`;
  });
  sliderBlock.classList.remove('hidden');
};

// обратные цвета
const addMarvinEffect = () => {
  img.className = 'effects__preview--marvin';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 100
    },
    step: 1,
  });
  slider.noUiSlider.set(100);
  slidertInput.value = '100%';
  slider.noUiSlider.on('update', () => {
    slidertInput.value = slider.noUiSlider.get();
    img.style.filter = `invert(${slidertInput.value}%)`;
  });
  sliderBlock.classList.remove('hidden');
};

// блюр
const addBlurEffect = () => {
  img.className = 'effects__preview--blur';
  slider.noUiSlider.updateOptions({
    range: {
      min: 0,
      max: 3
    },
    step: 0.1,
    start: 3,
  });
  slidertInput.value = '3px';
  slider.noUiSlider.on('update', () => {
    slidertInput.value = slider.noUiSlider.get();
    img.style.filter = `blur(${slidertInput.value}px)`;
  });
  sliderBlock.classList.remove('hidden');
};

// зной
const addBrightnessEffect = () => {
  img.className = 'effects__preview--heat';
  slider.noUiSlider.updateOptions({
    range: {
      min: 1,
      max: 3
    },
    step: 0.1,
    start: 3,
  });
  slidertInput.value = 3;
  slider.noUiSlider.on('update', () => {
    slidertInput.value = slider.noUiSlider.get();
    img.style.filter = `brightness(${slidertInput.value})`;
  });
  sliderBlock.classList.remove('hidden');
};

// без фильтров
const addNoEffect = () => {
  slidertInput.value = '';
  img.className = '';
  img.style.filter = '';
  sliderBlock.classList.add('hidden');
};
checkboxChrome.addEventListener('change', addChromeEffect);
checkboxMarvin.addEventListener('change', addMarvinEffect);
checkboxPhobos.addEventListener('change', addBlurEffect);
checkboxSepia.addEventListener('change', addSepiaEffect);
checkboxHeat.addEventListener('change', addBrightnessEffect);
checkboxOriginal.addEventListener('change', addNoEffect);

// Изменение масштаба
const decreaseScale = () => {
  if (scaleInput.value !== '25%') {
    const cuttenValue = scaleInput.value.slice(0, -1);
    scaleInput.value = `${cuttenValue - SCALE_STEP}%`;
    img.style.transform = `scale(${(cuttenValue - SCALE_STEP)/100})`;
  }
};

const increaseScale = () => {
  if (scaleInput.value !== '100%') {
    const cuttenValue = scaleInput.value.slice(0, -1);
    scaleInput.value = `${Number(cuttenValue) + SCALE_STEP}%`;
    img.style.transform = `scale(${(Number(cuttenValue) + SCALE_STEP)/100})`;
  }
};

buttonScaleMin.addEventListener('click', decreaseScale);
buttonScaleMax.addEventListener('click', increaseScale);

// значение эффектов по умолчанию
const setDefaultEffects = () => {
  scaleInput.value = '100%';
  img.style.transform = `scale(${DEFAULT_SCALE})`;
  img.style.filter = '';
  img.className = '';
  slidertInput.value = '';
  sliderBlock.classList.add('hidden');
  checkboxOriginal.checked = true;
};

export {setDefaultEffects};
