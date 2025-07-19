import { handleRequest } from "../helpers/handleRequest";
import {
    login_user,
    register_user,
    // verify_email,
    // forgot_password,
    // reset_password,
    // logout_user,
    // fetch_user_details,
    // update_user_profile
} from "../services/user/authService";

export const registerUser = handleRequest(register_user);
export const loginUser = handleRequest(login_user);