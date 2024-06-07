import React, { useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { GetHomeBannerListAction, GetPromotionsAction } from '@/Redux/Actions/HomeAction';
import { ServerImageUrl, encodeID, getCookie, isJson, setCookie } from '@/utils/Helper';
import { BannerType, RouteConfig } from '@/Config/CommonConfig';
import { useRouter } from 'next/navigation';
import Spinner from '@/Component/Layouts/Spinner';
import { PLAYXCHIP_DEFAULT_IMAGE_URL } from '@/Config/Config';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });


const HomeBanner = () => {
    const dispatch = useDispatch<any>();
    const router = useRouter();
    const [gameData, setGameData]: any = useState([]);
    const GetGameList = useSelector((state: any) => state.GetHomeBannerListState)

    useEffect(() => {
        dispatch(GetHomeBannerListAction({
            "page": 1,
            "pageSize": 10,
        }))
    }, []);

    useEffect(() => {
        dispatch(GetPromotionsAction({}))
    }, [])

    const banneroptions = {
        0: {
            items: 1,
            stagePadding: 0,
            nav: false,
            smartSpeed: 2000

        },
        600: {
            items: 1,
            smartSpeed: 2000

        },
        1000: {
            smartSpeed: 2000
        },
        1400: {
            smartSpeed: 2000
        },

    };

    useEffect(() => {
        const gameListData = GetGameList?.data?.data;
        if (gameListData) {
            setGameData(gameListData);
            setCookie('homeBanner', JSON.stringify(gameListData), 30);
        } else {
            const homeBanner: any = getCookie('homeBanner');
            if (homeBanner) {
                const data = JSON.parse(homeBanner);
                setGameData(data);
            }
        }
    }, [GetGameList]);


    const handleRedirect = (type: any, typeParams: any) => {

        // console.log('handleRedirect------------->', type, typeParams);

        const params = isJson(typeParams) ? JSON.parse(typeParams) : "";
        if (type === BannerType?.Category) {
            router.push(`${RouteConfig?.GamesList}?title=${encodeID(params?.label)}&category_id=${encodeID([params?.value])}`)
        } else if (type === BannerType?.Game) {
            router.push(`${RouteConfig?.GamePage}?game_id=${encodeID(params?.value)}`)
        } else if (type === BannerType?.Provider) {
            router.push(`${RouteConfig?.Providers}?provider_name=${encodeID(params?.label)}&provider_id=${encodeID([params?.value])}`)
        } else if (type === BannerType?.Custom) {
            let a = document.createElement('a');
            a.target = '_blank';
            a.href = typeParams;
            a.click();
            // window.open(
            //     'https://support.wwf.org.uk/earth_hour/index.php?type=individual',
            //     '_blank'
            // );
        }
    }

    return (
        <>
            {GetGameList?.loading && <Spinner />}
            {gameData?.length > 0 ?
                <section className="TOPSlder">
                    <OwlCarousel
                        className='CarouselHome owl-carousel mb-0'
                        autoplayHoverPause={true}
                        loop={true}
                        // center={true}
                        nav={true}
                        items={1}
                        // stagePadding={250}
                        autoplay={true}
                        autoplayTimeout={3000}
                        responsiveClass={true}
                        navText={["<img src='/images/angel-left.svg'>", "<img src='/images/angel-right.svg'>"]}
                        responsive={banneroptions}
                    >
                        {gameData?.map((banner_details: any, banner_details_key: any) => {

                            return (
                                <>
                                    <div className={`item ${banner_details?.banner_type && 'cursor-pointer'}`} key={banner_details_key} onClick={() => handleRedirect(banner_details?.banner_type, banner_details?.type_id)}>
                                        <figure>
                                            <img
                                                src={PLAYXCHIP_DEFAULT_IMAGE_URL}
                                                onLoad={(e: any) => {
                                                    e.target.src = ServerImageUrl(banner_details?.image)
                                                }}
                                                onError={(e) => console.log('Error while loading image', e)}
                                                loading='lazy'
                                            />
                                        </figure>
                                        <div className="hoverText">
                                            <div className='container-fluid'>
                                                <p><span className="badge text-bg-light">Lucky Coin</span></p>
                                                <h6>{banner_details?.name}</h6>
                                                {/* {
                                                    banner_details?.banner_type &&
                                                    <button type="button" className="btn btn-danger px-5" onClick={() => handleRedirect(banner_details?.banner_type, banner_details?.type_id)}>Click Me</button>
                                                } */}
                                            </div>
                                        </div>
                                    </div>
                                </>
                            )
                        })}
                    </OwlCarousel>
                </section>
                : ""}
        </>
    )
}

export default HomeBanner