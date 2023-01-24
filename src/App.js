import { Fragment, useEffect, useState } from "react";
import Person from "./Person";
import users from './celebrities.json'
function App() {
  const[data , setData]=useState([]);

  useEffect(()=>{
     setData(users)   
  },[])

  const deleteUser=(id)=>{
    const newData = data.filter(user=>user["id"]!=id)
    setData(newData)
  }

  const editUser=(obj , id)=>{
    const newData = data.map(user=>{
      if(user.id==id){
        return obj;
      }
      return user;
    })
    setData(newData)
  }

  return (
    <Fragment>
      {data && data.map(user=>(<Person key={user["id"]} editUser={editUser} deleteUser={deleteUser} data={user}/>))}
    </Fragment>

  );
}

export default App;
