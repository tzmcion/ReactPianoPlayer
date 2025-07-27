export interface IMidiFile {
    division: number;

    format: number;

    tracks: any[][];
}

export interface  TimeSignature{
    denominator:number;
    numerator:number;
    metronome:number;
    thirtyseconds:number;
}

/**
 * @deprecated Please use timeSignatureDataProps
 */
export interface StaticMidiDataProps{
    denominator:number,
    nominator:number,
    metronome:number,
    thirtyseconds:number,
    division:number;
}

/**
 * Midi types for correct timeSignatureInterpretations
 */
export interface timeSignatureDataProps{
    division:number,
    timeSignatures:{
        delta:number,
        denominator:number,
        nominator:number,
        metronome:number,
        thirtyseconds:number,
    }[]
}

export interface MidiEventType{
    delta:number,
    setTempo: {microsecondsPerQuarter:number},
    endOfTrack: boolean,
    channel: number,
    programChange: {programNumber:number},
    controlChange:{type:number,value:number},
    noteOn:{noteNumber:number,velocity:number},
    noteOff:{noteNumber:number,velocity:number},
}

/**
 * @deprecated please use new TrackNoteEvent
 */
export interface noteEvent{
    NoteNumber:number,
    Delta:number,
    Duration:number,
    SoundDuration:number,
    Velocity:number
}

export interface TrackNoteEvent{
    NoteNumber:number,
    Delta:number,
    Duration:number,
    SoundDuration:number,
    Velocity:number,
    TrackNumber:number
}

export interface blockNote{
    color:string
    width:number
    NoteNumber:number,
    Velocity:number,
    pos_y:number,
    pos_x:number,
    height?:number,
    creationTime:number,
    pauseTime?:number,
    playingTime?:number,
    duration:number,
    detectTime?:number,
    timeWasTaken?:boolean,
    wasDetected:boolean
}

