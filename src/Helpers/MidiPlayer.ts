import React from "react";

import ReadMidiFile from "./ReadMidiFile";
import PlayMidiAsync from "./PlayMidiAsync";


class MidiPlayer{
    //Typescript Declarations
    private ref: React.RefObject<HTMLInputElement>
    private Midi: Object | null
    public isPlaying:boolean
    //Constructor
    constructor(fileRef: React.RefObject<HTMLInputElement>){
        this.ref = fileRef
        this.isPlaying = false;
        this.Midi = null
        this.GetMidiAsObject();
    }

    private GetMidiAsObject(){
        ReadMidiFile(this.ref).then(MidiObject =>{
            this.Midi = MidiObject;
        })
    }

    public get isReady(){
        return !(this.Midi === null || this.Midi === undefined);
    }

    public Play(onEvent:Function){
        this.Midi && PlayMidiAsync(this.Midi,onEvent);
        this.isPlaying = true;
    }

    public Pause(){

    }

    public Restart(){

    }

}

export default MidiPlayer;

