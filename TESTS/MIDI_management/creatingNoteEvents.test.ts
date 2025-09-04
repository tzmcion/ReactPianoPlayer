/**
 * Testing files created during new version preparing for AVANT
 * **Tests run automatically on each github push on AVANT branch
 * Last UPDATE: 07/29/2025
 */
import createNoteEvents from '../../src/Helpers/MidiReader/createNoteEvents'
import timeSignatures from "../../src/Helpers/MidiReader/timeSignatureValuesFromMidiFile"
import MidiToSingleTrack from "../../src/Helpers/MidiReader/MidiToSingleTrack"
import AnimationFrameMidiPlayer from "../../src/Helpers/MidiReader/AnimationFrameMidiPlayer"
import MIDI_mock from './MIDI_mock'

import {expect, test, describe, it} from 'vitest'

test("Testing: TimeSignatures", () =>{
    const result = timeSignatures(MIDI_mock);
    expect(result.division).toBe(240);
    expect(result.timeSignatures.length).toBe(3);

    let edited_MIDI = {...MIDI_mock};
    edited_MIDI.format = 2;

    //When MIDI format is 2, as it is widely not used, it expect to throw error
    expect(()=>{timeSignatures(edited_MIDI)}).toThrowError();
});

test("Testing: MidiToSingleTrack", () =>{
    const result = MidiToSingleTrack(MIDI_mock);
    expect(result.tracks.length).toEqual(1);
    //Sum of events should not be different
    const length_expected = MIDI_mock.tracks.map(track => track.length).reduce((a,b) => a+b)
    const track = result.tracks[0];
    expect(result.tracks[0].length).toEqual(length_expected)
    expect(track[2]).toStrictEqual({
        "programChange": {
          "programNumber": 14
        },
        "channel": 3,
        "delta": 0,
        "trackNumber": 1,
        "controlTrack": false
      })
});

/**
 * Output of new function is expected to be equal to old function
 */
test("Testing: createNoteEvents", () =>{
    const note_events = createNoteEvents(MIDI_mock,timeSignatures(MIDI_mock))
    const file_track = MidiToSingleTrack(MIDI_mock).tracks[0];
    let count_notes = 0;
    file_track.forEach(event =>{
        if("noteOn" in event){
            count_notes++;
        }
    })
    //Check if number of events equals number of "noteON" events from original array
    expect(note_events.length).toStrictEqual(count_notes)
})

//
//  DELETED DURING DEVELOPMENT CAUSE TAKES TO MUCH TIME
//

describe("Testing: AnimationFrameMidiPlayer", () =>{
    const onEvent = (data) =>{
    }
    const note_events = createNoteEvents(MIDI_mock,timeSignatures(MIDI_mock))
    const player = new AnimationFrameMidiPlayer(note_events, onEvent);
    player.pausePlay()
    it("resolve in 10m seconds",async () =>{
        const result = await player.__for_testing()
        expect(result).toBe(true)
    }, player.MidiLength + 1000)
})