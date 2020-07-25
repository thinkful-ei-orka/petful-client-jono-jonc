import React from 'react';
import config from '../config';
import UserContext from '../UserContext';
import AdoptionList from '../adoption/AdoptionLine';

class Form extends React.Component {
    state = {
        userName: ''
    }
    addToList = (event) => {
        event.preventDefault();
        const name = event.target.userName.value;
        event.target.userName.value = ''
        this.setState({ userName: name })
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
        console.log(this.state.userName)
        return (
            <UserContext.Provider value={{
                userName: this.state.userName
            }}>
                <div className='adoption-line'>
                  <AdoptionList />
                </div>
                <form className='add-person-form' onSubmit={this.addToList}>
                    <label htmlFor='userName'>Your Name:</label>
                    <input type='text' name='userName' required />
                    <button type='submit'>Get in Line</button>
                </form>
            </UserContext.Provider>
        )
    }
}

export default Form;