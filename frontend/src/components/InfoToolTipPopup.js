function InfoToolTipPopup(props) {
  return (
    <div className={`popup ${props.isOpen ? 'popup_opened' : ''}`}>
      <div className="popup__container">
        <div
          className={`popup__image ${props.isRegistered ? 'popup__image_type_success' : 'popup__image_type_failed'}`}
        />
        <h2 className="popup__header popup__header_mode_info">
          {props.isRegistered ? "Вы успешно зарегистрировались!" : "Что-то пошло не так! Попробуйте ещё раз."}
        </h2>
        <button className="popup__close-button" type="button" aria-label="Закрыть" onClick={props.onClose} />
      </div>
    </div>
  );
}

export default InfoToolTipPopup;