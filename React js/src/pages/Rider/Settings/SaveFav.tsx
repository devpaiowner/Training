import React from 'react'
import { Images } from '../../../constants/ImageConstants'
import { Link } from 'react-router-dom'


const SavedFav = () => {
  return (
    <div className='saved-fav'>
        <h1 className='com-heading-2 text-white mb-30'>Saved as a Favourite</h1>
        <div className='fav-item'>
            <div>
                <div className='area'>Home</div>
                <p className='location'>20 Square, New York, NY 10003</p>
            </div>
            <button className='del-btn ms-1'><i className='icon-delete'></i></button>
        </div>
        <div className='fav-item'>
            <div>
                <div className='area'>Office</div>
                <p className='location'>20 Square, New York, NY 10003</p>
            </div>
            <button className='del-btn ms-1'><i className='icon-delete'></i></button>
        </div>
        <div className='fav-item'>
            <div>
                <div className='area'>Second Home</div>
                <p className='location'>20 Square, New York, NY 10003</p>
            </div>
            <button className='del-btn ms-1'><i className='icon-delete'></i></button>
        </div>
    </div>
  )
}

export default SavedFav