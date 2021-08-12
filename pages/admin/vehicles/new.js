import React from 'react'
import { getSession } from 'next-auth/client'

import NewVehicle from '../../../components/admin/NewVehicle'
import Layout from '../../../components/layout/Layout'

const NewVehiclePage = () => {
    return (
        <Layout title='New Vehicle'>
            <NewVehicle />
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

export default NewVehiclePage