import React from 'react'
import './OptionsDescription.scss'

const textData = [
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
    },
        {
        title: "",
        description: "",
    }
]


interface OptDesc_props{
    type: string
}

export default function OptionsDescription({type}:OptDesc_props):React.ReactElement {
  return (
    <div>OptionsDescription</div>
  )
}
