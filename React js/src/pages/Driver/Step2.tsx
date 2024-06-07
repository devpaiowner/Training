import React, { useState } from 'react'
// import { Images } from '../../../constants/ImageConstants'
import Select from 'react-select';
import { options } from '../../constants/Constants';

const Step2 = () => {

  const [selectedOption, setSelectedOption] = useState<any>();

  // const handleChange = (newValue: { value: string; label: string; } | null) => {
  //   setSelectedOption(newValue);
  // };

  return (
    <div className='driver-card'>
      <div className='row'>
        <div className='col-md-6'>
          <div className='custom-select'>
            <i className="f-icon icon-van"></i>
            <label className="f-label">Vehicle Type<span className='red-text'>*</span></label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="custom-select-inner"
              classNamePrefix="custom-select-inner"
              placeholder='Select Vehicle Make'
              // menuIsOpen
              isSearchable={false}
            />
          </div>
        </div>

        <div className='col-md-6'>
          <div className='custom-select'>
            <i className="f-icon icon-van"></i>
            <label className="f-label">Vehicle Make<span className='red-text'>*</span></label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="custom-select-inner"
              classNamePrefix="custom-select-inner"
              placeholder='Select Vehicle Make'
              isSearchable={false}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='custom-select'>
            <i className="f-icon icon-van"></i>
            <label className="f-label">Vehicle Model<span className='red-text'>*</span></label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="custom-select-inner"
              classNamePrefix="custom-select-inner"
              placeholder='Select Vehicle Model'
              isSearchable={false}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='custom-select'>
            <i className="f-icon icon-van"></i>
            <label className="f-label">Vehicle Year<span className='red-text'>*</span></label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="custom-select-inner"
              classNamePrefix="custom-select-inner"
              placeholder='Select Vehicle Year'
              isSearchable={false}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <div className='custom-select'>
            <i className="f-icon icon-van"></i>
            <label className="f-label">Door Type</label>
            <Select
              defaultValue={selectedOption}
              onChange={setSelectedOption}
              options={options}
              className="custom-select-inner"
              classNamePrefix="custom-select-inner"
              placeholder='Select Door Type'
              isSearchable={false}
            />
          </div>
        </div>
        <div className='col-md-6'>
          <label className='form-heading'>Equipped with accessible lift</label>
          <div className='d-flex gap-5'>
            <div className="form-check com-radio">
                <input className="form-check-input" type="radio" id="equipped-with1" name="equipped-with"/>
                <label className="form-check-label golden-text" htmlFor="equipped-with1">Yes</label>
            </div>
            <div className="form-check com-radio">
                <input className="form-check-input" type="radio" id="equipped-with2" name="equipped-with"/>
                <label className="form-check-label golden-text" htmlFor="equipped-with2">No</label>
            </div>
          </div>
        </div>
        <div className='col-md-4'>
          <label className='form-heading'>Is your vehicle ADA certified</label>
          <div className='d-flex gap-5'>
            <div className="form-check com-radio">
                <input className="form-check-input" type="radio" id="is-your-vehicle1" name="Is your vehicle"/>
                <label className="form-check-label golden-text" htmlFor="is-your-vehicle1">Yes</label>
            </div>
            <div className="form-check com-radio">
                <input className="form-check-input" type="radio" id="is-your-vehicle2" name="Is your vehicle"/>
                <label className="form-check-label golden-text" htmlFor="is-your-vehicle2">No</label>
            </div>
          </div>
        </div>
        <div className='col-md-5'>
          <label className='form-heading'>Entry Type</label>
          <div className='d-flex gap-5'>
            <div className="form-check com-radio">
                <input className="form-check-input" type="radio" id="Rare Entry" name="Entry-Type-radio"/>
                <label className="form-check-label golden-text" htmlFor="Rare Entry">Rare Entry </label>
            </div>
            <div className="form-check com-radio">
                <input className="form-check-input" type="radio" id="Side Entry" name="Entry-Type-radio"/>
                <label className="form-check-label golden-text" htmlFor="Side Entry">Side Entry</label>
            </div>
          </div>
        </div>
        <div className='col-md-3'>
          <label className='form-heading'>Ramp Equipped with</label>
          <div className='d-flex gap-5'>
            <div className="form-check com-radio">
                <input className="form-check-input" type="radio" id="Power" name="Ramp Equipped with"/>
                <label className="form-check-label golden-text" htmlFor="Power">Power</label>
            </div>
            <div className="form-check com-radio">
                <input className="form-check-input" type="radio" id="Manual" name="Ramp Equipped with"/>
                <label className="form-check-label golden-text" htmlFor="Manual">Manual</label>
            </div>
          </div>
        </div>
      </div>
      <div className='row mt-4'>
        <div className='col-md-12'>
          <label className='form-heading'>Capacity</label>
          <div className='row'>
            <div className='col-md-6'>
              <label className='form-heading'>How many occupied wheelchair users can you transport?</label>
              <input type="text" className='com-input' />
            </div>
            <div className='col-md-6 mt-auto'>
              <label className='form-heading'>How many passenger seats do you have?</label>
              <input type="text" className='com-input' />
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Step2