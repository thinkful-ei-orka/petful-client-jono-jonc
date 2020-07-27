import React from 'react';
import config from '../config';
import UserContext from '../UserContext';
import Form from '../form/Form';

function getRandNum() {
  return Math.floor(Math.random() * 2);
}

export default class AdoptionList extends React.Component {
  static contextType = UserContext;

  listProcess = () => {
    if (this.context.isNextInline == true) {
      this.clearTimers();
      return;
    }
    this.timerId1 = setInterval(() => this.postPersonToLine(), 5000);
    this.timerId2 = setInterval(() => this.removePerson(), 5000);
  };

  componentDidMount() {
    this.listProcess();
  }

  clearTimers = () => {
    clearInterval(this.timerId1);
    clearInterval(this.timerId2);
    clearInterval(this.timerId3);
  };

  componentDidUpdate() {
    if (this.context.isNextInline == true) {
      this.clearTimers();
    }
  }
  randomAdoption = () => {
    let num = getRandNum();
    if (getRandNum() == 1) {
      this.context.handleDogAdoptButton();
    } else {
      this.context.handleCatAdoptButton();
    }
  };

  removePerson = () => {
    if (this.context.isNextInline == true) {
      return this.clearTimers();
    }

    return fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'DELETE',
    }).then(() => {
      this.randomAdoption();
      this.getPeople();
    });
  };

  postPersonToLine = () => {
    let num = Math.floor(Math.random() * 50);
    const newUser = {
      name: `Test${num}`,
    };
    const userString = JSON.stringify(newUser);
    fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: userString,
    })
      .then(() => this.getPeople())
      .catch((error) => {
        console.error({ error });
      });
  };

  getPeople = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/people`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        this.context.setContext({
          people: data,
          isLoading: false,
        });
        if (data[0] === this.context.userName) {
          this.clearTimers();
          this.context.setContext({ isNextInline: true });
        }
      });
  };

  render() {
    if (!this.context.people) {
      return <div>loading...</div>;
    }

    return (
      <>
        <ol>
          {this.context.people.map((person) => (
            <li key={person}>{person}</li>
          ))}
        </ol>
        <Form />
      </>
    );
  }
}
