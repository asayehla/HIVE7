import React, { useContext } from 'react';
import { Redirect } from 'react-router-dom';

import { AuthenticationContext } from 'contexts/AuthenticationContext';

import Header from '../../components/UI/Header';
import SignIn from '../../components/SignIn';
import Page from 'compositions/Page';

import { StyledContainer } from './style';

import PropTypes from 'prop-types';

const LoginView = ({ location }) => {
  const { isAuthenticated } = useContext(AuthenticationContext);

  if (isAuthenticated) {
    // If the user is already authenticated
    // Redirect to whichever page makes sense
    return <Redirect to={(location.state && location.state.from) || '/feed'} />;
  }

  return (
    <Page metadata={{ title: 'Login' }}>
      <StyledContainer>
        <SignIn />
      </StyledContainer>
    </Page>
  );
};

LoginView.propTypes = {
  location: PropTypes.object
};

export default LoginView;
