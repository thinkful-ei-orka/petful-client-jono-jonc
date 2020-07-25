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
      this.setState({
        pets,
        isLoading: false,
        isDogAdopted: false,
        isCatAdopted: false,
      });
    });
  };

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
        });
        this.timerId = setTimeout(() => {
          this.getPetHandler();
        }, 2000);
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
                  <h2 className='adopt-both'>Be a hero, adopt both!</h2>
                  <button
                    className={
                      this.context.isNextInline ? 'adopt-both-button' : 'hidden'
                    }>
                    Adopt Both
                  </button>
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
