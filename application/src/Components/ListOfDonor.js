import React, { useState, useEffect } from 'react'
import '../App.css'

export default function ListOfDonor(props) {  
  var Recommenation = []
  for(let i=0;i<Recommenation.length;i++){
    Recommenation.pop()
  }
  // console.log("recommedation value: ",Recommenation)
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
    // console.log(props)
    // console.log(props["donors"])
    // console.log(props["pin"])
    // console.log(props["submitted"])
  if (props["submitted"]) {
    if (props["donors"].length > 0) {
      return (
        <div className="donors-list">
          <h1>List of Donors</h1>
          {
            props["donors"].map(donor => {
              if (donor.pincode == props["pin"]) {
                return (
                  <div className="donor-card" key={donor.name}>
                    <h2>{donor.name}</h2><hr/>
                    <div className='donor-details'>
                      <p>Email: {donor.Email}</p>
                      <p>Phone Number: {donor.phone}</p>
                      <p>Address: {donor.Address}</p>
                      <p>PINCODE: {donor.pincode}</p>
                      <p>Blood type: {donor.BloodGrp}</p>
                    </div>
                  </div>)
              } else {
                Recommenation.push(donor)
              }
            })
          }
          <h1>Recommenation</h1>
          {
            Recommenation.map(donor => {
              return (
                <div className="donor-card" key={donor.name}>
                  <h2>{donor.name}</h2><hr/>
                  <div className='donor-details'>
                    <p>Email: {donor.Email}</p>
                    <p>Phone Number: {donor.phone}</p>
                    <p>Address: {donor.Address}</p>
                    <p>PINCODE: {donor.pincode}</p>
                    <p>Blood type: {donor.BloodGrp}</p>
                  </div>
                </div>)
            })
          }
        </div>
      );
    } else {
      return (
        <div className="donors-list" style={{ display: 'flex', justifyContent: 'center', color: 'red' }}>
          No Eligible Donor at this location!
        </div>
      )
    }
  } else {
    return (
      <div className="donors-list" style={{ display: 'flex', justifyContent: 'center' }}>
        List of donors will be shown below
      </div>
    )
  }
}