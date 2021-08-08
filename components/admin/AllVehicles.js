import React, { useEffect } from 'react'
import Link from 'next/link'
import { useRouter } from 'next/router'

import { MDBDataTable } from 'mdbreact'
import Loader from '../layout/Loader'

import { useDispatch, useSelector } from 'react-redux'
import { toast } from 'react-toastify';

import { getAdminVehicles, deleteVehicle ,clearErrors} from '../../redux/actions/vehicleActions'
import { DELETE_VEHICLE_RESET } from '../../redux/constants/vehicleConstants'

const AllVehicles = () => {

    const dispatch = useDispatch()
    const router = useRouter()

    const { loading, error, vehicles } = useSelector(state => state.allVehicles)
    const { error: deleteError, isDeleted } = useSelector(state => state.vehicle)

    useEffect(() => {

        dispatch(getAdminVehicles())

        if (error) {
            toast.error(error);
            dispatch(clearErrors())
        }

        if (deleteError) {
            toast.error(deleteError);
            dispatch(clearErrors())
        }

        if (isDeleted) {
            router.push('/admin/vehicles')
            dispatch({ type: DELETE_ROOM_RESET })
        }

    }, [dispatch, deleteError, isDeleted])


    const setVehicles = () => {
        const data = {
            columns: [
                {
                    label: 'Vehicle ID',
                    field: 'id',
                    sort: 'asc'
                },
                {
                    label: 'Name',
                    field: 'name',
                    sort: 'asc'
                },
                {
                    label: 'Price / Day',
                    field: 'price',
                    sort: 'asc'
                },
                {
                    label: 'Category',
                    field: 'category',
                    sort: 'asc'
                },
                {
                    label: 'Actions',
                    field: 'actions',
                    sort: 'asc'
                }

            ],
            rows: []
        }

        vehicles && vehicles.forEach(vehicle => {
            data.rows.push({
                id: vehicle._id,
                name: vehicle.name,
                price: `$${vehicle.pricePerDay}`,
                category: vehicle.category,
                actions:
                    <>
                        <Link href={`/admin/vehicles/${vehicle._id}`}>
                            <a className="btn btn-primary">
                                <i className="fa fa-pencil"></i>
                            </a>
                        </Link>

                        <button className="btn btn-danger mx-2" onClick={() => deleteVehicleHandler(vehicle._id)}>
                            <i className="fa fa-trash"></i>
                        </button>

                    </>
            })
        })

        return data;

    }

    const deleteVehicleHandler = (id) => {
        dispatch(deleteVehicle(id))
    }


    return (
        <div className='container container-fluid'>
            {loading ? <Loader /> :
                <>
                    <h1 className='my-5'>{`${vehicles && vehicles.length} Vehicles`}

                        <Link href='/admin/vehicles/new'>
                            <a className="mt-0 btn text-white float-right new-vehicle-btn">Create Vehicle</a>
                        </Link>

                    </h1>


                    <MDBDataTable
                        data={setVehicles()}
                        className='px-3'
                        bordered
                        striped
                        hover
                    />

                </>
            }
        </div>
    )
}

export default AllVehicles 