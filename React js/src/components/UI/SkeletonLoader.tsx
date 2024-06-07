import React from 'react'
interface ISkeletonLoader {
    count?: number;
};

const SkeletonLoader = (props: ISkeletonLoader) => {
    const { count } = props;

    const loaderElements = Array.from({ length: count || 1 }, (_, index) => (
        <div className='skeleton-loader mb-3' key={index} >
            <div className='inner'></div>
        </div>
    ));

    return (
        <>
            {loaderElements}
        </>
    )
}

export default SkeletonLoader