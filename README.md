# React Piano Player/Visualizer/Analyzer

PianoBlocksApp is a web application made for hobbists/enthusiasts of playing piano. This app provides a very simple way to visualize a persons piano playing, by reading his midi File. Currently, application requires prepared Midi file, but I'll work on options to record midis by web. Also, it provides basic effects and sounds. It can be used for learning purposes (by inserting a midi file of a song that one wants to learn), or to create youtube tutorial (by recording screen).

https://pianoblocksapp.com/

## Lightning fast installation

Just run these 3 simple commands

```
git init 
```
```
git pull https://github.com/tzmcion/ReactPianoPlayer
```
```
npm i 
```

## Most important Files explanation


 - ` /helpers/getNoteEventsJSON.ts ` 
 Most Important File of all aplication, thanks to it many worse computers may handle the renders. This File exports a function that changes an Array of midi Events (value returned from __midi-json-parser__) to an Array of NoteEvents, which is array of objects (displayed interface below). Now, I got rid of Events like 'SustainOff' 'setTempo' and more of them, so while playing, app needs to detect even to 4 times less events 
 ```ts
 interface noteEvent{
    NoteNumber:number,
    Delta:number,
    Duration:number,
    SoundDuration:number,
    Velocity:number
}
```

- ` /Components/Main/Main.tsx `
 Main Component. It handles resizing, and it stores options state and File state, it also handles the options change. It's one of liest complicated modules.
 
- ` /Components/DrawPiano/DrawPiano.tsx `
 This component is a PreLoader of the __/Components/Tracks/Tracks.tsx__ component, which handles all Displaying (literally all). The __DrawPiano.tsx__ is responsible for handling resizing, loading  piano sounds from __soundfont__ library, and it does some calculating
 
- ` /Components/Tracks/Tracks.tsx `
 This component Renders Piano blocks. It calculates their speed. Every Time, the component recieves any Data from `Data` Prop (type is noteEvent showed earlier), it ads new blocks to state (on height 0). Every block has a blockNote type (showed below). Beside adding new blocks, it also handles rendering them. Every user choosed time in options, it renders blocks in function, where it basically does simple math ` block.pos_y += Speed `, and then it checks if block isn't outside the vision. If it is, it deletes it from state. Below is the code responsible to it (in useEffect). I deleted a partm which renders Effects (here in README), they are EffectLines. 
```ts
            const blocksToMap = [...blocks];  // current blocks
            let notesToEvent:Array<blockNote> = []; //notesToEvent is an array which tells if a block entered a piano key
            let newBlocksToState:Array<blockNote> = []; //new blocks to state, state will be set with this array
            context?.clearRect(0,0,Width,Height); //Clearing Canvas, in a microsecond new will be drawn
            blocksToMap.reverse().map(block =>{ //Mapping current blocks
                block.pos_y += Speed; //changing position of a block
                context!.shadowColor = block.color; //setting shadow collor of a block collor
                context!.shadowBlur = 8;  //and shadow blur
                CanvasRoundRect(context!,block.color,block.pos_x,block.pos_y - block.height!,block.width,block.height!,5);  //drawing block
                if(block.pos_y > Height && !block.wasDetected){ //checking if block entered piano key
                    block.wasDetected = true;
                    notesToEvent.push(block);
                }
                if(block.pos_y - block.height! < Height){ //checking if block isn't outside a user vision
                    newBlocksToState.push(block);
                }
                return null;  //for ts to not yell
            })
            notesToEvent.length > 0 && setKeysNotes(notesToEvent);  //seting keys notes
            setBlocks(newBlocksToState);  //seting new blocks
```
 __Inteerface of a blockNote__
```ts
interface blockNote{
    color:string
    width:number
    NoteNumber:number,
    Velocity:number,
    pos_y:number,
    pos_x:number,
    height?:number,
    duration:number,
    wasDetected:boolean
}
```

- ` /Components/Options/Options.tsx `
 Component responsible for displaying options. It works with main component and changes options object defined in types. Thanks to it, application is less hardcoded, and user can actually change some things. Component __/Compoennts/DrawPiano/DrawPiano.tsx__ takes those options as a Prop, with __/Components/Tracks/Tracks.tsx__.
 Options interface: 
```ts
interface Options{
    Color:string,
    RandomColors:boolean,
    IsEffects:boolean,
    backgroundImage: string,
    speed:number,
    playSpeed:number,
    watermark:boolean,
    soundOn:boolean
}
```

## Note !

* I decided to use sass when 3/4 of beta version was done. That's why many filess are in css
* This is a beta version written by a super-junior react developer, code might be ugly !
* In Official version on https://pianoblocksapp.com/ you can find Donation page, by I deleted it here 
* Some dependencies in `package.lock` are not used
* Please, if you do a progress in this app, write to me that you've made a coll new version :)
* Please report every issue and bug 
* I hope you'll have fun working ot this

## Resources 

`NPM`
- __soundfont-player__
- __midi-parser-js__
- __react-youtube__
- __rgb-hex__
- __sass__

## License

__MIT__ license


