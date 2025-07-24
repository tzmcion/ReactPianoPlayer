import React from 'react'
import './OptionsDescription.scss'

const textData = [
    {
        title: "OPTIONS BAR TITLE",
        description: "There are many variations of passages of Lorem Ipsum available, but the majority have suffered alteration in some form, by injected humour, or randomised words which don't look even slightly believable.",
    },
        {
        title: "",
        description: "",
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
