import React from 'react';

import PopupWithForm from './PopupWithForm';

function EditAvatarPopup(props) { 
  const inputRef = React.useRef();

  const [isValidLink, setIsValidLink] = React.useState(false);
  const [linkValdationMessage, setLinkValdationMessage] = React.useState('');

  const [isFormInvalid, setIsFormInvalid] = React.useState(true);

  React.useEffect(() => {
    inputRef.current.value = '';

    setIsValidLink(true);
    setLinkValdationMessage('');

    setIsFormInvalid(true);
  }, [props.isOpen]);

  function handleLinkInput(evt) {
    const {validity: {valid}, validationMessage} = evt.target;

    setIsValidLink(valid);
    setLinkValdationMessage(validationMessage);
    setIsFormInvalid(!valid);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onUpdateAvatar({
      avatarLink: inputRef.current.value
    });
  }

  return (
    <PopupWithForm
      header="Обновить аватар"
      buttonText="Сохранить"
      isFormInvalid={isFormInvalid}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        className="popup__input popup__input_content_avatar"
        type="url"
        ref={inputRef}
        onChange={handleLinkInput}
        placeholder="Ссылка на аватар"
        autoComplete="off"
        required
      />
      <span
        className={`popup__input-error ${isValidLink ? '' : 'popup__input-error_visible'}`}
      >
        {linkValdationMessage}
      </span>
    </PopupWithForm>
  );
}

export default EditAvatarPopup;