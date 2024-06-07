import { RouteConfig } from '@/Config/CommonConfig';
import { PLAYXCHIP_DEFAULT_IMAGE_URL, PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL } from '@/Config/Config';
import { GetProviderListAction } from '@/Redux/Actions/HomeAction';
import { encodeID, getCookie, imageUrl, setCookie } from '@/utils/Helper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const Providers = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [providersData, setProvidersData]: any = useState([]);

    const GetProviderList = useSelector((state: any) => state.GetProviderListState)

    useEffect(() => {
        // if (!GetProviderList?.data?.data) {
        dispatch(GetProviderListAction({
            "page": 1,
            "pageSize": 20,
        }))
        // }
    }, []);


    useEffect(() => {
        const gameProviderData = GetProviderList?.data?.data;
        if (gameProviderData) {
            setProvidersData(gameProviderData);
            setCookie('providersList', JSON.stringify(gameProviderData), 30);
        } else {
            const providersList: any = getCookie('providersList');
            if (providersList) {
                const data = JSON.parse(providersList);
                setProvidersData(data);
            }
        }
    }, [GetProviderList]);

    useEffect(() => {
        return () => {
            dispatch({ type: "GET_PROVIDER_LIST_FAIL", data: null })
        }
    }, [])
    return (
        <>
            {providersData?.count > 0 ?
                <section className="py-3 py-lg-5 bg-gredient-black hoverTitle">
                    <div className="container-fluid">
                        <h3 className="hTitle hLine">All Providers <Link href={RouteConfig?.Providers} className="viewAll"><span>See All</span> <i className="icon-arrow-right"></i></Link></h3>
                        <div className='scrollList'>
                            <div className="gameGrid-8">
                                {
                                    providersData?.rows?.map((providerdata: any, providerkey: any) => {
                                        return (
                                            <Fragment key={providerkey}>
                                                <div className="providerBox cursor-pointer" onClick={() => router.push(`${RouteConfig?.Providers}?provider_name=${encodeID(providerdata?.name)}&provider_id=${encodeID(providerdata?.marchant_id)}`)}>
                                                    <figure>
                                                        <img
                                                            src={PLAYXCHIP_DEFAULT_IMAGE_URL}
                                                            onLoad={(e: any) => {
                                                                if (!e.target.src.includes(PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL)) {
                                                                    e.target.src = imageUrl(providerdata?.image_path)
                                                                }
                                                            }}
                                                            onError={(e: any) => {
                                                                e.target.src = PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL
                                                            }}
                                                        />
                                                    </figure>
                                                    <div>
                                                        <p className="provideTitle">{providerdata?.name}</p>
                                                        {/* <p>{providerdata?.marchant_id} Games</p> */}
                                                    </div>
                                                </div>
                                            </Fragment>
                                        )
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </section>
                : ""}
        </>
    )
}

export default Providers