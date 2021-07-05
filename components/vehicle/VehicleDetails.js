import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'
import Head from 'next/head'
import Image from 'next/image'

import VehicleFeatures from './VehicleFeatures'

import DatePicker from 'react-datepicker'
import "react-datepicker/dist/react-datepicker.css";

import { Carousel } from 'react-bootstrap'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';
import { clearErrors } from '../../redux/actions/vehicleActions'


const VehicleDetails = () => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const dispatch = useDispatch()
    const router = useRouter();

    const { vehicle, error } = useSelector(state => state.vehicleDetails);

    const onChange = (dates) => {
        const [startDate, endDate] = dates;

        setStartDate(startDate)
        setEndDate(endDate)

        if (startDate && endDate) {

            // Calclate days of stay

            const days = Math.floor(((new Date(endDate) - new Date(startDate)) / 86400000) + 1)

            setDaysOfStay(days)


            dispatch(checkBooking(id, startDate.toISOString(), endDate.toISOString()))

        }

    }
    const newBookingHandler = async () => {

        const bookingData = {
            room: router.query.id,
            startDate,
            endDate,
            daysOfStay,
            amountPaid: 90,
            paymentInfo: {
                id: 'STRIPE_PAYMENT_ID',
                status: 'STRIPE_PAYMENT_STATUS'
            }
        }

        try {

            const config = {
                headers: {
                    'Content-Type': 'application/json'
                }
            }

            const { data } = await axios.post('/api/bookings', bookingData, config)

            console.log(data);

        } catch (error) {

            console.log(error.response);

        }

    }
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
                <title>{vehicle.name} - Easy_Rent</title>
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
                        <VehicleFeatures vehicle={vehicle} />

                    </div>

                    <div className="col-12 col-md-6 col-lg-4">
                        <div className="booking-card shadow-lg p-4">
                            <p className='price-per-night'><b>${vehicle.pricePerNight}</b> / night</p>

                            <hr />

                            <p className="mt-5 mb-3">
                                Pick Date Range for renting
                            </p>
                            <DatePicker
                                className='w-100'
                                selected={startDate}
                                onChange={onChange}
                                startDate={startDate}
                                endDate={endDate}
                                minDate={new Date()}
                                excludeDates={excludedDates}
                                selectsRange
                                inline
                            />
                            <button className="btn btn-block py-3 booking-btn"
                            onClick={newBookingHandler}>pay</button>
                        </div>
                    </div>
                </div>





            </div>
        </>
    )
}

export default VehicleDetails