import React, { Component, useState, useEffect } from 'react'
import Axios from 'axios';

function Timer(props) {
   const [display, setDisplay] = useState("");

   useEffect(() => { 
        startTimer();
    }, []);

    const startTimer = () => {
        var countDownDate = new Date();
        countDownDate.setHours(countDownDate.getHours() + props.hours);
        countDownDate.setMinutes(countDownDate.getMinutes() + props.minutes);
        
        // Update the count down every 1 second
        var x = setInterval(function() {
        
          // Get today's date and time
          var now = new Date().getTime();
            
          // Find the distance between now and the count down date
          var distance = countDownDate - now;
          //console.log(distance)
            
          // Time calculations for days, hours, minutes and seconds
          var days = Math.floor(distance / (1000 * 60 * 60 * 24));
          var hours = Math.floor((distance % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
          var minutes = Math.floor((distance % (1000 * 60 * 60)) / (1000 * 60));
          var seconds = Math.floor((distance % (1000 * 60)) / 1000);
            
          // Output the result in an element with id="demo"
          setDisplay(days + "d " + hours + "h "
          + minutes + "m " + seconds + "s ");
            
          // If the count down is over, write some text 
          if (distance < 0) {
            clearInterval(x);
            setDisplay("EXPIRED");
            props.setTimerExpired();
          }
        }, 1000);
    }

	
		return (
                <div>
                    <p>{display}</p>
                </div>
        );
	
}

export default Timer;