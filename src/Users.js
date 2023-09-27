import React, { useState, useEffect } from 'react'

const Users = ({ users, vacations, addUser })=> {
    const [name, setName] = useState('');
  
    const save = (ev)=> {
      ev.preventDefault();
      const user = {
        name: name
      };
      addUser(user);
      setName('');
    }
    return (
      <div>
        <h2>Users ({ users.length })</h2>
        <ul>
          {
            users.map( user => {
              return (
                <li key={ user.id }>
                  { user.name }
                  ({ vacations.filter(vacation => vacation.user_id === user.id).length })
                </li>
              );
            })
          }
        </ul>
        <form onSubmit={ save } className='hori'>
          <input value={ name } onChange={ ev => setName(ev.target.value)}/>
          <button disabled={name === ""}>+</button>
        </form>
      </div>
    );
  };

  export default Users;