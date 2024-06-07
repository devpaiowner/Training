import React, { useState } from 'react'
import Sidebar from './Sidebar'
import MyProfile from './MyProfile'
import ChangePassword from './ChangePassword'
import { useRouter, useSearchParams } from 'next/navigation';
import { RouteConfig } from '@/Config/CommonConfig';
import Link from 'next/link';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import Spinner from '../Layouts/Spinner';
import PaymentOption from '../Payments/PaymentMethods/PaymentMethods';
import Transactions from './Transactions';
import Kyc from './Kyc';
import Referrals from './Referrals';
import AppliedBonus from './AppliedBonus';
import MobileAccountOption from './MobileAccountOption';

const Index = () => {

    const router: any = useRouter();
    const searchParams = useSearchParams();
    const page: any = searchParams.get('');
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
        <>
            {user?.loading && <Spinner />}
            <section className="py-5 bg-gredient myaccount">
                <div className="container-fluid">
                    <div className="d-none d-lg-flex">
                    <button onClick={() => router.back()} className="backArrow d-lg-none"><i className="icon-arrow-right"></i></button>
                        <h3 className="hTitle hLine">My Account</h3>
                    </div>
                    <div className="row gy-4 gx-0 align-items-stretch">
                        <div className="col-lg-3 d-none d-lg-block">
                            <div className="PRomationleft h-100">
                                <div className="userLeft">
                                    <figure><img src="images/user-default.png" /></figure>
                                    <div className="userLeftText">
                                        <h6>{userName}</h6>
                                        <p>Player ID: {userPlayerId} <span onClick={handleCopyPlayerId} className="badge text-bg-success cursor-pointer">{isCopied ? 'Copied' : 'Copy'}</span></p>
                                    </div>
                                </div>
                                <Sidebar page={page} />
                            </div>
                        </div>
                        {
                            page == 'change-password' ?
                                <ChangePassword />
                                : page == 'profile' ?
                                    <MyProfile userData={user} />
                                    :
                                    page == 'transactions' ?
                                        <Transactions />
                                        :
                                        page == 'add-kyc' ?
                                            <Kyc userData={user} /> :
                                            page == 'referrals' ?
                                                <Referrals />
                                                :
                                                page == 'applied-bonus' ?
                                                    <AppliedBonus />
                                                    :
                                                    page == 'account-options' ?
                                                    <MobileAccountOption />
                                                    :
                                                    router.push(`${RouteConfig?.Profile}?=profile`)
                        }
                    </div>
                </div>
            </section>
        </>
    )
}

export default Index