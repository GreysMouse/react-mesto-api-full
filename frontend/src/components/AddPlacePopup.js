import React from 'react';

import PopupWithForm from './PopupWithForm';

function AddPlacePopup(props) {
  const [title, setTitle] = React.useState('');
  const [link, setLink] = React.useState('');

  const [isValidTitle, setIsValidTitle] = React.useState(false);
  const [isValidLink, setIsValidLink] = React.useState(false);

  const [titleValdationMessage, setTitleValdationMessage] = React.useState('');
  const [linkValdationMessage, setLinkValdationMessage] = React.useState('');

  const [isFormInvalid, setIsFormInvalid] = React.useState(true);

  React.useEffect(() => {
    setTitle('');
    setLink('');
    
    setIsValidTitle(false);
    setIsValidLink(false);

    setTitleValdationMessage('');
    setLinkValdationMessage('');
  }, [props.isOpen]);

  React.useEffect(() => {
    !isValidTitle || !isValidLink ? setIsFormInvalid(true) : setIsFormInvalid(false);
  }, [isValidTitle, isValidLink]);

  function handleTitleInput(evt) {
    const {value, validity: {valid}, validationMessage} = evt.target;

    setTitle(value);

    setIsValidTitle(valid);
    setTitleValdationMessage(validationMessage);
  }

  function handleLinkInput(evt) {
    const {value, validity: {valid}, validationMessage} = evt.target;

    setLink(value);

    setIsValidLink(valid);
    setLinkValdationMessage(validationMessage);
  }

  function handleSubmit(evt) {
    evt.preventDefault();

    props.onAddPlace({
      title: title,
      link: link
    });
  }

  return (
    <PopupWithForm
      header="Новое место"
      buttonText="Создать"
      isFormInvalid={isFormInvalid}
      isOpen={props.isOpen}
      onClose={props.onClose}
      onSubmit={handleSubmit}
      isLoading={props.isLoading}
    >
      <input
        className="popup__input popup__input_content_title"
        type="text"
        value={title || ''}
        onChange={handleTitleInput}
        placeholder="Название"
        minLength="2"
        maxLength="30"
        autoComplete="off"
        required
      />
      <span
        className={`popup__input-error ${isValidTitle ? '' : 'popup__input-error_visible'}`}
      >
        {titleValdationMessage}
      </span>
      <input
        className="popup__input popup__input_content_link"
        type="url"
        value={link || ''}
        onChange={handleLinkInput}
        placeholder="Ссылка на картинку"
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

export default AddPlacePopup;