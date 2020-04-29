import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';

import { firestore } from '../../firebase/firebase.utils';
import { AuthenticationContext } from '../../contexts/AuthenticationContext';

import Page from 'compositions/Page';
import Loader from 'compositions/Loader';
import H1 from 'components/UI/H1';
import Feed from 'compositions/Feed';
import Alert from 'components/UI/Alert';
import ButtonCreate from 'components/ButtonCreate';
import up from '../../assets/icons/updown.svg';
import Nav from 'components/Nav';
import NavBottom from 'components/NavBottom';

import { StyledFeed, StyledBookedWalksHeader } from './style';

const FeedPageContent = ({ error, isLoading, walks, user }) => {
  const [showBooked, setShowBooked] = useState(false);

  const sortWalks = walks =>
    walks.sort((a, b) => {
      const valueA = Number(a.date.replace(/-/gi, '')) + Number(a.time.replace(':', ''));
      const valueB = Number(b.date.replace(/-/gi, '')) + Number(b.time.replace(':', ''));
      return valueA - valueB;
    });

  const sortedWalks = sortWalks(walks);

  const bookedWalks = sortedWalks.filter(walk => {
    const isAttending = walk.attendingPeople.find(id => id === user.id);
    const isUser = walk.user.id === user.id;
    return isAttending || isUser;
  });

  if (isLoading) {
    return <Loader fullScreen />;
  } else if (error) {
    return <Alert status="error"></Alert>;
  } else {
    return (
      <React.Fragment>
        <Nav />
        <NavBottom />
        <StyledFeed>
          <ButtonCreate />
          <Feed walks={bookedWalks} />
        </StyledFeed>
      </React.Fragment>
    );
  }
};

const FeedView = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const [walks, setWalks] = useState([]);
  const { user } = useContext(AuthenticationContext);

  useEffect(() => {
    setIsLoading(true);
    const unsubscribe = firestore.collection('walks').onSnapshot(querySnapshot => {
      const fetchedWalks = [];
      querySnapshot.forEach(doc => {
        const data = doc.data();
        fetchedWalks.push({
          ...data,
          createdAt: data.createdAt.toDate()
        });
      });
      setWalks(fetchedWalks);
      setIsLoading(false);
    });

    return () => unsubscribe();
  }, []);

  return (
    <Page>
      <FeedPageContent user={user} walks={walks} error={error} isLoading={isLoading} />
    </Page>
  );
};

FeedView.propTypes = {
  isLoading: PropTypes.bool,
  walks: PropTypes.arrayOf(
    PropTypes.shape({
      allowChildren: PropTypes.string,
      allowPets: PropTypes.string,
      bringPets: PropTypes.string,
      createdAt: PropTypes.instanceOf(Date),
      date: PropTypes.string,
      filterGender: PropTypes.string,
      introText: PropTypes.string,
      walkId: PropTypes.string,
      time: PropTypes.string,
      user: PropTypes.shape({
        createdAt: PropTypes.instanceOf(Date),
        dateOfBirth: PropTypes.string,
        displayName: PropTypes.string,
        email: PropTypes.string,
        lvlOfSwedish: PropTypes.string
      }),
      where: PropTypes.string
    })
  )
};

export default FeedView;