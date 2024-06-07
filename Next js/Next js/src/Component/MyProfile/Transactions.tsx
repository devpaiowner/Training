import { TransactionHistoryAction } from '@/Redux/Actions/PaymentAction';
import { formatDate, getFromLocalStorage } from '@/utils/Helper';
import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Spinner from '../Layouts/Spinner';
import { useForm } from 'react-hook-form';
import { RouteConfig } from '@/Config/CommonConfig';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

interface FormInputs {
  userid: string
  type: string
  startdate: string
  enddate: string
  currency: string
  page: string
  pageSize: string

}

const Transactions = () => {

  const dispatch = useDispatch<any>();
  const router = useRouter();
  const [defaultpage, setDefaultPage]: any = useState(1)
  const [defaultpagesize, setDefaultPageSize]: any = useState(10)
  const [transactionData, setTransactionData]: any = useState([]);
  const [totalRenderRecord, setTotalRenderRecord]: any = useState(30);
  const [transactionsFilter, setTransactionsFilter]: any = useState({
    type: '',
    startdate: '',
    enddate: '',
    currency: '',
    // page: 1,
    // pageSize: 100
  })

  const transactions = useSelector((state: any) => state.TransactionHistoryState);

  const { register, formState: { errors }, watch, resetField, handleSubmit } = useForm<FormInputs>({});

  let userID: any = ""
  if (getFromLocalStorage('UserDetails')) {
    const playxuser: any = getFromLocalStorage('UserDetails')
    if (playxuser != undefined) {
      const userDetails = JSON.parse(playxuser)
      userID = userDetails?._id
    }
  }

  useEffect(() => {
    if (defaultpage >= 2 && !transactions?.loading) {
      setTransactionData([...transactionData, ...transactions?.data?.data?.row])
    } else if (defaultpage == 1) {
      setTransactionData(transactions?.data?.data?.row)
    }
  }, [transactionsFilter, transactions?.data]);

  const fetchGameData = async (pageNumber: any = 1) => {
    const params = {
      page: pageNumber,
      pageSize: defaultpagesize,
      userid: userID,
      type: transactionsFilter?.type,
      startdate: transactionsFilter?.startdate,
      enddate: transactionsFilter?.enddate,
      currency: transactionsFilter?.currency,
    }
    dispatch(TransactionHistoryAction(params))
  }

  useEffect(() => {
    fetchGameData()
  }, []);


  const loadmore = () => {
    let nextPage = defaultpage + 1;
    setDefaultPage(nextPage)
    if (transactionData == transactions?.data?.data?.row) {
      setTransactionData([...transactionData])
    }
    fetchGameData(nextPage)
    if (transactions?.data?.data?.count >= totalRenderRecord) {
      setTotalRenderRecord(totalRenderRecord + 30)
    } else {
      setTotalRenderRecord(transactions?.data?.data?.count)
    }
  }

  const onSubmit = (payload: FormInputs) => {
    payload.userid = userID;
    payload.page = '1'
    payload.pageSize = defaultpagesize
    setTransactionsFilter({
      type: payload?.type,
      startdate: payload?.startdate,
      enddate: payload?.enddate,
      currency: payload?.currency,
    })
    setDefaultPage(1)
    dispatch(TransactionHistoryAction(payload))
  }


  return (
    <>
      {transactions?.loading && <Spinner />}
      <div className='col-md-12 col-lg-9'>
        <div className="accountRight h-100">
          <div className="d-sm-flex align-items-start justify-content-between">
            <div className="d-flex">
              <button onClick={() => router.back()} className="backArrow d-lg-none"><i className="icon-arrow-right"></i></button>
              <h3 className="hTitle hLine">Transactions for today</h3>
            </div>
            <button className="btn btn-outline-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
              <i className="fa-solid fa-filter"></i> Filters
            </button>
          </div>
          <div className="row gy-4">
            <div className="col-md-8 mx-auto">
              <div className="collapse TransactionFilterOption my-4" id="collapseExample">
                <form className="formBox" onSubmit={handleSubmit(onSubmit)}>
                  <div className="row">
                    <div className="col-md-6">
                      <label>Type</label>
                      <select className="form-select" aria-label="Default select example" {...register('type')}>
                        <option value=''>All</option>
                        <option value='withdrawal'>Withdraw</option>
                        <option value='credit'>Deposit</option>
                        <option value='bonus'>Bonus</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Currency</label>
                      <select className="form-select" aria-label="Default select example" {...register('currency')}>
                        <option value={'all'}>All</option>
                        <option>Indian Rupee</option>
                      </select>
                    </div>
                    <div className="col-md-6">
                      <label>Period From</label>
                      <input type="date" className="form-select" {...register('startdate', {
                        onChange: () => { resetField('enddate') },
                      })} />
                    </div>
                    <div className="col-md-6">
                      <label>Period To</label>
                      <input type="date" className="form-select" {...register('enddate')} min={watch('startdate')} disabled={!watch('startdate')} />

                    </div>
                  </div>
                  <button type="submit" className="btn btn-primary mt-4">Show Result</button>
                </form>
              </div>
              <div className="table-responsie mt-5">
                <table className="table TransactionList">
                  <tbody>
                    {
                      transactionData?.length > 0 ?
                        transactionData?.map((transactionList: any, transactionKey: any) => {
                          // transactions?.data?.data?.row?.length > 0 ?
                          //   transactions?.data?.data?.row?.map((transactionList: any, transactionKey: any) => {
                          const amount = transactionList?.amount;
                          const transactionType = transactionList?.req_type;
                          const transactionDate = transactionList?.createdAt
                          const transactionStatus = transactionList?.status
                          return (
                            <tr key={transactionKey} style={{ color: '#fff' }}>
                              <td>
                                <p>{formatDate(transactionDate)}</p>
                                <small>{`${transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'} INR`}</small> <br/>
                                <small>{`Transaction Id :  ${transactionList?.transaction_id}`}</small>
                              </td>
                              <td>
                                <p>{`${transactionType === 'deposit' ? '+' : '-'} ${amount} INR`}</p>
                                <small className={transactionStatus === 1 ? 'text-success' : transactionStatus === 2 ? 'text-danger' : ''}>
                                  <i className={transactionStatus === 1 ? 'fa-solid fa-check' : transactionStatus === 2 ? 'icon-cancel' : 'fa-solid fa-hourglass-end'}></i>
                                  {transactionStatus === 1 ? 'Approve' : transactionStatus === 2 ? 'Reject' : 'Initialised'}
                                </small>

                              </td>
                            </tr>
                          )
                        })
                        :
                        <h3 className='text-center text-white'>No transactions</h3>
                    }

                  </tbody>
                </table>
              </div>
            </div>
            {/* {transactions?.loading === false && */}
            <>
              <div className="text-center mt-5">
                {transactions?.data?.data?.count >= totalRenderRecord &&
                  <button type="button" onClick={loadmore} className="btn btn-primary px-4">Load More</button>
                }
              </div>
            </>
            {/* } */}
          </div>
        </div>
      </div>
    </>
  );
}

