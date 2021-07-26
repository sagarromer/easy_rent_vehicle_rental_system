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

import { checkBooking, getBookedDates } from '../../redux/actions/bookingActions'
import { CHECK_BOOKING_RESET } from '../../redux/constants/bookingConstants'

import getStripe from '../../utils/getStripe'
import axios from 'axios'

const VehicleDetails = () => {
    const [startDate, setStartDate] = useState()
    const [endDate, setEndDate] = useState()
    const [daysOfRent, setDaysOfRent] = useState()
    const [paymentLoading, setPaymentLoading] = useState(false)
    const dispatch = useDispatch()
    const router = useRouter();
    const { dates } = useSelector(state => state.bookedDates);
    const { user } = useSelector(state => state.loadedUser);
    const { vehicle, error } = useSelector(state => state.vehicleDetails);
    const { available, loading: bookingLoading } = useSelector(state => state.checkBooking);
    const excludedDates = []
    dates.forEach(date => {
        excludedDates.push(new Date(date))
    })
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
    const { id } = router.query;

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
    const bookVehicle = async (id, pricePerDay) => {

        setPaymentLoading(true);

        const amount = pricePerDay * daysOfRent;


        try {

            const link = `/api/checkout_session/${id}?startDate=${startDate.toISOString()}&endDate=${endDate.toISOString()}&daysOfRent=${daysOfRent}`

            const { data } = await axios.get(link, { params: { amount } })

            const stripe = await getStripe();

            // Redirect to checkout
            stripe.redirectToCheckout({ sessionId: data.id })

            setPaymentLoading(false);

        } catch (error) {

            setPaymentLoading(false);
            console.log(error);
            toast.error(error.message)
        }

    }
    useEffect(() => {
        dispatch(getBookedDates(id))

        toast.error(error)
        dispatch(clearErrors())

        return () => {
            dispatch({ type: CHECK_BOOKING_RESET })
        }

    }, [dispatch,error,id])


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
                            {available === true &&
                                <div className="alert alert-success my-3 font-weight-bold">Vehicle is available. Book now.</div>
                            }

                            {available === false &&
                                <div className="alert alert-danger my-3 font-weight-bold">Vehicle not available. Try different dates.</div>
                            }

                            {available && !user &&
                                <div className="alert alert-danger my-3 font-weight-bold">Login to book Vehicle.</div>
                            }
                            {available && user &&
                                <button
                                    className="btn btn-block py-3 booking-btn"
                                    onClick={() => bookVehicle(vehicle._id, vehicle.pricePerDay)}
                                    disabled={bookingLoading || paymentLoading ? true : false}
                                >
                                    Pay - ${daysOfRent * room.pricePerDay}
                                </button>
                            }


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