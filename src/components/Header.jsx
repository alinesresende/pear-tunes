import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import favoritesIcon from '../icons/favorites.svg';
import PearLogoWeb from '../icons/logo.svg';
import PearLogoMobile from '../icons/pear-logo.png';
import profileIcon from '../icons/profile.svg';
import searchIcon from '../icons/search.svg';
import '../index.css';
import { getUser } from '../services/userAPI';
import Loading from './Loading';
import ProfileImage from './ProfileImage';

class Header extends Component {
  state = {
    isLoading: false,
    thisMobile: false,
    user: {},
  };

  componentDidMount() {
    this.handleGetUser();
    window.addEventListener('resize', this.handleMobileOrWeb.bind(this));
    this.handleMobileOrWeb();
  }

  componentWillUnmount() {
    window.removeEventListener('resize', this.handleMobileOrWeb);
  }

  handleMobileOrWeb = () => {
    const mobileMax = 1200;
    const isMobile = window.innerWidth <= mobileMax;
    this.setState({
      thisMobile: isMobile,
    });
  };

  handleGetUser = async () => {
    this.setState({
      isLoading: true,
    });
    const nameUser = await getUser();
    this.setState({
      isLoading: false,
      user: nameUser,
    });
  };

  render() {
    const { isLoading, user, thisMobile } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="header-container">
        <header
          data-testid="header-component"
          className="header-content"
        >
          <Link
            className="link-decoration icons-style"
            to="/"
          >
            { thisMobile
              ? (
                <>
                  <img
                    className="logo-header-mobile"
                    src={ PearLogoMobile }
                    alt="logo pear"
                  />
                  Home
                </>
              )
              : <img src={ PearLogoWeb } className="logo-header-web" alt="logo pear" />}
          </Link>
          <nav className="bar-container">
            <Link
              className="link-decoration icons-style"
              to="/search"
              data-testid="link-to-search"
            >
              <img className="img-search" src={ searchIcon } alt="search icon" />
              Search

            </Link>

            <Link
              className="link-decoration icons-style"
              to="/favorites"
              data-testid="link-to-favorites"
            >
              <img className="img-favorites" src={ favoritesIcon } alt="favorites icon" />
              Favorites

            </Link>
            <Link
              className="link-decoration icons-style"
              to="/profile"
              data-testid="link-to-profile"
            >
              <img className="img-profile" src={ profileIcon } alt="profile icon" />
              Profile

            </Link>
          </nav>
          <div className="header-image-container">
            <ProfileImage
              headerImage="headerSaidImage"
            />
            <Link
              className="title-decoration"
              to="/profile"
            >
              { user.name }
            </Link>
          </div>
        </header>
      </div>
    );
  }
}

export default Header;
