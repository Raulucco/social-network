import axios from "axios";
import {
    GET_PROFILE,
    PROFILE_LOADING,
    PROFILE_NOT_FOUND,
    CLEAR_PROFILE,
    GET_ERRORS
} from "./types";

export const setProfileLoading = () => ({
    type: PROFILE_LOADING
});

export const setProfile = (payload) => ({
    type: GET_PROFILE,
    payload
});

export const getLogedProfile = () => dispatch => {
    dispatch(setProfileLoading())
    axios.get("/api/profile")
        .then(({
            data
        }) => dispatch(setProfile(data)))
        .catch(() => dispatch(setProfile({})))
};

export const clearProfile = () => ({
    type: CLEAR_PROFILE
});