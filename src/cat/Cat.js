import React from 'react';
import config from '../config';
import context from '../UserContext';
import UserContext from '../UserContext';

class Cat extends React.Component {
  static contextType = UserContext;
  componentDidMount = () => {
    this.context.getPet();
    console.log(this.context);
  };

  componentWillUnmount = () => {
    clearTimeout(this.context.timerId);
  };

  // getCat = () => {
  //   fetch(`${config.REACT_APP_API_ENDPOINT}/pets`)
  //     .then((res) => {
  //       if (!res.ok) {
  //         return res.json().then((e) => Promise.reject(e));
  //       }
  //       return res.json();
  //     })
  //     .then((resJson) => {
  //       this.setState({
  //         cat: resJson.cat,
  //         isLoading: false,
  //         isAdopted: false,
  //       });
  //     })
  //     .catch((error) => {
  //       console.error({ error });
  //     });
  // };

  // handleAdoptButton = () => {
  //   fetch(`${config.REACT_APP_API_ENDPOINT}/pets/cat`, {
  //     method: 'DELETE',
  //   })
  //     .then(() => {
  //       this.setState({
  //         isAdopted: true,
  //       });
  //       this.timerId = setTimeout(() => {
  //         this.getCat();
  //       }, 2000);
  //     })
  //     .catch((error) => {
  //       console.error({ error });
  //     });
  // };

  render() {
    if (this.context.isLoading) {
      return <div>Loading</div>;
    }
    if (this.context.isAdopted) {
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
          onClick={this.context.handleCatAdoptButton}>
          Adopt
        </button>
      </div>
    );
  }
}

export default Cat;
