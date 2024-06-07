import React from 'react'

const Sidebar = () => {
    return (
        <div className="col-md-4 col-lg-3">
            <div className="PRomationleft">
                <ul>
                    <li><a className='active cursor-pointer'>All Promotions</a></li>
                    {/* <li><a className='cursor-pointer'>Bonuses</a></li>
                    <li><a className='cursor-pointer'>Cashbacks</a></li>
                    <li><a className='cursor-pointer'>Tournaments</a></li> */}
                </ul>
            </div>
        </div>
    )
}

export default Sidebar