console.log("Welcome to Musify");

// Initialize the Variables
let songIndex = 0;
let audioElement = new Audio('songs/kk/1.mp3');
let masterPlay = document.getElementById('masterPlay');
let myProgressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif');
let masterSongName = document.getElementById('masterSongName');
let songItems = Array.from(document.getElementsByClassName('songItem'));

let songs = [
    {songName: "Aankhon Mein Teri Ajab Si", filePath: "songs/kk/1.mp3", coverPath: "covers/kk.jpg"},
    {songName: "BeetKein Lamhein", filePath: "songs/kk/2.mp3", coverPath: "covers/kk.jpg"},
    {songName: "Dil Kyun Yeh Mera ", filePath: "songs/kk/3.mp3", coverPath: "covers/kk.jpg"},
    {songName: "Humko Pyaar Hua", filePath: "songs/kk/4.mp3", coverPath: "covers/kk.jpg"},
    {songName: "Labon Ko", filePath: "songs/kk/5.mp3", coverPath: "covers/kk.jpg"},
    {songName: "Piya Aaye Na", filePath: "songs/kk/6.mp3", coverPath: "covers/kk.jpg"},
    {songName: "Pyaar Ke Pal", filePath: "songs/kk/7.mp3", coverPath: "covers/kk.jpg"},
    {songName: "Sajde Kiye Hain Lakhon", filePath: "songs/kk/8.mp3", coverPath: "covers/kk.jpg"},
    {songName: "Tu Mujhe Soch Kabhi ", filePath: "songs/kk/9.mp3", coverPath: "covers/kk.jpg"},
    {songName: "Tujhe Sochta Hoon", filePath: "songs/kk/10.mp3", coverPath: "covers/kk.jpg"},
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
        audioElement.src = `songs/kk/${songIndex+1}.mp3`;
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
    audioElement.src = `songs/kk/${songIndex+1}.mp3`;
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
    audioElement.src = `songs/kk/${songIndex+1}.mp3`;
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.currentTime = 0;
    audioElement.play();
    masterPlay.classList.remove('fa-play-circle');
    masterPlay.classList.add('fa-pause-circle');
})