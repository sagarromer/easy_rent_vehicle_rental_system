
import React from 'react'
import { getSession } from 'next-auth/client'

import VehicleReviews from '../../components/admin/VehicleReviews'
import Layout from '../../components/layout/Layout'

const VehicleReviewsPage = () => {
    return (
        <Layout title='Vehicle Reviews'>
            <VehicleReviews />
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

export default VehicleReviewsPage