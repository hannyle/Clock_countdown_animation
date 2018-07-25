window.onload = () =>{
    let dDay = new Date("December 31, 2018 00:00:00");
    startTimer('clock', dDay);
}
//update the countdown time to show on the clock
updateTimer = (dDay) =>{
    let time = dDay - new Date(); //in milliseconds
    return {
        'days': Math.floor(time/(1000*60*60*24)),
        'hours': Math.floor((time/(1000*60*60)) %24),
        'minutes': Math.floor((time/1000/60) % 60),
        'seconds': Math.floor((time/1000) % 60),
        'total': time
    }
}
//animate the clock
animateClock = (span) => {
    span.className = "turn";
    setTimeout(function(){
        span.className = "";
      }, 1000);
}

//get the countdown time from function updateTimer and include the animation
startTimer = (clockId, dDay) => {
    const clockElements = document.getElementById(clockId);
    const clockText = document.getElementById("clock-text");
    let timerInterval = setInterval(() => {        
        const timer = updateTimer(dDay);
        clockElements.innerHTML = '<span>' + timer.days + '</span>' + 
                                '<span>' + timer.hours + '</span>' + 
                                '<span>' + timer.minutes + '</span>' + 
                                '<span>' + timer.seconds + '</span>';
        
        
        if(timer.total < 1){
            clearInterval(timerInterval);
            clockElements.innerHTML = '<span>0</span><span>0</span><span>0</span><span>0</span>';
        }

        //animation
        const spans = clockElements.getElementsByTagName('span');
        //animate every second
        animateClock(spans[3]);
        //animate the minute when the seconds reach 60
        if(timer.seconds == 59) {
            animateClock(spans[2]);
        }
        //animate the hour when both the minutes and the seconds reach 60
        if(timer.minutes == 59 && timer.seconds == 59) {
            animateClock(spans[1]);
        }
        //animate the day when the hours, the minutes, and the seconds reach 60
        if(timer.seconds == 59 && timer.minutes == 59 && timer.hours == 23){
            animateClock(spans[0]);
        }
        //add Text below the clock
        clockText.innerHTML = '<span>Days</span>' +
                                '<span>Hours</span>' + 
                                '<span>Minutes</span>' +
                                '<span>Seconds</span>';                     
    }, 1000);   
}

