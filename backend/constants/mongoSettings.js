const MONGO_URL = 'mongodb://localhost:27017/mestodb';

const MONGO_OPTIONS = {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
};

module.exports = { MONGO_URL, MONGO_OPTIONS };
