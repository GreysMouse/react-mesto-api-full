import { Link } from 'react-router-dom';

import Menu from './Menu';

function Header(props) {
  return (
    <header className={`header page__header ${props.userInfo ? 'header_mode_mobile' : ''}`}>
      <Menu
        mode="mobile"
        redirectLink={props.redirectLink}
        redirectText={props.redirectText}
        onRedirect={props.onRedirect}
        userInfo={props.userInfo}
        isMenuOpen={props.isMenuOpen}
      />
      <Link className="header__logo" to="/" />
      <Menu
        mode="desktop"
        redirectLink={props.redirectLink}
        redirectText={props.redirectText}
        onRedirect={props.onRedirect}
        userInfo={props.userInfo}
      />
      {props.userInfo && 
        <button
          className={`header__menu-button ${props.isMenuOpen ? 'header__menu-button_state_pressed' : ''}`}
          type="button"
          onClick={props.onMenuOpen}
        />}
    </header>
  );
}


export default Header;