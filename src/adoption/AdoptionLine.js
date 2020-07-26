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
    // if (this.context.isInline == false) {
    //   return;
    // }
    if (this.context.isNextInline == false) {
      this.timerId1 = setInterval(() => this.postPersonToLine(), 5000);
      this.timerId2 = setInterval(() => this.removePerson(), 5000);
    }

    // this.timerId3 = setInterval(() => this.getPeople(), 2000);
  };

  componentDidMount() {
    this.listProcess();
  }

  clearTimers = () => {
    clearInterval(this.timerId1);
    clearInterval(this.timerId2);
    clearInterval(this.timerId3);
  };

  // componentDidMount() {
  //   if (this.context.isInline) {
  //     this.listProcess();
  //   }
  // }

  // componentDidUpdate() {
  //   this.listProcess();
  // }
  componentWillUnmount = () => {
    this.clearTimers();
    console.log(`component unmounted`);
  };

  randomAdoption = () => {
    let num = getRandNum();
    if (getRandNum() == 1) {
      this.context.handleDogAdoptButton();
      console.log(getRandNum());
    } else {
      this.context.handleCatAdoptButton();
      console.log(getRandNum());
    }
  };

  removePerson = () => {
    // if (this.state.people < 1) {
    //   clearInterval(this.timerId);
    //   console.log(`component unmounted`);
    // }
    return (
      fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
        method: 'DELETE',
      })
        // .then(() => {
        //   if (data[0] !== this.context.userName) {
        //     this.randomAdoption();
        //   }
        // })
        .then(() => {
          this.randomAdoption();
          this.getPeople();
        })
    );

    //   .then(() => {
    //   this.context.setContext({ isLoading: false });
    //   // this.getPeople()
    // });
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
    console.log(this.context.userName);

    console.log(this.context.people);
    if (this.context.isLoading) {
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
          {this.context.people.map((person) => (
            <li key={person}>{person}</li>
          ))}
        </ol>
        <Form />
      </>
    );
  }
}
