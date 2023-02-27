import PropTypes from 'prop-types';
import React from 'react';
import Loading from '../components/Loading';
import ProfileImage from '../components/ProfileImage';
import pearLogo from '../icons/pear-login.svg';
import '../index.css';
import { createUser } from '../services/userAPI';

class Login extends React.Component {
  state = {
    inputLogin: '',
    inputEmail: '',
    inputImage: '',
    isLoading: false,
  };

  handleChangeLogin = ({ target }) => {
    let { value } = target;
    if (target.type === 'file') {
      const reader = new FileReader();
      reader.addEventListener('load', () => {
        localStorage.setItem('profileImage', reader.result);
      });
      reader.readAsDataURL(target.files[0]);
      const [firstElement] = target.files;
      value = firstElement;
    }
    this.setState({
      [target.name]: value,
    });
  };

  handleLoading = async () => {
    const { inputLogin, inputEmail, inputImage } = this.state;
    const { history } = this.props;
    this.setState({
      isLoading: true,
    });
    await createUser({
      name: inputLogin,
      email: inputEmail,
      image: inputImage });
    this.setState({
      isLoading: false,
    });
    history.push('/search');
  };

  render() {
    const { inputLogin, inputEmail, isLoading, inputImage } = this.state;
    const maxInputLogin = 3;
    if (isLoading) return <Loading />;

    return (
      <div
        data-testid="page-login"
        className="page-login"
      >
        <div className="left-container">
          <img src={ pearLogo } alt="pear logo" className="style-logo" />
        </div>
        <div className="right-container">
          <div className="welcome-container">
            <h1>Welcome</h1>
            <p>Login in to your account to continue</p>
          </div>
          <input
            className="size-login-button"
            type="text"
            name="inputLogin"
            data-testid="login-name-input"
            placeholder="name"
            autoComplete="off"
            value={ inputLogin }
            onChange={ this.handleChangeLogin }
          />
          <input
            className="size-login-button"
            type="email"
            name="inputEmail"
            placeholder="e-mail"
            autoComplete="off"
            value={ inputEmail }
            onChange={ this.handleChangeLogin }
          />
          <label
            className="upload-button"
            htmlFor="imgLogin"
          >
            Upload Image
            <input
              className="upload-image"
              id="imgLogin"
              type="file"
              name="inputImage"
              onChange={ this.handleChangeLogin }
              accept="image/jpeg, image/png, image/jpg"
            />
          </label>
          {inputImage && <ProfileImage customImage={ URL.createObjectURL(inputImage) } />}

          <button
            className="login-button"
            data-testid="login-submit-button"
            disabled={ inputLogin.length < maxInputLogin }
            onClick={ this.handleLoading }
          >
            login

          </button>
        </div>
      </div>

    );
  }
}

Login.propTypes = {
  history: PropTypes.shape({
    push: PropTypes.func,
  }).isRequired,
};
export default Login;
