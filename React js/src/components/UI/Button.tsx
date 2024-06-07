import React from 'react'
import { Link } from 'react-router-dom';

interface IButton {
    text: string;
    onClick?: () => void;
    className?: string;
    type?: any;
    style?: any;
    isLoading?: boolean;
}

const Button = ({ text, className, type = 'button', onClick, style, isLoading = false }: IButton) => {
    return (
        <>
            {
                (isLoading ?
                    <button className={className||"com-btn w-100 form-submit-btn"} type='button'>
                        <div className='ellipsis-loader'>
                            <div className='dot'></div>
                            <div className='dot'></div>
                            <div className='dot'></div>
                        </div>
                    </button> :
                    <button onClick={onClick} className={className || ''} style={style} type={type}>{text}</button>)
            }
        </>
    )
}

export default Button