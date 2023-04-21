import { GiSoccerBall } from 'react-icons/gi'
import {Link} from 'react-router-dom'
import PropTypes from 'prop-types'

const Navbar = ({ title }) => {
  return (
    <nav className='navbar mb-12 shadow-lg bg-neutral text-neutral-content'>
      <div className='container mx-auto'>
        <div className='flex-1 px-2 mx-2'>
          <GiSoccerBall className='inline pr-2 text-5xl'/>
          <Link to='/' className='text-1xl font-bold align-middle md:text-2xl'>
            {title}
          </Link>
        </div>
        <div className="flex-2 px-2 mx-2">
          <div className="flex justify-end">
            <Link to='/' className='btn btn-ghost bt-sm rounded-btn'>
              Home
            </Link>
            {/* <Link to='/stats' className='btn btn-ghost bt-sm rounded-btn'>
              Stats
            </Link>
            <Link to='/news' className='btn btn-ghost bt-sm rounded-btn'>
              News
            </Link> */}
            <Link to='/players' className='btn btn-ghost bt-sm rounded-btn'>
              Players
            </Link>
            <Link to='/about' className='btn btn-ghost bt-sm rounded-btn'>
              About
            </Link>
          </div>
        </div>
      </div>
    </nav>
  )
}

Navbar.defaultProps = {
  title: 'Fanbase',
}

Navbar.propTypes = {
  title: PropTypes.string
}

export default Navbar