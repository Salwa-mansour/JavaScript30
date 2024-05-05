const video = document.querySelector('.player');
const canvas = document.querySelector('.photo');
const ctx = canvas.getContext('2d');
const strip = document.querySelector('.strip');
const snap = document.querySelector('.snap');

function getVideo(){
    navigator.mediaDevices.getUserMedia({video:true,audio:false})
    .then(localMediaStream=>{
    
        video.srcObject = localMediaStream;
        video.play();
    })
    .catch(err => {
        console.log('WebPage is not allowed to use webCam !',err);
    })
}

function paintToCanvas(){
    const height = video.clientHeight + window.innerHeight;
    const width = video.clientWidth + window.innerHeight;
    canvas.width = width;
    canvas.height = height;

  return  setInterval(() => {
        ctx.drawImage(video, 0, 0,width,height);
        let pixels = ctx.getImageData(0,0,width,height);
      
        pixels = greenScreen(pixels);
        //redrow
 
        ctx.putImageData(pixels,0,0)
    }, 32);
}

function takePhoto(){
    //paly the sound
    snap.currentTime = 0
    snap.play();
    //take data out of canvas
    const data = canvas.toDataURL('image/jpeg');
    const link = document.createElement('a');
   link.href = data;
   link.setAttribute('download','pretty');
   const img = new Image();
   img.src = data;
   img.alt = 'photo of you !';
   link.appendChild(img);
//    link.innerHTML =`<img src="${data}" alt="Photo of You"/>`;
   strip.insertBefore(link ,strip.firstChild);
}

function redEffect(pixels){
    
    for(let i = 0;i<pixels.data.length; i+=4){
    // no spisific logic just play with values
    pixels.data[i + 1] = pixels.data[i + 0] + 100//r
    pixels.data[i + 0] = pixels.data[i + 1] - 50//g
    pixels.data[i + 2] = pixels.data[i + 2] * 0.5//b
       
    }
    return pixels ;
}
function rgbSplit(pixels) {
    for (let i = 0; i < pixels.data.length; i+=4) {
      pixels.data[i - 150] = pixels.data[i + 0]; // RED
      pixels.data[i + 500] = pixels.data[i + 1]; // GREEN
      pixels.data[i - 550] = pixels.data[i + 2]; // Blue
    }
    return pixels;
  }
  
  function greenScreen(pixels) {
    const levels = {};
  
    document.querySelectorAll('.rgb input').forEach((input) => {
      levels[input.name] = input.value;
    });
  console.log(levels)
    for (i = 0; i < pixels.data.length; i = i + 4) {
      red = pixels.data[i + 0];
      green = pixels.data[i + 1];
      blue = pixels.data[i + 2];
      alpha = pixels.data[i + 3];
  
      if (red >= levels.rmin
        && green >= levels.gmin
        && blue >= levels.bmin
        && red <= levels.rmax
        && green <= levels.gmax
        && blue <= levels.bmax) {
        // take it out!
        pixels.data[i + 3] = 0;
      }
    }
  
    return pixels;
  }
  
getVideo();
video.addEventListener('canplay',paintToCanvas)