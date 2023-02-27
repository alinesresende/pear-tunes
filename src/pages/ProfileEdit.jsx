import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import ProfileImage from '../components/ProfileImage';
import '../index.css';
import { getUser, updateUser } from '../services/userAPI';

class ProfileEdit extends React.Component {
  state = {
    isLoading: false,
    user: {
      name: '',
      email: '',
      description: '',
      image: '',
    },
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

  handleNewDados = ({ target }) => {
    const { user } = this.state;
    const value = (target.type === 'file') ? target.files[0] : target.value;
    this.setState({
      user: { ...user, [target.name]: value },
    });
  };

  validateEmail = (email) => {
    const regex = /\S+@\S+\.\S+/;
    return regex.test(email);
  };

  handleDisabledButton = () => {
    const { user } = this.state;
    return user.name.length === 0
    || user.email.length === 0
    // || user.description.length === 0
    || user.image.length === 0
    || !this.validateEmail(user.email);
  };

  handleButtonEnabled = async () => {
    const { user } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    if (user.image?.name) {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        localStorage.setItem('profileImage', reader.result);
      });
      reader.readAsDataURL(user.image);
    }
    await updateUser(user);
    this.setState({
      isLoading: false,
    });
    history.push('/profile');
  };

  render() {
    const { isLoading, user } = this.state;
    if (isLoading) return <Loading />;
    return (
      <div className="profile-background">
        <div className="header-default">
          <h1 className="title-styles">Profile Edit</h1>
          <ProfileImage
            styleImage="album-img"
          />
        </div>
        <div>

          <div
            data-testid="page-profile-edit"
            className="profiledit-container"
          >
            <label
              htmlFor="nameEdit"
            >
              <h5>
                Name
                {' '}
              </h5>
              <input
                data-testid="edit-input-name"
                className="login-profileEdit"
                id="nameEdit"
                type="text"
                name="name"
                autoComplete="off"
                value={ user.name }
                onChange={ this.handleNewDados }
              />

            </label>
            <label
              htmlFor="emailEdit"
            >
              <h5>
                Email
                {' '}
              </h5>
              <input
                data-testid="edit-input-email"
                className="login-profileEdit"
                autoComplete="off"
                id="emailEdit"
                type="email"
                name="email"
                placeholder="what is your email"
                value={ user.email }
                onChange={ this.handleNewDados }
              />

            </label>
            <label
              htmlFor="descriptionEdit"
            >
              <h5>
                Description
                {' '}
              </h5>
              <textarea
                data-testid="edit-input-description"
                autoComplete="off"
                className="login-profileEdit"
                id="descriptionEdit"
                name="description"
                placeholder="tell us more about you..."
                value={ user.description }
                onChange={ this.handleNewDados }
              />

            </label>
            <label
              className="upload-button"
              htmlFor="imgLogin"
            >
              Upload Image
              <input
                className="upload-image"
                autoComplete="off"
                id="imgLogin"
                type="file"
                name="image"
                onChange={ this.handleNewDados }
                accept="image/jpeg, image/png, image/jpg"
              />
            </label>
            <button
              data-testid="edit-button-save"
              disabled={ this.handleDisabledButton() }
              onClick={ this.handleButtonEnabled }
              className="profile-login-button"
            >
              Save
            </button>

          </div>
        </div>

      </div>
    );
  }
}

ProfileEdit.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};

export default ProfileEdit;
