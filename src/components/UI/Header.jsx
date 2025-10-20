import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import './header.css';

const Header = () => {
  const { user, logoutUser } = useAuth();

  return (
    <header className="header">
      <div className="header__logo">
        <h1>HeroQuest</h1>
      </div>

      <div className="header__user">
        {user ? (
          <>
            <span className="header__displayName">{user.displayName}</span>
            <button className="header__logout" onClick={logoutUser} title="Logout">
              🪜 {/* <img src="/assets/icons/logout.png" alt="Logout" /> añadir cuando tengamos la imagen*/}
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;