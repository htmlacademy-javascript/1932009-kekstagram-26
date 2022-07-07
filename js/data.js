// Генерация временных данных для разработки.

import {getRandomNumber, getRandomElement} from './util.js';

// Пример объекта
// object = {id: 12, url: 'photos/12.jpg', description: 'описание', likes: 16,
//           comments: [{id: 4, avatar: 'img/avatar-6.svg' , message: 'сообщение' , name: 'Артем'},
//                      {id: 5, avatar: 'img/avatar-7.svg', message: 'сообщение', name: 'Ирина'}] };

// Исходные данные для генерации объекта - описания для фото, комментарии, имена авторов комментариев, кол-во объектов.

const DESCRIPTIONS = ['пляж', 'тропа к пляжу', 'море', 'девушка с камерой', 'забавный обед', 'крутая тачка', 'ягодка',
  'морсик', 'самолет пролетел', 'обувное местечко', 'на берегу', 'ауди', 'салатик', 'которолл', 'когда сильно мерзнешь', 'летящий в синеве', 'любимый хор',
  'ретро кар', 'элегантное решение когда темно и страшно', 'площадь где я не был', 'салат с лаймом', 'море и закат', 'краб', 'концерт', 'сафари путешествие'];

const MESSAGES = ['Всё отлично!', 'В целом всё неплохо. Но не всё.', 'Когда вы делаете фотографию, хорошо бы убирать палец из кадра. В конце концов это просто непрофессионально.',
  'Моя бабушка случайно чихнула с фотоаппаратом в руках и у неё получилась фотография лучше.', 'Я поскользнулся на банановой кожуре и уронил фотоаппарат на кота и у меня получилась фотография лучше.',
  'Лица у людей на фотке перекошены, как будто их избивают. Как можно было поймать такой неудачный момент?!'];

const NAMES = ['Ваня', 'Петр', 'Сергей', 'Анжела', 'Ольга', 'Кристина'];

// Создание комментария

const createComment = (value, index) => ({
  id: getRandomNumber((index+1)*11, (index+1)*11 + 10),
  avatar: `img/avatar-${  getRandomNumber(1, 6)}.svg`,
  message: getRandomElement(MESSAGES),
  name: getRandomElement(NAMES),
});

// Создание объекта

const createObject = (value, index) => ({
  id: index + 1,
  url: `photos/${ index+1 }.jpg`,
  description: DESCRIPTIONS[index],
  likes: getRandomNumber(15, 200),
  comments: Array.from({length: getRandomNumber(1, 5)}, createComment),
});

// Создание массива сгенерированных объектов

const createObjects = (count) => Array.from({length: count}, createObject);

export {createObjects};
