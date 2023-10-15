import React, { Fragment } from 'react'
import { Spinner } from 'react-bootstrap'


const LoaderComponent = () => {
    return (
        <Fragment>
            
            <div>LoaderComponent</div>
              <div className='loader'><Spinner animation="border" style={{width:'80px', height:'80px'}} role="status"></Spinner></div>
        </Fragment>
    )
}

export default LoaderComponent