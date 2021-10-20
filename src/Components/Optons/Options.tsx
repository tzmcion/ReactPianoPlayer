import React, {ReactElement} from 'react';
import './Options.styles.css';

import OptionCard from './OptionCard/OptionCard';
import OptionCardImage from './OptionCardImage/OptionCardImage';
import OptionCardList from './OptionCardList/OptionCardList';
import { Options as OptionsType } from '../../Utils/TypesForOptions';

interface OptionsProps{
    handleOptionsChange:Function,
    options: OptionsType
}

export default function Options({handleOptionsChange,options}:OptionsProps):ReactElement {

    return (
        <div className='options'>
            <div className='container'>
            <div className='mainOptions'>
                <OptionCard onChange={handleOptionsChange} name='color' type='color' title='Color' value={options.Color}>
                    Choose The Color Of Your Piano Blocks !. It's important, they don't look good with everything. Default color is platinum
                </OptionCard>
                <OptionCard onChange={handleOptionsChange} name='RandomColors' title='Random Color' type='checkbox' value={options.RandomColors} >
                    Switching This On Will Make every block different color. Remember that those random colors are lightend. This option automatically ignores chosen color
                </OptionCard>
                <OptionCard onChange={handleOptionsChange} name='IsEffects' title='Switch On Effects' type='checkbox' value={options.IsEffects} >
                    Switch On Fancy Effects, Scroll Down To choose Which Effect You Want (In future man, in future)
                </OptionCard>
                <OptionCardImage name='Image' Important title="Background Image" type='Image' value={options.Color} onChange={handleOptionsChange}>
                    Choose Background Of your track, to be precise, upload it, or it will be blank black screen (which looks bad by the way)
                </OptionCardImage>
                <OptionCardList name='Speeds' Important title="Choose Render Speed" value={options.Color} onChange={handleOptionsChange}>
                    Choose The Speed Of your Render. Remember, The higher render speed is, the more lags may happen, and everything will be faster
                </OptionCardList>
            </div>
            </div>
        </div>
    )
}
