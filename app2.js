let audio = new Audio('sounds/sadHorn.mp3');

let device;
//console.log(navigator);
if (navigator.requestMIDIAccess){
    navigator.requestMIDIAccess().then(success, failure);
}

function failure(){
    console.log('cound not connect MIDI');
}

function updateDevices(event){
    console.log(event);
}

function success(midiAccess){
    console.log(midiAccess);
    midiAccess.addEventListener('statechange', updateDevices);

    const inputs = midiAccess.inputs;
    console.log(inputs);

    for (var output of midiAccess.outputs.values()) {
        device = output;
        console.log('Output device selected', device);
    }

    inputs.forEach((input) =>{
        console.log(input);
        input.addEventListener('midimessage', handleInput);

    })
}


function handleInput(input){
    console.log(input);

    const command = input.data[0];
    const note = input.data[1];
    const velocity = input.data[2];
    console.log(command);
    console.log(note);
    console.log(velocity);

    switch (command){
        case 144:
        if (velocity > 0){
            noteOn(note);
        } else{
            noteOff(note);
        }
        break;
        case 128:
            noteOff(note);
            break;
    }
}

function noteOn(note){
    console.log(`note:${note} //on`);
    if (note == 99){
    // document.getElementById("testelm").innerHTML = "Note 99 is on"
     audioplay();
     colorAll();
    }

   // if (note == 64){
    //    document.getElementById("testelm").innerHTML = "Note 64 is On" ;
    // colorAll();
   // }

}

function noteOff(note){
    console.log(`note:${note} //off`)
    if (note == 99){
        dadAPI();
        clearColor();
        color(99,106)
        //audiopause();
        //document.getElementById("testelm").innerHTML = "Back to normal";
        
      }
    
      if (note == 64){
        clearColor();
      }
}

function color(key, clr) {
    device && device.send([0x90, key, clr]); //note on
}

function colorAll(){
    for(let i = 0; i<100; i++){
        color(i,i);
    }
}

function clearColor(){
    for( let i=0; i<100; i++){
        color(i,0);
    }

}

function audioplay(){
    audio.play();
}

function audiopause(){
    audio.pause();
}
