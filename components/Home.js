import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'

import VehicleItem from './vehicle/VehicleItem'
import { useSelector } from 'react-redux'

const Home = () => {
    const { vehicles } = useSelector(state => state.allVehicles);
    console.log(vehicles);

    return (
        <section id="vehicles" className="container mt-5">

            <h2 className='mb-3 ml-2 stays-heading'>choose the vehicle suits you</h2>

            <a href='#' className='ml-2 back-to-search'> <i className='fa fa-arrow-left'></i> Back to Search</a>
            <div className="row">
            {vehicles && vehicles.length === 0 ?
                <div className="alert alert-danger mt-5 w-100"><b>No Vehicles.</b></div>
                :
                vehicles && vehicles.map(vehicle => (
                    <VehicleItem key={vehicle._id} vehicle={vehicle} />
                ))
            }
        </div>
        </section>
    )
}

export default Home