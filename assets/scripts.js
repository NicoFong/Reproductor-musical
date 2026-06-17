/* Canciones */

const canciones = [ {
    nombre: "Howl's Moving Castle",
    album: "Merry go round of Life cover by Grissini Project",
    artista: "Grissini Project",
    cancion: "plays/Howl's Moving Castle - Merry go round of Life cover by Grissini Project - Grissini Project.mp3" ,
    imagen: "assets/img/castillo-vagabundo.jfif",
    },
    {
    nombre: "子宮",
    album: "頭痛",
    artista: "Khaki" ,
    cancion: "plays/子宮.mp3" ,
    imagen: "assets/img/khaki.jfif",
    },{
    nombre: "La Dosis Perfecta",
    album: "A la Izquierda de la Tierra",
    artista: "panteon Rococo" ,
    cancion: "plays/La Dosis Perfecta.mp3" ,
    imagen: "assets/img/panteon rococo.jfif",
    },{
    nombre: "La Costa Del Silencio ",
    album: "Gaia",
    artista: "Mago De Oz",
    cancion: "plays/Mago De Oz - La Costa Del Silencio.mp3" ,
    imagen: "assets/img/mago de oz.jfif",
    },{
    nombre: "Bang Bang (My Baby Shot Me Down)",
    album: "How Does That Grab You?",
    artista: "Nancy Sinatra" ,
    cancion: "plays/Nancy Sinatra - Bang Bang (My Baby Shot Me Down).mp3" ,
    imagen: "assets/img/Bang Bang.jpg",
    },{
    nombre: "Roi",
    album: "Euphories",
    artista: "VIDEOCLUB" ,
    cancion: "plays/VIDEOCLUB  Roi.mp3" ,
    imagen: "assets/img/roi.jpg",
    },{
    nombre: "Espiral",
    album: "Donde los ponys pastan",
    artista: "Porter" ,
    cancion: "plays/Espiral-Porter.mp3" ,
    imagen: "assets/img/porter.webp",
    }


]

/* constantes */ 

const playBtn = document.getElementById("playBtn");
const player = document.getElementById("player");
const progress = document.getElementById("progress");
const playList = document.getElementById("playList");
const Previous= document.getElementById("Previous");
const next= document.getElementById("next");
const shuffleBtn = document.getElementById("Shuffle");
const currentTimeEl = document.getElementById("currentTime");
const totalTimeEl = document.getElementById("totalTime");
const img = document.querySelector(".descripcionSong img");
const nameSong= document.getElementsByClassName("nameSong");
const nameAlbum= document.getElementsByClassName("nameAlbum");
const artist= document.getElementsByClassName("artist");
let currentSong = 0;
let lastsong =  canciones.length  -1;
let shuffleOn = false;
let shuffleQueue = [];

function formatTime(seconds){
    if(isNaN(seconds)) return "0:00";
    const m = Math.floor(seconds / 60);
    const s = Math.floor(seconds % 60);
    return m + ":" + (s < 10 ? "0" : "") + s;
}

function getNextSong(){
    if(shuffleOn){
        if(shuffleQueue.length === 0){
            shuffleQueue = [...Array(canciones.length).keys()].filter(i => i !== currentSong).sort(() => Math.random() - 0.5);
        }
        return shuffleQueue.pop();
    }
    let next = currentSong + 1;
    return next > lastsong ? 0 : next;
}

 /* ----------------x BOTONES x---------------- */

        /* reproducir cancion*/

function  loadSong(i){ 
        currentSong = i;
        player.src = canciones[i].cancion
        img.src = canciones[i].imagen
        nameSong[0].textContent =  canciones[i].nombre
        nameAlbum[0].textContent =  canciones[i].album
        artist[0].textContent =  canciones[i].artista
        player.load();
        player.play();
}

/* boton de pausa o reproducir*/
playBtn.addEventListener("click", function(){

    if (player.src === "") {
        loadSong(0);
        playBtn.textContent = "⏸"
    } else if( player.paused) 
        {   player.play();
            playBtn.textContent = "⏸"
    } else {
        player.pause();
        playBtn.textContent = "▶"
        }

    });
        /* reproduce la que sigue cuando acabe la cancion */
player.addEventListener("ended", function(){
    currentSong = getNextSong();
    loadSong(currentSong);
    playBtn.textContent = "⏸"
});

    /* cancion anterior*/
Previous.addEventListener("click", function(){
    currentSong --;
  if (currentSong < 0) {
        loadSong(lastsong);
    } 
    loadSong(currentSong);
    playBtn.textContent = "⏸"

}
)
 /* cancion siguente */
next.addEventListener("click", function(){
    currentSong = getNextSong();
    loadSong(currentSong);
    playBtn.textContent = "⏸"
})
/* ----------------X  barra de progreso X----------------*/

player.addEventListener("timeupdate", function(){ 
    if (player.duration) {
        const porcent = (player.currentTime / player.duration) * 100;
        progress.value = porcent;
        currentTimeEl.textContent = formatTime(player.currentTime);
        totalTimeEl.textContent = formatTime(player.duration);
    }
})

player.addEventListener("loadedmetadata", function(){
    totalTimeEl.textContent = formatTime(player.duration);
})

shuffleBtn.addEventListener("click", function(){
    shuffleOn = !shuffleOn;
    shuffleQueue = [];
    shuffleBtn.classList.toggle("active", shuffleOn);
})
        /*nav egacion en barra de progreso */
progress.addEventListener("click", function(e){
    let positionMouse =  e.offsetX;
    let progresswidth =  progress.clientWidth;
    let progressPercent =  positionMouse/progresswidth
    player.currentTime = progressPercent * player.duration
})


/* ----------------x CREAR PLAYLIST x---------------- */

canciones.forEach((valor,i) =>{
    let li = document.createElement('li');
    playList.appendChild(li)
    li.classList.add("listElement") 

    li.innerHTML = `      
        <button class="btnPlaylist">      
            <div class="listText">
                <p>${valor.nombre}</p>
                <p>${valor.album}</p>
                <p>${valor.artista}</p>
                
            </div>
            <img src="${valor.imagen}" alt="" class="listImg" width="50px">
        </button> `
/* cambiar cancion desde la playlist */

let btnPlaylist = li.querySelector(".btnPlaylist");
btnPlaylist.addEventListener("click", ()=>{
        currentSong = i;
        loadSong(currentSong);
})
})
    /* 
   let li = document.createElement('li');
    let p = document.createElement('p');
    
    p.textContent = `${valor.nombre} - ${valor.album} - ${valor.artista}`;
    li.appendChild(p);
    li.classList.add("song") 
    playList.appendChild(li)  */

/* ----------------x aleatorio x----------------  


shuffleBtn.addEventListener("click",()=> {
shuffleBtn.classList.toggle("on")
console.log(shuffleBtn.classList)
if(shuffleBtn.classList.contains("on")){
   shuffle = 
}else{
    shuffle = null
}
}
)
*/


