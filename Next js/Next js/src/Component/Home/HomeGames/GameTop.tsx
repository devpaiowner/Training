import { RouteConfig } from '@/Config/CommonConfig'
import { PLAYXCHIP_DEFAULT_IMAGE_URL, isUserLoggedIn } from '@/Config/Config'
import { GetTopGameListAction } from '@/Redux/Actions/GameAction'
import { encodeID, getCookie, imageUrl, setCookie } from '@/utils/Helper'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GameTop = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [gameData, setGameData]: any = useState([]);

    const GetGameList = useSelector((state: any) => state.GetTopGameListState)

    useEffect(() => {
        dispatch(GetTopGameListAction({
            "page": 1,
            "pageSize": 20,
            "categories": ["1344"]
        }))
    }, []);

    const handleNavigate = (route: any) => {
        if (isUserLoggedIn()) {
            router.push(route)
        } else {
            $('#loginModalButton').click()
        }
    }

    useEffect(() => {
        const gameListData = GetGameList?.data?.data;
        if (gameListData) {
            setGameData(gameListData);
            setCookie('topGames', JSON.stringify(gameListData), 30);
        } else {
            const topGames: any = getCookie('topGames');
            if (topGames) {
                const data = JSON.parse(topGames);
                setGameData(data);
            }
        }
    }, [GetGameList]);



    return (
        <>
            {gameData?.count > 0 ?
                <section className="py-3 py-lg-5 bg-gredient-black hoverTitle">
                    <div className="container-fluid">
                        <h3 className="hTitle hLine">Top Games <i className="fas fa-fire text-warning   "></i><a onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Top Games')}&category_id=${encodeID(1344)}`)} className="viewAll cursor-pointer"><span>See All</span> <i className="icon-arrow-right"></i></a></h3>
                        <div className='scrollList'>
                            <div className="gameGrid-8">
                                {
                                    gameData?.rows?.map((gamelistDetails: any, gamelistkey: any) => {
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
                                                    </a></figure>                                                    <div className="overlay">
                                                        <a className="btn btnplay" onClick={() => handleNavigate(`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.game_id)}`)}><i className="fa-solid fa-play"></i></a>
                                                        {
                                                            gamelistDetails?.has_demo ?
                                                                <button type='button' onClick={() => handleNavigate(`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.game_id)}&is_demo=true`)} className='btn btn-light'>Demo</button>
                                                                : ""
                                                        }
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

export default GameTop