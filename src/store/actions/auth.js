import * as actionTypes from './actionTypes';
import axios from 'axios';

export const authStart = () => {
    return {
        type: actionTypes.AUTH_START
    };
};

export const authSuccess = (authData) => {
    return {
        type: actionTypes.AUTH_SUCCESS,
        authData: authData
    };
};

export const authFail = (error) => {
    return {
        type: actionTypes.AUTH_FAIL,
        error: error
    };
};

export const auth = (email, password, isSignup) => {

    return dispatch => {
        dispatch(authStart());
        const authData = {
          email,
          password,
          returnSecureToken: true
        };
        let authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signUp?key=${process.env.REACT_APP_API_KEY}`;
        if (!isSignup)
          authUrl = `https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.REACT_APP_API_KEY}`
        axios.post(authUrl, authData)
          .then(res => {
            console.log(res);
            dispatch(authSuccess(res.data));
          })
          .catch(error => {
            console.log(error.response.data.error.message);
            dispatch(authFail(error));
          })
    };
};
