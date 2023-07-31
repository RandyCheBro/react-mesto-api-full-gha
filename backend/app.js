require('dotenv').config();
const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { celebrate, Joi, errors } = require('celebrate');
/* const cors = require('cors'); */

const app = express();

const userRoutes = require('./routes/userRoutes');
const cardRoutes = require('./routes/cardRoutes');
const NotFound = require('./errors/NotFound');
const auth = require('./middlewares/auth');
const { createUser, login } = require('./controllers/users');
const { linkRegex } = require('./utils/constants');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { PORT = 3000, MONGOOSE_CONNECT = 'mongodb://127.0.0.1:27017/mestodb' } = process.env;
/* app.use(cors()); */
mongoose.connect(MONGOOSE_CONNECT);

app.use(bodyParser.json());

/* app.use(requestLogger); */

app.post('/signin', celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), login);

app.post('/signup', celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    avatar: Joi.string().pattern(linkRegex),
    about: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
}), createUser);

app.use(auth);
app.use('/users', userRoutes);
app.use('/cards', cardRoutes);

app.use('*', () => {
  throw new NotFound('Некорректный маршрут');
});

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;
  res.status(statusCode).send({
    message: statusCode === 500 ? 'На сервере произошла ошибка' : message,
  });
  console.log(`${err.statusCode} ${err.name}`);
  next();
});

app.listen(PORT, () => {
  console.log('Сервер запущен');
});
