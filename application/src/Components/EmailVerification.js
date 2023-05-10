//send verified variable using respose
import React, { useState } from 'react';
import '../App.css';
import LOGIN from './images/LOGIN.png'
// import Pannel2 from './images/Pannel2.jpg'
const EmailVerification = (props) => {
  console.log("EmailVerification is envoked")
  const [verified, setVerified] = useState(false);
  const [email, setEmail] = useState('');
  const [otpSent, setOtpSent] = useState(false);
  const [otp, setOtp] = useState('');
  const [givenOtp,setGivenOtp] =useState(0)

  const handleChangeEmail = (e) => {
    setEmail(e.target.value);
  };

  const handleSendOTP = async () => {
    try {
      // Make an API call to your server to send the OTP
      const response = await fetch('/api/send-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email }),
      });
      console.log(response)
      if (response.ok) {
        setGivenOtp(response.otpnumber)
        console.log(response)
        setOtpSent(true);
      } else {
        // Handle error cases
        console.error('Failed to send OTP');
      }
    } catch (error) {
      // Handle error cases
      console.error('Failed to send OTP', error);
    }
  };
  const handleLogout = async (e) => {
    e.preventDefault();
    setOtpSent(false);
    setVerified(false);
  }
  const handleSubmitOTP = async (e) => {
    e.preventDefault();
    try {
      // Make an API call to your server to verify the OTP
      const response = await fetch('/api/verify-otp', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, otp }),
      });

      if (response.ok){
        setVerified(true)
        alert('OTP verified successfully!');
      } else {
        // Handle error cases
        alert('Failed to verify OTP');
      }
    } catch (error) {
      // Handle error cases
      alert('Failed to verify OTP');
    }
  };
  if (!verified) {
    return (
      <div className='Verification'>
        <div className="InsideVerification" style={{textShadow:'white 0 0 5px,white 0 0 5px',display:'flex'}}>
        <div style={{width:'50%'}}>
        <h1>Hey there,</h1><hr/>
        <p>This verification is imperative for ensuring the security of your data.<br/>
        Apologies for the inconvenience.</p><br/>
        Please verify your Email ID!
        {otpSent ? (
          <form onSubmit={handleSubmitOTP}>
            <label>
              Email:
            </label><br/>
            <input
              type="email"
              value={email}
              onChange={handleChangeEmail}
              required
            />
            &nbsp;&nbsp;&nbsp;&nbsp;
            <label>
              Enter OTP:
            </label>
            <input
              type="text"
              style={{ width: '10%' }}
              placeholder="Enter OTP"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              required
            />&nbsp;&nbsp;
            <button type="submit" style={{padding:'1vh 1vw'}}>Verify</button>
          </form>        
        ) : (
          <div >
            <label>
              Email:
            </label><br/>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={handleChangeEmail}
                required
              />&nbsp;&nbsp;
            <button onClick={handleSendOTP}>Send OTP</button>
          </div>
        )}
        </div>
        <div style={{width:'40%'}}>
        <img src={LOGIN} alt="LoginPics" style={{width:'100%',height:'auto'}} />
        </div>
      </div>
      </div>
    );
  } else {
    return (
      <div>
        <label>
              Email:
            </label><br/>
              <input
                type="email"
                value={email}
                onChange={handleChangeEmail}
                required
              />&nbsp;&nbsp;
            <button onClick={handleLogout} style={{ marginLeft: '1.5vw' }}>Change Email</button>
      </div>
    )
  }
};

export default EmailVerification;