import React from 'react';
import { withRouter } from 'react-router-dom';
import Cat from '../cat/Cat';
import Dog from '../dog/Dog';
import adoptionList from '../adoption/adoptionLine';

function Root() {
  return (
    <div>
      <h1>Petful</h1>
      <div className='adoption-line'></div>
      <div className='adoption'>
        <Cat />
        <Dog />
      </div>
      <h2 className='adopt-both'>Be a hero, adopt both!</h2>
      <button className='adopt-both-button'>Adopt Both</button>
    </div>
  );
}

export default withRouter(Root);
