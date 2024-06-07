import React, { Fragment, useEffect, useState } from 'react'
import dynamic from 'next/dynamic';
import { useDispatch, useSelector } from 'react-redux';
import { GetPromotionsAction } from '@/Redux/Actions/HomeAction';
import { PLAYXCHIP_DEFAULT_IMAGE_URL, isUserLoggedIn } from '@/Config/Config';
const OwlCarousel = dynamic(() => import('react-owl-carousel'), { ssr: false });

const RegisterBonus = () => {

    const dispatch = useDispatch<any>();
    const [isBonusEvent, setIsBonusEvent] = useState(false)
    const PromotionsList = useSelector((state: any) => state.GetPromotionsState);

    useEffect(() => {
        if (!isUserLoggedIn()) {
            dispatch(GetPromotionsAction({}))
        }
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

    return (
        <div className="d-none d-lg-flex col-md-4 mText_left text-center">
            <OwlCarousel
                className='CarouselHome owl-carousel mb-0'
                autoplayHoverPause={true}
                loop={true}
                nav={true}
                items={1}
                autoplay={true}
                autoplayTimeout={3000}
                responsiveClass={true}
                navText={["<img src='/images/angel-left.svg'>", "<img src='/images/angel-right.svg'>"]}
                responsive={banneroptions}
            >
                {PromotionsList?.data?.data?.length > 0 && PromotionsList?.data?.data?.map((promotion_bonus: any, promotion_bonus_key: any) => {
                    return (
                        <Fragment key={promotion_bonus_key}>
                            {promotion_bonus?.Event == "registration" &&
                                <>
                                    {isBonusEvent === false && setIsBonusEvent(true)}
                                    < div className="modelLeft p-4">
                                        <h6>{promotion_bonus?.Name?.en}</h6>
                                        <img src={promotion_bonus?.Image?.en ? promotion_bonus?.Image?.en : PLAYXCHIP_DEFAULT_IMAGE_URL} alt="modelLogo" />
                                    </div>
                                </>
                            }
                        </Fragment>
                    )
                })
                }
                {
                    isBonusEvent === false &&
                    <div className="modelLeft p-4">
                        <h6>PlayXchip Registration</h6>
                        <img src={PLAYXCHIP_DEFAULT_IMAGE_URL} alt="modelLogo" />
                    </div>
                }
            </OwlCarousel>
        </div >)
}

export default RegisterBonus