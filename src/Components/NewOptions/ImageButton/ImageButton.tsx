import React from 'react'
import "./ImageButton.scss"

interface IB_props{
    image:string,
    className:string,
    title:string,
    onClick: Function
    onHover: Function
}

export default function ImageButton({image,className, onClick, title, onHover}:IB_props):React.ReactElement {

  return (
    <div className={`ImageButton ${className}`} onClick={()=>{onClick()}} onMouseEnter={() => {onHover()}} onMouseLeave={() => {onHover()}}>
        <div className='ImageButton_image'>
            <img src={image} alt={title} />
        </div>
        <div className='ImageButton_context'>
            <h3 className='jersey-10'>{title}</h3>
        </div>
    </div>
  )
}
