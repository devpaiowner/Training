import { RouteConfig } from '@/Config/CommonConfig'
import { PLAYXCHIP_DEFAULT_IMAGE_URL, isUserLoggedIn } from '@/Config/Config'
import { GetGameAction, GetGameCategoryAction, GetGameListAction, GetLastPlayedGamesAction, GetLiveCasinoGameListAction } from '@/Redux/Actions/GameAction'
import { encodeID, getCookie, getFromLocalStorage, imageUrl, saveToLocalStorage, setCookie } from '@/utils/Helper'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'


const LastPlayedGames = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [gameData, setGameData]: any = useState([]);

    const user = useSelector((state: any) => state.UserGetProfileState);
    const getLastPlayed = useSelector((state: any) => state.GetLastPlayedGamesState)



    useEffect(() => {
        if (user?.data?.data) {
            const params = {
                "page": 1,
                "pageSize": 20,
                "user_id": user?.data?.data?._id
            }
            dispatch(GetLastPlayedGamesAction(params))
        }
    }, [user?.data?.data]);

    const handleNavigate = (route: any) => {
        if (isUserLoggedIn()) {
            router.push(route)
        } else {
            $('#loginModalButton').click()
        }
    }

    useEffect(() => {
        const gameListData = getLastPlayed?.data?.data;
        if (gameListData) {
            setGameData(gameListData);
        }
    }, [getLastPlayed]);


    return (
        <>
            {gameData?.count > 0 ?
                <section className="py-3 py-lg-5 bg-gredient-black hoverTitle">
                    <div className="container-fluid">
                        <h3 className="hTitle hLine">Last Played
                            <a onClick={() => handleNavigate(RouteConfig?.LastPlayed)} className="viewAll cursor-pointer">
                                <span>See All</span> <i className="icon-arrow-right"></i>
                            </a></h3>
                        <div className='scrollList'>
                            <div className="gameGrid-8">
                                {
                                    gameData?.history?.map((gamelistDetails: any, gamelistkey: any) => {

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
                                                        <a className="btn btnplay" onClick={() => handleNavigate(`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.ref_id?.game_id)}`)}><i className="fa-solid fa-play"></i></a>
                                                        {
                                                            gamelistDetails?.ref_id?.has_demo ?
                                                                <button type='button' onClick={() => handleNavigate(`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.ref_id?.game_id)}&is_demo=true`)} className='btn btn-light'>Demo</button>
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

export default LastPlayedGames