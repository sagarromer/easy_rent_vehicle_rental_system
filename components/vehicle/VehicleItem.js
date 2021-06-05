import React from 'react'
import Image from 'next/image'
import Link from 'next/link'

const VehicleItem = ({ vehicle }) => {
    return (
        <div className="col-sm-12 col-md-6 col-lg-3 my-3">
            <div className="card p-2">
                <Image
                    className="card-img-top mx-auto"
                    src={vehicle.images[0].url}
                    height={170}
                    width=""
                    alt="vehicle"
                />
                <div className="card-body d-flex flex-column">
                    <h5 className="card-title">
                        <Link href={`/vehicle/${vehicle._id}`}>
                            <a>{vehicle.name}</a>
                        </Link>
                    </h5>

                    <div className="ratings mt-auto mb-3">
                        <p className="card-text"><b>${vehicle.pricePerNight}</b> / night</p>

                        <div className="rating-outer">
                            <div
                                className="rating-inner"
                                style={{ width: `${(vehicle.ratings / 5) * 100}%` }}
                            ></div>
                        </div>
                        <span id="no_of_reviews">({vehicle.numOfReviews} Reviews)</span>
                    </div>

                    <button className="btn btn-block view-btn">
                        <Link href={`/vehicle/${vehicle._id}`}>View Details</Link>
                    </button>
                </div>
            </div>
        </div>
    )
}

export default VehicleItem