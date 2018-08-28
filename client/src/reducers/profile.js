import {
    GET_PROFILE,
    GET_PROFILES,
    PROFILE_LOADING,
    CLEAR_PROFILE
} from "../actions/types";

const initialState = {
    profile: null,
    profiles: [],
    loading: false
};

export default (state = initialState, action) => {
    switch (action.type) {
        case GET_PROFILE:
            return {
                ...state,
                profile: action.payload,
                loading: false
            };
        case GET_PROFILES:
            return {
                ...state,
                profiles: [...state.profiles, action.payload],
                loading: false
            };
        case PROFILE_LOADING:
            return {
                ...state,
                loading: true
            };
        case CLEAR_PROFILE:
            return {
                ...state,
                profile: {}
            };
        default:
            return state;
    }
}