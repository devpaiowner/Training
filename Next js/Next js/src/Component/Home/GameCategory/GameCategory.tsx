import { RouteConfig } from '@/Config/CommonConfig'
import { isUserLoggedIn } from '@/Config/Config'
import { GetGameCategoryAction, GetGameListAction } from '@/Redux/Actions/GameAction'
import { encodeID, imageUrl } from '@/utils/Helper'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import React, { Fragment, useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import $ from 'jquery';
const GameCategory = () => {
    const router = useRouter();
    const dispatch = useDispatch<any>();
    const GetGameCategory = useSelector((state: any) => state.GetGameCategoryState)
    const GetProviderList = useSelector((state: any) => state.GetProviderListState)

    useEffect(() => {
        if (!GetGameCategory?.data?.data) {
            dispatch(GetGameCategoryAction({
                "page": 1,
                "pageSize": 100
            }))
        }
    }, []);

    const handleNavigate = (route: any) => {
        if (isUserLoggedIn()) {
            router.push(route)
        } else {
            $('#loginModalButton').click()
        }
    }


    const [isSticky, setSticky] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 330) {
                setSticky(true);
            } else {
                setSticky(false);
            }
        };

        window.addEventListener('scroll', handleScroll);

        // Cleanup the event listener on component unmount
        return () => {
            window.removeEventListener('scroll', handleScroll);
        };
    }, []);


    return (
        <>
            <div className={`MobileSearch ${isSticky ? 'sticky' : ''}`}>
                <form>
                    <div className="input-group">
                        <span className="input-group-text" id="basic-addon1"><i className="icon-search"></i></span>
                        <input type="search" className="form-control" placeholder="Search" />
                    </div>
                </form>
            </div>
            <section className="topCategory">
                <div className="container-fluid">
                    <ul className="ul d-none d-md-flex">
                        <li><a className="btn btn-outline-secoundry" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Instant Games')}&category_id=${encodeID([3604])}`)}><img src="images/gc-1.svg" />Instant Games</a></li>
                        <li><a className="btn btn-outline-secoundry" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Table Games')}&category_id=${encodeID(7)}`)}><img src="images/gc-2.png" />Table Games</a></li>
                        <li><a className="btn btn-outline-secoundry" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Slots')}&category_id=${encodeID(16)}`)}><img src="images/gc-3.png" />Slots</a></li>
                        <li><a className="btn btn-outline-secoundry" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Virtual Sports')}&category_id=${encodeID(84)}`)}><img src="images/gc-4.png" />Virtual Sports</a></li>
                        <li><a className="btn btn-outline-secoundry" onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Baccarat')}&category_id=${encodeID(1364)}`)}><img src="images/gc-5.png" />Baccarat</a></li>
                        <li><a className="btn btn-outline-secoundry" data-bs-toggle="offcanvas" href="#gamesCanves" role="button" aria-controls="gamesCanvesExample"><img src="" /><i className="fa-solid fa-gamepad"></i> Games</a></li>
                        <li><a className="btn btn-outline-secoundry" data-bs-toggle="offcanvas" href="#ProvidersCanves" role="button" aria-controls="ProvidersExample"><img src="" /><i className="fa-solid fa-filter"></i> Providers</a></li>
                        {/* {
                            GetGameCategory?.data?.data?.length > 0 &&
                            GetGameCategory?.data?.data?.map((categoryList: any, categoryKey: any) => {
                                return (
                                    categoryKey <= 5 &&
                                    <li><a onClick={() => handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID(categoryList?.name)}&category_id=${encodeID(categoryList?.category_id)}`)} className="btn btn-outline-secoundry"><img src="images/gc-2.png" /> {categoryList?.name}</a></li>
                                )
                            })
                        } */}
                    </ul>
                    <ul className='ul d-md-none'>
                        <li><a className="btn btn-outline-secoundry" onClick={() => handleNavigate(RouteConfig?.Search)}><img src="" /><i className="icon-search"></i> Search</a></li>
                        <li><a className="btn btn-outline-secoundry" data-bs-toggle="offcanvas" href="#gamesCanves" role="button" aria-controls="gamesCanvesExample"><img src="" /><i className="fa-solid fa-gamepad"></i> Games</a></li>
                        <li><a className="btn btn-outline-secoundry" data-bs-toggle="offcanvas" href="#ProvidersCanves" role="button" aria-controls="ProvidersExample"><img src="" /><i className="fa-solid fa-filter"></i> Providers</a></li>
                        <li><a className="btn btn-outline-secoundry" onClick={() => handleNavigate(RouteConfig?.LastPlayed)} role="button" aria-controls="ProvidersExample"><img src="" /><i className="fa-solid fa-clock-rotate-left"></i> Recent Played</a></li>
                    </ul>
                </div>
            </section >

            {/* Game Off canvas */}
            <div className="offcanvas bg-dark offcanvas-bottom" tabIndex={-1} id="gamesCanves" aria-labelledby="gamesCanvesLabel">
                <div className="offcanvas-body topCategoryOffcanvas text-center">
                    <button type="button" className="btn-close-white btn-close-games float-end" data-bs-dismiss="offcanvas" aria-label="Close"><i className="icon-cancel"></i></button>
                    <div className='container-fluid'>
                        <h5>Games</h5>
                        <ul className="ul">
                            <li><a className="btn btn-outline-secoundry" onClick={() => {
                                handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Instant Games')}&category_id=${encodeID([3604])}`)
                                $('.btn-close-games').click()
                            }}><img src="images/gc-1.svg" />Instant Games</a></li>

                            <li><a className="btn btn-outline-secoundry" onClick={() => {
                                handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Table Games')}&category_id=${encodeID(7)}`)
                                $('.btn-close-games').click()
                            }}><img src="images/gc-2.png" />Table Games</a></li>

                            <li><a className="btn btn-outline-secoundry" onClick={() => {
                                handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Slots')}&category_id=${encodeID(16)}`)
                                $('.btn-close-games').click()
                            }}><img src="images/gc-3.png" />Slots</a></li>

                            <li><a className="btn btn-outline-secoundry" onClick={() => {
                                handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Virtual Sports')}&category_id=${encodeID(84)}`)
                                $('.btn-close-games').click()
                            }}><img src="images/gc-4.png" />Virtual Sports</a></li>

                            <li><a className="btn btn-outline-secoundry" onClick={() => {
                                handleNavigate(`${RouteConfig?.GamesList}?title=${encodeID('Baccarat')}&category_id=${encodeID(1364)}`)
                                $('.btn-close-games').click()
                            }}><img src="images/gc-5.png" />Baccarat</a></li>
                        </ul>
                    </div>
                </div>
            </div>

            {/* Game Off canvas */}
            <div className="offcanvas bg-dark offcanvas-bottom" tabIndex={-1} id="ProvidersCanves" aria-labelledby="ProvidersCanvesLabel">
                <div className="offcanvas-body ProvidersOffcanvas text-center">
                    <button type="button" className="btn-close-white btn-close-providers float-end" data-bs-dismiss="offcanvas" aria-label="Close"><i className="icon-cancel"></i></button>

                    {/* <h5>All Providers</h5> */}
                    <h5 className="hTitle" onClick={()=>$('.btn-close-providers').click()}>All Providers <Link href={RouteConfig?.Providers} className="viewAll"><span>See All</span> <i className="icon-arrow-right"></i></Link></h5>
                    {/* <ul className="ul"> */}
                    {/* <li><a className="btn btn-outline-secoundry"><img src="images/gc-1.svg" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-2.png" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-3.png" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-4.png" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-5.png" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-1.svg" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-2.png" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-3.png" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-4.png" /></a></li>
                            <li><a className="btn btn-outline-secoundry"><img src="images/gc-5.png" /></a></li> */}

                    {GetProviderList?.data?.data?.count > 0 ?
                        <div className="container-fluid">
                            {/* <h3 className="hTitle hLine">All Providers <Link href={RouteConfig?.Providers} className="viewAll"><span>See All</span> <i className="icon-arrow-right"></i></Link></h3> */}
                            <div className=''>
                                <div className="gameGrid-8-NOTScroll">
                                    {
                                        GetProviderList?.data?.data?.rows?.map((providerdata: any, providerkey: any) => {
                                            return (
                                                <Fragment key={providerkey}>
                                                    <div className="providerBox cursor-pointer" onClick={() => { router.push(`${RouteConfig?.Providers}?provider_name=${encodeID(providerdata?.name)}&provider_id=${encodeID(providerdata?.marchant_id)}`), $('.btn-close-providers').click() }}>
                                                        <img
                                                            src={imageUrl(providerdata?.image_path) || 'images/playxchip_logo.jpeg'}
                                                            alt="Provider Image"
                                                            onError={(e: any) => {
                                                                e.target.src = 'images/playxchip_logo.jpeg';
                                                            }}
                                                        />
                                                        <div>
                                                            <p className="provideTitle">{providerdata?.name}</p>
                                                            {/* <p>{providerdata?.marchant_id} Games</p> */}
                                                        </div>
                                                    </div>
                                                </Fragment>
                                            )
                                        })
                                    }
                                </div>
                            </div>
                        </div>
                        : ""}

                    {/* {
                                GetProviderList?.data?.data?.count > 0 &&
                                GetProviderList?.data?.data?.rows?.map((providerdata: any, providerkey: any) => {
                                    return (
                                        <Fragment key={providerkey}>
                                            <div className="providerBox cursor-pointer" onClick={() => router.push(`${RouteConfig?.Providers}?provider_name=${encodeID(providerdata?.name)}&provider_id=${encodeID(providerdata?.marchant_id)}`)}>
                                                <img
                                                    src={imageUrl(providerdata?.image_path) || 'images/playxchip_logo.jpeg'}
                                                    alt="Provider Image"
                                                    onError={(e: any) => {
                                                        e.target.src = 'images/playxchip_logo.jpeg';
                                                    }}
                                                />
                                                <div>
                                                    <p className="provideTitle">{providerdata?.name}</p>
                                                </div>
                                            </div>
                                        </Fragment>
                                    )
                                })
                            } */}

                    {/* </ul> */}

                </div>
            </div>
        </>
    )
}

export default GameCategory