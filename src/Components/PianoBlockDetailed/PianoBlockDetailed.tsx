import React,{ReactElement} from 'react'
import './PianoBlockDetailed.styles.scss'

export default function PianoBlockDetailed():ReactElement {

    //const [dropdown,setDropdown] = useState<boolean>(false);

    return (
        <div className='PianoBlockDetailed'>
            <div className='upper_data'>
                <h1>Detailed Block visuals ~~Coming Soon~~</h1>
                <i className="fa fa-caret-down" aria-hidden="true" title='Detailed Block Visuals'></i>
            </div>
            <div className='PBDoptions'></div>
        </div>
    )
}
