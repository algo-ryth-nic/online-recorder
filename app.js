navigator.mediaDevices.getUserMedia( {audio: true, video: false} )
    
    .then(function(stream) {

        const mediaRecorder = new MediaRecorder(stream);
        let audioChunks = [];

        recordBtn = document.getElementById('record-btn');
        
        recordBtn.onclick = function(){
            // starts the recording
            mediaRecorder.start();
            console.log(mediaRecorder.state);
            
            recordBtn.style.background = "black";
            recordBtn.style.color = "red";
        }
        

        // event handler when media starts recording
        mediaRecorder.addEventListener("start", event=>{
            let stop = document.createElement('button');
            stop.classList = 'btn btn-primary';
            stop.type = 'button';
            stop.textContent = "Stop";
            document.getElementById('jumbo').appendChild(stop);

            stop.onclick = (e) => {mediaRecorder.stop(); console.log(mediaRecorder.state);}
        });


        // saving the audio while recording
        mediaRecorder.addEventListener("dataavailable", event=>{
            audioChunks.push(event.data)
        });

        
        // event handler when media recording is stopped
        mediaRecorder.onstop = function(event){
            let audio = document.createElement('audio');
            audio.controls = true;
            
            // creating a blob from chunks
            const blob = new Blob(audioChunks, { type : 'audio/ogg; codecs=opus' });
            const audioURL = URL.createObjectURL(blob);

            audio.src = audioURL;
            console.log("recorder stopped");
            document.getElementById('jumbo').appendChild(audio);
        }
    })
    
    .catch( err => {
        console.log(err);
    });