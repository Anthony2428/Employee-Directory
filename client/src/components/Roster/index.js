import React, { useState, useEffect } from "react";
import axios from "axios";
import "./style.css"
const Roster = () => {
    let gender = "female";
    const [allEmployees, setEmployees] = useState([]);

    const sortByLastName = () => {
        let sorted = [...allEmployees]
    
        sorted.sort((a, b) => {
          if (a.name.last < b.name.last) {
            return -1
          } else if (a.name.last > b.name.last) {
            return 1
          } else {
            return 0
          }
        })
        setEmployees(sorted)
    };
    const filterByGender = () => {
        let filtered = [...allEmployees]
        let newList = [];
        filtered.map(user => { if (user.gender === gender) newList.push(user); return});
        setEmployees(newList)
    };
    
    
      useEffect(() => {
        axios.get('https://randomuser.me/api/?results=20')
          .then((users) => {
            setEmployees(users.data.results)
          })
          .catch((err) => {
            console.log(err)
          })
    
      }, [])
    
    const allJsx = allEmployees.map(employee => {
        return(

            <div key={employee.login.uuid} className='card' id='memberCard'>
                <ul id='memberInfo'>
                    <li><h3><strong>{employee.name.first} {employee.name.last}</strong></h3></li>
                    <li><img alt="User Pic" src={employee.picture.medium}></img></li>
                    <li>Phone# { employee.phone }</li>
                    <li>Cell#: { employee.cell }</li>
                    <li>Email: { employee.email }</li>
                </ul>
            </div>
        )
    })
    return (
        <div>
            <button onClick={sortByLastName}>Sort ?</button>
            <button onClick={filterByGender}>Filter ?</button>
            {allJsx}
        </div>
    );
};
export default Roster;