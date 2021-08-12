import React, { useState, useEffect } from 'react'
import { useRouter } from 'next/router'

import ButtonLoader from '../layout/ButtonLoader'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { updateVehicle, getVehicleDetails, clearErrors } from '../../redux/actions/vehicleActions'
import { UPDATE_VEHICLE_RESET } from '../../redux/constants/vehicleConstants'

const UpdateVehicle = () => {

    const [name, setName] = useState('')
    const [price, setPrice] = useState(0)
    const [description, setDescription] = useState('')
    const [vehicleNumber, setVehicleNumber] = useState('')
    const [category, setCategory] = useState('King')
    const [passengerCapacity, setPassengerCapacity] = useState(1)
    const [numOfSeats, setNumOfSeats] = useState(1)
    const [internet, setInternet] = useState(false)
    const [airbags, setAirbags] = useState(false)
    const [airConditioned, setAirConditioned] = useState(false)
    const [fogLamps, setFogLamps] = useState(false)
    const [centralLocking, setCentralLocking] = useState(false)

    const [images, setImages] = useState([])
    const [imagesPreview, setImagesPreview] = useState([])

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, isUpdated } = useSelector(state => state.vehicle)
    const { loading: vehicleDetailsLoading, error: vehicleDetailsError, vehicle } = useSelector(state => state.vehicleDetails)

    const { id } = router.query

    useEffect(() => {

        if (vehicle && vehicle._id !== id) {
            dispatch(getVehicleDetails('', id))
        } else {
            setName(vehicle.name)
            setPrice(vehicle.pricePerNight)
            setDescription(vehicle.description)
            setAddress(vehicle.vehicleNumber)
            setCategory(vehicle.category)
            setPassengerCapacity(vehicle.passengerCapacity)
            setNumOfSeats(vehicle.numOfSeats)
            setInternet(vehicle.internet)
            setAirbags(vehicle.airbags)
            setAirConditioned(vehicle.airConditioned)
            setFogLamps(vehicle.fogLamps)
            setCentralLocking(vehicle.centralLocking)
            setOldImages(vehicle.images)
        }

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (vehicleDetailsError) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (isUpdated) {
            dispatch(getVehicleDetails('', id))
            router.push('/admin/vehicles')
            dispatch({ type: UPDATE_VEHICLE_RESET })
        }

    }, [dispatch, error, vehicleDetailsError, isUpdated, vehicle, id])

    const submitHandler = (e) => {
        e.preventDefault()

        const vehicleData = {
            name,
            pricePerDay: price,
            description,
            vehicleNumber,
            category,
            passengerCapacity: Number(passengerCapacity),
            numOfSeats: Number(numOfSeats),
            internet,
            airbags,
            airConditioned,
            fogLamps,
            centralLocking,
        }

        if (images.length !== 0) vehicleData.images = images

        dispatch(updateVehicle(vehicle._id, vehicleData))

    }


    const onChange = (e) => {

        const files = Array.from(e.target.files)

        setImages([]);
        setOldImages([]);
        setImagesPreview([]);

        files.forEach(file => {

            const reader = new FileReader();

            reader.onload = () => {
                if (reader.readyState === 2) {
                    setImages(oldArray => [...oldArray, reader.result]);
                    setImagesPreview(oldArray => [...oldArray, reader.result]);
                }
            }

            reader.readAsDataURL(file)

        })

    }


    return (
        <>
            {vehicleDetailsLoading ? <Loader /> :
                <div className="container container-fluid">
                    <div className="row wrapper">
                        <div className="col-10 col-lg-8">
                            <form className="shadow-lg" onSubmit={submitHandler} encType="multipart/form-data">
                                <h1 className="mb-4">Update Vehicle</h1>
                                <div className="form-group">
                                    <label htmlFor="name_field">Name</label>
                                    <input
                                        type="text"
                                        id="name_field"
                                        className="form-control"
                                        value={name}
                                        onChange={(e) => setName(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="price_field">Price</label>
                                    <input
                                        type="text"
                                        id="price_field"
                                        className="form-control"
                                        value={price}
                                        onChange={(e) => setPrice(e.target.value)}
                                        required
                                    />
                                </div>
                                <div className="form-group">
                                    <label htmlFor="description_field">Description</label>
                                    <textarea
                                        className="form-control"
                                        id="description_field"
                                        rows="8"
                                        value={description}
                                        onChange={(e) => setDescription(e.target.value)}
                                        required
                                    ></textarea>
                                </div>
                                <div className="form-group">
                                    <label htmlFor="vehicleNumber_field">Vehicle Number</label>
                                    <input
                                        type="text"
                                        id="vehicleNumber_field"
                                        className="form-control"
                                        value={vehicleNumber}
                                        onChange={(e) => setAddress(e.target.value)}
                                        required
                                    />
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Category</label>
                                    <select
                                        className="form-control"
                                        id="vehicle_type_field"
                                        value={category}
                                        onChange={(e) => setCategory(e.target.value)}
                                    >
                                        {['Luxury', 'Minivan', 'Hybrid'].map(category => (
                                            <option key={category} value={category}>{category}</option>
                                        ))}
                                    </select>
                                </div>

                                <div className="form-group">
                                    <label htmlFor="category_field">Passenger Capacity</label>
                                    <select
                                        className="form-control"
                                        id="passenger_field"
                                        value={passengerCapacity}
                                        onChange={(e) => setPassengerCapacity(e.target.value)}
                                    >
                                        {[1, 2, 3, 4, 5, 6].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>


                                <div className="form-group">
                                    <label htmlFor="category_field">Number of Seats</label>
                                    <select
                                        className="form-control"
                                        id="numofbeds_field"
                                        value={numOfSeats}
                                        onChange={(e) => setNumOfSeats(e.target.value)}
                                    >
                                        {[1, 2, 3].map(num => (
                                            <option key={num} value={num}>{num}</option>
                                        ))}
                                    </select>
                                </div>


                                <label className="mb-3">Vehicle Features</label>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="internet_checkbox"
                                        value={internet}
                                        onChange={(e) => setInternet(e.target.checked)}
                                        checked={internet}
                                    />
                                    <label className="form-check-label" htmlFor="internet_checkbox">
                                        Internet
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="airbags_checkbox"
                                        value={airbags}
                                        onChange={(e) => setAirbags(e.target.checked)}
                                        checked={airbags}
                                    />
                                    <label className="form-check-label" htmlFor="airbags_checkbox">
                                        Airbags
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="airConditioned_checkbox"
                                        value={airConditioned}
                                        onChange={(e) => setAirConditioned(e.target.checked)}
                                        checked={airConditioned}
                                    />
                                    <label className="form-check-label" htmlFor="airConditioned_checkbox">
                                        Air Conditioned
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="fogLamps_checkbox"
                                        value={fogLamps}
                                        onChange={(e) => setFogLamps(e.target.checked)}
                                        checked={fogLamps}
                                    />
                                    <label className="form-check-label" htmlFor="fogLamps_checkbox">
                                        fogLamps uncluded
                                    </label>
                                </div>
                                <div className="form-check">
                                    <input
                                        className="form-check-input"
                                        type="checkbox"
                                        id="centralLocking_checkbox"
                                        value={centralLocking}
                                        onChange={(e) => setCentralLocking(e.target.checked)}
                                        checked={centralLocking}
                                    />
                                    <label className="form-check-label" htmlFor="centralLocking_checkbox">
                                        Vehicle Cleaning
                                    </label>
                                </div>


                                <div className="form-group mt-4">
                                    <label>Images</label>
                                    <div className="custom-file">
                                        <input
                                            type="file"
                                            name="vehicle_images"
                                            className="custom-file-input"
                                            id="customFile"
                                            onChange={onChange}
                                            multiple
                                        />
                                        <label className="custom-file-label" htmlFor="customFile">
                                            Choose Images
                                        </label>
                                    </div>

                                    {imagesPreview.map(img => (

                                        <img
                                            src={img}
                                            key={img}
                                            alt="Images Preview"
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />

                                    ))}

                                    {oldImages && oldImages.map(img => (

                                        <img
                                            src={img.url}
                                            key={img.public_id}
                                            alt="Images Preview"
                                            className="mt-3 mr-2"
                                            width="55"
                                            height="52"
                                        />

                                    ))}

                                </div>
                                <button
                                    type="submit"
                                    className="btn btn-block new-vehicle-btn py-3"
                                    disabled={loading ? true : false}
                                >
                                    {loading ? <ButtonLoader /> : 'UPDATE'}
                                </button>
                            </form>
                        </div>
                    </div>
                </div >
            }
        </>
    )
}

export default UpdateVehicle 