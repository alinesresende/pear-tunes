import React from 'react';
import Loading from '../components/Loading';
import MusicCard from '../components/MusicCard';
import '../index.css';
import { getFavoriteSongs } from '../services/favoriteSongsAPI';

class Farorites extends React.Component {
  state = {
    isLoading: false,
    listMusicFavorites: [],
  };

  componentDidMount() {
    this.handleListMusicFavorites();
  }

  handleListMusicFavorites = async () => {
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
    const { listMusicFavorites, isLoading } = this.state;
    if (isLoading) return <Loading />;
    return (
      <>
        <div className="header-default">
          <h1 className="title-styles">Favorite songs</h1>
        </div>
        <div className="favorites-container">
          <div data-testid="page-favorites">
            {listMusicFavorites.map((music) => (
              <div key={ music.previewUrl }>
                <p>
                  <MusicCard
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
                </p>
              </div>
            ))}
          </div>

        </div>

      </>
    );
  }
}

export default Farorites;
