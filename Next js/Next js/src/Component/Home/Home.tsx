import React, { Fragment, useEffect, useState } from 'react'
import HomeBanner from './HomeBanner/HomeBanner'
import Games from './HomeGames/Games'
import Providers from './Providers/Providers'
import GameTypes from './GameCategory/GameCategory'
import { useDispatch, useSelector } from 'react-redux'
import { GetHomeListAction } from '@/Redux/Actions/HomeAction'
import Spinner from '../Layouts/Spinner'
import GameTop from './HomeGames/GameTop'
import GameCasino from './HomeGames/GameCasino'
import GameNew from './HomeGames/GameNew'
import GameTable from './HomeGames/GameTable'
import GameInstant from './HomeGames/GameInstant'
import GameJackpot from './HomeGames/GameJackpot'
import GamesTv from './HomeGames/GamesTv'
import GameAll from './HomeGames/GamesAll'
import LastPlayedGames from './LastPlayed/LastPlayedGames'

const Home = () => {
    const homeList = useSelector((state: any) => state.GetHomeListState);
    
    useEffect(() => {
        // dispatch(GetHomeListAction({}))
    }, [])

    useEffect(() => {
        // window.scrollTo({
        //     top: 0,
        //     left: 0,
        //     behavior: "smooth"
        // });
    }, []);

    return (
        <Fragment>
            {(homeList?.loading && homeList?.status===false) && <Spinner />}
            <HomeBanner />
            <GameTypes />
            <LastPlayedGames />
            <GameTop />
            <GameCasino />
            <GameNew />
            <Games />
            <GameJackpot />
            <GameInstant />
            <Providers />
            <GameTable />
            <GamesTv />
            <GameAll />
        </Fragment>
    )
}

export default Home