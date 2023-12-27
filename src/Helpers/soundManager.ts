import key_1 from '../Assets/piano_sounds/at0.ogg';
import key_2 from '../Assets/piano_sounds/ao0.ogg';
import key_3 from '../Assets/piano_sounds/b0.ogg';
import key_88 from '../Assets/piano_sounds/ct8.ogg';

interface sound_object{
    audio:HTMLAudioElement
    id:number
    path?:string
}

class soundManager{
    public ac:AudioContext;
    private current_sounds:Array<sound_object>;
    constructor(ac:AudioContext){
        this.ac = ac;
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
                    path:path.default
                }
                this.current_sounds.push(obj);
            })
            console.log(this.current_sounds);
        }
    }
    

    public play_key(key:number,delta:number = 100){
        console.log(key);
        const okey_key = this.current_sounds.findIndex(e => e.id===key);
        console.log('key: ' + key + ' id: ' + this.current_sounds[okey_key].id + " path: " + this.current_sounds[okey_key].path);
        this.current_sounds[okey_key].audio.pause();
        this.current_sounds[okey_key].audio.volume = 0.2;
        this.current_sounds[okey_key].audio.currentTime = 0;
        this.current_sounds[okey_key].audio.play();
    }

}

export default soundManager;