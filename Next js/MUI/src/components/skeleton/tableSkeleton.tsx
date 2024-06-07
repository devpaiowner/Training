import React from 'react'
import Skeleton,{ SkeletonTheme } from 'react-loading-skeleton'
import 'react-loading-skeleton/dist/skeleton.css'
interface Iprops{
    loading?:boolean;
    count?:number;
}

export default function TableSkeleton(props:Iprops) {
  return (<>
  
            {props?.loading && (
                    <tr>
                        {Array.apply(1, Array(props?.count)).map(function (x, i) {
                            return <td  key={i} ><Skeleton/></td>;
                        })}
                    </tr>
                )}
  </>
      
  )
}
