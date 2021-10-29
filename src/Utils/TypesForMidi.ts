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

export interface StaticMidiDataProps{
    denominator:number,
    nominator:number,
    metronome:number,
    thirtyseconds:number,
    division:number;
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

export interface noteEvent{
    NoteNumber:number,
    Delta:number,
    Duration:number,
    SoundDuration:number,
    Velocity:number
}

export interface blockNote{
    color:string
    width:number
    NoteNumber:number,
    Velocity:number,
    pos_y:number,
    pos_x:number,
    height?:number,
    duration:number,
    wasDetected:boolean
}

