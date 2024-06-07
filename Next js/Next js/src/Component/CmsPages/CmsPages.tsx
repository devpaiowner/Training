import { GetCmsPageAction } from '@/Redux/Actions/AuthAction';
import { useRouter, useSearchParams } from 'next/navigation';
import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Layouts/Spinner';
import Link from 'next/link';
import { RouteConfig } from '@/Config/CommonConfig';
import { toast } from 'react-toastify';

const CmsPages = () => {
    const searchParams = useSearchParams();
    const router = useRouter();
    const slug = searchParams.get('slug');
    const dispatch = useDispatch<any>();
    const cmsPage = useSelector((state: any) => state.GetCmsPageState)

    const cmsTitle = cmsPage?.data?.data?.title;
    const cmsDescription = cmsPage?.data?.data?.description;

    useEffect(() => {
        if (slug) {
            dispatch(GetCmsPageAction(slug))
        }
    }, [slug])

    useEffect(() => {
        // if (cmsPage?.status === false) {
        //     toast.error('Cms Page Not Found.')
        //     router.push(RouteConfig?.Home)
        // }
    }, [cmsPage])

    return (
        <>
            {cmsPage?.loading && <Spinner />}

            <section className="py-5 bg-gredient myaccount">
                <div className="container-fluid">
                    <div className="d-flex">
                        <Link href={RouteConfig?.Home} className="backArrow"><i className="icon-arrow-right"></i></Link>
                        <h3 className="hTitle hLine">{cmsTitle}</h3>
                    </div>
                    <div className="accountRight" dangerouslySetInnerHTML={{ __html: cmsDescription }}></div>
                </div>
            </section>

        </>
    )
}

export default CmsPages