const cardRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('../utils/constants');

const {
  createCard, getCards, deleteCard, addLike, deleteLike,
} = require('../controllers/cards');

cardRoutes.post('/', celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30),
    link: Joi.string().required().pattern(linkRegex),
  }),
}), createCard);
cardRoutes.get('/', getCards);
cardRoutes.delete('/:cardId', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteCard);

cardRoutes.put('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), addLike);

cardRoutes.delete('/:cardId/likes', celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().hex().length(24).required(),
  }),
}), deleteLike);

module.exports = cardRoutes;
