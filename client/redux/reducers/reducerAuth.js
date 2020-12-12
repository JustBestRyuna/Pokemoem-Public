import * as actions from '../actions/Auth';
import { reducerUtils } from '../lib/asyncUtils';

const initialState = {
    user: {},
    authenticated: false,
    earlyAccess: false
}

export default function authReducer (state = initialState, action) {
    switch (action.type) {
        case actions.LOGIN:
            return {
                ...state,
                user: reducerUtils.loading(),
                authenticated: false,
            };
        case actions.LOGIN_SUCCESS:
            return {
                ...state,
                user: reducerUtils.success(action.payload),
                authenticated: true
            }
        case actions.LOGIN_ERROR:
            return {
                ...state,
                user: reducerUtils.error(action.payload),
                authenticated: false
            }
        case actions.EARLY_ACCESS:
            return {
                ...state,
                earlyAccess: true
            }
        default:
            return state;
    }
}