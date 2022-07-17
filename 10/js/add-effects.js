// Добавление превью изображения эффектов

// блок изменения масштаба, инпут значения масштаба, чекбокс без эффектов, изображение
const scaleBlock = document.querySelector('.scale');
const scaleInput = document.querySelector('.scale__control--value');
const checkboxOriginal = document.querySelector('#effect-none');
const img = document.querySelector('.img-upload__preview img');

// блок со слайдером, div для отрисовки noUiSlider, скрытый input, список с чекбоксов
const sliderBlock = document.querySelector('.effect-level');
const slider = sliderBlock.querySelector('.effect-level__slider');
const slidertInput = sliderBlock.querySelector('.effect-level__value');
const EffectsList = document.querySelector('.effects__list');

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
    to: (value) => {
      if (Number.isInteger(value)) {
        return value.toFixed(0);
      }
      return value.toFixed(1);
    },
    from: (value) => parseFloat(value),
  },
});

// обработчик выбора эффектов
const onEffectsListClick = (evt) => {
  if (evt.target.id === 'effect-sepia') {
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
  }
  if (evt.target.id === 'effect-chrome') {
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
  }
  if (evt.target.id === 'effect-marvin') {
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
  }
  if (evt.target.id === 'effect-phobos') {
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
  }
  if (evt.target.id === 'effect-heat') {
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
  }
  if (evt.target.id === 'effect-none') {
    slidertInput.value = '';
    img.className = '';
    img.style.filter = '';
    sliderBlock.classList.add('hidden');
  }
};
EffectsList.addEventListener('click', onEffectsListClick);

// обработчик изменения масштаба
const onscaleBlockClick = (evt) => {
  if (evt.target.classList.value.includes('scale__control--smaller') && scaleInput.value !== MIN_SCALE) {
    const changedValue = parseInt(scaleInput.value, 10) - SCALE_STEP;
    scaleInput.value = `${changedValue}%`;
    img.style.transform = `scale(${changedValue/100})`;
  }
  if (evt.target.classList.value.includes('scale__control--bigger') && scaleInput.value !== MAX_SCALE) {
    const changedValue = parseInt(scaleInput.value, 10) + SCALE_STEP;
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

export {setDefaultEffects};
