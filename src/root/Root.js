import React from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import Cat from '../cat/Cat';
import Dog from '../dog/Dog';
import AdoptionList from '../adoption/AdoptionLine';
import Home from '../home/Home';
import Form from '../form/Form';
import UserContext from '../UserContext';
import petService from '../petService';
import config from '../config';
import peopleService from '../peopleService';

class Root extends React.Component {
  state = {
    isLoading: true,
    people: [],
    userName: '',
    pets: [],
    isInline: false,
    isNextInline: false,
    isDogAdopted: false,
    isCatAdopted: false,
  };

  setContext = (blank) => {
    this.setState(blank);
  };

  getPetHandler = () => {
    petService.getPetService().then((pets) => {
      this.setContext({
        pets,
        isLoading: false,
        isDogAdopted: false,
        isCatAdopted: false,
      });
    });
  };
  getPeople = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/people`)
      .then((res) => {
        return res.json();
      })
      .then((data) => {
        if (data[0] === this.context.userName) {
          this.clearTimers();
          this.setContext({ isNextInline: true });
        }
        this.setContext({
          people: data,
          isLoading: false,
          isNextInline: false,
        });
      });
  };
  removeMe = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'DELETE',
    });
  };
  //TODO: figureout how to remove me and refresh page after adopt button clicked. could just make specific function for the button vs random
  // removePeople = () => {
  //   return fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
  //     method: 'DELETE',
  //   }).then(() => this.getPeople());
  // };
  // postPersonToLine = () => {
  //   let num = Math.floor(Math.random() * 50);
  //   const newUser = {
  //     name: `Test${num}`,
  //   };
  //   const userString = JSON.stringify(newUser);
  //   fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
  //     method: 'POST',
  //     headers: {
  //       'content-type': 'application/json',
  //     },
  //     body: userString,
  //   }).catch((error) => {
  //     console.error({ error });
  //   });
  // };
  adoptDogButtonHandler = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/pets/dog`, {
      method: 'DELETE',
    })
      .then(() => {
        this.setContext({
          isDogAdopted: true,
        });
        this.timerId = setTimeout(() => {
          this.getPetHandler();
        }, 2000);
        if (this.state.isNextInline == true) {
          this.removeMe().then(() => this.getPeople());
        }
      })

      .catch((error) => {
        console.error({ error });
      });
  };
  adoptCatButtonHandler = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/pets/cat`, {
      method: 'DELETE',
    })
      .then(() => {
        this.setContext({
          isCatAdopted: true,
          // isNextInline: false,
        });
        this.timerId = setTimeout(() => {
          this.getPetHandler();
        }, 2000);
        if (this.state.isNextInline == true) {
          this.removeMe().then(() => this.getPeople());
        }
      })

      .catch((error) => {
        console.error({ error });
      });
  };

  adoptBothButtonHandler = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/pets/both`, {
      method: 'DELETE',
    })
      .then(() => {
        this.setContext({
          isCatAdopted: true,
          isDogAdopted: true,
          // isNextInline: false,
        });
        this.timerId = setTimeout(() => {
          this.getPetHandler();
        }, 2000);
        if (this.state.isNextInline == true) {
          this.removeMe().then(() => this.getPeople());
        }
      })

      .catch((error) => {
        console.error({ error });
      });
  };

  // adoptButtonHandler = (type) => {
  //   petService.adoptButtonHandler(type);
  // };

  render() {
    const value = {
      ...this.state,
      getPet: this.getPetHandler,
      adoptButtonHandler: this.adoptButtonHandler,
      setContext: this.setContext,
      handleDogAdoptButton: this.adoptDogButtonHandler,
      handleCatAdoptButton: this.adoptCatButtonHandler,
      removePeople: this.removePeople,
      postPersonToLine: this.postPersonToLine,
    };
    return (
      <UserContext.Provider value={value}>
        <div>
          <Link to='/' className='home-link'>
            <h1>Petful</h1>
          </Link>
          <Route path='/' component={Home} exact />
          <Route
            path='/adoption'
            render={() => {
              return (
                <div>
                  <div className='adoption-line'>
                    <AdoptionList />
                  </div>
                  {/* <Form /> */}
                  <div className='adoption'>
                    <Cat />
                    <Dog />
                  </div>
                  <div className={this.state.isNextInline ? '' : 'hidden'}>
                    <h2 className={'adopt-both'}>Be a hero, adopt both!</h2>
                    <button
                      className={'adopt-both-button'}
                      onClick={() => this.adoptBothButtonHandler()}>
                      Adopt Both
                    </button>
                  </div>
                </div>
              );
            }}
          />
        </div>
      </UserContext.Provider>
    );
  }
}

export default withRouter(Root);
