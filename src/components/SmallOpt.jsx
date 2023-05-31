import React from 'react'
import Links from './Links'


const SmallOpt = () => {
  return (
    <div className='position-fixed bottom-0 w-100 d-lg-none' style={{height:'50px', zIndex:"10"}}>
        <div className='d-flex justify-content-around align-items-center bg-dark h-100' >
            <Links/>
        </div>
    </div>
  )
}

export default SmallOpt