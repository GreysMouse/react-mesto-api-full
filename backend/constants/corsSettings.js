const CORS_ALLOWED_URLS = [
  'https://mesto.project.greysmouse.nomoredomains.club',
  'http://mesto.project.greysmouse.nomoredomains.club'
];

const CORS_ALLOWED_METHODS = 'OPTIONS, GET, POST, PUT, DELETE, PATCH';
const CORS_ALLOWED_HEADERS = 'Origin, Content-Type';

module.exports = { CORS_ALLOWED_URLS, CORS_ALLOWED_METHODS, CORS_ALLOWED_HEADERS };
