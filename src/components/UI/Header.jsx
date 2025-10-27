import React from 'react';
import { useAuth } from '../../hooks/useAuth';
import '../../styles/components/header.css';

const Header = () => {
  const { user, logoutUser } = useAuth();

  return (
    <header className="header">
      <div className="header__logo">
        <img src="/assets/icons/Logo 1.jpg" alt="HeroQuest Logo" />
      </div>

      <div className="header__user">
        {user ? (
          <>
            <span className="header__displayName">{user.displayName}</span>
            <button className="header__logout" onClick={logoutUser} title="Logout">
              <img src="/assets/icons/Logout 1.jpg" alt="Logout" />
            </button>
          </>
        ) : null}
      </div>
    </header>
  );
};

export default Header;