import React from 'react'
import { getSession } from 'next-auth/client'

import AllVehicles from '../../../components/admin/AllVehicles'
import Layout from '../../../components/layout/Layout'

const AllVehiclesPage = () => {
    return (
        <Layout title='All Vehicles'>
            <AllVehicles />
        </Layout>
    )
}

export async function getServerSideProps(context) {

    const session = await getSession({ req: context.req })

    if (!session || session.user.role !== 'admin') {
        return {
            redirect: {
                destination: '/login',
                permanent: false
            }
        }
    }

    return {
        props: {}
    }

}

export default AllVehiclesPage 