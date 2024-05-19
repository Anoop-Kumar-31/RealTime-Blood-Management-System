// import React, { useState } from 'react';
import Frames from './Frames';
import '../App.css'

// function Slider(props) {
//     const { min, max, step, value: initialValue, onChange } = props;
//     const [value, setValue] = useState(initialValue || 0);
//     const handleOnChange = (event) => {
//         const newValue = event.target.value;
//         setValue(newValue);
//         if (onChange) {
//             onChange(newValue);
//         }
//     };

//     return (
//         <div id='slidez'>
//             <img src={Frames[value].image} alt={`Frame-${value}`} style={{width:'100%'}}/>
//             <input
//                 type="range"
//                 min={min}
//                 max={max}
//                 step={step}
//                 value={value}
//                 onChange={handleOnChange}
//             />
//         </div>
//     );
// }

// export default Slider;
import React, { useState, useEffect } from "react";
import frames from "./Frames.js";

const Slider = () => {
    const [currentFrameIndex, setCurrentFrameIndex] = useState(0);
    const [isAnimating, setIsAnimating] = useState(false);
  
    useEffect(() => {
      setIsAnimating(true); // Trigger animation on frame change
  
      // Change the frame every 5 seconds
      const interval = setInterval(() => {
        setCurrentFrameIndex((currentFrameIndex + 1) % frames.length);
      }, 5000);
  
      return () => clearInterval(interval);
    }, [currentFrameIndex]);
  
    const handleAnimationEnd = () => {
      setIsAnimating(false); // Reset animation state when complete
    };
  
    return (
      <div className="slider-container">
        {frames.map((frame, index) => (
          <img
            key={index}
            src={frame.image}
            alt={`frame ${index}`}
            className={`slider-frame ${index === currentFrameIndex ? "active" : ""} ${isAnimating ? "animating" : ""}`}
            onAnimationEnd={handleAnimationEnd}
          />
        ))}
      </div>
    );
  };
  
  export default Slider;