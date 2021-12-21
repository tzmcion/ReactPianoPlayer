import React, { ReactElement,useState,useEffect} from 'react';
import './ChooseButton.style.scss';

interface ChooseButtonProps{
    onClick:any,
    name:string,
    title:string,
    textColor:string
}

export default function ChooseButton({onClick,name,title,textColor}:ChooseButtonProps):ReactElement {

    const [positions,setPositions] = useState<Array<any>>();

    const setDefaultPositions = ():void =>{
        const arr = title.split('');
        const pos:any = [];
        arr.map((letter,index) =>{
            pos.push({
                transition:'0s',
                pos: 0
            });
            return null;
        });
        setPositions(pos);
    }

    const renderLetters = ():any =>{
        const arr = title.split('');
        if(positions){
            return arr.map((letter,index) =>{
                return <h1 key={index} style={{marginTop:positions[index].pos, transition:positions[index].transition, textShadow:`0px 0px 8px ${textColor}A0`}} className='single_letter'>{letter}</h1>
            })
        }else{
            return <></>
        }
    }

    useEffect(() => {
        setDefaultPositions();
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [])

    const setTopPositions = ():void =>{
        const arr = title.split('');
        const pos:any = [];
        arr.map((letter,index) =>{
            pos.push({
                transition:'0s',
                pos: '-50%'
            });
            return null;
        });
        setPositions(pos);
        arr.map((letter,index) =>{
            setTimeout(()=>{
                const pos:any = [];
                arr.map((letter,i) =>{
                    if(i <= index){
                    pos.push({
                        transition:'0.12s ease',
                        pos: '0px'
                    });
                    }else{
                    pos.push({
                        transition:'0s',
                        pos: '-50%'
                    });
                    }
                    return null;
                });
                setPositions(pos);
            },index * 75 + 25);
            return null;
        });
    }


    return (
        <div className='options_button' onClick={()=>{onClick(name)}} onMouseEnter={setTopPositions}>
            <div style={{color:textColor}} className='options_button_text'>
                {renderLetters()}
            </div>
        </div>
    )
}
