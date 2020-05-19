import React, { useContext, useState } from 'react';
import { useHistory, Link as RouterLink } from 'react-router-dom';

import { AuthenticationContext } from 'contexts/AuthenticationContext';
import {
  deleteAccount,
  auth,
  deleteUserAccount,
  resetPassword,
  updatePassword,
  updateEmail,
  updateDisplayName,
  updateProfilePicture
} from '../../firebase/firebase.utils';

import Page from 'compositions/Page';
import H3 from 'components/UI/H3';
import calculateAge from '../../helpers/functions/calculateAge';
import avatar from '../../assets/icons/profilepic.svg';
import UploadFile from '../../components/UploadFile';
import Button from '../../components/UI/Button';
import { StyledPrivate } from './style';

const PrivateView = () => {
  const [toogleChangePic, setToogleChangePic] = useState(false);
  const history = useHistory();
  const { user } = useContext(AuthenticationContext);
  const [toogleReadMore, setToogleReadMore] = useState(false);
  const [toogleDelete, setToogleDelete] = useState(false);
  const [toogleSignOut, setToogleSignOut] = useState(false);

  const handleDeleteAccount = () => {
    () => deleteUserAccount(user.id);
    history.push('/logout');
  };

  return (
    <Page metadata={{ title: 'Private view' }} displayNavBottom>
      {!user ? (
        <div></div>
      ) : (
        <StyledPrivate>
          <div className="profilebox-1">
            <img className="avatar" src={user.photoUrl || avatar} alt="avatar" />
            <span
              className="changepic"
              tabIndex="-5"
              role="button"
              aria-label="toogle"
              onClick={() => {
                setToogleChangePic(!toogleChangePic);
              }}
            >
              Byt profilbild
            </span>{' '}
            {toogleChangePic && <UploadFile />}
            <H3 className="user">
              {user.displayName ? user.displayName.split(' ')[0] : ''} <div className="greendott" />{' '}
              {calculateAge(user.dateOfBirth)} år{' '}
            </H3>
            <p className="usersage">{user.lvlOfSwedish}</p>
          </div>

          <div className="change-allinfo-wrapper">
            <div>
              <p className="bold">E-post:</p>
              <div className="changecontainer">
                <span className="display">{user.email}</span>
              </div>
            </div>
            <div className="logut-container">
              <button className="logut" onClick={() => setToogleReadMore(!toogleReadMore)}>
                <p className="bold">Allmänna villkor</p>
              </button>
              {toogleReadMore && (
                <div>
                  <p>Allmänna villkor</p>
                </div>
              )}
              {/*     
              <button
                aria-label="ändra lösenord"
                className="change"
                onClick={() => {
                  updatePassword('hiveseven');
                  alert('Ditt lösenord är nu "hiveseven"');
                }}
              >
                Ändra till hiveseven
              </button>
              <button
                className="change"
                onClick={() => {
                  resetPassword(user.email);
                  alert(
                    `Ett mail med instruktioner för att återställa ditt lösenord är skickat till ${user.email}`
                  );
                }}
              >
                Återställ lösenord
              </button> 
*/}
              <button
                className="logut"
                aria-label="logga ut"
                onClick={() => setToogleSignOut(!toogleSignOut)}
              >
                <p className="bold">Logga ut</p>
              </button>
              {toogleSignOut && (
                <div className="overlay">
                  <div className="whitebox">
                    <p className="superbold">Logga ut?</p>
                    <p>Är du säker på att du vill logga ut? </p>
                    <Button className="warning" onClick={() => setToogleSignOut(!toogleSignOut)}>
                      AVBRYT
                    </Button>
                    <Button className="warning" onClick={() => history.push('/logout')}>
                      LOGGA UT
                    </Button>
                  </div>
                </div>
              )}
              <button className="logut delete" onClick={() => setToogleDelete(!toogleDelete)}>
                <p className="bold">Ta bort konto</p>
              </button>
              {toogleDelete && (
                <div className="overlay">
                  <div className="whitebox">
                    <p className="superbold">Ta bort konto?</p>
                    <p>Är du säker på att du vill ta bort ditt konto? </p>
                    <Button className="warning" onClick={() => setToogleDelete(!toogleDelete)}>
                      AVBRYT
                    </Button>
                    <Button className="warning" onClick={handleDeleteAccount}>
                      TA BORT
                    </Button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </StyledPrivate>
      )}
    </Page>
  );
};

export default PrivateView;
