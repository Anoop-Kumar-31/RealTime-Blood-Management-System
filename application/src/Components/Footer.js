import React from 'react';
import '../App.css';
import India from './images/India.png'
const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-content">
        <div className="footer-section">
          <h3>Company Name</h3>
          <p>123 Company Street, City, Country</p>
          <p>Email: company@example.com</p>
          <p>Phone: +1234567890</p>
        </div>
        <div className="footer-section" style={{padding:'0 2vw'}}>
          <h3>Country of Origin</h3>
          <p style={{fontSize:'2.5vh'}}>INDIA</p>
          <img src={India} alt="india" style={{height:'35px',padding:'5px'}}/>
        </div>
        <div className="footer-section">
          <h3>Follow Us</h3>
          <div className="social-media-links" style={{width:'10vw'}}>
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