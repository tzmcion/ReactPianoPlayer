import { TimeSignature, IMidiFile, timeSignatureDataProps } from "../../Utils/TypesForMidi";

/**
 * Function extracts the timeSignature values with their corresponding deltas
 * LAST CHANGE: 28/07/2025
 * @param file an IMidiFile
 * @returns returns array of denominator/nominator/metronome/thirtyseconds with their delta when they change
 */
const timeSignatureValuesFromMidiFile = (file:IMidiFile):timeSignatureDataProps =>{
    //Check if MIDI file is in format 0 or 1, otherwise throw error as format 2 is not supported (f2 is very old)
    if(file.format === 2)
        throw new Error("Obesolete MIDI file used, not supported", {cause:"MIDI file is of has Type/Format 2, which requires tracks to not be played simultaneously. Please, convert you MIDI to Format 0 or 1, as it is the same as Format 2, but compressed to single track"})
    const time_signatures:timeSignatureDataProps['timeSignatures'] = [];
    let denominator = 0, nominator = 0,metronome = 0,thirtyseconds = 0;
    file.tracks.map(track =>{
        for(let x = 0; x < track.length; x++){
            if('timeSignature' in track[x]){
                const TimeSignatureData = (track[x].timeSignature as TimeSignature)
                if('denominator' in track[x].timeSignature){
                    denominator = TimeSignatureData.denominator; 
                }
                if('numerator' in track[x].timeSignature){
                    nominator = TimeSignatureData.numerator;
                }
                if('metronome' in track[x].timeSignature){
                    metronome = TimeSignatureData.metronome;
                }
                if('thirtyseconds' in track[x].timeSignature){
                    thirtyseconds = TimeSignatureData.thirtyseconds;
                }
                time_signatures.push({
                    delta:track[x].delta,
                    denominator:denominator,
                    nominator:nominator,
                    metronome:metronome,
                    thirtyseconds:thirtyseconds
                })
            }
        }
        return null;
    })
    return {
        division: file.division,
        timeSignatures: time_signatures
    };
}

export default timeSignatureValuesFromMidiFile;