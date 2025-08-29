import React from 'react'
import './OptionsDescription.scss'

const textData = [
    {
        title: "GENERAL OPTIONS",
        description: "Configure the midi-player. In this tab, decide how the blocks look like. Each option consists of short description of what it does.",
    },
        {
        title: "EFFECT CONFIGURATION",
        description: "In this tab you can choose the effect which ocures when the block meets the piano (and the sound is played)",
    },
        {
        title: "ADDITIONAL OPTIONS",
        description: "In this tab you can choose some additional, not important features for playing, like speed, watermark etc.",
    },
        {
        title: "PRESETS",
        description: "Here you can choose one of the already prepared presets, create and save your own presets",
    }
]


interface OptDesc_props{
    type: "blocks" | "effects" | "other" | "presets"
}

export default function OptionsDescription({type}:OptDesc_props):React.ReactElement {

    const index = type === "blocks" ? 0 : type === "effects" ? 1 : type === "other" ? 2 : 3;

  return (
    <div className='OptionsDescription'>
        <h3 className='jersey-10'>{textData[index].title}</h3>
        <h6 className='jersey-10'>{textData[index].description}</h6>
    </div>
  )
}
