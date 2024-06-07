import { PLAYXCHIP_LOADER_IMAGE } from '@/Config/Config';
import React, { Fragment } from 'react';
const Spinner = () => {

	return (
		<Fragment>

			{/* <div className="loading">Loading&#8230;</div> */}
			<div className="loader-container">
				<img src={PLAYXCHIP_LOADER_IMAGE} alt="loader" />
			</div>


		</Fragment>
	);
}
export default Spinner;