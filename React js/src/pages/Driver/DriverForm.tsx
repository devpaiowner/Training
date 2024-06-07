import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Images } from '../../constants/ImageConstants'
import MultiStep from 'react-multistep'
import Step1 from './Step1'
import Step2 from './Step2'
import Step3 from './Step3'
import Step4 from './Step4'
import Step5 from './Step5'



import Select from 'react-select';


const options = [
  { value: 'chocolate', label: 'Chocolate' },
  { value: 'strawberry', label: 'Strawberry' },
  { value: 'vanilla', label: 'Vanilla' },
];  

const DriverForm = () => {

  const [selectedOption, setSelectedOption] = useState<{ value: string; label: string; } | null>(null);

  const handleChange = (newValue: { value: string; label: string; } | null) => {
    setSelectedOption(newValue);
  };

  const steps = [
    {title: 'Upload Documents', component: <Step1/>},
    {title: 'Vehicle Information', component: <Step2/>},
    {title: 'Certifications', component: <Step3/>},
    {title: 'Vehicle Inspection', component: <Step4/>},
    {title: 'Personal Information', component: <Step5/>}
  ];
  

  return (
    <main className="main-content">
      <div className='container-fluid'>
        <div className='driver-area top-gap'>

          <div className='custom-step'>
            <div className='step-single active'>
              <span className='step-txt'>Upload Documents</span>
            </div>
            <div className='step-single'>
              <span className='step-txt'>Vehicle Information</span>
            </div>
            <div className='step-single'>
              <span className='step-txt'>Certifications</span>
            </div>
            <div className='step-single'>
              <span className='step-txt'>Vehicle Inspection</span>
            </div>
            <div className='step-single'>
              <span className='step-txt'>Personal Information</span>
            </div>
          </div>


          <MultiStep 
          
            activeStep={0} 
            showNavigation={true} 
            steps={steps}
          />

          {/* <MultiStep activeStep={0} >
              <Step1 />
              <Step2 />
              <Step3 />
              <Step4 />
              <Step5 />
          </MultiStep> */}

        </div>
      </div>
      
   </main>
  )
}

export default DriverForm