import React, { useContext } from 'react';
import { useHistory } from 'react-router-dom';
import { GoogleLogin } from 'react-google-login';
import { AuthContext } from '../../contexts/AuthContext';
import authService from '../../services/authService';

const GoogleLoginComponent = () => {
  const { setAuthData } = useContext(AuthContext);
  const history = useHistory();

  const handleSuccess = async (response) => {
    try {
      const { data } = await authService.googleLogin(response.tokenId);
      setAuthData(data);
      history.push('/board');
    } catch (error) {
      console.error(error);
      alert('Google login failed, please try again.');
    }
  };

  const handleFailure = (error) => {
    console.error(error);
    alert('Google login failed, please try again.');
  };

  return (
    <div className="google-login-container">
      <GoogleLogin
        clientId={process.env.REACT_APP_GOOGLE_CLIENT_ID}
        buttonText="Sign up with Google"
        onSuccess={handleSuccess}
        onFailure={handleFailure}
        cookiePolicy={'single_host_origin'}
      />
    </div>
  );
};

export default GoogleLoginComponent;
