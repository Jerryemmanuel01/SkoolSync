import { handleRequest } from '../helpers/handleRequest';
import {
	login_user,
	register_user,
	verify_email,
	resend_verification_email,
	logout_user,
	forgot_password,
	// reset_password,
	// logout_user,
	// fetch_user_details,
	// update_user_profile
} from '../services/user/authService';

export const registerUser = handleRequest(register_user);
export const loginUser = handleRequest(login_user);
export const verifyEmail = handleRequest(verify_email);
export const resendVerificationEmail = handleRequest(resend_verification_email);
export const logoutUser = handleRequest(logout_user);
export const forgotPassword = handleRequest(forgot_password);
