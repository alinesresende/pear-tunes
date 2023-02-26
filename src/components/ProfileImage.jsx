import PropTypes from 'prop-types';
import React, { Component } from 'react';

class ProfileImage extends Component {
  render() {
    const { customImage } = this.props;
    const imageFromLocalStorage = localStorage.getItem('profileImage');

    const image = customImage || imageFromLocalStorage;
    if (!image) return null;
    const { styleImage, headerImage } = this.props;
    return (
      <div>
        <img
          className={ `img-preview ${styleImage} ${headerImage}` }
          id="inputImg"
          src={ image }
          alt="preview"
        />
      </div>
    );
  }
}

ProfileImage.propTypes = {
  styleImage: PropTypes.string.isRequired,
  headerImage: PropTypes.string.isRequired,
  customImage: PropTypes.string.isRequired,
};

export default ProfileImage;
