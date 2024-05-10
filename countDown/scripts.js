let countdown;
const timerDisplay = document.querySelector('.display__time-left');


function timer(seconds){
    const now = Date.now(); //save the starting point
    const then = now + seconds * 1000 ;// save the end time *we save them just in case function has stoped accourding to browser performance treets. 
    // display for the firest time (befor interval runs)
    displayTimeLeft(seconds)
    //change the timer inner text 
  countdown =  setInterval(()=>{
        const secondsLeft =Math.round((then -Date.now())/1000);
       //check if we should stop it
       if(secondsLeft < 0)  {
        clearInterval(countdown);
        return;
       }
        //display it
        displayTimeLeft(secondsLeft);
    },1000)

}

function displayTimeLeft(seconds){
    const minutes = Math.floor(seconds/60);
    const remaiderSeconds = seconds % 60 ;
    const display =`${minutes}:${remaiderSeconds}`;
    timerDisplay.textContent = display;
    console.log({minutes, remaiderSeconds});
}