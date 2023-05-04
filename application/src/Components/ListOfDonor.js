import React, { useState, useEffect } from 'react'
import '../App.css'
export default function ListOfDonor({ donors }) {

    // const [donors, setDonors] = useState([]);
    // useEffect(() => {
    //     fetch('/api/data')
    //         .then(response => response.json())
    //         .then(data => setDonors(data))
    //         .catch(error => console.error(error));
    // }, []);
    // useEffect(() => {
    //     fetch('/api')
    //         .then((response) => response.json())
    //         .then((data) => setDonors(data));
    // }, []);
    // console.log("\n\n\n\n\n")
    console.log(donors)
    if(donors.length>0){
    return (
        <div className="donors-list">
            <h1>List of Donors</h1>
            {
              donors.map(donor =>{
              return(
                  <div className="donor-card" key={donor.Name}>
                  <h2>{donor.Name}</h2>
                  <div className='donor-details'>
                    <p>PINCODE: {donor.pincode}</p>
                    <p>Blood type: {donor.Btype}</p>
                  </div>
                </div>)
              })
            }
        </div>
      );
    }else{
      return(
        <div className="donors-list">
        </div>
      )
    }
}