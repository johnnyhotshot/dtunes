var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/15_NsP5AlkPqzaT2CEZMx_MWdv1_myKxksnNYMEbhT-4/edit?usp=sharing";

//Information Variables
var videoInfo = [];
var pageTitle = document.getElementsByTagName("title")[0].innerHTML;
var apiReady = false, spreadsheetReady = false;

//Song Queue Variables
var previousSongs = [];
var currentSong = -1;
var nextSongs = [];

var player;
function onYouTubeIframeAPIReady() {
    apiReady = true;
    main();
}

function setupPlayer() {
    player = new YT.Player('player', {
        videoId: videoInfo[Math.floor(Math.random()*videoInfo.length)][1],
        height: '40',
        playerVars: {
            controls: 0
        },
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function playSong(index) {
    if(nextSongs.length > 0) {
        index = nextSongs[0];
        nextSongs.splice(0,1);
    }
    if(currentSong > 0) {
        previousSongs.splice(0,0,currentSong);
    }
    currentSong = index;
    song = videoInfo[index];
    player.loadVideoById(song[1]);
    document.getElementsByTagName("title")[0].innerHTML = pageTitle + " - " + song[0];
}

function onPlayerReady(event) {
    playSong(Math.floor(Math.random()*videoInfo.length));
}

function onPlayerStateChange(event) {
    if(event.data == 0) {
        console.log("New video");
        playSong(Math.floor(Math.random()*videoInfo.length));
    }
}

function main() {
    if(apiReady && spreadsheetReady) {
        setupPlayer();
    }
}

function previousSong() {
    nextSongs.splice(0,0,currentSong);
    currentSong = previousSongs[0];
    player.loadVideoById(videoInfo[previousSongs[0]][1]);
    document.getElementsByTagName("title")[0].innerHTML = pageTitle + " - " + videoInfo[previousSongs[0]][0];
    previousSongs.splice(0, 1);
    document.getElementById("playButton").innerHTML = "❚❚";
}

function playToggle() {
    if(player.getPlayerState() == 1) {
        player.pauseVideo();
        document.getElementById("playButton").innerHTML = "▶";
    }
    else if(player.getPlayerState() == 2) {
        player.playVideo();
        document.getElementById("playButton").innerHTML = "❚❚";
    }
}

function nextSong() {
    if(nextSongs.length == 0) {
        playSong(Math.floor(Math.random()*videoInfo.length));
    }
    else {
        playSong(nextSongs[0][1]);
    }
    document.getElementById("playButton").innerHTML = "❚❚";
}

function searchSong() {
    if(apiReady && spreadsheetReady) {
        name = document.getElementById("searchField").value.toLowerCase();
        console.log("Searching for " + name);
        for(var i = 0; i < videoInfo.length; i++) {
            if(name == videoInfo[i][0].toLowerCase()) {
                document.getElementById("searchMessage").innerHTML = "";
                name = document.getElementById("searchField").value = "";
                player.loadVideoById(videoInfo[i][1]);
                return;
            }
        }
        document.getElementById("searchMessage").innerHTML = "No song with the name " + name + " was found.";
    }
}

function getIdFromUrl(videoUrl) {
    return(videoUrl.substring(videoUrl.indexOf("v=")+2));
}

function init() {
    Tabletop.init( { key: spreadsheetUrl,
        callback: function(data, tabletop) { 
            for (var i = 0; i <     data.length; i++) {
                let link = data[i]["LINK 1"];
                if(link.indexOf("youtube.com") != -1) {
                    video = []
                    video.push(data[i]["SONG NAME"]);
                    video.push(getIdFromUrl(link));
                    videoInfo.push(video);
                }
            }
            spreadsheetReady = true;
            main();
        },
        simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init);