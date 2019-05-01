import React from 'react';
import profilePic from '../assets/profile-pic.jpeg';
import { rhythm } from '../utils/typography';

class Bio extends React.Component {
  render() {
    return (
      <div style={style.Bio}>
        <img src={profilePic} alt={`Hewon Jeong`} style={style.img} />
        <p style={style.text}>
          {'Personal blog by '}
          <a href="https://github.com/hewonjeong">Hewon Jeong</a>
          <br />
          I'm practicing here to be a craftman.🧘🏻‍♂️
        </p>
      </div>
    );
  }
}

const style = {
  Bio: {
    display: 'flex',
    marginBottom: rhythm(2),
  },
  img: {
    marginRight: rhythm(1 / 2),
    marginBottom: 0,
    width: rhythm(2),
    height: rhythm(2),
    borderRadius: '50%',
  },
  text: { maxWidth: 310 },
};
export default Bio;
