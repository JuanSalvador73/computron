import React from 'react'
import { Spinner } from 'react-bootstrap'

const LoaderComponent = () => {
  return (
    <div style={{width: '100%', height: '85vh', display: 'flex', justifyContent: 'center', alignItems: 'center', flexDirection:'column'}}>
        <Spinner/>
    </div>
  )
}

export default LoaderComponent