import React from 'react';

function PopupWithForm(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}> 
      <div className="popup__container">
        <h2 className="popup__header">{props.header}</h2>
          <form className="popup__form" onSubmit={props.onSubmit} noValidate>
            {props.children}
            <button
              className={`popup__button ${props.isFormInvalid ? 'popup__button_disabled' : ''}`}
              type="submit"
              disabled={props.isFormInvalid || props.isLoading}
            >
              {props.isLoading ? 'Сохранение...' : props.buttonText}
            </button>
          </form>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default PopupWithForm;