console.log("Welcome to Musify");  //Welcome message to the browser's console.

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/arijit singh/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

// Array contains information about different songs,including names,filePath,coverimage.

let songs = [
    {songName: "Aaj phir tum pe pyaar aaya hai", filePath: "songs/arijit singh/1.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Agar tum sath ho", filePath: "songs/arijit singh/2.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Baaton ko teri hum bhula na sake", filePath: "songs/arijit singh/3.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Chal chal ve tu bandeya", filePath: "songs/arijit singh/4.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Har kisi ko nahi milta", filePath: "songs/arijit singh/5.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Humdard", filePath: "songs/arijit singh/6.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Muskurane ki wajah tum ho", filePath: "songs/arijit singh/7.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Tera chehra jab nazar aaye", filePath: "songs/arijit singh/8.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Tera yaar hoon main", filePath: "songs/arijit singh/9.mp3", coverPath: "covers/arijit-singh.jpg"},
    {songName: "Thodi jagah de de mujhe", filePath: "songs/arijit singh/10.mp3", coverPath: "covers/arijit-singh.jpg"},
]

//loop iterates through songsItems array,  updating cover image and song name for each song item,(based on corresponding information in the songs array.)  

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

//Handle play/pause click(add an event listener to the masterPlay button. When clicked, it toggles between playing and pausing the audio element, updating button icon and GIF.)
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){   //code checks whether audio is currently paused or currentTime is at beginning of the track.(Any con. true start playing audio).
        audioElement.play();  //start playing the audio.
        masterPlay.classList.remove('fa-play-circle');  // it shows play icon when paused and showing a pause icon when playing).
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;  // make gif  image visible(opacity means CSS property that controls the transparency or visibility of an element on a web page.)
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events(event listener updates progressBar based on current time of audio playback.Calculate progress percentage and updates the value of the progress bar to visually represent how much the audio has been played. Gives users a visual indication of current playback position in the song.)
audioElement.addEventListener('timeupdate', ()=>{ 
    //console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    // audioElement.currentTime returns the current playback time of the audio in seconds.
    //audioElement.duration returns the total duration of the audio in seconds.
    // the ratio calcualtes how much audio has been played, and multiply by 100 convert it into percentage.
    myProgressBar.value = progress;  //updates the value attribute of myProgressBar HTML element.(visualize the progress of audio on the progressBar.)
})

// handles changes in the progress bar's value.It update audio playback time based on new progress bar value. 

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

//this function resets play icons for all song item elements.

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

//adds click event listeners to all the play buttons for individual song items. When a play button is clicked, it updates the song being played, displays the corresponding song's information, and starts playback.

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id); //  extracting the id attribute from the clicked element (e.target) and converting it to an integer using parseInt(). This might be used to determine which song's play button was clicked.
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/arijit singh/${songIndex+1}.mp3`;// here we use songIndex to determine which song to play.
        masterSongName.innerText = songs[songIndex].songName; //  updates the text content of the masterSongName HTML element with the name of the song corresponding to the clicked play button.
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

//They update the song being played based on the button clicked and update the song information.

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/arijit singh/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');

})

document.getElementById('previous').addEventListener('click', ()=>{
    if(songIndex<=0){
        songIndex = 0
    }
    else{
        songIndex -= 1;
    }
    audioElement.src = `songs/arijit singh/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})