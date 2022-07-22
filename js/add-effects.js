// блок изменения масштаба, инпут значения масштаба, чекбокс без эффектов, изображение
const scaleBlock = document.querySelector('.scale');
const scaleInput = document.querySelector('.scale__control--value');
const checkboxOriginal = document.querySelector('#effect-none');
const img = document.querySelector('.img-upload__preview img');

// блок со слайдером, div для отрисовки noUiSlider, скрытый input, список чекбоксов
const sliderBlock = document.querySelector('.effect-level');
const slider = sliderBlock.querySelector('.effect-level__slider');
const slidertInput = sliderBlock.querySelector('.effect-level__value');
const effectsList = document.querySelector('.effects__list');

// константы
const DEFAULT_SCALE = 1;
const MIN_SCALE = '25%';
const MAX_SCALE = '100%';
const SCALE_STEP = 25;


// слайдер
noUiSlider.create(slider, {
  range: {
    min: 0,
    max: 1
  },
  start: 1,
  step: 0.1,
  connect: 'lower',
  format: {
    to: (value) => Number.isInteger(value) ?  value.toFixed(0) :  value.toFixed(1),
    from: (value) => parseFloat(value),
  },
});

// обработчик выбора эффектов
const onEffectsListClick = (evt) => {
  sliderBlock.classList.remove('hidden');
  switch(evt.target.id) {
    case 'effect-sepia':
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
      break;

    case 'effect-chrome':
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
      break;

    case 'effect-marvin':
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
      break;

    case 'effect-phobos':
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
      break;

    case 'effect-heat':
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
      break;

    case 'effect-none':
      slidertInput.value = '';
      img.className = '';
      img.style.filter = '';
      sliderBlock.classList.add('hidden');
      break;
  }
};
effectsList.addEventListener('click', onEffectsListClick);

// обработчик изменения масштаба
const onscaleBlockClick = (evt) => {
  const scaleInputValue = parseInt(scaleInput.value, 10);
  let changedValue;
  if (evt.target.classList.contains('scale__control--smaller') && scaleInput.value !== MIN_SCALE) {
    changedValue = scaleInputValue - SCALE_STEP;
  }
  if (evt.target.classList.contains('scale__control--bigger') && scaleInput.value !== MAX_SCALE) {
    changedValue = scaleInputValue + SCALE_STEP;
  }
  if (changedValue) {
    scaleInput.value = `${changedValue}%`;
    img.style.transform = `scale(${changedValue/100})`;
  }
};
scaleBlock.addEventListener('click', onscaleBlockClick);

// значение эффектов по умолчанию
const setDefaultEffects = () => {
  scaleInput.value = MAX_SCALE;
  img.style.transform = `scale(${DEFAULT_SCALE})`;
  img.style.filter = '';
  img.className = '';
  slidertInput.value = '';
  sliderBlock.classList.add('hidden');
  checkboxOriginal.checked = true;
};

export {setDefaultEffects, sliderBlock};
