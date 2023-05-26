import React, { useContext, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { GiSoccerBall } from 'react-icons/gi';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import SelectedTeamContext from '../../context/SelectedTeamContext';

const Navbar = ({ title }) => {
  const { selectedLeague, selectedTeam } = useContext(SelectedTeamContext);
  const navigate = useNavigate();
  const [menuOpen, setMenuOpen] = useState(false); // Boolean used to set `menuOpen` as false

  const toggleMenu = () => { // Used to change the state of the `menuOpen` state
    setMenuOpen(!menuOpen);
  };

  return (
    <div className='w-screen'>
      <nav className="navbar relative mb-12 shadow-lg bg-neutral text-neutral-content">
        <div className="container mx-auto">
          <div className="flex-1 px-2 mx-2">
            <GiSoccerBall className="inline pr-2 text-5xl" />
            <Link to="/" className="text-1xl font-bold align-middle md:text-2xl">
              {title}
            </Link>
          </div>
          <button
            className="block md:hidden px-2 mx-2"
            onClick={toggleMenu} // When clicked will open/close menu
            aria-label="Toggle menu" // Labelling an interactive element
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
            className={`${
              menuOpen ? 'block' : 'hidden' // Conditional Rendering: If true display block and if false hide
            } absolute top-full left-0 w-screen md:relative md:w-auto md:static bg-neutral md:flex md:flex-2 z-10`}
          >
            <div className="flex flex-col md:flex-row justify-end items-center w-full md:items-center md:w-auto">
              <Link
                to="/"
                className="btn btn-ghost flex bt-sm rounded-btn block"
              >
                Home
              </Link>
              <Link
                to={`/players${
                  selectedLeague && selectedTeam // Conditional Rendering: If a league and team are selected then navigate 
                    ? `?leagueId=${selectedLeague}&teamId=${selectedTeam}`
                    : ''
                }`}
                className="btn btn-ghost flex bt-sm rounded-btn block"
              >
                Players
              </Link>
              <Link
                to="/news"
                className="btn btn-ghost flex bt-sm rounded-btn block"
              >
                News
              </Link>
              <Link
                to="/about"
                className="btn btn-ghost flex bt-sm rounded-btn block"
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