import React from 'react';
import config from '../config';

export default class AdoptionList extends React.Component {
  state = {
    isLoading: true,
    people: [],
  };
  removePerson = () => {
    if (this.state.people < 1) {
      clearInterval(this.timerId);
      console.log(`component unmounted`);
    }
    fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'DELETE',
    }).then(() => {
      this.setState({ people: this.state.people - 1 });
    });
  };

  componentDidMount = () => {
    this.getPeople();
    this.timerId = setInterval(this.removePerson(), 5000);
  };
  componentWillUnmount = () => {
    clearInterval(this.timerId);
    console.log(`component unmounted`);
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
    console.log(this.state);

    // while (this.state.people) {
    //   if (this.state.people <= 0) {
    //     clearTimeout(this.timerId);
    //   }
    //   this.timerId = setTimeout(() => {
    //     this.removePerson();
    //   }, 2000);
    // }

    // this.timerId = setInterval(() => {
    //   if (!this.state.people) {
    //     clearInterval(this.timerId);
    //   }
    //   this.removePerson();
    // }, 2000);
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
