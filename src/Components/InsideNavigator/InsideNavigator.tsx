import React, { ReactElement,useRef} from 'react';
import './InsideNavigator.style.scss';

interface InsideNavigatorProps{
    elements:Array<{
        name:string,
        component:ReactElement | HTMLElement | string
    }>
    setId:Function
    component_id:number
    width:number
    height:number
    proportion?:number
}

interface LinkProps{
    id:number
    name:string,
    onChange:Function
}

function Link({id,name,onChange}:LinkProps):ReactElement{

    const onClick= ():void =>{
        onChange(id);
    }

    return <div onClick={onClick} className='SingleLink'>
        <h1 className='SingleLinkText'>{name}</h1>
    </div>
}

export default function InsideNavigator({elements,width,height,proportion,setId,component_id}:InsideNavigatorProps):ReactElement {

    const nav_proportion = useRef<number>(proportion ? proportion : 7);

    const onLinkClick = (id:number):void =>{
        setId(id);
    }
    const RenderLinks = ():any => {
        return elements.map((el,index) =>{
            return <Link id={index} key={index} name={el.name} onChange={onLinkClick} />
        })
    }


    return (
        <div className='InsideNavigator' style={{width:width,height:height}}>
            <div className='Links' style={{width:width / nav_proportion.current}}>
                {RenderLinks()}
            </div>
            <div className='Component' style={{width:width / nav_proportion.current * (nav_proportion.current - 1)}}>
                {elements[component_id].component}
            </div>
        </div>
    )
}
