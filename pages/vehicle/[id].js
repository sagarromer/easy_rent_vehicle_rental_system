import VehicleDetails from '../../components/vehicle/VehicleDetails'
import Layout from '../../components/layout/Layout'

import { getVehicleDetails } from '../../redux/actions/vehicleActions'

import { wrapper } from '../../redux/store'

export default function VehicleDetailsPage() {
    return (
        <Layout>
            <VehicleDetails title='Vehicle Details' />
        </Layout>
    )
}

export const getServerSideProps = wrapper.getServerSideProps(
    (store) =>
        async ({ req, params }) => {
            await store.dispatch(getVehicleDetails(req, params.id));
        });