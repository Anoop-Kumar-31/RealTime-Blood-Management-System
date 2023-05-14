import React from "react";
import '../App.css';
import people from './OurInfo'
function AboutUs(){
      return (
        <div className="about-us">
          {people.map((person) => (
            <div key={person.id} style={{display:'flex',width:'50%',minWidth:'680px'}}>
              <div style={{width:'30%'}}>
                <img src={person.image} alt={person.name} style={{height:'20%'}}/>
              </div>
              <div style={{width:'70%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <h1>{person.name}</h1>
                <p style={{margin:'0'}}>{person.about}</p>
                <p style={{margin:'0'}}>Phone: {person.phone}</p>
                <p style={{margin:'0'}}>Email: {person.email}</p>
                <div style={{margin:'2vh 0',display:'flex',flexDirection:'row',justifyContent:'space-between',width:'40%'}}>
                  <a href={person.social.facebook} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-facebook"></i>
                  </a>
                  <a href={person.social.twitter} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-twitter"></i>
                  </a>
                  <a href={person.social.instagram} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-instagram"></i>
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      );
}
export default AboutUs;