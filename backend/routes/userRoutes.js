const userRoutes = require('express').Router();
const { celebrate, Joi } = require('celebrate');
const { linkRegex } = require('../utils/constants');

const {
  getUsers, getUser, updateUser, updateUserAvatar, getUserMe,
} = require('../controllers/users');

userRoutes.get('/', getUsers);
userRoutes.get('/me', getUserMe);

userRoutes.get('/:userId', celebrate({
  params: Joi.object().keys({
    userId: Joi.string().hex().length(24).required(),
  }),
}), getUser);

userRoutes.patch('/me', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30).required(),
    about: Joi.string().min(2).max(30).required(),
  }),
}), updateUser);

userRoutes.patch('/me/avatar', celebrate({
  body: Joi.object().keys({
    avatar: Joi.string().required().pattern(linkRegex),
  }),
}), updateUserAvatar);

module.exports = userRoutes;
