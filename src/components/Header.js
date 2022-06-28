import React from 'react';
import { Link, withRouter, useLocation } from 'react-router-dom';

function Header({email, onSignOut, loggedIn}) {
  const location = useLocation()
  
  return (
    <header className="header">
      <a href="#">
        <div className="header__logo"></div>
      </a>
      
      { loggedIn ? 
        <div className="header__info">
          <p className="header__email">{email}</p>
          <Link to="/sign-up"
            className={`header__link ${loggedIn && 'header__link_active'}`}
            onClick={onSignOut}
          >
            Выйти
          </Link>
        </div>

        : 

        
          <>
            {
              location.pathname === '/sign-up' ? 
              <Link className="header__link_active" to='/sign-in'>Войти</Link> :
              <Link className="header__link_active" to='/sign-up'>Регистрация</Link>
            }
          </>
        

      }

    </header>
  )
}

export default withRouter(Header)