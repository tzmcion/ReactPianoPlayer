import React, { ReactElement} from 'react';
import { Options } from '../../Utils/TypesForOptions';
import './AdvancedOptions.scss';

import {ColorOption, InsertNumberOption, ListOption, CheckboxOption} from './singleOptions';

interface props{
    className?: string
    onChange: Function
    defaultValues:Options
}

export default function AdvancedOptions({className,onChange,defaultValues}:props):ReactElement {
    return (
        <div className={className? className : ''}>
            <div className='block_options'>
                <h2 className='banner'>Block visuals</h2>
                <div className='options'>
                    <ColorOption name='color' onChange={onChange} defaultValue={defaultValues.Color} >Color</ColorOption>
                    <InsertNumberOption name='blockRadius' onChange={onChange} defaultValue={defaultValues.blockRadius}>Border Radius</InsertNumberOption>
                </div>
            </div>
            <div className="effects_options">
                <h2 className='banner'>Effects</h2>
                <div className="options">
                    <ListOption name='Effect' onChange={onChange} defaultValue={defaultValues.Effect} values={['fountain','dancingLines']}>Effect Type</ListOption>
                    <CheckboxOption name='IsEffects' onChange={onChange} defaultValue={defaultValues.IsEffects}>Use Effects</CheckboxOption>
                </div>
            </div>
        </div>
    )
}
