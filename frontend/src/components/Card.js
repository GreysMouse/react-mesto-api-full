import React from 'react';

import CurrentUserContext from '../contexts/CurrentUserContext';

function Card(props) {
  const currentUser = React.useContext(CurrentUserContext);
  const isLiked = props.card.likes.some(liked => liked._id === currentUser._id);

  function handleClick() {
    props.onCardClick(props.card);
  }

  function handleLikeClick() {
    props.onCardLike(props.card);
  }

  function handleDeleteClick() {
    props.onCardDelete(props.card);
  }

  return (
    <div className="card">
      <img className="card__image" src={props.card.link} alt={props.card.name} onClick={handleClick}/>
      <div className="card__content">
        <h2 className="card__title">{props.card.name}</h2>
        <div>
          <button
            className={`card__like-button ${isLiked ? 'card__like-button_checked' : ''}`}
            type="button"
            aria-label="Нравится"
            onClick={handleLikeClick}
          />
          <p className="card__like-counter">{props.card.likes.length}</p>
        </div>
      </div>
      <button
        className={`card__delete-button ${currentUser._id === props.card.owner._id ? '' : 'card__delete-button_hidden'}`}
        type="button"
        aria-label="Удалить"
        onClick={handleDeleteClick}
      />
    </div>
  );
}

export default Card;