import React from 'react';
import config from '../config';
import UserContext from '../UserContext';

class Dog extends React.Component {
  static contextType = UserContext;

  state = {
    dog: null,
    isLoading: true,
    isAdopted: false,
  };

  componentDidMount = () => {
    // this.getDog();
    this.context.getPet();
  };

  componentWillUnmount = () => {
    clearTimeout(this.context.timerId);
  };

  render() {
    if (this.context.isLoading) {
      return <div></div>;
    }
    if (this.context.isDogAdopted) {
      return (
        <div className='dog-display is-adpoted'>
          <h1>Was Adopted</h1>
          <p>New dog incoming</p>
        </div>
      );
    }
    return (
      <div className='dog-display'>
        <h2>Dog</h2>
        <img src={this.context.pets.dog.imageURL} alt='Dog' />
        <p>
          <strong>Name:</strong> {this.context.pets.dog.name}{' '}
        </p>
        <p>
          <strong>Gender:</strong> {this.context.pets.dog.gender}{' '}
        </p>
        <p>
          <strong>Age:</strong> {this.context.pets.dog.age} yrs
        </p>
        <p>
          <strong>Breed:</strong> {this.context.pets.dog.breed}{' '}
        </p>
        <p>
          <strong>Fluffy's story:</strong> {this.context.pets.dog.story}{' '}
        </p>
        <button
          className={this.context.isNextInline ? '' : 'hidden'}
          onClick={() => {
            this.context.setContext({ userClicked: true });
            this.context.handleDogAdoptButton();
          }}>
          Adopt
        </button>
      </div>
    );
  }
}

export default Dog;
