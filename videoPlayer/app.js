//  Get out elemnts
const player = document.querySelector('.player');
const video = player.querySelector('.viewer');
const progress = player.querySelector('.progress');
const progressBar = player.querySelector('.progress__filled');
const fullScreenBtn = player.querySelector('.fullScreen')

const playButton = player.querySelector('.player__button');//toggle
const skipButtons = player.querySelectorAll('[data-skip]');
const ranges = player.querySelectorAll('.player__slider');

// Build out functions
function togglePlay(){
    if(video.paused){
        video.play()
    }else{   
        video.pause()
    }
}

function updateButton(){
   const icon = this.paused ? '▶':'⏸';
   playButton.textContent = icon;
}

function skip(){
   video.currentTime += parseFloat(this.dataset.skip);
}

function handleRangeUpdate(){
video[this.name] = this.value;
}

function handleProgress(){
    const percent =(video.currentTime/video.duration)*100;
    progressBar.style.flexBasis = `${percent}%`;

}

function scrub(e){
    const scrubTime = (e.offsetX / progress.offsetWidth) * video.duration;
    video.currentTime = scrubTime;
}

function fullScreen(){
    video.requestFullscreen() 
}

// hook up the event listners
playButton.addEventListener('click',togglePlay);
video.addEventListener('play',updateButton);
video.addEventListener('pause',updateButton);
video.addEventListener('click',togglePlay);
video.addEventListener('timeupdate',handleProgress);
fullScreenBtn.addEventListener('click',fullScreen)

skipButtons.forEach(button=>button.addEventListener('click',skip));
ranges.forEach(range=>range.addEventListener('change',handleRangeUpdate));
let mousedown = false;
progress.addEventListener("click",scrub);
progress.addEventListener("mousemove",(e)=> mousedown && scrub(e));
progress.addEventListener("mousedown",()=> mousedown = true);
progress.addEventListener("mouseup",()=> mousedown = false);