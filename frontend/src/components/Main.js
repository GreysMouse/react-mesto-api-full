import React from 'react';

import Card from './Card';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Main(props) {
  const currentUser = React.useContext(CurrentUserContext);

  return (
    <main className="content page__content">
      <section className="profile">
        <div className="profile__overlay" onClick={props.onEditAvatar}>
          <img className="profile__avatar" src={currentUser.avatar} alt="Аватар" />
        </div>
        <div className="profile__info">
          <h1 className="profile__name">{currentUser.name}</h1>
          <button
            className="profile__edit-button"
            type="button"
            aria-label="Редактировать"
            onClick={props.onEditProfile}
          />
          <p className="profile__description">{currentUser.about}</p>
        </div>
        <button
          className="profile__add-button"
          type="button"
          aria-label="Добавить"
          onClick={props.onAddPlace}
        />
      </section>
      <section className="cards" aria-label="Карточки мест">
        <ul className="cards__container">
          {
            props.cards.map((card) => (
              <li key={card._id}>
                <Card
                  card={card}
                  onCardClick={props.onOpenCard}
                  onCardLike={props.onCardLike}
                  onCardDelete={props.onCardDelete}
                />
              </li>
            ))
          };
        </ul>
      </section>
    </main>
  );
}

export default Main;