export default Transactions;


// import { TransactionHistoryAction } from '@/Redux/Actions/PaymentAction';
// import { formatDate, getFromLocalStorage } from '@/utils/Helper';
// import React, { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import Spinner from '../Layouts/Spinner';
// import { useForm } from 'react-hook-form';
// import { RouteConfig } from '@/Config/CommonConfig';
// import Link from 'next/link';

// interface FormInputs {
//   userid: string
//   type: string
//   startdate: string
//   enddate: string
//   currency: string
//   page: string
//   pageSize: string

// }

// const Transactions = () => {

//   const dispatch = useDispatch<any>();
//   const [transactionsFilter, setTransactionsFilter] = useState({
//     type: '',
//     startdate: '',
//     enddate: '',
//     currency: '',
//     page: 1,
//     pageSize: 100
//   })
//   const transactions = useSelector((state: any) => state.TransactionHistoryState);

//   const { register, formState: { errors }, watch, resetField, handleSubmit } = useForm<FormInputs>({});

//   let userID: any = ""
//   if (getFromLocalStorage('UserDetails')) {
//     const playxuser: any = getFromLocalStorage('UserDetails')
//     if (playxuser != undefined) {
//       const userDetails = JSON.parse(playxuser)
//       userID = userDetails?._id
//     }
//   }

//   useEffect(() => {
//     const params = {
//       userid: userID,
//       type: '',
//       page: 1,
//       pageSize: 100
//     }
//     dispatch(TransactionHistoryAction(params))
//   }, [transactionsFilter])

