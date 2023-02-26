import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';
import Loading from '../components/Loading';
import ProfileImage from '../components/ProfileImage';
import '../index.css';
import { getUser } from '../services/userAPI';

class Profile extends React.Component {
  state = {
    isLoading: false,
    user: {},
  };

  componentDidMount() {
    this.handleGetUser();
  }

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
    const { isLoading, user } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="profile-background">

        <div className="header-default">
          <h1 className="title-styles">Profile</h1>
          <ProfileImage
            styleImage="album-img"
          />
        </div>

        <div
          data-testid="page-profile"
          className="profile-container"
        >
          <h5>
            Name
            {' '}
          </h5>
          <div className="profile-style">
            { user.name }
          </div>
          <h5>
            E-mail
            {' '}
          </h5>
          <div className="profile-style">
            { user.email }
          </div>
          <h5>
            Description
            {' '}
          </h5>
          <div className="profile-style">
            {user.description }
          </div>
          <button className="profile-login-button">
            <Link to="/profile/edit" className="profile-text-decoration">
              Edit profile
            </Link>
          </button>
        </div>
      </div>
    );
  }
}

Profile.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default Profile;
