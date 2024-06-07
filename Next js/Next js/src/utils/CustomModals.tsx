import Modal from 'react-modal';
import $ from 'jquery';

let customStyles = {}

const PhoneEmailVerifyModal = ({
    isOpen,
    setIsOpen,
    type,
    onClose,
    onVerify
}: any) => {
    // Modal.setAppElement('#app element');

    customStyles = {
        content: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            right: 'auto',
            bottom: 'auto',
            marginRight: '-50%',
            transform: 'translate(-50%, -50%)',
            width: '35%',
            minHeight: '30%',
            overflow: 'auto',
            borderRadius: '10px',
            padding: '25px',
            backgroundColor: '#000',
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            border: '1px solid #ccc',

        },
        overlay: {
            zIndex: 1000,
            backgroundColor: 'rgba(0, 0, 0, 0.75)',
        },
    };

    return (
        <Modal
            isOpen={isOpen}
            // onAfterOpen={afterOpenModal}
            onRequestClose={onClose}
            style={customStyles}
            shouldCloseOnOverlayClick={true}
            contentLabel="Verify Modal"
        >
            <button type="button" className="btn-close" aria-label="Close" onClick={() => setIsOpen(false)}><img src="images/close-btn.svg" /></button>
            <div className="modleRight">
                <h1>Verify OTP</h1>
                <div className="row">
                    <div className="col-md-9 mx-auto mt-5">
                        <div className="formBox h-100">
                            <div className="mb-3">
                                <input type="text" className="form-control" id='otp-input-verify' placeholder="Enter Four Digit Otp" maxLength={4} />
                                <p className='text-danger' id='otpValidationP'></p>
                                <button type="submit" className="btn btn-primary mt-4 w-100 mx-auto d-block mt-4" onClick={() => {

                                    const otpInput: any = $('#otp-input-verify').val()
                                    if (!otpInput) {
                                        $('#otpValidationP').text('Please enter OTP');
                                    } else if (otpInput?.length < 4) {
                                        $('#otpValidationP').text('Please enter a 4-digit OTP');
                                    } else {
                                        $('#otpValidationP').text('');
                                        onVerify($('#otp-input-verify').val())
                                    }
                                }}>Verify OTP</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Modal>
    )
}


export default PhoneEmailVerifyModal