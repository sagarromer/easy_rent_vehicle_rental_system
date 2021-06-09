import Home from '../components/Home'
import Layout from '../components/layout/Layout'

import { getVehicles } from '../redux/actions/vehicleActions'
import { wrapper } from '../redux/store'

export default function Index() {
    return (
    <Layout>
      <Home />
    </Layout>
  )
}
export const getServerSideProps = wrapper.getServerSideProps(
  (store) =>
    async ({ req, query }) => {
      await store.dispatch(getVehicles(req,query.pages));
    }); 