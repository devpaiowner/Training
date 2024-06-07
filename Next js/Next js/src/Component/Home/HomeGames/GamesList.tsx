import Spinner from '@/Component/Layouts/Spinner';
import { RouteConfig } from '@/Config/CommonConfig'
import { PLAYXCHIP_DEFAULT_IMAGE_URL } from '@/Config/Config';
import { GetGameListAction } from '@/Redux/Actions/GameAction';
import { decodeID, encodeID, imageUrl, isNotEmpty } from '@/utils/Helper';
import Link from 'next/link'
import { useRouter } from 'next/navigation';
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';

const GamesList = (props: any) => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const gameTitle = decodeID(props?.data?.title);
    const gameCategory = decodeID(props?.data?.categoryId);
    const GetGameList = useSelector((state: any) => state.GetGameListState)

    useEffect(() => {
        window.scrollTo({
            top: 0,
            left: 0,
            behavior: "smooth"
        });
    }, []);

    useEffect(() => {
        fetchGameData()
    }, [gameCategory]);

    const [defaultpage, setDefaultPage]: any = useState(1)
    const [defaultpagesize, setDefaultPageSize]: any = useState(30)
    const [gamedata, setGameData]: any = useState([]);

    const [totalRenderRecord, setTotalRenderRecord]: any = useState(30);


    const fetchGameData = async (pageNumber: any = 1) => {
        if (gameCategory != "" || gameTitle == 'All Games') {
            dispatch(GetGameListAction({
                "page": pageNumber,
                "pageSize": defaultpagesize,
                "categories": [gameCategory]
            }))
        }
    }

    useEffect(() => {
        if (defaultpage >= 2 && !GetGameList?.loading) {
            setGameData([...gamedata, ...GetGameList?.data?.data?.rows])
        } else if (defaultpage == 1) {
            setGameData(GetGameList?.data?.data?.rows)
        }
    }, [GetGameList]);

    useEffect(() => {
        if ((!isNotEmpty(gameCategory) || !isNotEmpty(gameTitle)) && gameTitle != 'All Games') {
            router.push(RouteConfig?.Home)
        }
    }, [])

    const loadmore = () => {
        let nextPage = defaultpage + 1;
        setDefaultPage(nextPage)
        if (gamedata == GetGameList?.data?.data?.rows) {
            setGameData([...gamedata])
        }
        fetchGameData(nextPage)
        if (GetGameList?.data?.data?.count >= totalRenderRecord) {
            setTotalRenderRecord(totalRenderRecord + 30)
        } else {
            setTotalRenderRecord(GetGameList?.data?.data?.count)
        }
    }

    useEffect(() => {
        setDefaultPage(1)
        setTotalRenderRecord(30)
        setGameData([])
        return () => {
            dispatch({ type: "GET_GAME_LIST_FAIL", data: null })
        }
    }, [gameTitle])

    return (
        <>
            {GetGameList?.loading && <Spinner />}
            <section className="py-2 py-lg-5 hoverTitle">
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link href={RouteConfig?.Home} className="backArrow"><i className="icon-arrow-right"></i></Link>
                        <h3 className="hTitle hLine">{gameTitle}</h3>
                    </div>

                    <div className="gameGrid-8-NOTScroll">
                        {gamedata?.length > 0 ?
                            gamedata?.map((gamelistDetails: any, gamelistkey: any) => {
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
                                                        <Link type='button' href={`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.game_id)}&is_demo=true`} className='btn btn-light'>Demo</Link> : ""
                                                }
                                            </div>
                                        </div>

                                    </Fragment>
                                )
                            })
                            : ""}
                    </div>

                    {GetGameList?.loading === false &&
                        <>
                            <div className="text-center mt-5">
                                <p className='text-center text-secondary'>You viewed: <span className='text-white'>{GetGameList?.data?.data?.count >= totalRenderRecord ? totalRenderRecord : GetGameList?.data?.data?.count} of {GetGameList?.data?.data?.count} games</span></p>
                                {GetGameList?.data?.data?.count >= totalRenderRecord &&
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

export default GamesList