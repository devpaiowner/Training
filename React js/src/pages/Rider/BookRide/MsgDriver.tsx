import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { Images } from '../../../constants/ImageConstants'


const MsgDriver = () => {

 

  return (
    <main className="main-content">
        <div className='msg-area'>
            <div className='msg-box'>
                <div className='text-end'>
                    <button className='close-chat'><i className='icon-close-circle'></i></button>
                </div>
                <div className='msg-head'>
                    <img className='profile-img' src={Images?.UserImg2} alt="" />
                    <div className='msg-head-name-info'>
                        <span className='name'>Roan Roads</span>
                        <div className='taxi-info'>
                            <span className='taxi-name'>Robo Texi</span> • 
                            <span className='taxi-num'>3M53ABF2</span>
                        </div>
                    </div>
                    <button className='ellipsis'><i className='icon-ellipsis'></i></button>
                </div>

                <div className='chat-time-safe'>
                    <div className='timeshow'>Thu, Feb 29, 2:19 PM</div>
                    <div className='mx-4'>Keep your account safe - never share personal or  account information in this chat</div>
                </div>

                {/* <div className='chat-box'> */}
                    <div className='chat-box-msg-area'>
                        <div className='chat-placeholder'>
                            <img src={Images?.ChatImg} alt="" />
                            <p>Need to contact your driver? <br />Send them a message here.</p>
                        </div>
                        <div className='chat-msg sender'>
                            <p className='msg-txt'>Lorem ipsum dolor sit, amet consectetur adip isic ing sed.</p>
                            <span className='msg-time'>13:41</span>
                        </div>
                        <div className='chat-msg receiver'>
                            <p className='msg-txt'>Lorem ipsum dolor sit, amet consectetur adip isic ing sed.</p>
                            <span className='msg-time'>13:41</span>
                        </div>
                        <div className='chat-msg sender'>
                            <p className='msg-txt'>Lorem ipsum dolor sit, amet consectetur adip isic ing sed.</p>
                            <span className='msg-time'>13:41</span>
                        </div>
                        <div className='chat-msg sender'>
                            <p className='msg-txt'>No</p>
                            <span className='msg-time'>13:41</span>
                        </div>
                        <div className='chat-msg receiver'>
                            <p className='msg-txt'>Lorem ipsum dolor sit, amet consectetur adip isic ing sed.</p>
                            <span className='msg-time'>13:41</span>
                        </div>
                    </div>
                    <div className='chat-box-typing'>
                        <input className='text-field com-input' placeholder='Send a message...'></input>
                        <button className='msg-send-btn com-btn'><i className='icon-send'></i></button>
                    </div>
                {/* </div> */}
            </div>
        </div>
    </main>
    )
}

export default MsgDriver