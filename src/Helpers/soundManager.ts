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
    constructor(private max_velocity:number){
        this.current_sounds = [{audio:new Audio(key_1),id:0},{audio:new Audio(key_2),id:1},{audio:new Audio(key_3),id:2},{audio:new Audio(key_88),id:87}];
    }

    public load_sounds():Promise<boolean> {
        return new Promise(async (res,req) =>{
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
                    const path = await import(`/piano_sounds/${el}.ogg`);
                    const obj:sound_object = {
                        audio: new Audio(path.default),
                        id:((x-1)*12) + index+3,
                        time_started:0
                    }
                    this.current_sounds.push(obj);
                }
            }
            res(true)
        })
    }
    

    public play_key(key:number,time:number = 0.1,velocity:number=0.1){
        const okey_key = this.current_sounds[this.current_sounds.findIndex(e => e.id===key)];
        if(okey_key.time_started !== 0){
            clearTimeout(okey_key.time_started);
        }
        try{
            okey_key.audio.pause();
        }catch{//is already paused...
            console.log('idk');    
        }
        okey_key.audio.volume = velocity/this.max_velocity; //normalized to 1
        okey_key.audio.currentTime = 0;
        okey_key.audio.play();
        okey_key.time_started = setTimeout(()=>{
            okey_key.audio.pause();
            okey_key.audio.currentTime = 0;
            okey_key.time_started = 0;
        },time)
    }

}

export default soundManager;