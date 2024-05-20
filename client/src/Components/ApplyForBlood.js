import React, { useState, useEffect } from "react";
import '../App.css';
import ListOfDonor from "./ListOfDonor";
import EmailVerification from "./EmailVerification";
// import PhoneNumberVerification from "./PhoneNumberVerification";
// import ListOfDonor from "./ListOfDonor";
export default function ApplyForBlood() {

    const [donors, setDonors] = useState([]);
    const [currentInfo, setCurrentInfo]= useState({});
    const [submitted, setSubmitted] = useState(false);
    // console.log(donors[1])
    const [pin,setPin]= useState()

    function handleSubmit(e) {
        e.preventDefault();
        setSubmitted(true)
        const data = new FormData(e.target);
        const value = Object.fromEntries(data.entries())
        setPin(value.pincode)
        setCurrentInfo(value)
        console.log(value)
        let bloodGroup=value["bloodgroup"]
        if(bloodGroup.length>2){
            bloodGroup = bloodGroup.charAt(0) +bloodGroup.charAt(1)+ (bloodGroup.charAt(2) === "+" ? "1" : "0");
        }else{
            bloodGroup = bloodGroup.charAt(0)+ (bloodGroup.charAt(1) === "+" ? "1" : "0");
        }
        // return <ListOfDonor/>
        fetch(`https://realtime-blood-management-system.onrender.com/api/fetch?pin=${value["pincode"]}&type=${bloodGroup}`
            , {
                method: 'GET',
                mode: 'no-cors',
                headers: { 'Content-Type': 'application/json' },
                // body: JSON.stringify({pin:"271001",type:"A+"})
            }).then(
                response => response.json()
            ).then(
                data => {
                    setDonors(data)
                }
            )
        // .catch(error => console.error(error));
    }
    console.log(currentInfo.name)
    return (
        [
            <EmailVerification name={currentInfo.name}/>,
            <div class='formBox'>
                <h1 className="heading" style={{ fontSize: '7vh' }}>Apply For Blood</h1>
                <form onSubmit={handleSubmit}>
                    <label for="name">Name</label><br />
                    <input type="text" id="name" name="name" placeholder="Your name.." /><br />
                    <label for="email">Email</label><br />
                    <input type="email" id="email" name="email" placeholder="Your email.." /><br />
                    <label for="phone">Phone</label><br />
                    <input type="tel" id="phone" name="phone" placeholder="Your phone.." /><br />
                    <label for="age">Age</label><br />
                    <input type="number" id="age" name="age" placeholder="Your age.." /><br />
                    <label for="bloodgroup">Blood Group</label><br />
                    <select id="bloodgroup" name="bloodgroup">
                        <option value="A+">A+</option>
                        <option value="A-">A-</option>
                        <option value="B+">B+</option>
                        <option value="B-">B-</option>
                        <option value="AB+">AB+</option>
                        <option value="AB-">AB-</option>
                        <option value="O+">O+</option>
                        <option value="O-">O-</option>
                    </select><br />
                    <label for="hospital">Hospital</label><br />
                    <input type="text" id="hospital" name="hospital" placeholder="Hospital.." /><br />
                    <label for="city">City</label><br />
                    <input type="text" id="city" name="city" placeholder="City.." /><br />
                    <label for="state">State</label><br />
                    <input type="text" id="state" name="state" placeholder="State.." /><br />
                    <label for="country">Country</label><br />
                    <input type="text" id="country" name="country" placeholder="Country.." /><br />
                    <label for="pincode">Pincode</label><br />
                    <input type="number" id="pincode" name="pincode" placeholder="Pincode.." /><br />
                    {/* <label for="date">Date</label><br />
                    <input type="date" id="date" name="date" placeholder="Date.." /><br />
                    <label for="time">Time</label><br />
                    <input type="time" id="time" name="time" placeholder="Time.." /><br />
                    <label for="message">Message</label><br />
                    <textarea id="message" name="message" placeholder="Write something.." style={{ height: '200px' }}></textarea><br /><br /> */}
                    <input id="sub" type="submit" value="Submit" />
                </form>
            </div>,
            <ListOfDonor donors={donors} submitted={submitted} pin={pin}/>
        ]
    );
}