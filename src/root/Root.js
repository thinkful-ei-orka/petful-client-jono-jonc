import React from 'react';
import { withRouter, Route, Link } from 'react-router-dom';
import Cat from '../cat/Cat';
import Dog from '../dog/Dog';
import AdoptionList from '../adoption/AdoptionLine';
import Home from '../home/Home';

class Root extends React.Component {
  render() {
    return (
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
                <div className='adoption'>
                  <Cat />
                  <Dog />
                </div>
                <h2 className='adopt-both'>Be a hero, adopt both!</h2>
                <button className='adopt-both-button'>Adopt Both</button>
              </div>
            );
          }}
        />
      </div>
    );
  }
};

export default withRouter(Root);
