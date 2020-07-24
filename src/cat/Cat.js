import React from 'react';
import config from '../config';

class Cat extends React.Component {
    state = {
        cat: null,
        isLoading: true,
        message: '',
        isAdopted: false
    };

    componentDidMount = () => {
        this.getCat();
    };

    componentWillUnmount = () => {
        clearTimeout(this.timerId)
    }

    getCat = () => {
        fetch(config.REACT_APP_API_ENDPOINT)
            .then(res => {
                if (!res.ok) {
                    return res.json().then(e => Promise.reject(e))
                }
                return res.json()
            })
            .then(resJson => {
                this.setState({
                    cat: resJson.cat,
                    isLoading: false,
                    isAdopted: false
                })
            })
            .catch(error => {
                console.error({ error })
            });
    };

    handleAdoptButton = () => {
        fetch(`${config.REACT_APP_API_ENDPOINT}/cat`, {
            method: 'DELETE'
        })
            .then(() => {
                this.setState({
                    isAdopted: true
                })
                this.timerId = setTimeout(() => {
                    this.getCat()
                },
                2000)
            })
            .catch(error => {
                console.error({ error })
            });
    }

    render() {
        if (this.state.isLoading) {
            return <div>Loading</div>
        }
        if (this.state.isAdopted) {
            return (
                <div className='cat-display is-adpoted'>
                    <h1>Was Adopted</h1>
                    <p>New cat incoming</p>
                </div>
            )
        }
        return (
            <div className='cat-display'>
                <h2>Cat</h2>
                <img src={this.state.cat.imageURL} alt='Cat' />
                <p><strong>Name:</strong> {this.state.cat.name}</p>
                <p><strong>Gender:</strong> {this.state.cat.gender}</p>
                <p><strong>Age:</strong> {this.state.cat.age} yrs</p>
                <p><strong>Breed:</strong> {this.state.cat.breed}</p>
                <p><strong>Fluffy's story:</strong> {this.state.cat.story}</p>
                <button onClick={this.handleAdoptButton}>Adopt</button>
            </div>
        );
    };
};

export default Cat;