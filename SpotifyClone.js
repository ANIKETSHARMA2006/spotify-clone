let currentSong= new Audio();
let songs;

function secondsToMinutesSeconds(seconds) {
if (isNaN(seconds) || seconds < 0) {
return "00:00/00:00";
}

const minutes = Math.floor(seconds / 60);
const remainingSeconds = Math.floor(seconds % 60);

const formattedMinutes = String (minutes).padStart(2, '0');
const formattedSeconds = String (remainingSeconds).padStart(2, '0');

return `${formattedMinutes}:${formattedSeconds}`;

}

async function getSong() {
  let a = await fetch("https://aniketsharma2006.github.io/spotify-clone/songs/")
  let response = await a.text();
    let div= document.createElement("div");
    div.innerHTML=response;
    let as=div.getElementsByTagName("a");
    let songs=[]
    for (let index = 0; index < as.length; index++) {
        const element = as[index];
        if(element.href.endsWith(".mp3")){
            songs.push(element.href.split("songs")[1])
        }
    }
    
    return songs;
}

const playMusic=(track)=>{
    currentSong.src="/songs/" + track
    currentSong.play()
    play.src="pause.svg"
    document.querySelector(".songInfo").innerHTML = track
    document.querySelector(".time").innerHTML = "00.00 / 00.00"
}

async function main() {
    
    songs= await getSong();

    let songUl=document.querySelector(".songList").getElementsByTagName("ul")[0];
    for (const song of songs) {
        songUl.innerHTML=songUl.innerHTML + `<li class="try grey"><img class="invert" src="music.svg" alt="music">
                            <div class="info">
                                <div class="size">${song.replaceAll("%5C"," ").replaceAll("%20"," ")}</div>
                                <div class="size">NHGamer</div>
                            </div>
                            <div class="playNow">
                            <span>Play Now</span>
                            <img class="invert" src="play.svg" alt="play button">
                            </div>
                        
         </li>`;
    }
    //attach an event lisner to each songs
    Array.from(document.querySelector(".songList").getElementsByTagName("li")).forEach(e=>{
        e.addEventListener("click", element=>{
            console.log(e.querySelector(".info").firstElementChild.innerHTML)
            playMusic(e.querySelector(".info").firstElementChild.innerHTML.trim())
            
        })
    })
    // attach an event lishner to previous play and pause
    play.addEventListener("click",()=>{
        if(currentSong.paused){
            currentSong.play()
            play.src="pause.svg"
        }
        else{
            currentSong.pause()
            play.src="play.svg"
        }
    })
    
    // Listen for timeupdate event
    currentSong.addEventListener("timeupdate", ()=>{
        console.log(currentSong.currentTime,currentSong.duration);
        document.querySelector(".time").innerHTML=`${secondsToMinutesSeconds(currentSong.currentTime)}/${secondsToMinutesSeconds(currentSong.duration)}`
        document.querySelector(".circle").style.left=(currentSong.currentTime/currentSong.duration)*100 + "%";
    })
    //add event lisner to seekbar
    document.querySelector(".seekBar").addEventListener("click",e=>{
        let percent=(e.offsetX/e.target.getBoundingClientRect().width)*100;
        document.querySelector(".circle").style.left= percent + "%";
        currentSong.currentTime = ((currentSong.duration)*percent)/100
    })
    //add an event lisner to previous and next 
    previous.addEventListener("click", ()=>{
        let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if(index-1>=0){
            playMusic(songs[index-1])
        }
    })
    next.addEventListener("click", ()=>{
        let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if(index+1<=songs.length){
            playMusic(songs[index+1])
        }
    })
    //first song
    let f=document.querySelector(".btn");
    f.addEventListener("click",()=>{
        playMusic(songs[0])
    })
    //secound song
    document.querySelector(".btn2").addEventListener("click",()=>{
        playMusic(songs[1])
    })
    //third song
    document.querySelector(".btn3").addEventListener("click",()=>{
        playMusic(songs[2])
    })
    //fourth song
    document.querySelector(".btn4").addEventListener("click",()=>{
        playMusic(songs[3])
    })
    //fiveth song
    document.querySelector(".btn5").addEventListener("click",()=>{
        playMusic(songs[4])
    })
    //sixth song
    document.querySelector(".btn6").addEventListener("click",()=>{
        playMusic(songs[5])
    })
    //seventh song
    document.querySelector(".btn7").addEventListener("click",()=>{
        playMusic(songs[6])
    })
    //eaight song
    document.querySelector(".btn8").addEventListener("click",()=>{
        playMusic(songs[7])
    })
    //nineth song
    document.querySelector(".btn9").addEventListener("click",()=>{
        playMusic(songs[8])
    })
    //tenth song
    document.querySelector(".btn10").addEventListener("click",()=>{
        playMusic(songs[9])
    })
    //
    document.querySelector(".btn11").addEventListener("click",()=>{
        playMusic(songs[10])
    })
    //
    document.querySelector(".btn12").addEventListener("click",()=>{
        playMusic(songs[11])
    })
    //
    document.querySelector(".btn13").addEventListener("click",()=>{
        playMusic(songs[12])
    })
    //
    document.querySelector(".btn14").addEventListener("click",()=>{
        playMusic(songs[13])
    })
    //
    document.querySelector(".btn15").addEventListener("click",()=>{
        playMusic(songs[14])
    })
    //add an lisner to arrow button
    leftarrow.addEventListener("click",()=>{
        let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if(index-1>=0){
            playMusic(songs[index-1])
        }
    })
    rightarrow.addEventListener("click",()=>{
        let index=songs.indexOf(currentSong.src.split("/").slice(-1)[0])
        if(index+1<=songs.length){
            playMusic(songs[index+1])
        }
    })
    //add an lisner to volume
    document.getElementsByTagName("input")[0].addEventListener("change",(e)=>{
        currentSong.volume= parseInt(e.target.value)/100
    })

    
}
main();
