import { useSearchParams } from 'next/navigation';
import React from 'react'
import ProviderGames from './ProviderGames';
import ProvidersList from './ProvidersList';

const Index = () => {
    const searchParams = useSearchParams();
    const providerId = searchParams.get('provider_id');
    const providerName = searchParams.get('provider_name');
    return (
        <>
            {
                providerId ?
                    <ProviderGames
                        provider={{providerId, providerName}}
                    />
                    :
                    <ProvidersList />
            }</>
    )
}

export default Index