# React Piano Player/Visualizer/Analyzer

PianoBlocksApp is a web application made for hobbists/enthusiasts of playing piano. This app provides a very simple way to visualize a persons piano playing, by reading his midi File.

<b> Link to latest version https://pianoblocksapp.com/ </b>
###### Github version is not always up-to-date.
### Last Release 19/01/2021

## Description

### What does this app do ?

I always wanted to create piano Tutorials like big youtubers, but I didn't want to pay for professional software, so I created it myself :). This app makes it super easy to create piano tutorials, it delivers some basic effects, basic sound, and if you can't record a midi file with softwares, you can record it there. Also with recording app gives you basic (super basic) sheet music. On top of that, app gives you plenty of ways to customize effects, colors, spped of playing. With this app you can learn and have fun.

### Technologies used

 * <b>React</b>
 * <b>Typescript</b>
 * <b>HTML/CSS</b>
 * <b>Sass (scss)</b>
 * <b>Redux (a little)</b>
 * <b>NPM library</b>

### How does the app work ? 

![app schema](https://user-images.githubusercontent.com/64361206/156896648-36977f49-34ac-4b7c-ade3-990c13f6612d.JPG)

<ol>
 <li>
  <b>User input</b></br>
  User Drags/chooses Midi file. He can configure options before that, or he can play demo file, then the Midi file is automatically imported
 </li>
 <li>
  <b>Website proceses it</b></br>
  Website saves the file to localstorage and it procesess it. It uses a "/helpers/getNoteEventsJSON.ts" file (function) to remove all unnecesarry events.
 </li>
 <li>
 <b>Website creates canvas animation</b></br>
  Canvas animation is created, frame rate is 60fps or 144 fps (depends on the screen type).
 </li>
</ol>

## Installation

Just like every other github repo

```
git init
git pull https://github.com/tzmcion/ReactPianoPlayer
npm i 
```

## Note !

* In Official version on https://pianoblocksapp.com/ you can find Donation page, but I deleted it here 
* Some dependencies in `package.lock` are not used
* Please report every issue and bug 
* If you'd like to work on this app, I will explain how every file works to you with pleasure, just write :)

## Resources 

- __soundfont-player__
- __midi-parser-js__
- __react-youtube__
- __rgb-hex__
- __sass__

## License

__MIT__ license


