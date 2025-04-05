import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import { logout } from "../store/authentification/authSlice";
import { toast } from "react-toastify";
import { useMutation } from "@apollo/client";
import { LOGOUT_MUTATION } from "../api/requests/auth.ts";
import { apolloSessionsClient } from "../api";

export function useLogout() {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const [logoutMutation, { loading }] = useMutation(LOGOUT_MUTATION, {
        client: apolloSessionsClient,
        onCompleted: (data) => {
            if (data?.session_logout?.success) {
                dispatch(logout());
                toast.info("You have logged out of your profile");
                navigate("/login");
            }
        },
        onError: (error) => {
            if (error.graphQLErrors.length > 0) {
                error.graphQLErrors.forEach(({ message }) => toast.error(`Error: ${message}`));
            } else {
                toast.error("Unknown error occurred please try again");
            }
        },
    });

    const handleLogout =async () => {

       await logoutMutation();
    };

    return { handleLogout, loading };
}
