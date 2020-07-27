import React from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import Cat from '../cat/Cat';
import Dog from '../dog/Dog';
import AdoptionList from '../adoption/AdoptionLine';
import Home from '../home/Home';
import UserContext from '../UserContext';
import petService from '../petService';
import config from '../config';

class Root extends React.Component {
  state = {
    isLoading: true,
    people: [],
    userName: null,
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
        this.setContext({
          people: data,
          isLoading: false,
          userName: '',
          isNextInline: false,
        });
      });
  };
  removeMe = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'DELETE',
    }).then(() =>
      this.getPeople().then(() => this.setContext({ isNextInline: false }))
    );
  };

  adoptDogButtonHandler = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/pets/dog`, {
      method: 'DELETE',
    })
      .then(() => {
        if (this.state.isNextInline) {
          console.log('check was hit');
          this.setContext({
            people: this.state.people.slice(1),
            isNextInline: false,
            isDogAdopted: true,
          });
          this.timerId = setTimeout(() => {
            this.getPetHandler();
          }, 2000);
        } else {
          this.setContext({ isDogAdopted: true });
          this.timerId = setTimeout(() => {
            this.getPetHandler();
          }, 2000);
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
        if (this.state.isNextInline) {
          console.log('check was hit');
          this.setContext({
            people: this.state.people.slice(1),
            isNextInline: false,
            isCatAdopted: true,
          });
          this.timerId = setTimeout(() => {
            this.getPetHandler();
          }, 2000);
        } else {
          this.setContext({ isCatAdopted: true });
          this.timerId = setTimeout(() => {
            this.getPetHandler();
          }, 2000);
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
        if (this.state.isNextInline) {
          console.log('check was hit');
          this.setContext({
            people: this.state.people.slice(1),
            isNextInline: false,
            isDogAdopted: true,
            isCatAdopted: true,
          });
          this.timerId = setTimeout(() => {
            this.getPetHandler();
          }, 2000);
        } else {
          this.setContext({ isDogAdopted: true, isCatAdopted: true });
          this.timerId = setTimeout(() => {
            this.getPetHandler();
          }, 2000);
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
