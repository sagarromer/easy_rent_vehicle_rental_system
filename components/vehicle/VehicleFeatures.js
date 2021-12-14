import React from 'react'

const VehicleFeatures = ({ vehicle }) => {
    return (
        <div className="features mt-5">
            <h3 className='mb-4'>Features:</h3>
            <div className='vehicle-feature'>
                <i className="fa fa-cog fa-fw fa-users" aria-hidden="true"></i>
                <p>{vehicle.passengerCapacity} Passengers</p>
            </div>

            <div className='vehicle-feature'>
                <i className="fa fa-cog fa-fw fa-bed" aria-hidden="true"></i>
                <p>{vehicle.numOfSeats} Seats</p>
            </div>

            <div className='vehicle-feature'>
                <i
                    className={vehicle.airbags ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>Airbags</p>
            </div>

            <div className='vehicle-feature'>
                <i
                    className={vehicle.internet ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>Internet</p>
            </div>

            <div className='vehicle-feature'>
                <i
                    className={vehicle.airConditioned ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>Air Conditioned</p>
            </div>

            <div className='vehicle-feature'>
                <i
                    className={vehicle.centralLocking ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>Central Locking</p>
            </div>

            <div className='vehicle-feature'>
                <i
                    className={vehicle.fogLamps ? 'fa fa-check text-success' : 'fa fa-times text-danger'}
                    aria-hidden="true"
                ></i>
                <p>Vehicle Cleaning</p>
            </div>

        </div>
    )
}

export default VehicleFeatures