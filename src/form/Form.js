import React from 'react';
import config from '../config';

class Form extends React.Component {
    addToList = (event) => {
        // event.preventDefault();
        const name = event.target.userName.value;
        this.postPersonToLine(name);
    }

    postPersonToLine = (name) => {
        const newUser = {
            name: name
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

    render() {
        return (
            <form className='add-person-form' onSubmit={this.addToList}>
                <label htmlFor='userName'>Your Name:</label>
                <input type='text' name='userName' required />
                <button type='submit'>Get in Line</button>
            </form>
        )
    }
}

export default Form;