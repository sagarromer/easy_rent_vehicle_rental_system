import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import { Carousel } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/vehicleActions'


const VehicleDetails = () => {

    const dispatch = useDispatch()
    const router = useRouter();

    const { vehicle, error } = useSelector(state => state.vehicleDetails);


    useEffect(() => {

        toast.error(error)
        dispatch(clearErrors())

        return () => {
            dispatch({ type: CHECK_BOOKING_RESET })
        }

    }, [dispatch,error])


    return (
        <>
            <Head>
                <title>{vehicle.name} - BookIT</title>
            </Head>

            <div className="container container-fluid">
                <h2 className='mt-5'>{vehicle.name}</h2>
                <p>{vehicle.address}</p>

                <div className="ratings mt-auto mb-3">
                    <div className="rating-outer">
                        <div className="rating-inner" style={{ width: `${(vehicle.ratings / 5) * 100}%` }}></div>
                    </div>
                    <span id="no_of_reviews">({vehicle.numOfReviews} Reviews)</span>
                </div>

                <Carousel hover='pause'>
                    {vehicle.images && vehicle.images.map(image => (
                        <Carousel.Item key={image.public_id}>
                            <div style={{ width: '100%', height: '440px' }}>
                                <Image
                                    className='d-block m-auto'
                                    src={image.url}
                                    alt={vehicle.name}
                                    layout='fill'
                                />
                            </div>
                        </Carousel.Item>
                    ))}
                </Carousel>


                <div className="row my-5">
                    <div className="col-12 col-md-6 col-lg-8">
                        <h3>Description</h3>
                        <p>{vehicle.description}</p>
                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className='price-per-night'><b>${vehicle.pricePerNight}</b> / night</p>

                            <hr />

                            <p className="mt-5 mb-3">
                                Pick Date Range for renting
                            </p>
                        </div>
                    </div>
                </div>





            </div>
        </>
    )
}

export default VehicleDetails