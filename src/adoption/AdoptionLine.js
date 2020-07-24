import React from 'react';
import config from '../config';

export default class AdoptionList extends React.Component {
  state = {
    isLoading: true,
    person: {
      name: '',
      hasAdopted: false,
    },
  };
  removePerson = (name) => {
    fetch(`${config.REACT_APP_API_ENDPOINT}/people/${name}`);
    this.getPeople();
  };

  componentDidMount = () => {
    this.getPeople();
    // this.timerId = setTimeout(() => {
    //   this.removePerson();
    // }, 2000);
  };
  getPeople = () => {
    fetch(`${config.REACT_APP_API_ENDPOINT}/people`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.setState({ people: data, isLoading: false });
      });
  };

  render() {
    if (this.state.isLoading) {
      return <div>loading...</div>;
    }

    return (
      <>
        <ol>
          {this.state.people.map((person) => (
            <li key={person}>{person}</li>
          ))}
        </ol>
      </>
    );
  }
}
