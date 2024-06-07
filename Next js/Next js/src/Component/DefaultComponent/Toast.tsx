import { toast, ToastContainer } from "react-toastify";
function ToastDefault(props: any) {

    return (

        <ToastContainer
            autoClose={1500}
            hideProgressBar={true}
            className="toast-chilling"
            position="top-right"
            newestOnTop={false}
            closeOnClick={true}
            rtl={false}
            pauseOnFocusLoss={false}
            draggable={false}
            pauseOnHover={false}
            theme="light"
        />


    );
}
export default ToastDefault;
