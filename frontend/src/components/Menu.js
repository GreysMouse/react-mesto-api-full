import { Link } from 'react-router-dom';

function Menu(props) {
  return (
    <div className={`menu ${props.mode === 'mobile' ? (props.userInfo && props.isMenuOpen ? 'menu__mode_mobile' : 'menu_hidden') : (props.userInfo ? 'menu__mode_desktop' : '')}`}>
      <p className={`menu__info ${props.mode === 'mobile' ? 'menu__info_mode_mobile' : ''}`}>
        {props.userInfo ? props.userInfo.email : ''}
      </p>
      <Link
        className={`menu__link ${props.userInfo ? 'menu__link_color_grey' : ''} ${props.mode === 'mobile' ? 'menu__link_mode_mobile' : ''}`}
        to={props.redirectLink}
        onClick={props.onRedirect}
      >
        {props.redirectText}
      </Link>
    </div>
  );
}

export default Menu;