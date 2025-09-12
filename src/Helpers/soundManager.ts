/**
 * File manages the sounds during playing
 * Implements only one function - play - which plays the sound for certain amount of time
 * LAST CHANGE: 12/09/2025
 */
import key_1 from '../Assets/piano_sounds/at0.ogg';
import key_2 from '../Assets/piano_sounds/ao0.ogg';
import key_3 from '../Assets/piano_sounds/b0.ogg';
import key_88 from '../Assets/piano_sounds/ct8.ogg';

interface sound_object{
    audio:HTMLAudioElement
    id:number,
    time_started?: any,
    date_started?: any
}

class soundManager{
    private current_sounds:Array<sound_object>;
    private additional_sounds:Array<sound_object>;
    constructor(private max_velocity:number){
        this.current_sounds = [{audio:new Audio(key_1),id:0},{audio:new Audio(key_2),id:1},{audio:new Audio(key_3),id:2},{audio:new Audio(key_88),id:87}];
        this.additional_sounds = [{audio:new Audio(key_1),id:0},{audio:new Audio(key_2),id:1},{audio:new Audio(key_3),id:2},{audio:new Audio(key_88),id:87}];
    }

    /**
     * Method load the piano sounds, loading each after each
     * @tip This method should be revritten for faster load
     * @returns Promise with boolean stating compleated (true)
     */
    public load_sounds():Promise<boolean> {

        //Function handles the load element for audio, checking if it can be loaded
        const loadAudioElement = (audio:HTMLAudioElement):Promise<boolean> => {
            audio.load()
            return new Promise(res =>{
                const onReady = () =>{
                    audio.removeEventListener('canplaythrough', onReady);
                    res(true);
                }

                audio.addEventListener('canplaythrough', onReady);
            });
        }

        return new Promise(async (res) =>{
            for(let x = 1; x < 8; x++){
                const src_els = [
                    `co${x}`,
                    `ct${x}`,
                    `do${x}`,
                    `dt${x}`,
                    `e${x}`,
                    `fo${x}`,
                    `ft${x}`,
                    `gt${x}`,
                    `go${x}`,
                    `at${x}`,
                    `ao${x}`,
                    `b${x}`,
                ];
                let index = -1;
                for(const el of src_els){
                    index++;
                    const data = await fetch(`/piano_sounds/${el}.ogg`);
                    const ar_buf = await data.arrayBuffer();
                    const obj:sound_object = {
                        audio: new Audio(),
                        id:((x-1)*12) + index+3,
                        time_started:0
                    }
                    const obj_add:sound_object = {
                        audio: new Audio(),
                        id:((x-1)*12) + index+3,
                        time_started:0
                    }
                    const blob = new Blob([ar_buf], {type:"audio/wav"});
                    obj.audio.src = window.URL.createObjectURL(blob);
                    obj_add.audio.src = window.URL.createObjectURL(blob);
                    this.current_sounds.push(obj);
                    this.additional_sounds.push(obj_add);
                    await loadAudioElement(obj.audio);
                    await loadAudioElement(obj_add.audio);
                }
            }
            res(true)
        })
    }

    /**
     * Method fades the audio, to smoothen the effect of audio fading away, and simulate how it works normally on the piano
     * @param audio audio element which needs to be faded
     * @param time time of fading
     * @param key key parameter to reset the current element
     */
    private audio_fade(audio:HTMLAudioElement, time:number, key:sound_object):void{
        const initial_volume = audio.volume;
        const inter = setInterval(()=>{
            if(audio.volume - (initial_volume/50) < 0){
                audio.pause();
                audio.currentTime = 0;
                key.time_started = 0;
                key.date_started = 0;
                clearInterval(inter);
                return;
            }
            audio.volume -= (initial_volume/50);
        }, time/50);
    }
    

    /**
     * Method plays the key on the certain note number, for given time and with given velocity (volume)
     * @param key number of key on the piano to play
     * @param time Time for which the sound needs to be played
     * @param velocity volume of the sound
     * @returns Nothing
     */
    public play_key(key:number,time:number = 0.1,velocity:number=0.1):void{
        const okey_key = this.current_sounds[this.current_sounds.findIndex(e => e.id===key)];
        const additional_key = this.additional_sounds[this.additional_sounds.findIndex(e => e.id===key)];
        if(okey_key.time_started !== 0){
            //check if additional key can be played
            if(additional_key.time_started === 0){
                //Then play additional key instead
                additional_key.audio.volume = velocity / this.max_velocity;
                additional_key.audio.currentTime = 0;
                additional_key.audio.play();
                additional_key.date_started = Date.now();
                additional_key.time_started = setTimeout(()=>{
                    this.audio_fade(additional_key.audio,250, additional_key);
                },time/1000)
                return;
            }
            //If both are being played
            if(okey_key.date_started > additional_key.date_started){
                //Additional_key is older, stop playing him
                clearTimeout(additional_key.time_started);
                //and play
                additional_key.audio.volume = velocity / this.max_velocity;
                additional_key.audio.currentTime = 0;
                additional_key.audio.play();
                additional_key.date_started = Date.now();
                additional_key.time_started = setTimeout(()=>{
                    this.audio_fade(additional_key.audio,250, additional_key);
                },time/1000)
                return;
            }
            clearTimeout(okey_key.time_started);
        }
        okey_key.audio.volume = velocity/this.max_velocity; //normalized to 1
        okey_key.audio.currentTime = 0;
        okey_key.audio.play();
        okey_key.time_started = setTimeout(()=>{
            this.audio_fade(okey_key.audio,250, okey_key);
        },time/1000)
    }

    /**
     * Method for testing purposes
     * @inner USE ONLY IN TESTING
     */
    public get __test_sounds():Array<sound_object>{
        return this.current_sounds;
    }

}

export default soundManager;