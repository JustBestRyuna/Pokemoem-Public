import * as authAPI from '../../api/auth';
import { createPromiseThunk } from '../lib/asyncUtils';

export const LOGIN = 'LOGIN';
export const LOGIN_SUCCESS = 'LOGIN_SUCCESS';
export const LOGIN_ERROR = 'LOGIN_ERROR';

export const EARLY_ACCESS = "EARLY_ACCESS";

export const login = createPromiseThunk(LOGIN, authAPI.loginSuccess);

export const changeEarlyAccessAuth = (auth) => {
    return {
        type: EARLY_ACCESS,
        auth
    }
}