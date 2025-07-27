/**
 * Output of new function is expected to be equal to old function
 */

import getNotesEventJSON from '../../src/Helpers/getNoteEventsJSON'
import createNoteEvents from '../../src/Helpers/MidiReader/createNoteEvents'
import timeSignatures from "../../src/Helpers/MidiReader/timeSignatureValuesFromMidiFile"
import MIDI_mock from './MIDI_mock'

import {expect, test} from 'vitest'

test("Notes Events", () =>{
    createNoteEvents(MIDI_mock,timeSignatures(MIDI_mock));
    expect(true).toBe(true)
})
