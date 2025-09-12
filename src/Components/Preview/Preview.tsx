import React, {useState, useEffect, useCallback, useRef} from 'react'
import './Preview.scss'

import UpdatedTracks from '../Tracks/updatedTracks'
import AnimationFrameMidiPlayer from '../../Helpers/MidiReader/AnimationFrameMidiPlayer'
import { Options as OptionsType } from '../../Utils/TypesForOptions';
import { useSelector } from 'react-redux';

interface PrevProps{
    active:boolean
}

/**
 * Preview component creates a small piano, to preview the changes done in options
 * LAST EDIT: 12/09/2025
 * @param active As preview is designed for OptionsTab, which can be either open, or closed, this parameter defines if preview should be rendered
 * @returns 
 */
export default function Preview({active}:PrevProps):React.ReactElement {

    const [player, setPlayer] = useState<AnimationFrameMidiPlayer>();
    const [key, addKey] = useState<number>(0);
    const [ready,setReady] = useState<boolean>(false);
    const [width_height, set_width_height] = useState<{width:number, height:number}>({width:0,height:0});
    const options = useSelector((state:{options:OptionsType}) => state.options);
    const width_ref = useRef<HTMLDivElement>(null);
    const timeout_ref = useRef<any>(0);

    /**
     * Load the component, loaded the player when it is undefined.
     */
    useEffect(()=>{
      if(player === undefined && width_ref.current !== null){
        const props = width_ref.current.getBoundingClientRect();
        setPlayer(new AnimationFrameMidiPlayer([]))
        //Set width and height initially
        set_width_height({
          width: props.width,
          height: props.height
        })
        }
        return () => {player !== undefined && player.clear_player()}
    },[width_ref.current]);

    /**
     * Handle starting of playing random notes on piano
     */
    useEffect(()=>{
      if(active === false)return;
      if(player !== undefined && ready === true){
        setReady(true);
        setTimeout(()=>{
          player.restart();
          player.play_random_notes(width_height.width > 760 ? 70 : 24);
        },500)
      }
    },[player, ready, active])

    /**
     * Handle alteration in options. Compoent is set to rerender with new key
     */
    useEffect(()=>{
      setReady(false);
      if(timeout_ref.current !== 0){
        clearTimeout(timeout_ref.current);
      }
      timeout_ref.current = setTimeout(()=>{
        setReady(true);
        addKey(curr => curr + 1);
      },500)
    },[options])



    /**
     * Set active on either true or false depending if the Tab is open
     */
    useEffect(()=>{
      if(active === false){
        setReady(false);
      }else{
        setReady(true);
      }
    },[active])

    //Set new width and height on resize
    const listener = useCallback(()=>{
        if(width_ref.current === null)return;
        const props = width_ref.current.getBoundingClientRect();
        set_width_height({
          width: props.width,
          height: props.height
        })
    },[width_ref.current])


    //Add listeners for resize
    useEffect(()=>{
      window.addEventListener('resize',listener)

      return () => {window.removeEventListener('resize',listener)}
    },[width_ref.current])



  return (
    <div className={`Preview_Window`} ref={width_ref}>
        {!ready && <div className='Inside_Loading' ><h3 className='jersey-10'>Resetting the preview...</h3></div>}
        {ready && <div className='Inside_Player'>
            {player && <UpdatedTracks 
            key={key}
            Player={player}
            height={width_height.height + 200}
            width={width_height.width}
            number_of_white_keys={width_height.width > 760 ? 44 : 15}
            options={options}
            sound={null}
            />}
        </div>}
    </div>
  )
}
