import React, { ReactElement,useState,useEffect } from 'react'
import './Tutorial.styles.css';

import InsideNavigator from '../../Components/InsideNavigator/InsideNavigator';

import Basic from './Pages/Basic';
import Midi from './Pages/Midi';
import Recording from './Pages/Record';
import Configuration from './Pages/Configuration';
import Creating from './Pages/Creating';
import Authors from './Pages/Authors';



export default function Tutorial():ReactElement {

    const [width,setWidth] = useState<number>(window.innerWidth);
    const [height,setHeight] = useState<number>(window.innerHeight);

    const [comp_id,set_comp_id] = useState<number>(0);

    const Listeners = () =>{
        setWidth(window.innerWidth);
        setHeight(window.innerHeight);
    }

    useEffect(() => {
        window.addEventListener('resize',Listeners);
        return () => {window.removeEventListener('resize',Listeners)}
    }, []);

    const set_id = (id:number):void =>{
        set_comp_id(id);
    }

    return (
        <div style={{height:height,width:width}}>
            <InsideNavigator
            component_id={comp_id}
            setId={set_id}
            width={width}
            height={height}
             elements={[
                {
                    name:'Introduction',
                    component:<Basic on_change_id={set_id} />
                },
                {  
                    name: 'Midi',
                    component:<Midi on_change_id={set_id} />
                },
                {  
                    name: 'Recording',
                    component:<Recording />
                },
                {  
                    name: 'Configuration',
                    component:<Configuration />
                },
                {  
                    name: 'Creating Tutorials',
                    component:<Creating />
                },
                {  
                    name: 'Authors',
                    component:<Authors />
                }
            ]} />
        </div>
    )
}
