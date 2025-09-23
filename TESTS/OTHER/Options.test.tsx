//Here rendering of options will be tested

import { describe, vi, it, expect } from "vitest";
import { render, screen } from '@testing-library/react';
import {Default_data} from "../../src/Utils/Default";
import {
    Options_Blocks as OptionsBlocks,
    Options_Effects as OptionsEffect,
    Options_Other as OptionsOther} from '../../src/Components/NewOptions/OptionsType/OptionsType';

describe("Options rendering", () =>{
    it("should render all the options which are avaliable to change", () =>{
        render(<OptionsBlocks  isOpened={true} onGoBack={()=>{}} options={Default_data} handleOptionsChange={()=>{}}  />)
        render(<OptionsEffect isOpened={true} onGoBack={()=>{}} options={Default_data} handleOptionsChange={()=>{}}/>)
        render(<OptionsOther isOpened={true} onGoBack={()=>{}} options={Default_data} handleOptionsChange={()=>{}}/>)

        const elements = screen.getAllByTestId("OptionCardTest");

        expect(Object.keys(Default_data).length).to.equal(elements.length);
    });
})

