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

export interface LastIndexOfAsync{
    LastIndex : number,
    timeElapsed: number
}