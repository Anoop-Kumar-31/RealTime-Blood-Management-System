import React from 'react'
import picture from '../images/PicFront.jpg'
import '../App.css'
import Slider from './Slider'
function LandingPage(){
    return(
        [
            <div className='mainBody'>
              <div className='left'>
                <h1 className='heading'>Be the reason for someone’s heartbeat</h1>
                <div style={{width:'65%',margin:'0 0 5vh 0'}}><p>Hello this is sample text. Hello. Hello this is sample text. Hello this is sample text. Hello this is sample text. Hello this is sample text. Hello this is sample text. Hello this is sample text. Hello this is sample text. </p></div>
                <div style={{padding:'0 0 0 2vw', display:'flex',alignContent:'auto'}}>
                <a href="/Form"><button className='butt'>Register as Donor</button></a>
                <a href="/ApplyForBlood"><button className='butt'> Apply for Blood</button></a>
                </div>
              </div>
              <div className='right'>
                  <img src={picture} alt="" style={{height:"30vw",borderRadius:"48%",zIndex:'-1',}}/>
                  <div className='smallBox'>
                    <h3 style={{margin:'1vh 5px'}}>Services we provide are </h3>
                      <ul>
                        <li >Fast and efficient.</li>
                        <li>Safe and secure.</li>
                        <li>Easy to use.</li>
                      </ul>
                  </div>
              </div>
            </div>,
            // <div className='App'>
            //     <Slider min={0} max={2} step={1}/>
            // </div>
        ]
    )
}
export default LandingPage;