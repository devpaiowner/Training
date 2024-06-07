import Spinner from '@/Component/Layouts/Spinner';
import { RouteConfig } from '@/Config/CommonConfig';
import { PLAYXCHIP_DEFAULT_IMAGE_URL } from '@/Config/Config';
import { GetProviderGamesListAction } from '@/Redux/Actions/HomeAction';
import { decodeID, encodeID, imageUrl, isNotEmpty } from '@/utils/Helper';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const ProviderGames = (props: any) => {

    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [defaultpage, setDefaultPage]: any = useState(1)
    const [providerGamesData, setProviderGamesData]: any = useState([]);
    const [defaultpagesize, setDefaultPageSize]: any = useState(30)

    const [totalRenderRecord, setTotalRenderRecord]: any = useState(30);

    const providerGames = useSelector((state: any) => state.GetProviderGamesListState);

    const fetchGameData = async (pageNumber: any = 1) => {
        dispatch(GetProviderGamesListAction({
            // "merchant_id": decodeID(props?.provider?.providerId),
            "merchant_id": decodeID(props?.provider?.providerId)?.split(',').map(Number) ?? [],
            "page": pageNumber,
            "pageSize": defaultpagesize,
        }))
    }

    useEffect(() => {
        fetchGameData()
    }, [])

    useEffect(() => {
        if (defaultpage >= 2 && !providerGames?.loading) {
            setProviderGamesData([...providerGamesData, ...providerGames?.data?.data?.rows])
        } else if (defaultpage == 1) {
            setProviderGamesData(providerGames?.data?.data?.rows)
        }
    }, [providerGames]);

    const loadmore = () => {
        let nextPage = defaultpage + 1;
        setDefaultPage(nextPage)
        if (providerGamesData == providerGames?.data?.data?.rows) {
            setProviderGamesData([...providerGamesData])
        }
        fetchGameData(nextPage)
        setTotalRenderRecord(totalRenderRecord + 30)
    }

    useEffect(() => {
        if (!isNotEmpty(decodeID(props?.provider?.providerName)) || !isNotEmpty(decodeID(props?.provider?.providerId))) {
            router.push(RouteConfig?.Providers)
        }
    }, [])

    useEffect(() => {
        setDefaultPage(1)
        setTotalRenderRecord(30)
        setProviderGamesData([])
        return () => {
            dispatch({ type: "GET_PROVIDER_GAMES_LIST_FAIL", data: null })
        }
    }, [])
    return (
        <>
            {providerGames?.loading && <Spinner />}
            <section className="py-3 py-lg-5 bg-gredient-black hoverTitle">
                <div className="container-fluid">
                    <div className="d-flex">
                        {/* <Link href={(RouteConfig?.Providers)} className="backArrow"><i className="icon-arrow-right"></i></Link> */}
                        <button onClick={() => router.back()} className="backArrow"><i className="icon-arrow-right"></i></button>
                        <h3 className="hTitle hLine">{decodeID(props?.provider?.providerName)}</h3>
                    </div>
                    <div className="gameGrid-8-NOTScroll">
                        {providerGamesData?.length > 0 ?
                            providerGamesData?.map((gamelistDetails: any, gamelistkey: any) => {
                                return (
                                    <Fragment key={gamelistkey}>

                                        <div className="itemBox">
                                            {/* <figure><a href="play-details.html" className="stretched-link"><img src={imageUrl(gamelistDetails?.full_image_path, 'custom')} /></a></figure> */}
                                            <figure><a href="play-details.html" className="stretched-link">

                                                <img
                                                    src={PLAYXCHIP_DEFAULT_IMAGE_URL}
                                                    onLoad={(e: any) => {
                                                        e.target.src = imageUrl(gamelistDetails?.full_image_path, 'custom')
                                                    }}
                                                    onError={(e) => console.log('Error while loading image', e)}
                                                    loading='lazy'
                                                />


                                            </a></figure>
                                            <div className="overlay">
                                                <Link className="btn btnplay" href={`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.game_id)}`} ><i className="fa-solid fa-play"></i></Link>
                                                {
                                                    gamelistDetails?.has_demo ?
                                                        <Link type='button' href={`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.game_id)}&is_demo=true`} className='btn btn-light'>Demo</Link>
                                                        : ""
                                                }
                                            </div>
                                        </div>

                                    </Fragment>
                                )
                            })
                            : ""}
                    </div>
                    {providerGames?.loading === false &&
                        <>
                            <div className="text-center mt-5">
                                <p className='text-center text-secondary'>You viewed: <span className='text-white'>{providerGames?.data?.data?.count >= totalRenderRecord ? totalRenderRecord : providerGames?.data?.data?.count} of {providerGames?.data?.data?.count} games</span></p>
                                {providerGames?.data?.data?.count >= totalRenderRecord &&
                                    <button type="button" onClick={loadmore} className="btn btn-primary px-4">Load More</button>
                                }
                            </div>
                        </>
                    }
                </div>
            </section>

        </>
    )
}

export default ProviderGames