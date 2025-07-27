import {expect, test} from 'vitest'
import timeSignatures from "../../src/Helpers/MidiReader/timeSignatureValuesFromMidiFile"
import MIDI_mock from './MIDI_mock'

test("TimeSignature Unit Test", () =>{
    const result = timeSignatures(MIDI_mock);
    expect(result.division).toBe(240);
    expect(result.timeSignatures.length).toBe(3)
});



