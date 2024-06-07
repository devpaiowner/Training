import { SearchAction } from "@/Redux/Actions/GameAction";
import React, { Fragment, useEffect, useState } from "react"
import { useDispatch, useSelector } from "react-redux";
import Spinner from "../Layouts/Spinner";
import { PLAYXCHIP_DEFAULT_IMAGE_URL, PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL, isUserLoggedIn } from "@/Config/Config";
import { useRouter } from "next/navigation";
import { RouteConfig } from "@/Config/CommonConfig";
import { encodeID, imageUrl } from "@/utils/Helper";


const Search = () => {

   const dispatch = useDispatch<any>();
   const router = useRouter();
   const [search, setSearch] = useState('');
   const [limit, setLimit] = useState(20);
   const searchData = useSelector((state: any) => state.SearchState);

   useEffect(() => {
      if (search?.length >= 0) {
         const payload = {
            search,
            limit
         }
         dispatch(SearchAction(payload))
      }
   }, [search, limit])

   const handleNavigate = (route: any, type = 'private') => {
      if (isUserLoggedIn() || type == 'public') {
         router.push(route)
      } else {
         $('#loginModalButton').click()
      }
   }


   return (
      <>
         {searchData?.loading && <Spinner />}
         <div className="Topsearch fixed-top">
            <div className="container-fluid">
               <div className="searchBox d-flex align-items-center">
                  <span className="icon-search"></span>
                  <div className="searchInput mx-3"><form><input type="search" className="form-control" placeholder="Search games, tags or providers" onChange={(e) => setSearch(e?.target?.value)} /></form></div>
                  <button type="button" className="btn" onClick={() => router.back()}><span className="icon-cancel"></span></button>
               </div>
            </div>
         </div>
         {
            searchData?.data?.data?.games?.length > 0 &&
            <section className="py-5 hoverTitle">
               <div className="container-fluid">
                  <h3 className="hTitle hLine">Games </h3>
                  <div className='scrollList'>
                     <div className="gameGrid-8-NOTScroll">
                        {
                           searchData?.data?.data?.games?.map((gameList: any, gamelistkey: any) => {
                              return (
                                 <Fragment key={gamelistkey}>
                                    <div className="itemBox">
                                       {/* <figure><a href="play-details.html" className="stretched-link"><img src={imageUrl(gameList?.image_path)} /></a></figure> */}
                                       <figure><a href="play-details.html" className="stretched-link">
                                          <img
                                             src={PLAYXCHIP_DEFAULT_IMAGE_URL}
                                             onLoad={(e: any) => {
                                                e.target.src = imageUrl(gameList?.image_path)
                                             }}
                                             onError={(e) => console.log('Error while loading image', e)}
                                          loading='lazy'
                                          />

                                       </a></figure>
                                       <div className="overlay">
                                          <a className="btn btnplay" onClick={() => handleNavigate(`${RouteConfig?.GamePage}?game_id=${encodeID(gameList?.game_id)}`)}><i className="fa-solid fa-play"></i></a>
                                          {
                                             gameList?.has_demo ?
                                                <button type='button' onClick={() => handleNavigate(`${RouteConfig?.GamePage}?game_id=${encodeID(gameList?.game_id)}&is_demo=true`)} className='btn btn-light'>Demo</button>
                                                : ""
                                          }
                                       </div>
                                    </div>
                                 </Fragment>
                              )
                           })
                        }
                     </div>
                  </div>
               </div>
            </section>
         }
         {searchData?.data?.data?.provider?.length > 0 &&
            <section className="py-5 bg-gredient hoverTitle">
               <div className="container-fluid">
                  <h3 className="hTitle hLine">Providers</h3>
                  <div className='scrollList'>
                     <div className="gameGrid-8-NOTScroll">
                        {
                           searchData?.data?.data?.provider?.map((providerdata: any, providerkey: any) => {
                              return (
                                 <Fragment key={providerkey}>
                                    <div className="providerBox cursor-pointer" onClick={() => router.push(`${RouteConfig?.Providers}?provider_name=${encodeID(providerdata?.name)}&provider_id=${encodeID(providerdata?.marchant_id)}`)}>

                                      <figure> <img
                                          src={PLAYXCHIP_DEFAULT_IMAGE_URL}
                                          onLoad={(e: any) => {
                                             if (!e.target.src.includes(PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL)) {
                                                 e.target.src = imageUrl(providerdata?.image_path)
                                             }
                                         }}
                                         onError={(e: any) => {
                                             e.target.src = PLAYXCHIP_SECOND_DEFAULT_IMAGE_URL
                                         }}

                                          alt="Provider Image"
                                       loading='lazy'
                                       /></figure>
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
            </section>
         }
         {
            (searchData?.data?.data?.games?.length < 1 && searchData?.data?.data?.provider?.length < 1) &&
            <div className="container-fluid searchResultBox">
               <h6 className="mt-4 text-center">No result found for '{search}'.</h6>
            </div>
         }
      </>
   )
}

export default Search