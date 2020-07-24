import React from 'react';
import config from '../config';

class Dog extends React.Component {
    state = {
        dog: null,
        isLoading: true,
        isAdopted: false
    };
    
    componentDidMount = () => {
        this.getDog();
    };
    
    componentWillUnmount = () => {
        clearTimeout(this.timerId)
    }

    getDog = () => {
        fetch(config.REACT_APP_API_ENDPOINT)
        .then(res => {
            if (!res.ok) {
                return res.json().then(e => Promise.reject(e))
            }
            return res.json()
        })
        .then(resJson => {
            this.setState({
                dog: resJson.dog,
                isLoading: false,
                isAdopted: false
            })
        })
        .catch(error => {
            console.error({ error })
        });
    };

    handleAdoptButton = () => {
        fetch(`${config.REACT_APP_API_ENDPOINT}/dog`, {
            method: 'DELETE'
        })
            .then(() => {
                this.setState({
                    isAdopted: true
                })
                this.timerId = setTimeout(() => {
                    this.getDog()
                },
                2000)
            })
            .catch(error => {
                console.error({ error })
            });
    }

    render() {
        if(this.state.isLoading) {
            return <div></div>
        }
        if (this.state.isAdopted) {
            return (
                <div className='dog-display is-adpoted'>
                    <h1>Was Adopted</h1>
                    <p>New dog incoming</p>
                </div>
            )
        }
        return (
            <div className='dog-display'>
                <h2>Dog</h2>
                <img src={this.state.dog.imageURL} alt='Dog'/>
                <p><strong>Name:</strong> {this.state.dog.name} </p>
                <p><strong>Gender:</strong> {this.state.dog.gender} </p>
                <p><strong>Age:</strong> {this.state.dog.age}  yrs</p>
                <p><strong>Breed:</strong> {this.state.dog.breed} </p>
                <p><strong>Fluffy's story:</strong> {this.state.dog.story} </p>
                <button onClick={this.handleAdoptButton}>Adopt</button>
            </div>
        );
    };
};

export default Dog;