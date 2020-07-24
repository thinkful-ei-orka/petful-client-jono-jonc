import React from 'react';

class Cat extends React.Component {
    render() {
        return (
            <div className='cat-display'>
                <h2>Cat</h2>
                <img src='https://images.pexels.com/photos/126407/pexels-photo-126407.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                <p><strong>Name:</strong> Fluffy</p>
                <p><strong>Gender:</strong> Female</p>
                <p><strong>Age:</strong> 2 yrs</p>
                <p><strong>Breed:</strong> Bengal</p>
                <p><strong>Fluffy's story:</strong> Thrown on the street</p>
                <button>Adopt</button>
            </div>
        );
    };
};

export default Cat;