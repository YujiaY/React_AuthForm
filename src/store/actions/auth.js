import * as actionTypes from './actionTypes';
import axios from 'axios';


// const path = require('path');
// require('dotenv').config({path: path.resolve(__dirname, '../../.env')});
const {API_KEY} = process.env;



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

export const auth = (email, password) => {
    return dispatch => {
        dispatch(authStart());
        const authData = {
          email,
          password,
          returnSecureToken: true
        }
      console.log(require('dotenv').config());
      // axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=AIzaSyDWV5SSXZoBctoZyeY0DMwLTMvgZ5Vnar8`, authData)
        axios.post(`https://identitytoolkit.googleapis.com/v1/accounts:signInWithPassword?key=${process.env.API_KEY}`, authData)
          .then(res => {
            console.log(res);
            dispatch(authSuccess(res.data));
          })
          .catch(error => {
            console.log(error);
            dispatch(authFail(error));
          })
    };
};
