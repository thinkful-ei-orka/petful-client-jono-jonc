import React from 'react'

function Root() {
  return (
  <div>
    <h1>Petful</h1>
    <div className='cat-display'>
      <h2>Cat</h2>
      <p><strong>Name:</strong> Fluffy</p>
      <p><strong>Gender:</strong> Female</p>
      <p><strong>Age:</strong> 2 yrs</p>
      <p><strong>Breed:</strong> Bengal</p>
      <p><strong>Fluffy's story:</strong> Thrown on the street</p>
      <button>Adopt</button>
    </div>
  </div>
  )
}

export default Root
