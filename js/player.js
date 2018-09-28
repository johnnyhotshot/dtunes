var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/15_NsP5AlkPqzaT2CEZMx_MWdv1_myKxksnNYMEbhT-4/edit?usp=sharing";

var videoIDs = [];

var apiReady = false, spreadsheetReady = false;

var player;
function onYouTubeIframeAPIReady() {
    apiReady = true;
    main();
}

function setupPlayer() {
    player = new YT.Player('player', {
        videoId: videoIDs[0],
        events: {
            'onReady': onPlayerReady,
            'onStateChange': onPlayerStateChange
        }
    });
}

function onPlayerReady(event) {
    event.target.playVideo();
}

function onPlayerStateChange(event) {
    if(event.data == 0) {
        player.loadVideoById(videoIDs[Math.floor(Math.random()*videoIDs.length)]);
    }
}

function main() {
    if(apiReady && spreadsheetReady) {
        setupPlayer();
        console.log(videoIDs);
    }
}

function init() {
    Tabletop.init( { key: spreadsheetUrl,
        callback: function(data, tabletop) { 
            for (var i = 0; i <     data.length; i++) {
                let link = data[i]["LINK 1"];
                if(link.indexOf("youtube.com") != -1) {
                    videoIDs.push(link.substring(link.indexOf("v=")+2));
                }
            }
            spreadsheetReady = true;
            main();
        },
        simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init);