console.log("welcome to my music player");
//variables
let songIndex = 0;
let audioElement = new Audio('1.mp3');
let masterPlay = document.getElementById('masterPlay');
let progressBar = document.getElementById('myProgressBar');
let gif = document.getElementById('gif3');
let songItems = Array.from(document.getElementsByClassName('songItem'));
let masterSongName = document.getElementById('masterSongInfo');
let songs = [
    {songName: "ThunderStuck", filePath: "1.mp3", coverPath: "covers/1.jpg"},
    {songName: "ThunderStuck", filePath: "1.mp3", coverPath: "covers/1.jpg"},
    {songName: "ThunderStuck", filePath: "1.mp3", coverPath: "covers/1.jpg"},
    {songName: "ThunderStuck", filePath: "1.mp3", coverPath: "covers/1.jpg"},
    {songName: "ThunderStuck", filePath: "1.mp3", coverPath: "covers/1.jpg"},
    {songName: "ThunderStuck", filePath: "1.mp3", coverPath: "covers/1.jpg"},
    {songName: "ThunderStuck", filePath: "1.mp3", coverPath: "covers/1.jpg"}
]

songItems.forEach((element,i) => {
    console.log(element,i);
    element.getElementsByTagName("img")[0].src = songs[i].coverPath;
    element.getElementsByClassName("songTitle")[0].innerText = songs[i].songName;
});

//audioElement.play();


//handle play/pause click
masterPlay.addEventListener('click', ()=>{
    if(audioElement.paused || audioElement.currentTime <= 0){
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause');
        gif.style.opacity = 1;
        masterSongName.innerText = songs[songIndex].songName;
    }
    else{
        audioElement.pause();
        masterPlay.classList.add('fa-circle-play');
        masterPlay.classList.remove('fa-pause');
        gif.style.opacity = 0;
    }
})


//Listen to Events 
audioElement.addEventListener('timeupdate',()=>{
    console.log('timeupdate');
    //update seekbar
    progress = parseInt((audioElement.currentTime/audioElement.duration)*100);
    console.log(progress);
    progressBar.value = progress;
});

progressBar.addEventListener('change', ()=>{
    audioElement.currentTime = progressBar.value * audioElement.duration / 100;
})

const makeAllPlays = ()=>{
    Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
        element.classList.remove('fa-pause');
        element.classList.add('fa-circle-play');
    })
}

Array.from(document.getElementsByClassName('songItemPlay')).forEach((element)=>{
    element.addEventListener('click',(e)=>{
        makeAllPlays();
        console.log(element.target);
        songIndex = parseInt(e.target.id);
        masterSongName.innerText = songs[songIndex].songName;
        e.target.classList.remove('fa-circle-play');
        e.target.classList.add('fa-pause');
        audioElement.src = '1.mp3';//'${songIndex+1}.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        gif.style.opacity = 1;
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause');
    })
})

document.getElementById('prev').addEventListener('click',()=>{
    if(songIndex<=0){
        songIndex = 0;
    }
    else{
        songIndex -= 1;
    }
        masterSongName.innerText = songs[songIndex].songName;
        audioElement.src = '1.mp3';//'${songIndex+1}.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause');
})

document.getElementById('forw').addEventListener('click',()=>{
    if(songIndex>=6){
        songIndex = 0;
    }
    else{
        songIndex += 1;
    }
    masterSongName.innerText = songs[songIndex].songName;
    audioElement.src = '1.mp3';//'${songIndex+1}.mp3';
        audioElement.currentTime = 0;
        audioElement.play();
        masterPlay.classList.remove('fa-circle-play');
        masterPlay.classList.add('fa-pause');
})