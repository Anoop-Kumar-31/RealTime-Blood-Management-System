import React from 'react';
import '../App.css';
import India from './images/India.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3 style={{lineHeight:'3vh'}}>HeartBeat Pvt. Limited</h3>
          <p>Chandigarh University, Mohali -140413</p>
          <p>Email: heatbeat@healthcare.com</p>
          <p>Phone: +91 987-654-3210</p>
        </div>
        <div className="footer-section" style={{padding:'0 2vw'}}>
          <h3 style={{lineHeight:'3vh'}}>Country of Origin</h3>
          <p style={{fontSize:'2.5vh'}}>INDIA</p>
          <img src={India} alt="india" style={{height:'35px',padding:'5px'}}/>
        </div>
        <div className="footer-section">
          <h3 style={{lineHeight:'5vh'}}>Follow Us</h3>
          <div className="social-media-links" style={{width:'15vw'}}>
            <a href="https://www.linkedin.com" target="_blank" rel="linkedin">
              <i className="fab fa-linkedin"></i>
            </a>
            <a href="https://www.twitter.com" target="_blank" rel="twitter">
              <i className="fab fa-twitter"></i>
            </a>
            <a href="https://www.facebook.com" target="_blank" rel="facebook">
              <i className="fab fa-facebook"></i>
            </a>
          </div>
        </div>
      </div>
      <p className="footer-bottom">© 2023 Your Website. All rights reserved.</p>
    </footer>
  );
};

export default Footer;