import React from 'react'
import { Images } from '../../constants/ImageConstants'

const Loader = () => {
  return (
    <div className='page-loader'>
    {/* <img src={Images?.ShortLogo} alt="" /> */}
    <div className='logo-area'>
        <img className="logo-area-inner first" src={Images?.LogoPart1} alt="" />
        <img className='logo-area-inner second' src={Images?.LogoPart2} alt="" />
    </div>
</div>
)
}

export default Loader