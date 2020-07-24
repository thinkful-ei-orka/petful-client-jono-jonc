import React from 'react';
import config from '../config';

class AdoptionList extends React.Component {
  state = {
    person: {
      name: '',
      hasAdopted: false,
    },
  };

  componentDidMount = () => {
    this.getPeople();
  };
  getPeople = () => {
    fetch(`${config.REACT_APP_API_ENDPOINT}/people`).then((res) => res);
  };
}
