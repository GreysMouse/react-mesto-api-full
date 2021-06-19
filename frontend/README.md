This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Проект №4: __"Место"__
https://greysmouse.github.io/react-mesto-auth

## О проекте
------
Данный одностраничный сайт позволяет пользователю разместить информацию о себе и добавить карточки мест, в которых он побывал. Реализованы удобные способы изменения / добавления данной информации.

## Технологии, использованные при создании проекта
------
* Верстка сайта реализована с применением БЭМ-методологии.
* Использованы технологии Flexbox и Grid Layout для выравнивания элементов и построения сетки карточек.
* Реализована адаптивная верстка сайта под разрешения экранов от 320px до 1280px. 
* Поведение элементов сайта реализовано за счёт декларативного подхода.
* Получение и отправка данных с сервера / на сервер осуществляются через API-метод - fetch.
* Реализована валидация полей ввода форм на странице с использованием стандартного текста ошибок.

## Функционал сайта
------
* Необходима обязательная регистрация и последующая авторизация пользователя на сервере.
* Пользователь имеет возможность редактировать имя, аватар и описание рода деятельнотсти в профиле.
* Пользователь может добавлять (для чего необходимо ввести название и ссылку на изображение в модальном окне) свои карточки с изображением и удалять (при нажатии на соответствующую кнопку в виде корзины) собственную карточку.
* Пользователь может ставить отметку "Мне нравится" (лайк) на любую выбранную им карточку с изображением (для этого необходимо нажать на кнопку в виде сердечка на соответсвующей карточке).
* Нажатие на изображение карточки позволяет увидеть полноразмерное изображение этой карточки (во всплывающем модальном окне).
* Огранизовано плавное открытие и закрытие модальных окон.

-----

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.

### `npm run eject`

**Note: this is a one-way operation. Once you `eject`, you can’t go back!**

If you aren’t satisfied with the build tool and configuration choices, you can `eject` at any time. This command will remove the single build dependency from your project.

Instead, it will copy all the configuration files and the transitive dependencies (webpack, Babel, ESLint, etc) right into your project so you have full control over them. All of the commands except `eject` will still work, but they will point to the copied scripts so you can tweak them. At this point you’re on your own.

You don’t have to ever use `eject`. The curated feature set is suitable for small and middle deployments, and you shouldn’t feel obligated to use this feature. However we understand that this tool wouldn’t be useful if you couldn’t customize it when you are ready for it.

## Learn More

You can learn more in the [Create React App documentation](https://facebook.github.io/create-react-app/docs/getting-started).

To learn React, check out the [React documentation](https://reactjs.org/).

### Code Splitting

This section has moved here: [https://facebook.github.io/create-react-app/docs/code-splitting](https://facebook.github.io/create-react-app/docs/code-splitting)

### Analyzing the Bundle Size

This section has moved here: [https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size](https://facebook.github.io/create-react-app/docs/analyzing-the-bundle-size)

### Making a Progressive Web App

This section has moved here: [https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app](https://facebook.github.io/create-react-app/docs/making-a-progressive-web-app)

### Advanced Configuration

This section has moved here: [https://facebook.github.io/create-react-app/docs/advanced-configuration](https://facebook.github.io/create-react-app/docs/advanced-configuration)

### Deployment

This section has moved here: [https://facebook.github.io/create-react-app/docs/deployment](https://facebook.github.io/create-react-app/docs/deployment)

### `npm run build` fails to minify

This section has moved here: [https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify](https://facebook.github.io/create-react-app/docs/troubleshooting#npm-run-build-fails-to-minify)
