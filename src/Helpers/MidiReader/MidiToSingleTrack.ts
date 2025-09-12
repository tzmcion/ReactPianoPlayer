import { IMidiFile, UpdatedMidiEventType } from "../../Utils/TypesForMidi"

/**
 * Function which converts a IMidiFile to have one single track
 * Every event in track receives 2 additional objects:
 * "controlTrack" --> boolean stating if an event is from track which only had controlEvents and no any noteOn, noteOff events
 * "trackNumber" --> number field stating from which track it came. If the controlTrack flag is true, this number will be -1
 * LAST CHANGE: 12/09/2025
 * @param file IMidiFile
 * @returns an updated IMidiFile with only one track, also the track has additional 2 objects
 */
const convertToSingleTrack = (file:IMidiFile): IMidiFile =>{
    const new_file = JSON.parse(JSON.stringify(file)) as IMidiFile; //Deep Clone
    //First, handle case when format is 0, then function only needs to add "trackNumber" and "controlTrack" flag\
    if(file.tracks.length === 1){
        new_file.tracks[0] = new_file.tracks[0].map(event => ({
            ...event,
            controlTrack:false,
            trackNumber:0
        }))
        return new_file;
    }
    //Otherwise, handle merging of the tracks, which can be a little tricky.
    const merged_tracks:[any] = [[]];
    //Add a trackNumber and controlTrack flag in each of the tracks
    for(let x in new_file.tracks){
        //First, decide if track is controlTrack or not
        const is_data_track = new_file.tracks[x].find((object) => {if("noteOn" in object || "noteOff" in object)return true; else return false;})
        //Then add the information
        new_file.tracks[x] = new_file.tracks[x].map(event =>({
            ...event,
            controlTrack: !is_data_track, //important, revert
            trackNumber: is_data_track ? Number(x) : -1
        }))
    }
    //After applying the data, merging
    while(new_file.tracks.some(tr => tr.length > 0)){  //As long as there is any data to merge
        let smallest_delta_index = 0, smallest_value = Number.MAX_SAFE_INTEGER;//Look for the smallest delta
        new_file.tracks.forEach((track,index) =>{
            if(track.length === 0)return;
            const first_event = track[0] as UpdatedMidiEventType;
            if(first_event.delta < smallest_value){
                smallest_delta_index = index;
                smallest_value = first_event.delta
            }
        })
        //Now, set the smallest value to first element, and substract the delta from other first events in tracks
        merged_tracks[0].push(new_file.tracks[smallest_delta_index].shift())
        new_file.tracks.forEach((track,index) =>{
            if(track.length === 0)return;
            if(index === smallest_delta_index)return;
            track[0].delta -= smallest_value;
        })
        //I think that's all
    }
    new_file.tracks = merged_tracks
    return new_file;
} 

export default convertToSingleTrack;