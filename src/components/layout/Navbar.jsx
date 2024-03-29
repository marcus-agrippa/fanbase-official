import React, { useContext, useState, useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';
import { GiSoccerBall } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SelectedTeamContext from '../../context/SelectedTeamContext';

const Navbar = ({ title }) => {
  const { selectedLeague, selectedTeam } = useContext(SelectedTeamContext);
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const menuRef = useRef();

  const toggleMenu = () => { 
    setMenuOpen(!menuOpen);
  };

  const toggleButtonRef = useRef();

  useEffect(() => {
    const closeMenu = () => {
      setMenuOpen(false);
    };

    const handleClickOutside = (event) => {
      if (menuRef.current && !menuRef.current.contains(event.target) && !toggleButtonRef.current.contains(event.target)) {
        closeMenu();
      }
    };    

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    setMenuOpen(false); // Close the menu when the location changes
  }, [location]);

  return (
    <div>
      <nav className="navbar relative shadow-lg bg-neutral text-neutral-content">
        <div className="container mx-auto">
          <div className="flex-1 px-2 mx-2">
            <GiSoccerBall className="inline pr-2 text-5xl md:text-6xl" />
            <Link to="/" className="text-1xl font-bold align-middle text-2xl md:text-3xl">
              {title}
            </Link>
          </div>
          <button
            ref={toggleButtonRef}
            className="block md:hidden px-2 mx-2"
            onClick={toggleMenu}
            aria-label="Toggle menu"
          >
            {menuOpen ? (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M6 18L18 6M6 6l12 12"
                />
              </svg>
            ) : (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
                className="h-6 w-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M4 6h16M4 12h16M4 18h16"
                />
              </svg>
            )}
          </button>
          <div
            ref={menuRef}
            className={`${
              menuOpen ? 'block w-full' : 'hidden'  
            } absolute top-full left-0 md:relative md:w-auto md:static bg-neutral md:flex md:flex-2 z-20`} 
          >
            <div className="flex flex-col md:flex-row justify-end items-center w-full md:items-center md:w-auto">
              <Link
                to="/"
                className={`btn btn-ghost flex bt-sm rounded-btn block ${
                  location.pathname === '/' ? 'text-blue-500' : ''
                }`}
              >
                Home
              </Link>
              <Link
                to={`/players${
                  selectedLeague && selectedTeam // Conditional Rendering: If a league and team are selected then navigate 
                    ? `?leagueId=${selectedLeague}&teamId=${selectedTeam}`
                    : ''
                }`}
                className={`btn btn-ghost flex bt-sm rounded-btn block ${
                  location.pathname.startsWith('/players') ? 'text-blue-500' : ''
                }`}
              >
                Players
              </Link>
              <Link
                to={`/league${
                  selectedLeague && selectedTeam // Conditional Rendering: If a league and team are selected then navigate 
                    ? `?leagueId=${selectedLeague}&teamId=${selectedTeam}`
                    : ''
                }`}
                className={`btn btn-ghost flex bt-sm rounded-btn block ${
                  location.pathname.startsWith('/league') ? 'text-blue-500' : ''
                }`}
              >
                League
              </Link>
              <Link
                to="/news"
                className={`btn btn-ghost flex bt-sm rounded-btn block ${
                  location.pathname === '/news' ? 'text-blue-500' : ''
                } border-t-4`}
              >
                News
              </Link>
              <Link
                to="/about"
                className={`btn btn-ghost flex bt-sm rounded-btn block ${
                  location.pathname === '/about' ? 'text-blue-500' : ''
                }`}
              >
                About
              </Link>
            </div>
          </div>
        </div>
      </nav>
    </div>
  );
};

Navbar.defaultProps = {
  title: 'Fanbase',
};

Navbar.propTypes = {
  title: PropTypes.string,
};

export default Navbar;