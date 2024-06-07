import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { LoadScript, GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { Config } from '../../config/Config';
import { getLocationAddress } from '../../utils/Helper';
import LocationInputField from './LocationInputField';
import { Routes } from '../../constants/RouteConstants';

const Map = () => {

    const [address, setAddress] = useState('V2W4+44 Pompey, NY, USA')
    const [latLng, setLatLng] = useState({ lat: 42.895453, lng: -75.9950833 })
    const [map, setMap] = useState<any>(null);

    const containerStyle = {
        width: "100%",
        height: '100%'
    };

    const handleFetchCurrentLocation = async () => {
        const address: any = await getLocationAddress({ type: 'current' });
        map.panTo({ lat: address?.latitude, lng: address?.longitude })  
        setLatLng({ lat: address?.latitude, lng: address?.longitude })
        setAddress(address?.address)

    };

    const handleMarkerDragEnd = async (event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();

        const latitudeLongitude = {
            lat: lat,
            lng: lng,
        };
        const address: any = await getLocationAddress({
            type: 'search',
            latitude: latitudeLongitude?.lat,
            longitude: latitudeLongitude?.lng
        });
        setAddress(address?.address)
    };

    const handleSelectLocation = (location: any) => {
        setLatLng({
            lat: location?.latitudeLongitude?.lat,
            lng: location?.latitudeLongitude?.lng
        })
        setAddress(location?.formattedAddress)
    }


    const onDoubleClick = async (event: any) => {
        const lat = event.latLng.lat();
        const lng = event.latLng.lng();
        const address: any = await getLocationAddress({
            type: 'search',
            latitude: lat,
            longitude: lng
        });
        setAddress(address?.address)
        setLatLng({ lat, lng })
        map.panTo({ lat, lng })
    }

    return (
        <main className="main-content top-gap">
            <div className='container-fluid map-page'>
                <div className='map-header mb-4'>
                    <div className='row align-items-center gy-3'>
                        <div className='col-1'>
                            <Link to={Routes?.ProfileSetup} className='page-back-arw'><i className='icon-chev-right'></i></Link>
                        </div>
                        <div className='col-sm-8 col-lg-6'>
                            <div className="com-floating my-0">
                                <i className="f-icon icon-location"></i>
                                <label className="f-label">Location</label>
                                <LocationInputField
                                    placeholder='Enter Location'
                                    value={address}
                                    onSuccess={handleSelectLocation}
                                    onChange={(e) => setAddress(e?.target?.value)}
                                />
                            </div>
                        </div>
                        <div className='col-sm-3'>
                            <button className='com-btn'>Submit</button>
                        </div>
                    </div>
                </div>
                <div className='map-wrap'>
                    <LoadScript googleMapsApiKey={Config?.GOOGLE_MAP_API_KEY} libraries={["places"]}>
                        <GoogleMap
                            center={latLng}
                            zoom={15}
                            mapContainerStyle={containerStyle}
                            onLoad={(gMap: any) => setMap(gMap)}
                            onDblClick={onDoubleClick}
                            options={{
                                // fullscreenControl: false,
                                // zoomControl: false,
                                // mapTypeControl: false,
                                // streetViewControl: false
                            }}
                        >
                            <Marker
                                position={latLng}
                                draggable={true}
                                onDragEnd={(e) => handleMarkerDragEnd(e)}
                            />

                        </GoogleMap>
                    </LoadScript>

                </div>
                <button className='locate-position' onClick={handleFetchCurrentLocation}>
                    <i className='icon-pickup'></i>
                </button>
            </div>
        </main>
    )
}

export default Map