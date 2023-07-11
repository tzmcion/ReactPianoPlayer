import React from 'react'
import './DonateButton.scss'

interface DonateButton_Props{
    className: string
    link:string
}

export default function DonateButton({className,link}:DonateButton_Props) {

  return (
    <div className={`${className} DonateButton`}>
        <a href={link} target='_blank' rel='noreferrer' >Donate</a>
    </div>
  )
}
