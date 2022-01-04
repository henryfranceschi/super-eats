import React, { useContext, useState } from 'react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';
import { useSignOutMutation } from './generated/graphql';
import { AppContext } from './AppContext';
import { Overlay } from './components/overlay';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faShoppingCart } from '@fortawesome/free-solid-svg-icons';
import { Link } from 'react-router-dom';
import './style/App.scss';

export default function App(): JSX.Element {
  const { appState, updateState } = useContext(AppContext);
  const [signOut] = useSignOutMutation();
  const [visible, setVisible] = useState(false);
  const navigate = useNavigate();

  return (
    <div className="shop">
      <Overlay visible={visible} setVisible={setVisible}>
        <div className="sidebar">
          {appState.user ? (
            <button
              className="dark"
              onClick={async () => {
                await signOut();
                updateState({ user: undefined });
              }}
            >
              Sign-out
            </button>
          ) : (
            <button className="dark" onClick={() => navigate('/sign-in')}>
              Sign-in
            </button>
          )}
          <div>lower stuff</div>
        </div>
      </Overlay>
      <header>
        <Link to="/">
          <h1 className="logo">Super Eats</h1>
        </Link>
        <nav>
          <button onClick={() => setVisible(true)}>
            <FontAwesomeIcon icon={faBars} />
          </button>
          {appState.user ? (
            <NavLink to="/cart">
              <FontAwesomeIcon icon={faShoppingCart} /> Cart
            </NavLink>
          ) : null}
        </nav>
      </header>
      <main className="page">
        <Outlet />
      </main>
      <footer>footer</footer>
    </div>
  );
}
