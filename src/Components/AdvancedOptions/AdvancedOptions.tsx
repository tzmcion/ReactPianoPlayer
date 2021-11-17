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
                    <ColorOption name='color' onChange={onChange} defaultValue={defaultValues.Color} disabled={defaultValues.RandomColors} >Color</ColorOption>
                    <ColorOption name='KeyPressColor' onChange={onChange} defaultValue={defaultValues.KeyPressColor} >Key Color</ColorOption>
                    <ColorOption name='shadowColor' onChange={onChange} defaultValue={defaultValues.ShadowColor} >Choose block Shadow Color</ColorOption>
                    <CheckboxOption name='RandomColors' onChange={onChange} defaultValue={defaultValues.RandomColors}>Dark Blocks Colors</CheckboxOption>
                    <InsertNumberOption name='blockShadowColor' onChange={onChange} defaultValue={defaultValues.blockShadowRadius}>Block shadow Radius</InsertNumberOption>
                    <InsertNumberOption name='blockRadius' onChange={onChange} defaultValue={defaultValues.blockRadius}>Border Radius</InsertNumberOption>
                </div>
            </div>
            <div className="effects_options">
                <h2 className='banner'>Effects</h2>
                <div className="options">
                    <ListOption name='Effect' onChange={onChange} defaultValue={defaultValues.Effect} values={['fountain','dancingLines']}>Effect Type</ListOption>
                    <CheckboxOption name='IsEffects' onChange={onChange} defaultValue={defaultValues.IsEffects}>Use Effects</CheckboxOption>
                    <CheckboxOption name='EffectsBlockColor' onChange={onChange} defaultValue={defaultValues.EffectsBlockColor}>Effects Same color as blocks</CheckboxOption>
                    <CheckboxOption name='EffectsKeyColor' onChange={onChange} defaultValue={defaultValues.EffectsKeyColor}>Effects same color as key</CheckboxOption>
                    <CheckboxOption name='randomEffectsColor' onChange={onChange} defaultValue={defaultValues.randomEffectColors}>Effects random Color</CheckboxOption>
                    <ColorOption name='EffectsColor' onChange={onChange} defaultValue={defaultValues.EffectsColor} >Effects Color</ColorOption>
                </div>
            </div>
        </div>
    )
}
