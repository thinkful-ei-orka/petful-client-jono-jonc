import React from 'react';
import config from '../config';

class Dog extends React.Component {
    state = {
        dog: null,
        isLoading: true
    };
    
    componentDidMount = () => {
        this.getDog();
    };
    
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
                isLoading: false
            })
        })
        .catch(error => {
            console.error({ error })
        });
    };

    render() {
        if(this.state.isLoading) {
            return <div></div>
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
                <button>Adopt</button>
            </div>
        );
    };
};

export default Dog;