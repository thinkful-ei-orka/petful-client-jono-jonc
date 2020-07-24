import React from 'react';

class Dog extends React.Component {
    render() {
        return (
            <div className='dog-display'>
                <h2>Dog</h2>
                <img src='https://images.pexels.com/photos/551628/pexels-photo-551628.jpeg?auto=compress&cs=tinysrgb&dpr=1&w=500' />
                <p><strong>Name:</strong> Zeus</p>
                <p><strong>Gender:</strong> Male</p>
                <p><strong>Age:</strong> 3 yrs</p>
                <p><strong>Breed:</strong> Golden Retriever</p>
                <p><strong>Fluffy's story:</strong> Owner Passed away</p>
                <button>Adopt</button>
            </div>
        );
    };
};

export default Dog;