import soundManager from '../../src/Helpers/soundManager';
import {expect, describe, it, vi} from "vitest";
// @ts-ignore
import simple_audio from "../../public/piano_sounds/at7.ogg";

describe("Audio correctly loaded", () =>{
    //Mock the protptype for load, as the audio does not exist
    vi.spyOn(window.HTMLAudioElement.prototype, 'load').mockImplementation(() => {});
    global.URL.createObjectURL = vi.fn();

    const buffer = simple_audio.buffer;

    // @ts-ignore
    vi.spyOn(global, 'fetch').mockResolvedValue({
        arrayBuffer: vi.fn().mockResolvedValue(buffer),
    });



    const soundPlayer = new soundManager(0.5);
    it("check if songs loaded are really loaded", () =>{
        soundPlayer.load_sounds().then(res =>{
                const sounds = soundPlayer.__test_sounds;
                sounds.forEach(sound =>{
                    expect(sound.audio.readyState).toBe(true);
            })        
        })
    })
}, 100000);     //100seconds should be enough