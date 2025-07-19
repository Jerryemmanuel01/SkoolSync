// controllers/adminController.ts
import {
	login_Admin,
	create_SubAdmin,
	suspend_SubAdmin,
	update_sub_admin,
	delete_sub_admin,
	logout_admin,
	fetch_admin_details,
	get_access_token
} from '../services/adminServices';
import { handleRequest } from '../helpers/handleRequest';

export const loginAdmin = handleRequest(login_Admin);
export const createSubAdmin = handleRequest(create_SubAdmin);
export const suspendSubAdmin = handleRequest(suspend_SubAdmin);
export const updateSubAdmin = handleRequest(update_sub_admin);
export const deleteSubAdmin = handleRequest(delete_sub_admin);
export const logoutAdmin = handleRequest(logout_admin);
export const fetchAdmin = handleRequest(fetch_admin_details);
export const requestAccessToken = handleRequest(get_access_token);
