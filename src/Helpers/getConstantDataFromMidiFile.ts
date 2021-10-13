import { TimeSignature, IMidiFile, StaticMidiDataProps } from "../Utils/TypesForMidi";

export default function getConstantDataFromMidiFile(file:IMidiFile):StaticMidiDataProps{
    const division = file.division;
    let denominator = 0, nominator = 0,metronome = 0,thirtyseconds = 0;
    file.tracks.map(track =>{
        for(let x = 0; x < track.length; x++){
            if(denominator){break};
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