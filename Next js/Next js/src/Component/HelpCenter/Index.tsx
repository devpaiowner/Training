import React from 'react'

const index = () => {
  return (
    <>
         <section className="py-5 bg-gredient cms-pages help-details">
            <div className="container-fluid">
               <div className="d-flex">
                  <a href="#" className="backArrow"><i className="icon-arrow-right"></i></a>
                  <h3 className="hTitle hLine">Help Center</h3>
               </div>
               <div className="row gy-4 gx-5">
                  <div className="col-lg-3">
                     <aside>
                        <ul className="nav flex-column">
                           <li className="nav-item">
                             <a className="nav-link active" aria-current="page" href="#">Affiliate program</a>
                           </li>
                           <li className="nav-item">
                             <a className="nav-link" href="#">Sportbets</a>
                           </li>
                           <li className="nav-item">
                             <a className="nav-link" href="#">Affiliate program</a>
                           </li>
                           <li className="nav-item">
                             <a className="nav-link">Registration & Account</a>
                           </li>
                           <li className="nav-item">
                              <a className="nav-link">Deposits and Withdrawals</a>
                            </li>
                         </ul>
                     </aside>
                  </div>
                  <div className="col-lg-9">
                     <div className="accordion accordion-flush" id="accordionFlushExample">
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="flush-headingOne">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseOne" aria-expanded="true" aria-controls="flush-collapseOne">
                              Accordion Item #1
                            </button>
                          </h2>
                          <div id="flush-collapseOne" className="accordion-collapse collapse show" aria-labelledby="flush-headingOne" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the first item's accordion body.</div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="flush-headingTwo">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseTwo" aria-expanded="false" aria-controls="flush-collapseTwo">
                              Accordion Item #2
                            </button>
                          </h2>
                          <div id="flush-collapseTwo" className="accordion-collapse collapse" aria-labelledby="flush-headingTwo" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the second item's accordion body. Let's imagine this being filled with some actual content.</div>
                          </div>
                        </div>
                        <div className="accordion-item">
                          <h2 className="accordion-header" id="flush-headingThree">
                            <button className="accordion-button collapsed" type="button" data-bs-toggle="collapse" data-bs-target="#flush-collapseThree" aria-expanded="false" aria-controls="flush-collapseThree">
                              Accordion Item #3
                            </button>
                          </h2>
                          <div id="flush-collapseThree" className="accordion-collapse collapse" aria-labelledby="flush-headingThree" data-bs-parent="#accordionFlushExample">
                            <div className="accordion-body">Placeholder content for this accordion, which is intended to demonstrate the <code>.accordion-flush</code> className. This is the third item's accordion body. Nothing more exciting happening here in terms of content, but just filling up the space to make it look, at least at first glance, a bit more representative of how this would look in a real-world application.</div>
                          </div>
                        </div>
                      </div>
                  </div>
                </div>
            </div>
         </section>
    </>
  )
}

export default index