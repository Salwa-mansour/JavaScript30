const video=document.querySelector('.player__video');
const progressBar = document.querySelector('.progress__filled');
const playerButton = document.querySelector('.player__button');

let isPlaying = false;

playerButton.addEventListener('click',togglePlay);
video.addEventListener('click',togglePlay)

function togglePlay(){
    isPlaying=!isPlaying
    
    if(isPlaying){
        video.pause()
        playerButton.innerHTML='⏸'
    }else{
        video.play()
        playerButton.innerHTML='▶'
    }
}