import PropTypes from 'prop-types';

const TeamItem = ({team: { name, logo }}) => {
  return (
    <div className='card shadow-md compact side bg-base-100'>
      <div className='flex-row items-center space-x-4 card-body'>
        <div>
          <div className='club-logo'>
            <div className='shadow w-14 h-14'>
              <img src={logo} alt='club logo'></img>
            </div>
          </div>
        </div>
        <div>
          <h2 className='card-title'>{name}</h2>
        </div>
      </div>
    </div>
  )
}

TeamItem.propTypes = {
  team: PropTypes.object.isRequired
}

export default TeamItem