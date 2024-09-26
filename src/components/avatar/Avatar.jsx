import PropTypes from 'prop-types';

function Avatar({profile_img}) {
  return (
    <img
      src={profile_img ? profile_img : '/profil.png'}
      alt="profile image author"
      className="rounded-full h-5 mr-1"
    />
  );
};

Avatar.propTypes = {profile_img: PropTypes.string}

export default Avatar;