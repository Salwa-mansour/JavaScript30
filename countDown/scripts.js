let countdown;
const timerDisplay = document.querySelector('.display__time-left');
const endTime = document.querySelector('.display__end-time');
const buttons = document.querySelectorAll('[data-time');

function timer(seconds){
    // clear any existing timers
    clearInterval(countdown);
    const now = Date.now(); //save the starting point
    const then = now + seconds * 1000 ;// save the end time *we save them just in case function has stoped accourding to browser performance treets. 
    // display for the firest time (befor interval runs)
    displayTimeLeft(seconds);

    displayEndTime(then);
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
    const display =`${minutes}:${remaiderSeconds < 10 ?'0':''}${remaiderSeconds}`;
    timerDisplay.textContent = display;
    document.title = display;
    
}
function displayEndTime(timestamp){
    const end = new Date(timestamp);
    const hours = end.getHours();
    const adjustedHour = hours >12 ? hours - 12 : hours;
    const minutes = end.getMinutes();
    endTime.textContent = `Be Bck At ${adjustedHour}:${minutes < 10 ? '0':'' }${minutes} ${ hours > 12 ? 'PM':'AM'}`
    
}

function startTimer(){
    const seconds = parseInt(this.dataset.time);
    timer(seconds);
  
}


buttons.forEach(button =>button.addEventListener('click',startTimer));
document.customForm.addEventListener('submit',function(e){
    e.preventDefault();
    const mins = this.minutes.value;
    timer(mins * 60);
    console.log(mins)
    this.reset();

})