/* eslint-disable jsx-a11y/label-has-associated-control */
import PropTypes from 'prop-types';
import React, { Component } from 'react';

import '../index.css';
import { addSong, removeSong } from '../services/favoriteSongsAPI';

class MusicCard extends Component {
  handleAddSong = async ({ target }) => {
    const { music, addMusicFavorites, removeMusicFavorites } = this.props;
    if (target.checked) {
      await addSong(music);
      addMusicFavorites(music);
    } else {
      await removeSong(music);
      removeMusicFavorites(music);
    }
  };

  render() {
    const { nameMusicCard, previwMusic, trackId, isFavorite } = this.props;
    return (
      <div className="musicCard-container">
        <p>
          { nameMusicCard }
        </p>
        <audio
          data-testid="audio-component"
          className="audio-component"
          src={ previwMusic }
          controls
        >
          <track kind="captions" />
          O seu navegador não suporta o elemento
          {previwMusic}
          {' '}
          <code>audio</code>
          .
        </audio>

        <input
          id={ `checkbox-music-${trackId}` }
          type="checkbox"
          checked={ isFavorite }
          onChange={ this.handleAddSong }
        />
        <label
          data-testid={ `checkbox-music-${trackId}` }
          htmlFor={ `checkbox-music-${trackId}` }
          className="checkHeart"
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="20"
            height="20"
            viewBox="0 0 24 24"
            fill="none"
            stroke="#ccc"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              // eslint-disable-next-line max-len
              d="M4.318 6.318a4.5 4.5 0 000 6.364L12 20.364l7.682-7.682a4.5 4.5 0 00-6.364-6.364L12 7.636l-1.318-1.318a4.5 4.5 0 00-6.364 0z"
            />
          </svg>
        </label>
      </div>
    );
  }
}

MusicCard.propTypes = {
  nameMusicCard: PropTypes.string.isRequired,
  previwMusic: PropTypes.string.isRequired,
  trackId: PropTypes.number.isRequired,
  music: PropTypes.string.isRequired,
  isFavorite: PropTypes.bool.isRequired,
  addMusicFavorites: PropTypes.func.isRequired,
  removeMusicFavorites: PropTypes.func.isRequired,
};

export default MusicCard;
