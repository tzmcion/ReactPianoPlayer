import React, {ReactElement} from 'react';
import './Options.styles.css';

import OptionCard from './OptionCard/OptionCard';
import { Options as OptionsType } from '../../Utils/TypesForOptions';

interface OptionsProps{
    handleOptionsChange:Function,
    options: OptionsType
}

export default function Options({handleOptionsChange,options}:OptionsProps):ReactElement {

    return (
        <div className='options'>
            <div className='mainOptions'>
                <OptionCard onChange={handleOptionsChange} Important name='color' type='color' title='Color' value={options.Color}>
                    Choose The Color Of Your Piano Blocks !. It's important, they don't look good with everything
                </OptionCard>
                <OptionCard onChange={handleOptionsChange} name='RandomColors' title='Random Color' type='checkbox' value={options.RandomColors} >
                    Switching This On Will Make Block Colors Random Colors. This Will automatically ignore choosen Color
                </OptionCard>
                <OptionCard onChange={handleOptionsChange} name='IsEffects' title='Switch On Effects' type='checkbox' value={options.IsEffects} >
                    Switch On Fancy Effects, Scroll Down To choose Which Effect You Want (In future)
                </OptionCard>
            </div>
        </div>
    )
}
