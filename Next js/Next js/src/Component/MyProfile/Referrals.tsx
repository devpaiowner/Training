import { GETAPI } from '@/API/Api'
import { ApiConfig } from '@/Config/CommonConfig'
import React, { useEffect, useState } from 'react'
import Spinner from '../Layouts/Spinner'
import { useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { RouteConfig } from '@/Config/CommonConfig';
import Link from 'next/link';
import { useRouter } from 'next/navigation'
const Referrals = () => {

    const router = useRouter();
    const [data, setData]: any = useState([])
    const [loading, setLoading] = useState(false)
    const user = useSelector((state: any) => state.UserGetProfileState);
    const [isCopied, setIsCopied] = useState(false)
    console.log("user", user);

    useEffect(() => {
        const fetch = async () => {
            setLoading(true)
            await GETAPI(ApiConfig?.GetSetting).then((response) => {
                if (response) {
                    setData(response?.data[0])
                }
            })
            setLoading(false)
        };

        fetch();
    }, [])

    const handleCopyPlayerId = () => {
        if (isCopied) {
            return;
        }
        setIsCopied(true)
        navigator.clipboard.writeText(user?.data?.data?.referral_code)
        toast.success("Copied.")
        setTimeout(() => {
            setIsCopied(false)
        }, 3000);
    }

    return (
        <>
            {loading && <Spinner />}
            <div className="col-md-12 col-lg-9">
                <section className="accountRight h-100">
                    <div className="container-fluid">
                        <div className="d-flex justify-content-between align-items-center">
                            <div className="d-flex">
                            <button onClick={() => router.back()} className="backArrow d-lg-none"><i className="icon-arrow-right"></i></button>
                                <h3 className="hTitle hLine">Referral Program</h3>
                            </div>
                            <div className="text-end">
                                <h4>Referral ID: {user?.data?.data?.referral_code}</h4>
                                <span onClick={handleCopyPlayerId} className="badge bg-success text-white cursor-pointer">
                                    {isCopied ? 'Copied' : 'Copy'}
                                </span>

                            </div>
                        </div>

                        <div className="table-responsive RefPrograme">
                            <table className="table">
                                <thead>
                                    <tr>
                                        <th scope="col"></th>
                                        <th scope="col"><img src="images/tier-1.svg" /></th>
                                        <th scope="col"><img src="images/tier-2.svg" /></th>
                                        <th scope="col"><img src="images/tier-3.svg" /></th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {/* <tr>
                                        <th scope="row">Requirements</th>
                                        <td>5 Traders + $2K Fees/Week</td>
                                        <td>15 Traders + $10K Fees/Week</td>
                                        <td>30 Traders + $50K Fees/Week</td>
                                    </tr> */}
                                    {
                                        data?.referral_lavel?.length > 0 &&
                                        data?.referral_lavel?.map((referral: any, referralKey: any) => {
                                            const isOdd = referralKey % 2 == 0
                                            return (
                                                <>
                                                    <tr key={referralKey}>
                                                        <td scope="row" className={!isOdd ? 'Cgold' : ''}>Level {referralKey + 1}</td>
                                                        <td className={!isOdd ? 'Cgold' : ''}>{referral?.deposit1}%</td>
                                                        <td className={!isOdd ? 'Cgold' : ''}>{referral?.deposit2}%</td>
                                                        <td className={!isOdd ? 'Cgold' : ''}>{referral?.deposit3}%</td>
                                                    </tr>
                                                </>
                                            )
                                        })
                                    }
                                </tbody>
                            </table>
                        </div>
                    </div>
                </section>
            </div>
        </>
    )
}

export default Referrals