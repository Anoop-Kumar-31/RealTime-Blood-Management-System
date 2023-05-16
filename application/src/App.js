import React from 'react';
// import logo from './logo.svg';
import './App.css';
import{Route,Routes} from 'react-router-dom'
import LandingPage from './Components/LandingPage';
import Nav from './Components/Nav';
import ApplyForBlood from './Components/ApplyForBlood'
import Form from './Components/Form'
import AboutUs from './Components/AboutUs';
import Blogs from './Components/Blogs';
import Footer from './Components/Footer';
import ContactUs from './Components/ContactUs';
// import ListOfDonor from './Components/ListOfDonor';
function App() {
  return (
    <div>
      <Nav/>
      <Routes>
        <Route path="/" element={<LandingPage/>}/>
        <Route path="/AboutUs" element={<AboutUs/>}/>
        <Route path="/Form" element={<Form/>}/>
        <Route path="/ApplyForBlood" element={<ApplyForBlood/>}/>
        <Route path="/Blogs" element={<Blogs/>}/>
        <Route path="/ContactUs" element={<ContactUs/>}/>
        {/* <Route path='/ListOfDonor' element={<ListOfDonor/>}/> */}
        {/* <Route path="/about" element={<AboutUs/>}/> */}
      </Routes>
      {/* <LandingPage/>
      <Route path="/" element={<Nav/>}>
      <Route path="/" element={<LandingPage/>}/>
      <Route index element={<LandingPage/>}/>
      </Route> */}
      <hr/>
      <Footer/>
    </div>
  );
}

export default App;
//#FFFFFF -> #FF9BA1