var spreadsheetUrl = "https://docs.google.com/spreadsheets/d/15_NsP5AlkPqzaT2CEZMx_MWdv1_myKxksnNYMEbhT-4/edit?usp=sharing";

var videoIDs = [];

var player;
      function onYouTubeIframeAPIReady() {
        player = new YT.Player('player', {
          videoId: videoIDs[0],
          events: {
            'onReady': onPlayerReady
          }
        });
      }

      function onPlayerReady(event) {
        event.target.playVideo();
      }

function main() {
	console.log(videoIDs);
}

function init() {
  Tabletop.init( { key: spreadsheetUrl,
    callback: function(data, tabletop) { 
        for (var i = 0; i < data.length; i++) {
            let link = data[i]["LINK 1"];
            if(link.indexOf("youtube.com") != -1) {
                videoIDs.push(link.substring(link.indexOf("v=")+2));
            }
        }

        main();
    },
    simpleSheet: true } );
}

window.addEventListener('DOMContentLoaded', init);