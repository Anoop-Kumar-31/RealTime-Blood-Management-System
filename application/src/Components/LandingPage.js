import React, { useEffect, useState } from 'react';
import picture from '../images/PicFront.jpg'
import SuperHero from './images/SuperHero.png'
import bloodDonor from './images/bloodDonor.png'
import '../App.css'
// import Slider from './Slider'
function LandingPage(){
  const [isAboveThreshold, setIsAboveThreshold] = useState(false);
  const [aniDone,setAniDone]=useState(false);
  useEffect(() => {
    const handleScroll = () => {
      const element = document.getElementById('hero');
      const rect = element.getBoundingClientRect();
      const viewportHeight = window.innerHeight;
      const elementTopPercentage = (rect.top / viewportHeight) * 100;
      setIsAboveThreshold(elementTopPercentage<80);
    };
    window.addEventListener('scroll', handleScroll);
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);
  
  const elementStyle = {
    transform: isAboveThreshold ? 'translate(0%, -14%)' : 'translate(67%, 17%)',
    transition: 'transform 1.5s ease',
    width:'43%',
    position:'absolute'
  };
  setTimeout(()=>{
    setAniDone(isAboveThreshold?true:false)
  },2000)
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
                  <img src={picture} alt="" className='img' style={{height:"30vw",borderRadius:"48%",zIndex:'-1',} }/>
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
            <div className='mainBody'>
              <h1 className='heading' style={{borderRight:'#E4959A solid 4px',paddingRight:'2vw'}}>Help Us To Save Lifes</h1>
              <div className='donation'>
                <div className='area1'>
                  <h1 style={{textShadow:'#CDB0B2 1px 1px 1px'}}>Be Someones HERO</h1>
                  <p style={{lineHeight:'3.5vh',color:'#c28084'}}>Becoming a blood donor means becoming someone's hero. Every year, millions of people around the world are in need of blood transfusions due to illness, surgery, or accidents. Blood donations save lives and ensure that patients receive the critical care they need. <br/>
                  By registering as a blood donor on our blood management website, you have the power to make a difference and become a hero to someone in need. The process of donating blood is simple, safe, and takes only a short amount of time. Your donation could help save the life of a child battling cancer, a mother undergoing a difficult childbirth, or a loved one who has been in a serious accident. By donating blood, you are giving the gift of life to someone who desperately needs it.<br/>
                  So, be someone's hero today and join our blood management website as a donor. Together, we can make a difference in the lives of those who need it most.</p>
                  </div>
                <div className={`area2` }><img src={SuperHero} className={`${aniDone?'heroClass':''}`} id='hero' alt="superHero" style={elementStyle}/></div>
                {/*transform:'translate(0%,-14%)'*/}
                <div className='area3'><img src={bloodDonor} alt="bloodDonor" style={{width:'100%',paddingLeft:'1vw'}}/></div>
                <div className='area4' style={{textShadow:'rgb(255,255,255) 0 0 3px'}}>
                  <h1 style={{textShadow:'#CDB0B2 1px 1px 1px',color:'#d48c91'}}>Help they need, you are indeed!</h1>
                  <p style={{lineHeight:'3.5vh',color:'#c28084'}}>Blood donation is a selfless act of kindness that can have a significant impact on someone's life. Many people in our communities need blood transfusions due to various medical conditions, injuries, and accidents. Unfortunately, the supply of blood is often scarce, making it challenging to meet the demand.<br/>By donating blood, you can help bridge this gap and provide the help that these individuals desperately need. Your donation can make a lifesaving difference to someone in need, whether it's a young child undergoing cancer treatment, a patient with a chronic illness, or someone who has been in a severe accident. Your contribution can mean the difference between life and death, and you can be the hero that makes it all possible.<br/>So, if you are looking for a way to help those in need, donating blood is an excellent place to start. You can make a positive impact on someone's life and be the reason for their smile. Help they need, you are indeed.</p> </div>
              </div>
            </div>
            // <div className='App'>
            //     <Slider min={0} max={2} step={1}/>
            // </div>
        ]
    )
}
export default LandingPage;