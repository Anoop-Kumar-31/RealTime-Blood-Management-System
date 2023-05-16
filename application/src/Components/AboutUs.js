import React from "react";
import '../App.css';
import people from './OurInfo'
function AboutUs(){
      return (
        <div className="about-us">
          {people.map((person) => (
            <div key={person.id} style={{display:'flex',width:'70%',minWidth:'680px'}}>
              <div style={{width:'30%',padding:'5vh 2vw 5vh 3vw'}}>
                <img src={person.image} alt={person.name} style={{width:'95%',border:'#E4959A solid 5px',borderRadius:'38%',boxShadow:'#756767 2px 2px 5px'}}/>
              </div>
              <div style={{width:'70%',display:'flex',flexDirection:'column',justifyContent:'space-between'}}>
                <h1 style={{marginBottom:'.5vh'}}>{person.name}</h1>
                <p style={{margin:'0'}}>{person.about}</p><br/>
                <p style={{margin:'0'}}>Phone: {person.phone}</p>
                <p style={{margin:'0'}}>Email: {person.email}</p>
                <p>Social media:</p>
                <div style={{margin:'-1vh 0 2vh 0',display:'flex',flexDirection:'row',justifyContent:'space-between',width:'20%'}}>
                  
                  <a href={person.social.linkedin} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-linkedin"></i>
                  </a>
                  <a href={person.social.github} target="_blank" rel="noopener noreferrer">
                    <i className="fab fa-github"></i>
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