import { TimeSignature, IMidiFile, timeSignatureDataProps } from "../../Utils/TypesForMidi";

/**
 * Function extracts the timeSignature values with their corresponding deltas
 * @param file an IMidiFile
 * @returns returns array of denominator/nominator/metronome/thirtyseconds with their delta when they change
 */
const timeSignatureValuesFromMidiFile = (file:IMidiFile):timeSignatureDataProps =>{
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