import {
    GET_ERRORS,
    SET_CURRENT_USER
} from "./types";
import axios from "axios";
import jwt_decode from "jwt-decode";

const setAuthToken = token => token ? axios.defaults.headers.common.Authorithation = token : delete axios.defaults.headers.common.Authorithation;

const handleErrors = errors => dispatch({
    type: GET_ERRORS,
    payload: errors.response.data
});

export const registerUser = (userCredentials, history) => dispatch => {
    axios
        .post("/api/users/register", userCredentials)
        .then(({
            data
        }) => history.push("/login"))
        .catch(handleErrors);
}

export const loginUser = (userCredentials) => dispatch => {
    axios.post("/api/users/login", userCredentials).then(({
        data
    }) => {
        const {
            token
        } = data;
        localStorage.setItem("jwt", token);
        setAuthToken(token);
        const user = jwt_decode(token);
        dispatch(setCurrentUser(user));
    }).catch(handleErrors);
};

const setCurrentUser = user => ({
    type: SET_CURRENT_USER,
    payload: user
});

export const logoutUser = () => dispatch => {
    localStorage.removeItem("jwt");
    setAuthToken("");
    dispatch(setCurrentUser({}));
}