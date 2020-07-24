import React from 'react';
import { withRouter } from 'react-router-dom';
import Cat from '../cat/Cat';
import Dog from '../dog/Dog';

function Root() {
  return (
    <div>
      <h1>Petful</h1>
      <div className='adoption'>
        <Cat />
        <Dog />
      </div>
    </div>
  );
};

export default withRouter(Root);
