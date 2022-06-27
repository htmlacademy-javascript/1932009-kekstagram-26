//источник: https://developer.mozilla.org/ru/docs/Web/JavaScript/Reference/Global_Objects/Math/random

const getRandomNumber = (min, max) => {
  if (Number.isFinite(min) && Number.isFinite(max) && (max > min) && (Math.sign(min) >= 0) && (Math.sign(max) >= 0)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (max - min + 1)) + min;
  }
  if (Number.isFinite(min) && Number.isFinite(max) && (max < min) && (Math.sign(min) >= 0) && (Math.sign(max) >= 0)) {
    min = Math.ceil(min);
    max = Math.floor(max);
    return Math.floor(Math.random() * (min - max + 1)) + max;
  }
  if (Number.isFinite(min) && Number.isFinite(max) && (max === min) && (Math.sign(min) >= 0) && (Math.sign(max) >= 0)) {
    max = Math.floor(max);
    return max;
  }
  return 'В переданном диапазоне нет ни одного подходящего числа!';
};
getRandomNumber(1,3);

const checkStrokeLength = (stroke, maxLength) => (stroke.length <= maxLength);
checkStrokeLength('test', 4);

// Пример объекта
// object = {id: 12, url: 'photos/12.jpg', description: 'описание', likes: 16,
//   comments: [{id: 4, avatar: 'img/avatar-6.svg' , message: 'сообщение' , name: 'Артем'},
//     {id: 5, avatar: 'img/avatar-7.svg', message: 'сообщение', name: 'Ирина'} ] };

//Описания для фото, комментарии, имена авторов комментариев

const descriptions = ['горы', 'лес', 'море', 'деревня', 'луг', 'пляж', 'пасмурный день',
  'горы2', 'лес2', 'море2', 'деревня2', 'луг2', 'пляж2', 'пасмурный день2', 'горы3', 'лес3', 'море3',
  'деревня3', 'луг3', 'пляж3', 'пасмурный день3', 'кустарники', 'березки', 'детская площадка', 'центральный парк'];

const messages = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const names = ['Ваня', 'Петр', 'Сергей', 'Анжела', 'Ольга', 'Кристина'];

const createComment = (value, index) => ({
  id: getRandomNumber((index+1)*11, (index+1)*11 + 10),
  avatar: `img/avatar-${  getRandomNumber(1, 6)}`,
  message: messages[getRandomNumber(0, messages.length - 1)],
  name: names[getRandomNumber(0, names.length - 1)],
});

const createObject = (value, index) => ({
  id: index + 1,
  url: `photos/${ index }.jpg`,
  description: descriptions[index],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 2)}, createComment),
});

const objectsArray = Array.from({length: 25}, createObject);
// eslint-disable-next-line no-console
console.log(objectsArray);
