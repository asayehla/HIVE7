import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

import location from '../../../assets/icons/location.svg';
import avatar from '../../../assets/icons/profilepic.svg';
import walking from '../../../assets/icons/walking.svg';
import clock from '../../../assets/icons/time.svg';

import { StyledWalkCard } from './style';

const WalkCard = ({ walk }) => {
  const timeArr = walk.createdAt.toLocaleTimeString().split(':');
  const time = `${timeArr[0]}:${timeArr[1]}`;

  const birthDateToAgeString = birthDateString => {
    if (birthDateString) {
      const year = birthDateString.slice(0, 4);
      const month = birthDateString.slice(4, 6);
      const day = birthDateString.slice(6, 8);

      const thisDate = new Date().toLocaleDateString();
      const [thisYear, thisMonth, thisDay] = thisDate.split('-');

      let age = +thisYear - +year;
      const monthDiff = +thisMonth - +month;
      const dayDiff = +thisDay - +day;

      if (monthDiff < 0) age--;
      else if (monthDiff === 0 && dayDiff < 0) age--;

      return age + ' år';
    }
    return '';
  };

  return (
    <StyledWalkCard>
      <Link to={{ pathname: '/selected/' + walk.walkId }}>
        <div className="box1">
          <img className="avatar" src={avatar} alt="avatar" />
          <h3 className="author">{walk.user.displayName}</h3>
          <span className="usersage"> {birthDateToAgeString(walk.user.dateOfBirth)}</span>
        </div>
        <hr />
        <div className="box2">
          <div className="date">
            <img src={clock} alt="time" />
            <span>
              {walk.date} {walk.time}
            </span>
          </div>
          <div className="timeduration">
            <img src={walking} alt="walk" />
            <span>{walk.timeduration}</span>
          </div>
          <div className="where">
            <img src={location} alt="where" />
            <span>{walk.where}</span>
          </div>
        </div>
        <hr />
        <span className="posted">
          Posted at: {`${time}  ${walk.createdAt.toLocaleDateString()}`}
        </span>{' '}
      </Link>
    </StyledWalkCard>
  );
};

WalkCard.propTypes = {
  walk: PropTypes.shape({
    allowChildren: PropTypes.boolean,
    allowPets: PropTypes.boolean,
    bringPets: PropTypes.boolean,
    createdAt: PropTypes.instanceOf(Date),
    date: PropTypes.string,
    filterGender: PropTypes.string,
    introText: PropTypes.string,
    walkId: PropTypes.string,
    timeduration: PropTypes.string,
    time: PropTypes.string,
    user: PropTypes.shape({
      dateOfBirth: PropTypes.string,
      displayName: PropTypes.string,
      email: PropTypes.string,
      lvlOfSwedish: PropTypes.string
    }),
    where: PropTypes.string
  })
};

export default WalkCard;
