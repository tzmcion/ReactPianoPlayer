import React from 'react'
import './OptionsDescription.scss'

const textData = [
    {
        title: "GENERAL OPTIONS",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
        {
        title: "EFFECT CONFIGURATION",
        description: "This is my piano midi player, there are many like this one, but this one is mine",
    },
        {
        title: "",
        description: "",
    },
        {
        title: "",
        description: "",
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
