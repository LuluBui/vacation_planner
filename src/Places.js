import React, { useState, useEffect } from 'react'

const Places = ({ places, vacations, addPlace })=> {
    const [name, setName] = useState('');
  
    const save = (ev)=> {
      ev.preventDefault();
      const place = {
        name: name
      };
      addPlace(place);
      setName('');
    }
    return (
      <div>
        <h2>Places ({ places.length })</h2>
        <ul>
          {
            places.map( place => {
              return (
                <li key={ place.id }>
                  { place.name }
                  ({ vacations.filter(vacation => vacation.place_id === place.id).length })
                </li>
              );
            })
          }
        </ul>
        <form onSubmit={ save } className='hori'>
          <input value={ name } onChange={ ev => setName(ev.target.value)}/>
          <button>+</button>
        </form>
      </div>
    );
  };

  export default Places;