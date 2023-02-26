import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../index.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';
import getMusics from '../services/musicsAPI';

class Album extends React.Component {
  state = {
    musicsAlbum: [],
    musics: [],
    isLoading: false,
    listMusicFavorites: [],
  };

  componentDidMount() {
    this.handleGetMusic();
    this.handleGetFavoriteSongs();
  }

  handleGetMusic = async () => {
    const { match: { params: { id } } } = this.props;
    const musicsApi = await getMusics(id);
    const [album, ...restOfMusics] = musicsApi;
    this.setState({
      musicsAlbum: album,
      musics: restOfMusics,
    });
  };

  handleGetFavoriteSongs = async () => {
    this.setState({
      isLoading: true,
    });
    const musicFavorites = await getFavoriteSongs();
    this.setState({
      listMusicFavorites: musicFavorites,
      isLoading: false,
    });
  };

  addMusicFavorites = (music) => {
    const { listMusicFavorites } = this.state;
    this.setState({
      listMusicFavorites: [...listMusicFavorites, music],
    });
  };

  removeMusicFavorites = (musicToRemove) => {
    const { listMusicFavorites } = this.state;
    const filterAddListMusic = listMusicFavorites.filter(
      (music) => music.trackId !== musicToRemove.trackId,
    );
    this.setState({
      listMusicFavorites: filterAddListMusic,
    });
  };

  render() {
    const {
      musics,
      musicsAlbum,
      isLoading,
      listMusicFavorites } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div>
        <div className="header-album">
          <div data-testid="page-album">
            <img
              className="album-img"
              src={ musicsAlbum.artworkUrl100 }
              alt={ musicsAlbum.artistName }
            />
            <h2
              className="album-title"
              data-testid="album-name"
            >
              { musicsAlbum.collectionName }
            </h2>
            <p
              className="album-artist"
              data-testid="artist-name"
            >
              { musicsAlbum.artistName }
            </p>
          </div>
        </div>
        <div className="album-card">
          {musics.map((music) => (
            <MusicCard
              key={ music.trackId }
              nameMusicCard={ music.trackName }
              previwMusic={ music.previewUrl }
              trackId={ music.trackId }
              music={ music }
              isFavorite={ listMusicFavorites.some(
                (favoriteMusic) => music.trackId === favoriteMusic.trackId,
              ) }
              addMusicFavorites={ this.addMusicFavorites }
              removeMusicFavorites={ this.removeMusicFavorites }
            />

          ))}
        </div>
      </div>
    );
  }
}

Album.propTypes = {
  match: PropTypes.shape({
    params: PropTypes.string,
    id: PropTypes.string,
  }).isRequired,
};

export default Album;
