'use client'
import React, { ReactNode, useEffect, useState } from 'react'
import Header from './Header'
import NextTopLoader from 'nextjs-toploader'
import ToastDefault from '../DefaultComponent/Toast'
import Footer from './Footer'
import { RouteConfig } from '@/Config/CommonConfig'
import { usePathname, useRouter } from 'next/navigation'
import { getFromLocalStorage, getFromSessionStorage, removeFromSessionStorage, saveToSessionStorage } from '@/utils/Helper'
import $ from 'jquery'
import Maintenance from '../CommonPages/Maintenance'

interface LayoutProps {
    children: ReactNode
}
export default function ({ children }: LayoutProps) {

    const pathName = usePathname();
    const router = useRouter();
    // const isSiteUnderMaintenance = false;
    const [isSiteUnderMaintenance, setIsSiteUnderMaintenance] = useState(false)
    const publicRoutes = [RouteConfig?.Home, RouteConfig?.Promotions, RouteConfig?.Pages,RouteConfig?.HelpCenter];
    const hideInsidePage = publicRoutes.includes(pathName);


    useEffect(() => {
        const isUserLogin = getFromLocalStorage('isUserLoginToken');
        if (!isUserLogin && !hideInsidePage) {
            let url: any = '';
            let pathAndQuery = '';
            if (typeof window !== 'undefined') {
                url = new URL(window.location.href);
                pathAndQuery = url.pathname + url.search;
            }

            saveToSessionStorage('isNotAuth', true)
            saveToSessionStorage('redirectUrl', pathAndQuery)
            router.push(RouteConfig?.Home)
        }
        if (getFromSessionStorage('isNotAuth')) {
            $('#loginModalButton').click()
            setTimeout(() => {
                removeFromSessionStorage('isNotAuth')
            }, 5000);
        }
    }, [pathName])

    return (
        <React.Fragment>
            {/* <NextTopLoader
                color="#ff2e6f"
                initialPosition={0.08}
                crawlSpeed={200}
                height={4}
                crawl={true}
                showSpinner={true}
                easing="ease"
                speed={200}
                shadow="0 0 10px #2299DD,0 0 5px #2299DD"
            /> */}
            {
                isSiteUnderMaintenance === true ?
                    <Maintenance />
                    :
                    <>
                        <Header />
                        <main className='innerMain'>{children}</main>
                        <Footer />
                    </>
            }
            <ToastDefault />
        </React.Fragment>
    )
}
