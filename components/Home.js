import React, { useEffect } from 'react'
import { useRouter } from 'next/router'
import Link from 'next/link'
import Pagination from 'react-js-pagination'

import VehicleItem from './vehicle/VehicleItem'
import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify'
import { clearErrors } from '../redux/actions/vehicleActions'

const Home = () => {
    const dispatch = useDispatch()

    const router = useRouter()
    const { vehicles, resPerPage, vehiclesCount, filteredVehiclesCount, error } = useSelector(state => state.allVehicles);
    
    console.log(vehicles);
    let { location, page = 1 } = router.query;
    page = Number(page)
    useEffect(() => {
        toast.error(error)
        dispatch(clearErrors())

    }, [])
    const handlePagination = (pageNumber) => {

        if (location) {
            let url = window.location.search

            url.includes('&page') ?
                url = url.replace(/(page=)[^\&]+/, '$1' + pageNumber)
                :
                url = url.concat(`&page=${pageNumber}`)

            router.push(url)

        } else {

            router.push(`/?page=${pageNumber}`)
            // window.location.href = `/?page=${pageNumber}`
        }

    }
    let count = vehiclesCount;
    if (location) {
        count = filteredVehiclesCount
    }
    return (
        <>
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
        {resPerPage < count &&
            <div className="d-flex justify-content-center mt-5">
                <Pagination
                    activePage={page}
                    itemsCountPerPage={resPerPage}
                    totalItemsCount={vehiclesCount}
                    onChange={handlePagination}
                    nextPageText={'Next'}
                    prevPageText={'Prev'}
                    firstPageText={'First'}
                    lastPageText={'Last'}
                    itemClass='page-item'
                    linkClass='page-link'
                />
            </div>
        }
        </>
    )
}

export default Home