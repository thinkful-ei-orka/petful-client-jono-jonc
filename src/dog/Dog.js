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
    console.log(this.context);
  };

  componentWillUnmount = () => {
    clearTimeout(this.context.timerId);
  };

  // getDog = () => {
  //   fetch(`${config.REACT_APP_API_ENDPOINT}/pets`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         return res.json().then((e) => Promise.reject(e));
  //       }
  //       return res.json();
  //     })
  //     .then((resJson) => {
  //       this.setState({
  //         dog: resJson.dog,
  //         isLoading: false,
  //         isAdopted: false,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error({ error });
  //     });
  // };

  // handleAdoptButton = () => {
  //   fetch(`${config.REACT_APP_API_ENDPOINT}/pets/dog`, {
  //     method: 'DELETE',
  //   })
  //     .then(() => {
  //       this.context.setContext({
  //         isDogAdopted: true,
  //       });
  //       this.timerId = setTimeout(() => {
  //         this.context.getPet();
  //       }, 2000);
  //     })
  //     .catch((error) => {
  //       console.error({ error });
  //     });
  // };

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
