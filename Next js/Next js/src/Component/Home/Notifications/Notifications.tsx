import { PLAYXCHIP_DEFAULT_IMAGE_URL } from '@/Config/Config'
import { GetNotificationsAction } from '@/Redux/Actions/HomeAction';
import { ServerImageUrl } from '@/utils/Helper'
import React, { useEffect, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { format } from 'timeago.js';

const Notifications = () => {

  const dispatch = useDispatch<any>();
  const [defaultpage, setDefaultPage]: any = useState(1)
  const [defaultpagesize, setDefaultPageSize]: any = useState(30)
  const [data, setData] = useState([])
  const [totalRenderRecord, setTotalRenderRecord]: any = useState(30);
  const notifications = useSelector((state: any) => state.GetNotificationState);

  useEffect(() => {
    fetchGameData()
  }, [])

  const fetchGameData = async (pageNumber: any = 1) => {
    dispatch(GetNotificationsAction({
      "page": pageNumber,
      "pageSize": defaultpagesize,
    }))
  }


  const loadmore = () => {
    let nextPage = defaultpage + 1;
    setDefaultPage(nextPage)
    if (data == notifications?.data?.data?.rows) {
      setData([...data])
    }
    fetchGameData(nextPage)
    if (notifications?.data?.data?.count >= totalRenderRecord) {
      setTotalRenderRecord(totalRenderRecord + 30)
    } else {
      setTotalRenderRecord(notifications?.data?.data?.count)
    }
  }

  return (
    <>
     
        <div className=" notificationLIst notificationPage">
          <div className='container my-5'>
          <ul>
            {notifications?.data?.data?.length > 0 ?
              notifications?.data?.data?.map((notification: any, notificationKey: any) => {
                return (
                  <li key={notificationKey}>
                    <a className="dropdown-item" href="#">
                      <figure>
                        <img src={notification?.image ? ServerImageUrl(notification?.image) : PLAYXCHIP_DEFAULT_IMAGE_URL} alt="" />
                      </figure>
                      <div>
                        <h6 className='d-flex'>{notification?.title} </h6>
                        <p>{notification?.body}</p>
                        {/* <small>3 days ago</small> */}
                      </div>
                      <small>{format(notification?.createdAt)}</small>
                    </a>
                  </li>
                )
              })
              :
           
              <li>
                <h6 className='text-center py-5'>No new notifications</h6>
              </li>
              
            } 
          </ul>
          {/* <div className='text-center py-2'><button type='button' className='btn btn-primary' onClick={loadmore}>Load More</button></div> */}
        </div>
     
        </div>
    </>
  )
}

export default Notifications