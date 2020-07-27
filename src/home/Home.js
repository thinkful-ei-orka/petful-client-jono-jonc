import React from 'react';
import petfuladopt2 from '../petful-adopt-2.jpg';

function Home(props) {
  return (
    <div className='home-page'>
      <p className='welcome-message'>
        {' '}
        Welcome to Petful! Our adoption process is a bit different. As you move
        to the adoption page and submit your name you will be added to the back
        of the line. You will see one dog and one cat on the screen. As a pet
        gets adopted they will be removed from the screen and replaced with a
        new one. At this point you will be moved forward in the line. Once you
        reach the front of the line it is your turn to adopt! You will have the
        option to adopt either animal you see or both!
      </p>
      <div className='image-container'>
        <img src={petfuladopt2} alt='adoption' className='screenshot' />
      </div>
      <button
        className='get-started-button'
        onClick={() => {
          props.history.push('/adoption');
        }}>
        Get Started!
      </button>
    </div>
  );
}

export default Home;
