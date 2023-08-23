console.log("Welcome to Musify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/atif aslam/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Dehleez Pe Mere Dil Ki Jo Rakhe Hai Tune Kadam", filePath: "songs/atif aslam/1.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "Dil Meri Na Sune", filePath: "songs/atif aslam/2.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "Jeena Jeena", filePath: "songs/atif aslam/3.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "Juda Hoke Bhi Tu Mujhme Kahin Baaki Hai", filePath: "songs/atif aslam/4.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "Kadi Te Hans Bol Ve", filePath: "songs/atif aslam/5.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "O Saathi", filePath: "songs/atif aslam/6.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "Pehli Dafa", filePath: "songs/atif aslam/7.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "Piya O Re Piya", filePath: "songs/atif aslam/8.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "Tera Hone Laga Hoon ", filePath: "songs/atif aslam/9.mp3", coverPath: "covers/atif-aslam.jpeg"},
    {songName: "Woh Lamhe Woh Baatein", filePath: "songs/atif aslam/10.mp3", coverPath: "covers/atif-aslam.jpeg"},
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
        audioElement.src = `songs/atif aslam/${songIndex+1}.mp3`;
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
    audioElement.src = `songs/atif aslam/${songIndex+1}.mp3`;
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
    audioElement.src = `songs/atif aslam/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})