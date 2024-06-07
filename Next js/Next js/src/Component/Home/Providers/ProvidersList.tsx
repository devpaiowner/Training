import Spinner from '@/Component/Layouts/Spinner'
import { RouteConfig } from '@/Config/CommonConfig'
import { PLAYXCHIP_DEFAULT_IMAGE_URL, PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL } from '@/Config/Config'
import { GetProviderListAction } from '@/Redux/Actions/HomeAction'
import { encodeID, imageUrl } from '@/utils/Helper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const ProvidersList = () => {

    const router = useRouter();
    const dispatch = useDispatch<any>();
    const [defaultpage, setDefaultPage]: any = useState(1)
    const [providerData, setProviderData]: any = useState([]);
    const [defaultpagesize, setDefaultPageSize]: any = useState(30)
    const [totalRenderRecord, setTotalRenderRecord]: any = useState(30);

    const GetProviderList = useSelector((state: any) => state.GetProviderListState)

    const fetchGameData = async (pageNumber: any = 1) => {
        dispatch(GetProviderListAction({
            "page": pageNumber,
            "pageSize": defaultpagesize,
        }))
    }

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);

    useEffect(() => {
        fetchGameData()
    }, []);

    const loadmore = () => {
        let nextPage = defaultpage + 1;
        setDefaultPage(nextPage)
        if (providerData == GetProviderList?.data?.data?.rows) {
            setProviderData([...providerData])
        }
        fetchGameData(nextPage)
        setTotalRenderRecord(totalRenderRecord + 30)
    }

    useEffect(() => {
        if (defaultpage >= 2 && !GetProviderList?.loading) {
            setProviderData([...providerData, ...GetProviderList?.data?.data?.rows])
        } else if (defaultpage == 1) {
            setProviderData(GetProviderList?.data?.data?.rows)
        }
    }, [GetProviderList]);

    useEffect(() => {
        setDefaultPage(1)
        setTotalRenderRecord(30)
        setProviderData([])
        return () => {
            dispatch({ type: "GET_PROVIDER_LIST_FAIL", data: null })
        }
    }, [])


    return (
        <>
            {GetProviderList?.loading && <Spinner />}
            <section className="py-2 py-lg-5 bg-gredient hoverTitle">
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link href={RouteConfig?.Home} className="backArrow"><i className="icon-arrow-right"></i></Link>
                        <h3 className="hTitle hLine">Providers</h3>
                    </div>

                    <div className="gameGrid-8-NOTScroll">
                        {providerData?.length > 0 ?
                            providerData?.map((providerdatas: any, providerkey: any) => {
                                return (
                                    <Fragment key={providerkey}>
                                        <div className="providerBox cursor-pointer" onClick={() => router.push(`${RouteConfig?.Providers}?provider_name=${encodeID(providerdatas?.name)}&provider_id=${encodeID(providerdatas?.marchant_id)}`)}>
                                            <figure>
                                                <img
                                                    src={PLAYXCHIP_DEFAULT_IMAGE_URL}
                                                    alt="Provider Image"
                                                    onLoad={(e: any) => {
                                                        if (!e.target.src.includes(PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL)) {
                                                            e.target.src = imageUrl(providerdatas?.image_path)
                                                        }
                                                    }}
                                                    onError={(e: any) => {
                                                        e.target.src = PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL
                                                    }}
                                                />
                                            </figure>
                                            <div>
                                                <p className="provideTitle">{providerdatas?.name}</p>
                                                {/* <p>{providerdatas?.marchant_id} Games</p> */}
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })
                            : ""}
                    </div>

                    {GetProviderList?.data?.data?.count >= totalRenderRecord &&
                        <div className="text-center mt-5"><button type="button" onClick={loadmore} className="btn btn-primary px-4">Load More</button></div>
                    }
                </div>
            </section>

        </>
    )
}

export default ProvidersList