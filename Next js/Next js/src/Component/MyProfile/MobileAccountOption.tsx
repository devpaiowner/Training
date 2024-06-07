
import React, { useState } from 'react';
import Sidebar from './Sidebar';
import myImage from '../../../public/images/user-default.png';
import Link from 'next/link';
import { RouteConfig } from '@/Config/CommonConfig';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const MobileAccountOption = () => {
  const [isCopied, setIsCopied] = useState(false)
  const user = useSelector((state: any) => state.UserGetProfileState);

  const userName = user?.data?.data?.name
  const userPlayerId = user?.data?.data?.username

  const handleCopyPlayerId = () => {
    if (isCopied) {
      return;
    }
    setIsCopied(true)
    navigator.clipboard.writeText(userPlayerId)
    toast.success("Copied.")
    setTimeout(() => {
      setIsCopied(false)
    }, 3000);
  }

  return (
    <div className="PRomationleft p-3 mobieAccount">

      <div className="sidebartop">
        <Link href={RouteConfig?.Home} className="btn text-light"><span className="icon-cancel"></span></Link>
      </div>
      <div className="userLeft">
        <figure><img src="images/user-default.png" /></figure>
        <div className="userLeftText d-flex w-100">
          <div className='me-2'><h6>{userName}</h6>
            <p>Player ID: {userPlayerId} <span onClick={handleCopyPlayerId} className="badge text-bg-success cursor-pointer">{isCopied ? 'Copied' : 'Copy'}</span></p>
          </div>
          <Link href={RouteConfig?.Notifications} className="btn ms-auto nOtificaton" type="button"><i className="fa-solid fa-bell"></i></Link>
        </div>
      </div>

      <Sidebar />
    </div>
  );
};

export default MobileAccountOption 