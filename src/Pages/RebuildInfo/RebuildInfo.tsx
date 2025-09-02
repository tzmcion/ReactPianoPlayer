import React from 'react'
import { Link } from 'react-router-dom'
import "./RebuildInfo.scss"

export default function RebuildInfo() {
  return (
        <div className='INFO_REBUILD jersey-10'>
            <h1>REBUILDING OF RECORDING API</h1>
            <h2>PLEASE BE PATIENT :)</h2>
            <h3>If you still need to use the Recorder, you can use the old API by <Link to="/Record">Clicking HERE</Link> (But it probably is not working anymore)</h3>
        </div>
  )
}
