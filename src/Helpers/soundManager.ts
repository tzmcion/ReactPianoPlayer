import key_1 from '../Assets/piano_sounds/at0.ogg';
import key_2 from '../Assets/piano_sounds/ao0.ogg';
import key_3 from '../Assets/piano_sounds/b0.ogg';
import key_88 from '../Assets/piano_sounds/ct8.ogg';

interface sound_object{
    audio:HTMLAudioElement
    id:number,
    time_started?: any
}

class soundManager{
    private current_sounds:Array<sound_object>;
    constructor(){
        this.current_sounds = [{audio:new Audio(key_1),id:0},{audio:new Audio(key_2),id:1},{audio:new Audio(key_3),id:2},{audio:new Audio(key_88),id:87}];
        for(let x = 1; x < 8; x++){
            const src_els = [
                `co${x}.ogg`,
                `ct${x}.ogg`,
                `do${x}.ogg`,
                `dt${x}.ogg`,
                `e${x}.ogg`,
                `fo${x}.ogg`,
                `ft${x}.ogg`,
                `gt${x}.ogg`,
                `go${x}.ogg`,
                `at${x}.ogg`,
                `ao${x}.ogg`,
                `b${x}.ogg`,
            ];
            src_els.forEach( async (el,index) =>{
                const path = await import(`../Assets/piano_sounds/${el}`);
                const obj:sound_object = {
                    audio: new Audio(path.default),
                    id:((x-1)*12) + index+3,
                    time_started:0
                }
                this.current_sounds.push(obj);
            })
        }
    }
    

    public play_key(key:number,time:number = 0.1,velocity:number=0.1){
        const okey_key = this.current_sounds[this.current_sounds.findIndex(e => e.id===key)];
        if(okey_key.time_started){
            clearTimeout(okey_key.time_started);
        }
        okey_key.audio.pause();
        okey_key.audio.volume = velocity/250;
        okey_key.audio.currentTime = 0;
        okey_key.audio.play();
        okey_key.time_started = setTimeout(()=>{
            okey_key.audio.pause();
            okey_key.audio.currentTime = 0;
            okey_key.time_started = null;
        },time/1000 +2000)
    }

}

export default soundManager;