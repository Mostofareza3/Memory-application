import { AUTH, LOGOUT } from '../constants/actionTypes';

const authReducer = (state = { authData : null }, action) => {
    switch (action.type) {
        case AUTH:
            console.log(state);
            return state;

        default:
            return state
    }
};

export default authReducer;