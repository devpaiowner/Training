import { useSearchParams } from 'next/navigation';
import React from 'react'

const GamePage = () => {
    const searchParams = useSearchParams();
    const gameName = searchParams.get('');
    const demo = searchParams.get('demo');

    return (
        <>
            <div>GamePage</div>
            <div>Game Name : {gameName}</div>
            <div>GamePage : {demo}</div>
        </>
    )
}

export default GamePage