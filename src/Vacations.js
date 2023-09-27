import React, { useState, useEffect } from 'react'

const Vacations = ({ vacations, places, users, cancelVacation })=> {
    return (
      <div>
        <h2>Vacations ({ vacations.length })</h2>
        <ul>
          {
            vacations.map( vacation => {
              const place = places.find(place => place.id === vacation.place_id);
              const usr = users.find(u => u.id === vacation.user_id);
              return (
                <li key={ vacation.id }>
                  <div> 
                  { usr ? usr.name : '' }
                  </div> 
                  { new Date(vacation.created_at).toLocaleString() }
                  <div> 
                    to { place ? place.name : '' }
                  </div>
                  <div> 
                    Note : { vacation.note }
                  </div>
                  <button onClick={()=> cancelVacation(vacation)}>Cancel</button>
                </li>
              );
            })
          }
        </ul>
      </div>
    );
  };

  export default Vacations;