//   const onSubmit = (payload: FormInputs) => {
//     payload.userid = userID;
//     dispatch(TransactionHistoryAction(payload))
//   }
//   return (
//     <>
//       {transactions?.loading && <Spinner />}
//       <div className='col-md-12 col-lg-9'>
//         <div className="accountRight h-100">
//           <div className="d-flex align-items-start justify-content-between">
//             <div className="d-flex">
//                 <Link href={RouteConfig?.Home} className="backArrow d-lg-none"><i className="icon-arrow-right"></i></Link>
//                 <h3 className="hTitle hLine">Transactions for today</h3>
//             </div>
//             <button className="btn btn-outline-light" type="button" data-bs-toggle="collapse" data-bs-target="#collapseExample" aria-expanded="false" aria-controls="collapseExample">
//               <i className="fa-solid fa-filter"></i> Filters
//             </button>
//           </div>
//           <div className="row gy-4">
//             <div className="col-md-8 mx-auto">
//               <div className="collapse TransactionFilterOption my-4" id="collapseExample">
//                 <form className="formBox" onSubmit={handleSubmit(onSubmit)}>
//                   <div className="row">
//                     <div className="col-md-6">
//                       <label>Type</label>
//                       <select className="form-select" aria-label="Default select example" {...register('type')}>
//                         <option value=''>All</option>
//                         <option value='withdrawal'>Withdraw</option>
//                         <option value='credit'>Deposit</option>
//                         <option value='bonus'>Bonus</option>
//                       </select>
//                     </div>
//                     <div className="col-md-6">
//                       <label>Currency</label>
//                       <select className="form-select" aria-label="Default select example" {...register('currency')}>
//                         <option value={'all'}>All</option>
//                         <option>Indian Rupee</option>
//                       </select>
//                     </div>
//                     <div className="col-md-6">
//                       <label>Period From</label>
//                       <input type="date" className="form-select" {...register('startdate', {
//                         onChange: () => { resetField('enddate') },
//                       })} />
//                     </div>
//                     <div className="col-md-6">
//                       <label>Period To</label>
//                       <input type="date" className="form-select" {...register('enddate')} min={watch('startdate')} disabled={!watch('startdate')} />

//                     </div>
//                   </div>
//                   <button type="submit" className="btn btn-primary mt-4">Show Result</button>
//                 </form>
//               </div>
//               <div className="table-responsie mt-5">
//                 <table className="table TransactionList">
//                   {/* <thead>
//                     <tr>
//                       <th>Deposit INR</th>
//                       <th><i className="fa-solid fa-hourglass-end"></i> Initialised</th>
//                     </tr>
//                   </thead> */}
//                   <tbody>
//                     {
//                       transactions?.data?.data?.row?.length > 0 ?
//                       transactions?.data?.data?.row?.map((transactionList: any, transactionKey: any) => {

//                         // console.log('transactionList----------------------------->', transactionList);
//                         const amount = transactionList?.amount;
//                         const transactionType = transactionList?.req_type;
//                         const transactionDate = transactionList?.createdAt
//                         const transactionStatus = transactionList?.status
//                         return (
//                           <tr key={transactionKey} style={{ color: '#fff' }}>
//                             <td>
//                               <p>{formatDate(transactionDate)}</p>
//                               <small>{`${transactionType === 'deposit' ? 'Deposit' : 'Withdrawal'} INR`}</small>
//                             </td>
//                             <td>
//                               <p>{`${transactionType === 'deposit' ? '+' : '-'} ${amount} INR`}</p>
//                               <small className={transactionStatus === 1 ? 'text-success' : transactionStatus === 2 ? 'text-danger' : ''}>
//                                 <i className={transactionStatus === 1 ? 'fa-solid fa-check' : transactionStatus === 2 ? 'icon-cancel' : 'fa-solid fa-hourglass-end'}></i>
//                                 {transactionStatus === 1 ? 'Approve' : transactionStatus === 2 ? 'Reject' : 'Initialised'}
//                               </small>

//                             </td>
//                           </tr>
//                         )
//                       })
//                     :
//                     <h3 className='text-center text-white'>No transactions</h3>
//                     }

//                   </tbody>
//                 </table>
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Transactions;