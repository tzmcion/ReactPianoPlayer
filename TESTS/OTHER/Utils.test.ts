import { expect, it, describe, vi} from "vitest";

import {handleDefaultValuesCheck, Default_data} from "../../src/Utils/Default";
import {ReadFromLocalStorageBase64, SaveAsBase64, alpha_hex, random_denominator} from "../../src/Utils/smallFunctions";
//@ts-ignore
import MIDI_FILE from "../../src/Assets/preview_midi_mendelssohn.MID";

describe("Test Utils", () =>{
    it("should update default options when reload", () =>{
        let other_object = JSON.parse(JSON.stringify(Default_data));        

        delete other_object["Color"];
        delete other_object["keyWhToBlRatio"];

        window.localStorage.setItem("options", JSON.stringify(other_object));
        const options = handleDefaultValuesCheck();

        for(const [key,value] of Object.entries(Default_data)){
            expect(Object.hasOwn(options,key)).to.equal(true);
        }
    })

    it("should save and read file from local storage", async () => {
        const blob = new Blob([MIDI_FILE.buffer])

        await SaveAsBase64(blob, "test");
        const read = ReadFromLocalStorageBase64("test");
        const data = new Blob([read]);
        expect(data.size).to.equal(blob.size);  //check the size cuz === does not work on blob
    });

    it("should return color with alpha",()=>{
        const TEST_H_1 = "#fff";
        const TEST_H_2 = "#A21FFA";
        const TEST_H_3 = "#AABBCC32";

        const col_1 = alpha_hex(TEST_H_1,15);
        expect(col_1.slice(7,9).toLowerCase()).to.equal("0f");

        const col_2 = alpha_hex(TEST_H_2,18);
        expect(col_2.slice(7,9).toLowerCase()).to.equal("12");

        const col_3 = alpha_hex(TEST_H_3,0);
        expect(col_3.slice(7,9).toLowerCase()).to.equal("00");
    })

    it("should return random denominator", () => {
        expect(random_denominator()).to.be.oneOf([1,-1]);
    })
})