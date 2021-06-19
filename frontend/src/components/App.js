import React from 'react';
import { Route, Switch, useHistory } from 'react-router-dom';

import ProtectedRoute from './ProtectedRoute';

import Register from './Register';
import Login from './Login';
import Header from './Header';
import Main from './Main';
import Footer from './Footer';

import ImagePopup from './ImagePopup';
import EditProfilePopup from './EditProfilePopup';
import EditAvatarPopup from './EditAvatarPopup';
import AddPlacePopup from './AddPlacePopup';
import InfoToolTipPopup from './InfoToolTipPopup';

import api from '../utils/api';
import authApi from '../utils/authApi';
import CurrentUserContext from '../contexts/CurrentUserContext';
import IsLoggedInContext from '../contexts/IsLoggedInContext';

function App() {
  const [isRegistered, setIsRegistered] = React.useState(false);
  const [isLoggedIn, setIsLoggedIn] = React.useState(false);
  const [userInfo, setUserInfo] = React.useState({});

  const [isMenuOpen, setIsMenuOpen] = React.useState(false);

  const [isEditAvatarPopupOpen, setIsEditAvatarPopupOpen] = React.useState(false);
  const [isEditProfilePopupOpen, setIsEditProfilePopupOpen] = React.useState(false);
  const [isAddPlacePopupOpen, setIsAddPlacePopupOpen] = React.useState(false);
  const [isInfoToolTipPopupOpen, setIsInfoToolTipPopupOpen] = React.useState(false);

  const [currentUser, setCurrentUser] = React.useState({}); 

  const [cards, setCards] = React.useState([]);
  const [isCardSelected, setIsCardSelected] = React.useState(false);
  const [selectedCard, setSelectedCard] = React.useState({});

  const [isLoading, setIsLoading] = React.useState(false);

  const history = useHistory();

  React.useEffect(() => {
    const token = localStorage.getItem('token');
    
    if(token) {
      authApi.getContent(token).then(user => {
        setUserInfo({
          email: user.data.email
        });
        
        setIsLoggedIn(true);
        history.push("/");
        
        console.log('Авторизация прошла успешно!');
      }).catch(err => {
        console.log(`${err}. Не удалось авторизоваться.`);
      });
    }
    
    return () => setUserInfo({});
  }, [history]);

  React.useEffect(() => {
    api.getInitialCards().then(cards => {  
      setCards(cards);
    
      console.log('Карточки получены!');
    }).catch(err => {
      console.log(`${err}. Не удалось получить карточки с сервера.`);
    });

    return () => setCards([]);
  }, []);

  React.useEffect(() => {
    api.getUserInfo().then(user => {
      setCurrentUser(user);

      console.log('Данные профиля получены!');
    }).catch(err => {
      console.log(`${err}. Не удалось получить данные о профиле с сервера.`);
    });

    return () => {
      setCurrentUser({});
    };
  }, []);

  function handleRegister({email, password}) {
    setIsLoading(true);

    authApi.register({email, password}).then(data => {
      setIsRegistered(true);
      history.push("/sign-in");

      console.log('Регистрация прошла успешно! Введите логин и пароль для входа в аккаунт.');
    }).catch(err => {
      setIsRegistered(false);

      console.log(`${err}. Не удалось зарегистрироваться. Попробуйте еще раз.`);
    }).finally(() => {
      setIsInfoToolTipPopupOpen(true);
      setIsLoading(false);
    });
  }

  function handleLogin({email, password}) {
    setIsLoading(true);
    
    authApi.authorize({email, password}).then(data => {
      setUserInfo({
        email: email
      });
      
      setIsLoggedIn(true);
      history.push("/");
      localStorage.setItem('token', data.token);

      console.log('Авторизация прошла успешно!');
    }).catch(err => {
      console.log(`${err}. Не удалось авторизоваться.`);
    }).finally(() => {
      setIsLoading(false);
    });
  }

  function handleSignOut() {
    setIsLoggedIn(false);
    localStorage.removeItem('token');
  }

  function handleCardLike(card) {
    const isLiked = card.likes.some(liked => liked._id === currentUser._id);

    api.changeLikeCardStatus(card._id, isLiked ? 'DELETE' : 'PUT').then(updatedCard => {
      setCards((cards) => cards.map(c => c._id === card._id ? updatedCard : c));
      console.log('Состояние лайка изменено!');
    }).catch(err => {
      console.log(`${err}. Не удалось изменить состояние лайка.`);
    });
  }

  function handleCardClick(card) {
    setIsCardSelected(true);

    setSelectedCard({
      caption: card.name,
      link: card.link
    });
  }

  function handleCardDelete(card) {
    api.deleteCard(card._id).then(message => {
      setCards((cards) => cards.filter(c => c._id !== card._id));
      console.log('Карточка успешно удалена!');
    }).catch(err => {
      console.log(`${err}. Не удалось удалить карточку с сервера.`);
    });
  }

  function closeAllPopups() {
    setIsEditAvatarPopupOpen(false);
    setIsEditProfilePopupOpen(false);
    setIsAddPlacePopupOpen(false);
    setIsInfoToolTipPopupOpen(false);

    setIsCardSelected(false);
    setSelectedCard({});
  }

  function handleMenuButtonClick() {
    setIsMenuOpen((isMenuOpen) => !isMenuOpen);
  }

  function handleEditAvatarClick() {
    setIsEditAvatarPopupOpen(true);
  }

  function handleEditProfileClick() {
    setIsEditProfilePopupOpen(true);
  }

  function handleAddPlaceClick() {
    setIsAddPlacePopupOpen(true);
  }

  function handleUpdateUser({name, description}) {
    setIsLoading(true);

    api.updateProfile(name, description).then(updatedUser => {
      setCurrentUser(updatedUser);
      console.log('Профиль успешно обновлён!');
      closeAllPopups();
    }).catch(err => {
      console.log(`${err}. Не удалось обновить профиль.`);
    }).finally(() => {
      setIsLoading(false);
    }); ;
  }

  function handleUpdateAvatar({avatarLink}) {
    setIsLoading(true);

    api.updateAvatar(avatarLink).then(updatedUser => {
      setCurrentUser(updatedUser);
      console.log('Аватар успешно обновлён!');
      closeAllPopups();
    }).catch(err => {
      console.log(`${err}. Не удалось обновить аватар.`);
    }).finally(() => {
      setIsLoading(false);
    });  
  }

  function handleAddPlace({title, link}) {
    setIsLoading(true);

    api.addCard(title, link).then(params => {
      setCards([params, ...cards]);
      console.log('Карточка успешно добавлена!');
      closeAllPopups();
    }).catch(err => {
      console.log(`${err}. Не удалось разместить карточку.`)
    }).finally(() => {
      setIsLoading(false);
    }); ;
  }

  return (
    <CurrentUserContext.Provider value={currentUser}>
      <IsLoggedInContext.Provider value={isLoggedIn}>
        <div className="page">
          <div className="page__container">
            <Switch>
              <Route path="/sign-up">
                <Header
                  redirectLink="/sign-in"
                  redirectText="Войти"
                />
                <Register onRegister={handleRegister} isLoading={isLoading} />
              </Route>
              <Route path="/sign-in">
                <Header
                  redirectLink="/sign-up"
                  redirectText="Регистрация"
                />
                <Login handleLogin={handleLogin} isLoading={isLoading} />
              </Route>
              <ProtectedRoute path="/">
                <Header
                  redirectLink="/"
                  redirectText="Выйти"
                  onRedirect={handleSignOut}
                  userInfo={userInfo}
                  isMenuOpen={isMenuOpen}
                  onMenuOpen={handleMenuButtonClick}
                />
                <Main
                  onEditAvatar={handleEditAvatarClick}
                  onEditProfile={handleEditProfileClick}
                  onAddPlace={handleAddPlaceClick}
                  onOpenCard={handleCardClick}
                  onCardLike={handleCardLike}
                  onCardDelete={handleCardDelete}
                  cards={cards}
                />
                <Footer />
              </ProtectedRoute>
            </Switch>
            <EditAvatarPopup
              isOpen={isEditAvatarPopupOpen}
              onClose={closeAllPopups}
              onUpdateAvatar={handleUpdateAvatar}
              isLoading={isLoading}
            />
            <EditProfilePopup
              isOpen={isEditProfilePopupOpen}
              onClose={closeAllPopups}
              onUpdateUser={handleUpdateUser}
              isLoading={isLoading}
            />
            <AddPlacePopup
              isOpen={isAddPlacePopupOpen}
              onClose={closeAllPopups}
              onAddPlace={handleAddPlace}
              isLoading={isLoading}
            />
            <ImagePopup card={selectedCard} isOpen={isCardSelected} onClose={closeAllPopups} />
            <InfoToolTipPopup
              isOpen={isInfoToolTipPopupOpen}
              onClose={closeAllPopups}
              isRegistered={isRegistered}
            />
          </div> 
        </div>
      </IsLoggedInContext.Provider>
    </CurrentUserContext.Provider>
  );
}

export default App;