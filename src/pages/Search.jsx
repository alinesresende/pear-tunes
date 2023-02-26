import React from 'react';
import AlbumCard from '../components/AlbumCard';
import Loading from '../components/Loading';
import '../index.css';
import searchAlbumsAPI from '../services/searchAlbumsAPI';

class Search extends React.Component {
  state = {
    inputSearch: '',
    musics: [],
    isLoading: false,
    lastArtistSearch: '',
  };

  handleChangeSearch = ({ target }) => {
    this.setState({
      [target.name]: target.value,
    });
  };

  handleChangeButton = async () => {
    const { inputSearch } = this.state;
    this.setState({
      isLoading: true,
    });
    const searchAlbum = await searchAlbumsAPI(inputSearch);
    this.setState({
      musics: searchAlbum,
      lastArtistSearch: inputSearch,
      inputSearch: '',
      isLoading: false,
    });
  };

  render() {
    const { inputSearch, isLoading, musics, lastArtistSearch } = this.state;
    const maxInputSearch = 2;

    if (isLoading) return <Loading />;
    return (
      <div>

        <div data-testid="page-search" className="header-default">
          <div className="search-container">
            <input
              className="size-input-search"
              type="name"
              name="inputSearch"
              data-testid="search-artist-input"
              placeholder="artist name"
              value={ inputSearch }
              onChange={ this.handleChangeSearch }
            />
            <button
              className="size-button-search"
              data-testid="search-artist-button"
              disabled={ inputSearch.length < maxInputSearch }
              onClick={ this.handleChangeButton }
            >
              Search
            </button>
          </div>
        </div>
        { musics.length === 0
        && !lastArtistSearch.length === 0 && <p>Nenhum álbum foi encontrado</p> }
        { lastArtistSearch && (
          <div className="artist-container">
            <h3 className="result-artist">
              Resultado de álbuns de:
              { ' ' }
              { lastArtistSearch }
            </h3>
            <div className="searchCard-container">
              { musics.map((artist) => (
                <AlbumCard
                  artistName={ artist.artistName }
                  artistcollectionName={ artist.collectionName }
                  artistartworkUrl100={ artist.artworkUrl100 }
                  artistcollectionId={ artist.collectionId }
                  key={ artist.artworkUrl100 }
                />
              )) }
            </div>
          </div>)}
      </div>
    );
  }
}

export default Search;
