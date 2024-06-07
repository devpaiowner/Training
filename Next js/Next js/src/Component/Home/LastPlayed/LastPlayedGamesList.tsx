import Spinner from '@/Component/Layouts/Spinner'
import { RouteConfig } from '@/Config/CommonConfig'
import { PLAYXCHIP_DEFAULT_IMAGE_URL, isUserLoggedIn } from '@/Config/Config'
import { GetLastPlayedGamesAction } from '@/Redux/Actions/GameAction'
import { encodeID, imageUrl } from '@/utils/Helper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const LastPlayedGamesList = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [defaultpage, setDefaultPage]: any = useState(1)
    const [defaultpagesize, setDefaultPageSize]: any = useState(30)
    const [gamedata, setGameData]: any = useState([]);
    const [totalRenderRecord, setTotalRenderRecord]: any = useState(30);
    const user = useSelector((state: any) => state.UserGetProfileState);
    const getLastPlayed = useSelector((state: any) => state.GetLastPlayedGamesState)


    const fetchGameData = async (pageNumber: any = 1) => {
            const params = {
                "page": pageNumber,
                "pageSize": defaultpagesize,
                "user_id": user?.data?.data?._id
            }
            dispatch(GetLastPlayedGamesAction(params))
    }

    useEffect(() => {
        if (defaultpage >= 2 && !getLastPlayed?.loading) {
            setGameData([...gamedata, ...getLastPlayed?.data?.data?.history])
        } else if (defaultpage == 1) {
            setGameData(getLastPlayed?.data?.data?.history)
        }
    }, [getLastPlayed]);

    const loadmore = () => {
        let nextPage = defaultpage + 1;
        setDefaultPage(nextPage)
        if (gamedata == getLastPlayed?.data?.data?.history) {
            setGameData([...gamedata])
        }
        fetchGameData(nextPage)
        if (getLastPlayed?.data?.data?.count >= totalRenderRecord) {
            setTotalRenderRecord(totalRenderRecord + 30)
        } else {
            setTotalRenderRecord(getLastPlayed?.data?.data?.count)
        }
    }

    useEffect(() => {
        if (user?.data?.data) {
            fetchGameData()
        }
    }, [user?.data?.data]);

    return (
        <>
            {getLastPlayed?.loading && <Spinner />}
            <section className="py-2 py-lg-5 hoverTitle">
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link href={RouteConfig?.Home} className="backArrow"><i className="icon-arrow-right"></i></Link>
                        <h3 className="hTitle hLine">Last Played</h3>
                    </div>

                    <div className="gameGrid-8-NOTScroll">
                        {gamedata?.length > 0 ?
                            gamedata?.map((gamelistDetails: any, gamelistkey: any) => {
                                return (
                                    <Fragment key={gamelistkey}>

                                        <div className="itemBox">
                                            <figure><a href="play-details.html" className="stretched-link">
                                                <img
                                                    src={PLAYXCHIP_DEFAULT_IMAGE_URL}
                                                    onLoad={(e: any) => {
                                                        e.target.src = imageUrl(gamelistDetails?.ref_id?.full_image_path, 'custom')
                                                    }}
                                                    onError={(e) => console.log('Error while loading image', e)}
                                                    loading='lazy'
                                                />
                                            </a></figure>
                                            <div className="overlay">
                                                <Link className="btn btnplay" href={`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.ref_id?.game_id)}`} ><i className="fa-solid fa-play"></i></Link>
                                                {
                                                    gamelistDetails?.ref_id?.has_demo ?
                                                        <Link type='button' href={`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.ref_id?.game_id)}&is_demo=true`} className='btn btn-light'>Demo</Link> : ""
                                                }
                                            </div>
                                        </div>

                                    </Fragment>
                                )
                            })
                            : ""}
                    </div>

                    {getLastPlayed?.loading === false &&
                        <>
                            <div className="text-center mt-5">
                                <p className='text-center text-secondary'>You viewed: <span className='text-white'>{getLastPlayed?.data?.data?.count >= totalRenderRecord ? totalRenderRecord : getLastPlayed?.data?.data?.count} of {getLastPlayed?.data?.data?.count} games</span></p>
                                {getLastPlayed?.data?.data?.count >= totalRenderRecord &&
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

export default LastPlayedGamesList