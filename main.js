const music = new Audio("./assets/audio/arjit/1.mp3");
// music.play();

//tao aray
const songs = [
    {
        id:'1',
        songName:`Anh Đã Ổn Hơn <br>
        <div class="subtitle">MCK</div>`,
        poster:`assets/img/mck.jpg`,
    },

    {
        id:'2',
        songName:`Hoàn Hảo <br>
        <div class="subtitle">B Ray</div>`,
        poster:`assets/img/bray.jpg`
    },

    {
        id:'3',
        songName:`Đánh Đổi <br>
        <div class="subtitle">B Ray</div>`,
        poster:`assets/img/obito.jpg`
    },

    {
        id:'4',
        songName:`Quá Sớm <br>
        <div class="subtitle">Low G</div>`,
        poster:`assets/img/lowg.jpg`
    },

    {
        id:'5',
        songName:`Bạn Đời <br>
        <div class="subtitle">Karik</div>`,
        poster:`assets/img/Karik.jpg`
    },

    {
        id:'6',
        songName:`Mai Linh <br>
        <div class="subtitle">24k Right</div>`,
        poster:`assets/img/24kright.jpg`
    },

    {
        id:'7',
        songName:`1-800 <br>
        <div class="subtitle">HIEUTHUHAI</div>`,
        poster:`assets/img/hieuthuhai1.jpg`
    },

    {
        id:'8',
        songName:`Free Flow Không Hút <br>
        <div class="subtitle">Ricky Star</div>`,
        poster:`assets/img/rickystar1.jpg`
    },
]

Array.from(document.getElementsByClassName('songItem')).forEach((element, i) =>{
    element.getElementsByTagName('img')[0].src = songs[i].poster;
    element.getElementsByTagName('h5')[0].innerHTML = songs[i].songName;
}) 

let masterPlay = document.getElementById('masterPlay');
let wave = document.getElementsByClassName('wave')[0];

masterPlay.addEventListener('click',() =>{
    if (music.paused || music.currentTime <=0) {
        music.play();
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
    } else {
        music.pause();
        masterPlay.classList.add('bi-play-fill');
        masterPlay.classList.remove('bi-pause-fill');
        wave.classList.remove('active2');

    }
})

const makeAllplays = () =>{
    Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
        element.classList.add('bi-play-circle-fill');
        element.classList.remove('bi-pause-circle-fill');
    })
}

const makeAllBackgrounds = () =>{
    Array.from(document.getElementsByClassName('songItem')).forEach((element)=>{
        element.style.background = "rgb(105, 105, 170, 0)";
    })
}

let index = 0;
let poster_master_play = document.getElementById('poster_master_play');
let title = document.getElementById('title');

Array.from(document.getElementsByClassName('playListPlay')).forEach((element)=>{
    element.addEventListener('click', (e)=>{
        index = e.target.id;
        makeAllplays();
        e.target.classList.remove('bi-play-circle-fill');
        e.target.classList.add('bi-pause-circle-fill');
        music.src = `audio/${index}.mp3`;
        poster_master_play = `img/${index}.jpg`;
        music.play();
        let song_title = songs.filter((ele) =>{
            return ele.id == index;
        })

        song_title.forEach(ele => {
            let{songName} = ele;
            title.innerHTML = songName;
        })
        masterPlay.classList.remove('bi-play-fill');
        masterPlay.classList.add('bi-pause-fill');
        wave.classList.add('active2');
        music.addEventListener('ended',() =>{
            masterPlay.classList.add('bi-play-fill');
            masterPlay.classList.remove('bi-pause-fill');
            wave,classList.remove('active2');
        })
        makeAllBackgrounds();
        Array.from(document.getElementsByClassName('songItem'))[`${index-1}`].style.background = "rgb(105, 105, 170, .1)"
    })
})

let currentStart = document.getElementById('currentStart');
let currentEnd = document.getElementById('currentEnd');
let seek = document.getElementById('seek');
let bar2 = document.getElementById('bar2');
let dot = document.getElementsByClassName('dot')[0];


music.addEventListener('timeupdate',() =>{
    let music_curr = music.currentTime;
    let music_dur = music.duration;

    let min = Math.floor(music_dur/60);
    let sec = Math.floor(music_dur%60);
    if (sec<10){
        sec = `0${sec}`
    }
    currentEnd.innerText = `${min}:${sec}`;

    let min1 = Math.floor(music_curr/60);
    let sec1 = Math.floor(music_curr%60);
    if(sec<10){
        sec1 = `0${sec1}`
    }
    currentStart.innerText = `${min1}:${sec1}`;

    let progressbar = parseInt(music.currentTime/music.duration)*100;
    seek.value = progressbar;
    let seekbar = seek.value;
    bar2.style.width = `${seekbar}%`;
    dot.style.left = `${seekbar}%`;
})

seek.addEventListener('change', ()=>{
    music.currentTime = seek.value * music.duration/100;
})

music.addEventListener('ended', () =>{
    masterPlay.classList.add('bi-play-fill');
    masterPlay.classList.remove('bi-pause-fill');
    wave.classList.remove('active2');
}) 

let vol_icon = document.getElementById('vol_icon');
let vol = document.getElementById('vol');
let vot_bot = document.getElementById('vol_dot');
let vol_bar = document.getElementsByClassName('vol_bar')[0];

vol.addEventListener('change', ()=>{
    if(vol.value == 0){
        vol_icon.classList.remove('bi bi-volume-down-fill');
        vol_icon.classList.add('bi bi-volume-mute-fill');
        vol_icon.classList.remove('bi bi-volume-up-fill');
    }
    if(vol.value > 0){
        vol_icon.classList.add('bi bi-volume-down-fill');
        vol_icon.classList.remove('bi bi-volume-mute-fill');
        vol_icon.classList.remove('bi bi-volume-up-fill');
    }
    if(vol.value > 50){
        vol_icon.classList.remove('bi bi-volume-down-fill');
        vol_icon.classList.remove('bi bi-volume-mute-fill');
        vol_icon.classList.add('bi bi-volume-up-fill');
    }

    let vol_a = vol.value;
    vol_bar.style.width = `${vol_a}%`;
    vol_dot.style.width = `${vol_a}%`;
    music.volume = vol_a/100;
})

