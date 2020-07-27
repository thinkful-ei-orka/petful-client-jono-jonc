import React from 'react';
import config from '../config';
import UserContext from '../UserContext';

class Cat extends React.Component {
  static contextType = UserContext;
  componentDidMount = () => {
    this.context.getPet();
  };

  componentWillUnmount = () => {
    clearTimeout(this.context.timerId);
  };

  render() {
    if (this.context.isLoading) {
      return <div>Loading</div>;
    }
    if (this.context.isCatAdopted) {
      return (
        <div className='cat-display is-adpoted'>
          <h1>Was Adopted</h1>
          <p>New cat incoming</p>
        </div>
      );
    }
    return (
      <div className='cat-display'>
        <h2>Cat</h2>
        <img src={this.context.pets.cat.imageURL} alt='Cat' />
        <p>
          <strong>Name:</strong> {this.context.pets.cat.name}
        </p>
        <p>
          <strong>Gender:</strong> {this.context.pets.cat.gender}
        </p>
        <p>
          <strong>Age:</strong> {this.context.pets.cat.age} yrs
        </p>
        <p>
          <strong>Breed:</strong> {this.context.pets.cat.breed}
        </p>
        <p>
          <strong>Fluffy's story:</strong> {this.context.pets.cat.story}
        </p>
        <button
          className={this.context.isNextInline ? '' : 'hidden'}
          onClick={() => {
            this.context.setContext({ userClicked: true });
            this.context.handleCatAdoptButton();
          }}>
          Adopt
        </button>
      </div>
    );
  }
}

export default Cat;
