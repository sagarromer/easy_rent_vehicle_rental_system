import React, { useState } from 'react'
import { useRouter } from 'next/router'

const Search = () => {

    const [vehicleNumber, setLocation] = useState('');
    const [passengers, setPassengers] = useState('');
    const [category, setCategory] = useState('');

    const router = useRouter();

    const submitHandler = (e) => {
        e.preventDefault();

        if (vehicleNumber.trim()) {
            router.push(`/?vehicleNumber=${vehicleNumber}&passengers=${passengers}&category=${category}`)
        } else {
            router.push('/')
        }
    }


    return (
        <div className="container container-fluid">
            <div className="row wrapper">
                <div className="col-10 col-lg-5">
                    <form className="shadow-lg" onSubmit={submitHandler}>
                        <h2 className="mb-3">Search Vehicles</h2>
                        <div className="form-group">
                            <label htmlFor="vehicleNumber_field">Location</label>
                            <input
                                type="text"
                                className="form-control"
                                id="vehicleNumber_field"
                                placeholder="new york"
                                value={vehicleNumber}
                                onChange={(e) => setLocation(e.target.value)}
                            />
                        </div>

                        <div className="form-group">
                            <label htmlFor="guest_field">No. of Passengers</label>
                            <select
                                className="form-control"
                                id="guest_field"
                                value={passengers}
                                onChange={(e) => setPassengers(e.target.value)}
                            >
                                {[1, 2, 3, 4, 5, 6].map(num => (
                                    <option key={num} value={num}>{num}</option>
                                ))}
                            </select>
                        </div>
                        <div className="form-group">
                            <label htmlFor="room_type_field">Room Type</label>
                            <select
                                className="form-control"
                                id="room_type_field"
                                value={category}
                                onChange={(e) => setCategory(e.target.value)}
                            >
                                {['Luxury', 'Convertible', 'Hybrid'].map(category => (
                                    <option key={category} value={category}>{category}</option>
                                ))}
                            </select>
                        </div>

                        <button type="submit" className="btn btn-block py-2">Search</button>
                    </form>
                </div>
            </div>
        </div>
    )
}

export default Search 