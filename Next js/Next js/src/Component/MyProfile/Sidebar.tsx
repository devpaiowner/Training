import { RouteConfig } from '@/Config/CommonConfig'
import { VALIDATION_MESSAGE } from '@/Constants/Constants';
import { UserLogout } from '@/Redux/Actions/AuthAction';
import { removeFromLocalStorage } from '@/utils/Helper';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Swal from 'sweetalert2'


const Sidebar = (props: any) => {
    const currentPage: any = props?.page;
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const userLogout = useSelector((state: any) => state.UserLogoutState);
    

    const handleLogOut = () => {
        router.back()
        Swal.fire({
            title: VALIDATION_MESSAGE?.LOGOUT_MODEL_TITLE,
            text: VALIDATION_MESSAGE?.LOGOUT_MODEL_TEXT,
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#31CE36',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Ok'
        }).then((result) => {
            if (result.isConfirmed) {
                dispatch(UserLogout({}))
            }
        });
    }
    useEffect(() => {
        if (userLogout?.data?.status) {  
            removeFromLocalStorage('isUserLoginToken')
            removeFromLocalStorage('UserDetails')
            setTimeout(() => {
                window.location.href = RouteConfig?.Home
            }, 2000);
            
        }
    }, [userLogout])



    return (
        <>
            <ul>
                <li><Link className={`${currentPage === 'profile' && 'active'}`} href={`${RouteConfig?.Profile}?=profile`}><span className="icon-settings-solid"></span> Account</Link></li>
                <li><Link className={`${currentPage === 'applied-bonus' && 'active'}`} href={`${RouteConfig?.Profile}?=applied-bonus`}><span className="icon-gift"></span>Applied Bonus</Link></li>
                <li><Link className={`${currentPage === 'referrals' && 'active'}`} href={`${RouteConfig?.Profile}?=referrals`}><span className="icon-refer"></span> Referral</Link></li>
                <li><Link className={`${currentPage === 'transactions' && 'active'}`} href={`${RouteConfig?.Profile}?=transactions`}><span className="icon-bx-transfer"></span> Transaction History</Link></li>
                <li><Link className={`${currentPage === 'change-password' && 'active'}`} href={`${RouteConfig?.Profile}?=change-password`}><span className="icon-lock"></span> Security</Link></li>
                <li className="d-none d-lg-block"><a className='cursor-pointer' onClick={handleLogOut}><span className="icon-log-out"></span> Logout</a></li>
            </ul>
            <div className='LOGouT mt-auto d-lg-none'>
                <a className='cursor-pointer' onClick={handleLogOut}><span className="icon-log-out"></span> Logout</a>
            </div>
        </>
    )
}

export default Sidebar