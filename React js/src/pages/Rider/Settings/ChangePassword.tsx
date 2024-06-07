import React from 'react'
import { Images } from '../../../constants/ImageConstants'
import { Link } from 'react-router-dom'


const ChangePassword = () => {
  return (
    <div className='chng-password'>
        <h1 className='com-heading-2 text-white mb-30'>Change Password</h1>
        <div className='row'>
            <div className='col-md-6 col-xxl-5'>
                <div className="com-floating">
                    <i className="f-icon icon-lock"></i>
                    <label className="f-label">Old Password</label>
                    <input className="f-input f-pass-input" type="password" placeholder="Old Password" />
                    <i className="f-pass icon-eye-disabled"></i>
                </div>
                <div className="com-floating">
                    <i className="f-icon icon-lock"></i>
                    <label className="f-label">New Password</label>
                    <input className="f-input f-pass-input" type="password" placeholder="New Password" />
                    <i className="f-pass icon-eye-disabled"></i>
                </div>
                <div className="com-floating">
                    <i className="f-icon icon-lock"></i>
                    <label className="f-label">Confirm New Password</label>
                    <input className="f-input f-pass-input" type="password" placeholder="Confirm New Password" />
                    <i className="f-pass icon-eye-disabled"></i>
                </div>
                <button className='com-btn w-100 mt-100'>Submit</button>
            </div>
        </div>
                            
    </div>
  )
}

export default ChangePassword