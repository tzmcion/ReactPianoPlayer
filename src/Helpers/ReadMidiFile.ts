//  This File exports a Function
//  which converts a midi file
//  into Object(JSON)
//  It returns a Promise of an Object, which Object
//  Will be converted JSON

import { parseArrayBuffer } from 'midi-json-parser';
//  midi-json-parser is npm library created by chrisguttandin
//  Big thanks to Him!

const ReadMidiFile = (file:any) =>{

    //Function Converting file from binarry form into ArrayBuffer
    function convertDataToArray64():Promise<ArrayBuffer | string> {
        return new Promise<ArrayBuffer>((resolve, reject) => {
            const reader = new FileReader();
    
            reader.onload = (event:any) => {
                resolve(event.target.result as ArrayBuffer);
            };
    
            reader.onerror = (err) => {
                reject(err);
            };
            reader.readAsArrayBuffer(file);
        });
      }

    // this promise returns json
    return new Promise<Object>((resolve,reject) =>{
        convertDataToArray64().then(file=>{
            //checking if Error hasn't been returned
            if(typeof file !== 'string'){
            parseArrayBuffer(file).then(json =>{
                resolve(json);
                });
            }else{
                reject('Error ! Provided type is Not an Object !!');
            }
          })
    })
}

export default ReadMidiFile;