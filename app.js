// https://developer.mozilla.org/en-US/docs/Web/API/MediaRecorder
// https://medium.com/@bryanjenningz/how-to-record-and-play-audio-in-javascript-faa1b2b3e49b
// https://developers.google.com/web/fundamentals/media/recording-audio

//check if browser supports getUserMedia
if (!navigator.mediaDevices || !navigator.mediaDevices.getUserMedia) {
    alert(`Your browser does not support recording!\nMake sure you’re loading the website either on 
    localhost or an HTTPS server even if you’re using a supported browser.`);
}



// Global constants
// const constraints = {, video: true};
let audioChunks = [];
let videoChunks = [];

let stream = null;
let mediaRecorder = null;

recordAudio = document.getElementById('recordButton');

recordAudio.onclick = async function(event){
    if (!stream){
        stream = await navigator.mediaDevices.getUserMedia({audio: true});
    }

    // when stream is still active
    if(stream.active){
        microphone_status = record.firstElementChild.style.color;
    
        // is recording
        if(microphone_status == "red"){
            document.getElementById("recordButton").firstElementChild.style.color = "black";
            mediaRecorder.stop();            
        }
        
        // start recording
        else{
            document.getElementById("recordButton").firstElementChild.style.color = "red";
            
            mediaRecorder = new MediaRecorder(stream);
            
            // event handling
            // stores the audio chunks (bytes) in audioChunks. Dataavailable event is raise when .stop() is called.
            mediaRecorder.addEventListener('dataavailable', function(event){
                audioChunks.push(event.data);
            });
    
            // event handling of 'stop'
            mediaRecorder.onstop = function(event){
                console.log("making data available after MediaRecorder.stop() called.");
    
                // when audio recording is stopped, save recording chunks in <audio> for playing 
                let audio = document.createElement('audio');
                audio.controls = true;
                
                // creating a single blob from the chunks
                const blob = new Blob(audioChunks, {'type' : 'audio/ogg; codecs=opus'});
                audioChunks = [];
    
                // creating a object url for download and playing in player
                const audioURL = URL.createObjectURL(blob);
    
                audio.src = audioURL;
                audio.classList = "p-2";
                audio.style.borderRadius = "5px";
    
                document.getElementsByClassName('audio-container')[0].appendChild(audio);
            }
    
    
            // reset audio player
            for (audioPlayer of document.getElementsByClassName('audio-container')[0].children){
                if (audioPlayer){
                    audioPlayer.pause();
                    audioPlayer.currentTime = 0;
                }
            }
            mediaRecorder.start();
        }
    
        console.log(mediaRecorder.state);
    }
}


// for video 