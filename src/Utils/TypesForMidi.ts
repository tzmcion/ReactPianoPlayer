/**
 * File consists multiple types for midi management
 * types for Midi used in all files of "/src/Helpers/MidiReader/*"
 * and used in "/src/Helpers/Blocks/updatedBlocks.ts"
 * File last updated: 09/04/2025
 */


/**
 * Type used for conversion from buffer MidiFile to MID
 * Can be interpreted as "raw Midi type"
 */
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
 * used in "/src/Helpers/MidiReader/timeSignatureValuesFromMidiFile.ts"
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

/**
 * Old Type used in "src/Helpers/getNoteEventsJSON.ts"
 * @deprecated
 */
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
 * Type used in "src/Helpers/MidiReader/createNoteEvents.ts"
 */
export interface UpdatedMidiEventType{
    delta:number,
    setTempo: {microsecondsPerQuarter:number},
    endOfTrack: boolean,
    channel: number,
    programChange: {programNumber:number},
    controlChange:{type:number,value:number},
    noteOn:{noteNumber:number,velocity:number},
    noteOff:{noteNumber:number,velocity:number},
    controlTrack: boolean,
    trackNumber:number
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

/**
 * Type for converting Midi to format appliable in this app
 */
export interface TrackNoteEvent{
    NoteNumber:number,
    Delta:number,
    Duration:number,
    SoundDuration:number,
    Velocity:number,
    TrackNumber:number
}

/**
 * @deprecated
 * blockNote used in blocks.ts
 */
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

/**
 * Type for keyInfo, used in rendering blocks in "updatedBlocks"
 */
export interface keyInfo{
    position:number,
    noteNumber:number,
    width:number,
    type:'BLACK' | 'WHITE'
}

/**
 * All the Canvas elements used to render content during playtime
 */
export interface blocks_canvases{
    mainCtx:CanvasRenderingContext2D,
    effectsCtx:CanvasRenderingContext2D,
    whiteKeyCtx:CanvasRenderingContext2D,
    blackKeyCtx:CanvasRenderingContext2D,
    KeyPressGradientCtx:CanvasRenderingContext2D
}
