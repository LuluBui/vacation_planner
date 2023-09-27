import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import axios from 'axios';
import Users from './Users';
import Places from './Places';
import VacationForm from './VacationForm';
import Vacations from './Vacations';

const App = ()=> {
  const [users, setUsers] = useState([]);
  const [vacations, setVacations] = useState([]);
  const [places, setPlaces] = useState([]);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/vacations');
      setVacations(response.data);
    }
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/places');
      setPlaces(response.data);
    }
    fetchData();
  }, []);

  useEffect(()=> {
    const fetchData = async()=> {
      const response = await axios.get('/api/users');
      setUsers(response.data);
    }
    fetchData();
  }, []);

  const findPopular = ()=>{
    // const pop = places.reduce((acc,cur)=> {
    // //   if(isNaN(acc.price*1)) return cur;
    // //   if(isNaN(cur.price*1)) return acc;{ vacations.filter(vacation => vacation.place_id === place.id).length }
      
    //    if(vacations.filter(vacation => vacation.place_id === cur.id).length*1>vacations.filter(vacation => vacation.place_id === acc.id).length*1){
    //      return cur;
    //    }
    //    return acc;
    // },places[0]);
    const placenum = {};
    vacations.forEach((v)=>{
      if(placenum[v.place_id] === undefined){placenum[v.place_id] = 0;}
      placenum[v.place_id]++;
    });
    let max = -1;
    let maxIDs = [];
    for (const k in placenum) {
      if(max < placenum[k]){
        max = placenum[k];
        maxIDs = [];
        maxIDs.push(k);
      }
      else if(max === placenum[k]){
        maxIDs.push(k);
      }
    }
    
    //console.log(popular);
    const popular = places.filter((p) => {
      return maxIDs.find((i) => p.id*1 === i*1);
    });
    let returnstring = '';
    popular.forEach((element) => returnstring = returnstring + ", " + element.name);
    return popular ? returnstring.substring(2) : '';
    /*
    let max = -1;
    let maxID;
    for (const k in placenum) {
      if(max < placenum[k]){
        max = placenum[k];
        maxID = k;
      }
    }
    //if(places){
    //console.log(places);
    const popular = places.find((p) => p.id*1 === maxID*1);
    //console.log(popular);
    //}
    return popular ? popular.name : '';
    */ 
  }

  const bookVacation = async(vacation)=> {
    const response = await axios.post('/api/vacations', vacation);
    setVacations([...vacations, response.data]);
  }

  const addUser = async(user)=> {
    const response = await axios.post('/api/users', user);
    setUsers([...users, response.data]);
  }
  
  const addPlace = async(place)=> {
    const response = await axios.post('/api/places', place);
    setPlaces([...places, response.data]);
  }
  const cancelVacation = async(vacation)=> {
    await axios.delete(`/api/vacations/${vacation.id}`);
    setVacations(vacations.filter(_vacation => _vacation.id !== vacation.id));
  }

  return (
    <div>
      <h1>Vacation Planner</h1>
      <p>Hottest Destination{'(s)'}: {findPopular()}</p>
      <VacationForm places={ places } users={ users } bookVacation={ bookVacation }/>
      <main>
        <Vacations
          vacations={ vacations }
          places={ places }
          users={users}
          cancelVacation={ cancelVacation }
        />
        <Users users={ users } vacations={ vacations } addUser={ addUser }/>
        <Places places={ places } vacations={ vacations } addPlace={ addPlace }/>
      </main>
    </div>
  );
};

const root = ReactDOM.createRoot(document.querySelector('#root'));
root.render(<App />);
