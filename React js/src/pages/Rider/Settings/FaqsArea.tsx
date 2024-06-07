import React from 'react'
import { Images } from '../../../constants/ImageConstants'
import { Link } from 'react-router-dom'


const FaqArea = () => {
  return (
    <div className='faq-area'>
        <h1 className='com-heading-2 text-white mb-30'>FAQ's</h1>

        <div className="accordion" id="accordionExample">
        <div className="accordion-item">
            <h2 className="accordion-header" id="faq-1">
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-1" aria-expanded="true" aria-controls="collapse-1">
                    Customer service ?
                </button>
            </h2>
            <div id="collapse-1" className="accordion-collapse collapse show" aria-labelledby="faq-1" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    Loren ipsum is simply dummy text of the printing and type setting industryto fab du plesis and dgos dnalfdlsls  ipsum is simply dummy text of the to fab du plesis. Loren ipsum is simply dummy texttype setting industryto fab du plesis and dgos dnalfdlsls  ipsum is simply dummy text of the to fab du plesis. Loren ipsum is simply dummy text of the printing and type setting industryto fab du plesis and dgos dnalfdlsls  ipsum is simply dummy text of the to fab du plesis. 
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="faq-2">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2">
                    Problem with my driver?
                </button>
            </h2>
            <div id="collapse-2" className="accordion-collapse collapse" aria-labelledby="faq-2" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aspernatur unde in illum dolorum fugit cumque distinctio quam, porro consequuntur odio ipsam pariatur eius tempore, laudantium quisquam nisi, nemo dignissimos impedit!
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="faq-3">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-3" aria-expanded="false" aria-controls="collapse-3">
                    Request a refund?
                </button>
            </h2>
            <div id="collapse-3" className="accordion-collapse collapse" aria-labelledby="faq-3" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit hic explicabo dolor cupiditate officia ea sapiente odio fugiat, facilis sequi incidunt tenetur qui? Ullam voluptatum facilis iure adipisci eos non!
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="faq-4">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-4" aria-expanded="false" aria-controls="collapse-4">
                    Problem with the Application?
                </button>
            </h2>
            <div id="collapse-4" className="accordion-collapse collapse" aria-labelledby="faq-4" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit hic explicabo dolor cupiditate officia ea sapiente odio fugiat, facilis sequi incidunt tenetur qui? Ullam voluptatum facilis iure adipisci eos non!
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="faq-5">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-5" aria-expanded="false" aria-controls="collapse-5">
                Problem with my fare charges?
                </button>
            </h2>
            <div id="collapse-5" className="accordion-collapse collapse" aria-labelledby="faq-5" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit hic explicabo dolor cupiditate officia ea sapiente odio fugiat, facilis sequi incidunt tenetur qui? Ullam voluptatum facilis iure adipisci eos non!
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="faq-6">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-6" aria-expanded="false" aria-controls="collapse-6">
                Problem with driver’s vehicle 
                </button>
            </h2>
            <div id="collapse-6" className="accordion-collapse collapse" aria-labelledby="faq-6" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit hic explicabo dolor cupiditate officia ea sapiente odio fugiat, facilis sequi incidunt tenetur qui? Ullam voluptatum facilis iure adipisci eos non!
                </div>
            </div>
        </div>
        <div className="accordion-item">
            <h2 className="accordion-header" id="faq-7">
                <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#collapse-7" aria-expanded="false" aria-controls="collapse-7">
                Safety Concerns
                </button>
            </h2>
            <div id="collapse-7" className="accordion-collapse collapse" aria-labelledby="faq-7" data-bs-parent="#accordionExample">
                <div className="accordion-body">
                    Lorem, ipsum dolor sit amet consectetur adipisicing elit. Odit hic explicabo dolor cupiditate officia ea sapiente odio fugiat, facilis sequi incidunt tenetur qui? Ullam voluptatum facilis iure adipisci eos non!
                </div>
            </div>
        </div>
        </div>
    </div>
  )
}

export default FaqArea