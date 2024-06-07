import React from "react";
import { ToastContainer } from "react-toastify";
function ToastDefault(){

    return(

			<ToastContainer
                autoClose={1000}
                hideProgressBar={true}
                className="toast-chilling"
                position="top-center"
                newestOnTop={false}
                closeOnClick={true}
                rtl={false}
                pauseOnFocusLoss={false}
                draggable={false}
                pauseOnHover={false}
            />


    );
}

export default ToastDefault;