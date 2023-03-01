import actionTypes from "./actionTypes";
// import { showApiError } from "";
import {
  addUsersService,
  deleteUserService,
  editUserService,
  fetchSingleUserService,
  fetchUsersService,
  searchUsersService,
} from "../../services/dashboard.service";

// will call action from the componenet and pass the required params, here we are using
// redux-thunk to make async call, so we will get dispatch method in parameter,
// to dispatch the action to the store. inside the action method, we are calling a
// service method and inside this service we will pass the required parameter to the service
// method,  finally service method will call the api and return the response, which we will store
// in the redux store

export const showLoader = () => (dispatch) => {
  dispatch({ type: actionTypes.SHOW_LOADING });
};

export const hideLoader = () => (dispatch) => {
  dispatch({ type: actionTypes.HIDE_LOADING });
};

export const fetchUsers = (queryParams) => (dispatch) => {
  dispatch(showLoader());
  return fetchUsersService(queryParams)
    .then((res) => {
      //   if (res.status === "ok") {
      //   console.log("action", res);
      dispatch({
        type: actionTypes.FETCH_USER_SUCCESS,
        payload: res,
      });
      //   }
      setTimeout(() => {
        dispatch(hideLoader());
      }, 1000);
      return res;
    })
    .catch((errorResponse) => {
      dispatch({
        type: actionTypes.FETCH_USER_FAILURE,
        payload: errorResponse,
      });
      //   dispatch(hideLoader());
      //   showApiError(errorResponse);
      return errorResponse;
    });
};
export const deleteUser = (queryParams) => (dispatch) => {
  dispatch(showLoader());
  return deleteUserService(queryParams)
    .then((res) => {
      //   if (res.status === "ok") {
      //   console.log("action", res);
      dispatch({
        type: actionTypes.DELETE_USER_SUCCESS,
        payload: res,
      });
      //   }
      //   dispatch(hideLoader());
      setTimeout(() => {
        dispatch(hideLoader());
      }, 1000);
      return res;
    })
    .catch((errorResponse) => {
      dispatch({
        type: actionTypes.FETCH_USER_FAILURE,
        payload: errorResponse,
      });
      //   dispatch(hideLoader());
      //   showApiError(errorResponse);
      return errorResponse;
    });
};

export const addUsers = (addUsersList) => (dispatch) => {
  dispatch(showLoader());
  return addUsersService(addUsersList)
    .then((res) => {
      //   if (res.status === "ok") {
      //   console.log("action", res);
      dispatch({
        type: actionTypes.ADD_USER_SUCCSESS,
        payload: res,
      });
      //   }
      //   dispatch(hideLoader());
      setTimeout(() => {
        dispatch(hideLoader());
      }, 1000);
      return res;
    })
    .catch((errorResponse) => {
      dispatch({
        type: actionTypes.DELETE_USER_FAILURE,
        payload: errorResponse,
      });
      //   dispatch(hideLoader());
      //   showApiError(errorResponse);
      return errorResponse;
    });
};

export const fetchSingleUser = (queryParams) => (dispatch) => {
  dispatch(showLoader());
  return fetchSingleUserService(queryParams)
    .then((res) => {
      //   if (res.status === "ok") {
      //   console.log("action", res);
      dispatch({
        type: actionTypes.FETCH_SINGLE_USER_SUCCESS,
        payload: res,
      });
      //   }
      //   dispatch(hideLoader());
      setTimeout(() => {
        dispatch(hideLoader());
      }, 1000);
      return res;
    })
    .catch((errorResponse) => {
      dispatch({
        type: actionTypes.FETCH_SINGLE_USER_FAILURE,
        payload: errorResponse,
      });
      //   dispatch(hideLoader());
      //   showApiError(errorResponse);
      return errorResponse;
    });
};

export const editUser = (queryParams) => (dispatch) => {
  dispatch(showLoader());
  return editUserService(queryParams)
    .then((res) => {
      //   if (res.status === "ok") {
      //   console.log("action", res);
      dispatch({
        type: actionTypes.EDIT_USER_SUCCESS,
        payload: res,
      });
      //   }
      //   dispatch(hideLoader());
      setTimeout(() => {
        dispatch(hideLoader());
      }, 1000);
      return res;
    })
    .catch((errorResponse) => {
      dispatch({
        type: actionTypes.EDIT_USER_FAILURE,
        payload: errorResponse,
      });
      //   dispatch(hideLoader());
      //   showApiError(errorResponse);
      return errorResponse;
    });
};

export const searchUsers = (searchParams) => (dispatch) => {
  dispatch(showLoader());
  return searchUsersService(searchParams)
    .then((res) => {
      //   if (res.status === "ok") {
      //   console.log("action", res);
      dispatch({
        type: actionTypes.SEARCH_USER_SUCCESS,
        payload: res,
      });
      //   }
      //   dispatch(hideLoader());
      setTimeout(() => {
        dispatch(hideLoader());
      }, 1000);
      return res;
    })
    .catch((errorResponse) => {
      dispatch({
        type: actionTypes.SEARCH_USER_FAILURE,
        payload: errorResponse,
      });
      //   dispatch(hideLoader());
      //   showApiError(errorResponse);
      return errorResponse;
    });
};
