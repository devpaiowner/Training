import React, { useState } from 'react'
import { Link } from 'react-router-dom'
// import { Images } from '../../../constants/ImageConstants'
import MultiStep from 'react-multistep'


const Step1 = () => {

 

  return (
    <div className='driver-card'>
      <div className='row mb-3'>
        <div className='col-12'>
          <label className='form-heading'>Driver’s License<span className='red-text'>*</span></label>
        </div>
        <div className='col-md-6'>
          <div className="com-floating">
            <i className="f-icon icon-card"></i>
            <label className="f-label">Driver’s License</label>
            <input className="f-input" type="text" placeholder="Driver’s License"/>
          </div>
        </div>
        <div className='col-sm-6 col-md-3'>
          <div className='upload-ui'>
            <input type="file"  className='d-none' id='front-1'/>
            <label htmlFor="front-1">
              <i className='icon-upload'></i>
              <span>Front</span>
            </label>
          </div>
        </div>
        <div className='col-sm-6 col-md-3'>
          <div className='upload-ui'>
            <input type="file" className='d-none' id='Back-1'/>
            <label htmlFor="Back-1">
              <i className='icon-upload'></i>
              <span>Back</span>
            </label>
          </div>
        </div>
      </div>

      <div className='row mb-3'>
        <div className='col-12'>
          <label className='form-heading'>Vehicle Registration<span className='red-text'>*</span></label>
        </div>
        <div className='col-md-6'>
          <div className="com-floating">
            <i className="f-icon icon-card"></i>
            <label className="f-label">Registration Number</label>
            <input className="f-input" type="text" placeholder="Registration Number"/>
          </div>
        </div>
        <div className='col-sm-6 col-md-3'>
          <div className='upload-ui'>
            <input type="file"  className='d-none' id='front-1'/>
            <label htmlFor="front-1">
              <i className='icon-upload'></i>
              <span>Front</span>
            </label>
          </div>
        </div>
        <div className='col-sm-6 col-md-3'>
          <div className='upload-ui'>
            <input type="file" className='d-none' id='Back-1'/>
            <label htmlFor="Back-1">
              <i className='icon-upload'></i>
              <span>Back</span>
            </label>
          </div>
        </div>
      </div>
      <div className='row mb-3'>
        <div className='col-12'>
          <label className='form-heading'>Vehicle Insurance<span className='red-text'>*</span></label>
        </div>
        <div className='col-md-6'>
          <div className="com-floating">
            <i className="f-icon icon-card"></i>
            <label className="f-label">Insurance Number</label>
            <input className="f-input" type="text" placeholder="Insurance Number"/>
          </div>
        </div>
        <div className='col-sm-6 col-md-3'>
          <div className='upload-ui'>
            <input type="file"  className='d-none' id='front-1'/>
            <label htmlFor="front-1">
              <i className='icon-upload'></i>
              <span>Front</span>
            </label>
          </div>
        </div>
        <div className='col-sm-6 col-md-3'>
          <div className='upload-ui'>
            <input type="file" className='d-none' id='Back-1'/>
            <label htmlFor="Back-1">
              <i className='icon-upload'></i>
              <span>Back</span>
            </label>
          </div>
        </div>
      </div>
      <div className='row'>
        <div className='col-md-6'>
          <div className="com-floating">
            <i className="f-icon icon-van"></i>
            <label className="f-label">Add Company/Subcontractor Name</label>
            <input className="f-input" type="text" placeholder="Enter the Name"/>
          </div>
        </div>
        <div className='col-md-6'>
          <div className="com-floating">
            <i className="f-icon icon-van"></i>
            <label className="f-label">Fleet Number</label>
            <input className="f-input" type="text" placeholder="Enter Fleet Number"/>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step1