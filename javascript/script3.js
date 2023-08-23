console.log("Welcome to Musify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/hansraj raghuwanshi/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Bholenath-Se-Pyaar", filePath: "songs/hansraj raghuwanshi/1.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "Maha-Shivratri", filePath: "songs/hansraj raghuwanshi/2.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "Main-Shiv-Ka-Hu", filePath: "songs/hansraj raghuwanshi/3.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "Main-Shiv-Ka-Hu", filePath: "songs/hansraj raghuwanshi/4.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "Mera-Bhola-He-Bhandari", filePath: "songs/hansraj raghuwanshi/5.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "O-Mera-Bhola-He-Bhandari", filePath: "songs/hansraj raghuwanshi/6.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "Parvati-Bola-Shankar-Se", filePath: "songs/hansraj raghuwanshi/7.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "Shiv-Mein-Milna-Hai", filePath: "songs/hansraj raghuwanshi/8.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "Shiv-Sama-Rhe", filePath: "songs/hansraj raghuwanshi/9.mp3", coverPath: "covers/hansraj.jpeg"},
    {songName: "Teri-Seva-Krunga", filePath: "songs/hansraj raghuwanshi/10.mp3", coverPath: "covers/hansraj.jpeg"},
]

songItems.forEach((element, i)=>{ 
    element.getElementsByTagName("img")[0].src = songs[i].coverPath; 
    element.getElementsByClassName("songName")[0].innerText = songs[i].songName; 
})
 

// Handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime<=0){
        audioElement.play();
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
        gif.style.opacity = 1;
    }
    else{
        audioElement.pause();
        masterPlay.classList.remove('fa-pause-circle');
        masterPlay.classList.add('fa-play-circle');
        gif.style.opacity = 0;
    }
})
// Listen to Events
audioElement.addEventListener('timeupdate', ()=>{ 
    //console.log('timeupdate');
    // Update Seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)* 100);
    //console.log(progress); 
    myProgressBar.value = progress;
})

myProgressBar.addEventListener('change', ()=>{
    audioElement.currentTime = myProgressBar.value * audioElement.duration/100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause-circle');
        element.classList.add('fa-play-circle');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{ 
        makeAllPlays();
        songIndex = parseInt(e.target.id);
        e.target.classList.remove('fa-play-circle');
        e.target.classList.add('fa-pause-circle');
        audioElement.src = `songs/hansraj raghuwanshi/${songIndex+1}.mp3`;
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-play-circle');
        masterPlay.classList.add('fa-pause-circle');
    })
})

document.getElementById('next').addEventListener('click', ()=>{
    if(songIndex>=9){
        songIndex = 0
    }
    else{
        songIndex += 1;
    }
    audioElement.src = `songs/hansraj raghuwanshi/${songIndex+1}.mp3`;
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
    audioElement.src = `songs/hansraj raghuwanshi/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})