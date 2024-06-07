import { Fragment } from "react";
import Link from 'next/link'
import { RouteConfig } from "@/Config/CommonConfig";
function PaymentMethods() {

   return (
      <>
         <section className="py-5 bg-gredient">
            <div className="container-fluid">
               <div className="d-flex">
                  <Link href={RouteConfig?.Home} className="backArrow"><i className="icon-arrow-right"></i></Link>
                  <h3 className="hTitle hLine">Payment Method</h3>
               </div>
               <div className="row gy-5 row-cols-2 row-cols-md-3 row-cols-md-4 row-cols-lg-5 my-4">
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
                  <div className="col">
                     <div className="paymentBox">
                        <figure><img src="images/Paytm_logo_PNG1.png" /></figure>
                        <p>Min ₹500 - Max ₹100000</p>
                        <p><i className="fa-regular fa-clock"></i> Processing time: <strong>Instant - 5 Min</strong></p>
                     </div>
                  </div>
               </div>
            </div>
         </section>
      </>
   );
}
export default PaymentMethods;