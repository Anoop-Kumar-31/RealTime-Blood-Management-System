import React, { useState } from "react";
export default function Form(){
    function handleSubmit(e) {
        e.preventDefault();
    }
    return(
        <div class='formBox'>
            <h1 className="heading" style={{fontSize:'7vh'}}>Register as Donor</h1>
            <form onSubmit={handleSubmit}>
                <label for="name">Name</label><br/>
                <input type="text" id="name" name="name" placeholder="Your name.."/><br/>
                <label for="email">Email</label><br/>
                <input type="email" id="email" name="email" placeholder="Your email.."/><br/>
                <label for="phone">Phone</label><br/>
                <input type="tel" id="phone" name="phone" placeholder="Your phone.."/><br/>
                <label for="age">Age</label><br/>
                <input type="number" id="age" name="age" placeholder="Your age.."/><br/>
                <label for="bloodgroup">Blood Group</label><br/>
                <select id="bloodgroup" name="bloodgroup">
                    <option value="A+">A+</option>
                    <option value="A-">A-</option>
                    <option value="B+">B+</option>
                    <option value="B-">B-</option>
                    <option value="AB+">AB+</option>
                    <option value="AB-">AB-</option>
                    <option value="O+">O+</option>
                    <option value="O-">O-</option>
                </select><br/>
                <label for="hospital">Hospital</label><br/>
                <input type="text" id="hospital" name="hospital" placeholder="Hospital.."/><br/>
                <label for="city">City</label><br/>
                <input type="text" id="city" name="city" placeholder="City.."/><br/>
                <label for="state">State</label><br/>
                <input type="text" id="state" name="state" placeholder="State.."/><br/>
                <label for="country">Country</label><br/>
                <input type="text" id="country" name="country" placeholder="Country.."/><br/>
                <label for="pincode">Pincode</label><br/>
                <input type="number" id="pincode" name="pincode" placeholder="Pincode.."/><br/>
                <label for="date">Date</label><br/>
                <input type="date" id="date" name="date" placeholder="Date.."/><br/>
                <label for="time">Time</label><br/>
                <input type="time" id="time" name="time" placeholder="Time.."/><br/>
                <label for="message">Message</label><br/>
                <textarea id="message" name="message" placeholder="Write something.." style={{height:'200px'}}></textarea><br/><br/>
                <input id="sub" type="submit" value="Submit"/>
            </form>
        </div>  
    )
}