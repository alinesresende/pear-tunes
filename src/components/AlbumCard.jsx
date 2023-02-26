import PropTypes from 'prop-types';
import React, { Component } from 'react';
import { Link } from 'react-router-dom';

class AlbumCard extends Component {
  render() {
    const {
      artistName,
      artistcollectionName,
      artistartworkUrl100,
      artistcollectionId,
    } = this.props;
    return (
      <div className="albumCard-container">
        <Link
          className="link-albumcard"
          to={ `/album/${artistcollectionId}` }
          data-testid={ `link-to-album-${artistcollectionId}` }
        >
          <img
            className="album-image"
            src={ artistartworkUrl100 }
            alt={ artistName }
          />
        </Link>
        <Link
          className="link-albumcard"
          to={ `/album/${artistcollectionId}` }
          data-testid={ `link-to-album-${artistcollectionId}` }
        >
          { artistcollectionName }
        </Link>
        <p className="album-subtitle">
          { artistName }
        </p>
      </div>
    );
  }
}

AlbumCard.propTypes = {
  artistName: PropTypes.string.isRequired,
  artistcollectionName: PropTypes.string.isRequired,
  artistartworkUrl100: PropTypes.string.isRequired,
  artistcollectionId: PropTypes.number.isRequired,
};

export default AlbumCard;
