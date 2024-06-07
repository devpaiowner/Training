'use client'
import GamePage from '@/Component/Home/GameDetails/Index'
import { useSearchParams } from 'next/navigation';
import React from 'react'

const Game = () => {
    const searchParams = useSearchParams();
    const gameId = searchParams.get('game_id');
    const isDemo = searchParams.get('is_demo');
    
    return (
        <>
            <GamePage
                data={{
                    gameId: gameId,
                    isDemo:isDemo
                }}
            />
        </>
    )
}

export default Game