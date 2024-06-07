import { RouteConfig } from '@/Config/CommonConfig'
import { isUserLoggedIn } from '@/Config/Config'
import { GetGameAction, GetGameCategoryAction, GetGameListAction, GetGamesLikeThisListAction, GetLiveCasinoGameListAction } from '@/Redux/Actions/GameAction'
import { encodeID, getFromLocalStorage, imageUrl, saveToLocalStorage } from '@/utils/Helper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useRef, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'

const GamesLikeThis = (props: any) => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const CategoryId = props?.categories;
    const GameId = props?.game_id;

    const GetGameList = useSelector((state: any) => state.GetGamesLikeThisListState)

    useEffect(() => {
        dispatch(GetGamesLikeThisListAction({
            "page": 1,
            "pageSize": 20,
            "categories": CategoryId,
            "exclude_id": GameId
        }))
    }, []);
    useEffect(() => {
        return () => {
            dispatch({
                type: "GET_GAMES_LIKE_THIS_LIST_FAIL",
                data: null
            })
        }
    }, []);

    const handleNavigate = (route: any) => {
        if (isUserLoggedIn()) {
            // router.push(route)
            window.location.href = route
        } else {
            $('#loginModalButton').click()
        }
    }
    return (
        <>
            {GetGameList?.data?.data?.count > 0 ?
                <div className="container mt-5">
                    <h3 className="hTitle hLine">Games Like This</h3>
                    <div className="row g-3 gy-lg-4 row-cols-3 row-cols-md-3 row-cols-md-4 row-cols-lg-6">
                        {
                            GetGameList?.data?.data?.rows?.map((gamelistDetails: any, gamelistkey: any) => {
                                return (
                                    <Fragment key={gamelistkey}>
                                        <div className="col">
                                            <div className="itemBox">
                                                <figure><a href="play-details.html" className="stretched-link"><img src={imageUrl(gamelistDetails?.full_image_path, 'custom')} /></a></figure>
                                                <div className="overlay">
                                                    <a className="btnplay" onClick={() => handleNavigate(`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.game_id)}`)}><i className="fa-solid fa-play"></i></a>
                                                    {
                                                        gamelistDetails?.has_demo ?
                                                            <button type='button' onClick={() => handleNavigate(`${RouteConfig?.GamePage}?game_id=${encodeID(gamelistDetails?.game_id)}&is_demo=true`)} className='btn btn-light'>Demo</button>
                                                            : ""
                                                    }
                                                </div>
                                            </div>
                                        </div>
                                    </Fragment>
                                )
                            })
                        }

                    </div>

                </div>
                : ""}
        </>
    )
}

export default GamesLikeThis