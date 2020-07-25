import React from 'react';
import config from '../config';
import UserContext from '../UserContext';

export default class AdoptionList extends React.Component {
  state = {
    isLoading: true,
    people: [],
  };
  static contextType = UserContext;

  componentDidMount = () => {
    // this.getPeople();
    this.listProcess()
  };

  listProcess = () => {
    this.timerId = setInterval(() => this.postPersonToLine(), 5000);
    this.timerId2 = setInterval(() => this.removePerson(), 5000);
    this.timerId3 = setInterval(() => this.getPeople(), 2000);
  }

  clearTimers = () => {
    clearInterval(this.timerId);
    clearInterval(this.timerId2);
    clearInterval(this.timerId3);
  }
  componentWillUnmount = () => {
    this.clearTimers()
    console.log(`component unmounted`);
  };

  removePerson = () => {
    // if (this.state.people < 1) {
    //   clearInterval(this.timerId);
    //   console.log(`component unmounted`);
    // }
    fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'DELETE',
    }).then(() => {
      this.setState({ isLoading: false });
      // this.getPeople()
    });
  };

  postPersonToLine = () => {
    let num = Math.floor(Math.random() * 50)
    const newUser = {
      name: `Test${num}`
    }
    const userString = JSON.stringify(newUser)
    fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json'
      },
      body: userString
    })
      .catch((error) => {
        console.error({ error });
      });
  }

  getPeople = () => {
    fetch(`${config.REACT_APP_API_ENDPOINT}/people`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if(data[0] === this.context.userName) {
          this.clearTimers()
        }
        this.setState({ people: data, isLoading: false });
      });
  };

  render() {
    console.log(this.context.userName)
    if (this.state.isLoading) {
      return <div>loading...</div>;
    }
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
