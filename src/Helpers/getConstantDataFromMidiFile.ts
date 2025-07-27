/**
 * !!
 * !! FUNCTION DEPRECATED 
 * !!
 */

import { TimeSignature, IMidiFile, StaticMidiDataProps } from "../Utils/TypesForMidi";
/**
 * Funtion extracts from MIDI file a single denominator,nominator,metronome and thirtyseconds.
 * @deprecated Please use function "timeSignatureValuesFromMidiFile". This tot recomended for usage, function assumes that there is only one timeSignature specification in whole MIDI file.
 * @param file an file after ParseArrayBuffer function.
 * @returns an object which specifies the value of denominator, numerator, metronome and thirtyseconds
 */
export default function getConstantDataFromMidiFile(file:IMidiFile):StaticMidiDataProps{
    const division = file.division;
    let denominator = 0, nominator = 0,metronome = 0,thirtyseconds = 0;
    file.tracks.map(track =>{
        for(let x = 0; x < track.length; x++){
            if('timeSignature' in track[x]){
                if(denominator != 0){
                    throw new Error("Playing tempo will be incorrect!. Application uses deprecated function, which assumes insrted MIDI file does not have more than one timeSignature change. Inserted MIDI has more than one timeSignature change, which causes this error. Please use function \"timeSignatureValuesFromMidiFile\" instead.");
                }
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
            }
        }
        return null;
    })
    return{
        denominator: denominator,
        nominator: nominator,
        metronome: metronome,
        thirtyseconds: thirtyseconds,
        division: division
    }
}