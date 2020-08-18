import React, { useContext } from 'react';
import config from '../config';
import UserContext from '../UserContext';

function Form(props) {
  const context = useContext(UserContext);

  const addToList = (event) => {
    event.preventDefault();

    const name = event.target.userName.value;
    event.target.userName.value = '';
    //   this.setState({ userName: name, isInline: true });
    context.setContext({ userName: name, isInline: true });
    removePerson();
    postPersonToLine(name);
  };

  const postPersonToLine = (name) => {
    const newUser = {
      name: name,
    };
    const userString = JSON.stringify(newUser);
    fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'POST',
      headers: {
        'content-type': 'application/json',
      },
      body: userString,
    }).catch((error) => {
      console.error({ error });
    });
  };
  const removePerson = () => {
    return fetch(`${config.REACT_APP_API_ENDPOINT}/people`, {
      method: 'DELETE',
    }).then(() => {
      context.getPeople();
    });
  };

  return (
    <>
      <form className='add-person-form' onSubmit={(e) => addToList(e)}>
        <label htmlFor='userName'>Your Name:</label>
        <input type='text' name='userName' required />
        <button type='submit'>Get in Line</button>
      </form>
    </>
  );
}

export default Form;
