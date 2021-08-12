import nc from 'next-connect';
import dbConnect from '../../../config/dbConnect';
import { getSingleVehicle, updateVehicle, deleteVehicle } from '../../../controllers/vehicleControllers';
import onError from '../../../middlewares/error';
import { isAuthenticatedUser, authorizeRoles } from '../../../middlewares/auth'

const handler = nc({ onError });
dbConnect();

handler.get(getSingleVehicle);

handler
.use(isAuthenticatedUser, authorizeRoles('admin'))
.put(updateVehicle);
handler
.use(isAuthenticatedUser, authorizeRoles('admin'))
.delete(deleteVehicle);
export default handler; 