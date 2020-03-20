import React, { useState } from 'react';

import Page from 'compositions/Page';
import Loader from 'compositions/Loader';
import H3 from 'components/UI/H3';
import Alert from 'components/UI/Alert';

const ProfilePageContent = ({ error, isLoading }) => {
  if (isLoading) {
    return <Loader fullScreen />;
  } else if (error) {
    return <Alert status="error"></Alert>;
  } else {
    return (
      <React.Fragment>
        <div>
          <H3>Profile</H3>
          <div>
            <p>Från:</p>
            <p>Svenska nivå: </p>
            <p>Jobb:</p>
          </div>
          <div>
            <H3>Intressen</H3>
          </div>
        </div>
      </React.Fragment>
    );
  }
};

const ProfileView = () => {
  const [data, setData] = useState(undefined);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  return (
    <Page>
      <ProfilePageContent data={data} error={error} isLoading={isLoading} />
    </Page>
  );
};

export default ProfileView;