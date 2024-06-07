'use client'
import React from 'react'
import { useSearchParams } from 'next/navigation';
import GamesList from '@/Component/Home/HomeGames/GamesList';
import Index from '@/Component/Home/GameDetails/Index';

const page = () => {
    const searchParams = useSearchParams();
    const title = searchParams.get('title');
    const categoryId = searchParams.get('category_id');

    return (
        <>
            <GamesList
                data={{
                    title: title,
                    categoryId: categoryId
                }}
            />
        </>
    )
}

export default page