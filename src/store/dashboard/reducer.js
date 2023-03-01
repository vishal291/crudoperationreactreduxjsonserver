import ActionTypes from "./actionTypes";
const initialState = {
  users: [],
  user: [],
  userSearchData: null,
  isLoading: false,
};

// 1.)In Action, we are calling a API through service and storing into the action, once the action
// has been dispatch, it will reach to the reducer, reducer will carries out the state transition.
// reducer will be passed to the combine reducer and finally it will be pass to the create store,
// from here only state will be updated and reflected to the UI.
// 2.Reducer will accept two parameter, action and initial state as a parameter, we will define
// here intitial state in the form of object and, what data will be der while calling the api
// that we will define one variable and with default values
const dashboardReducer = (state = initialState, action) => {
  const { type, payload } = action;
  switch (type) {
    case ActionTypes.SHOW_LOADING:
      return {
        ...state,
        isLoading: true,
      };
    case ActionTypes.HIDE_LOADING:
      return {
        ...state,
        isLoading: false,
      };
    case ActionTypes.FETCH_USER_SUCCESS:
      //   console.log("dashboardReducer--payload", payload);
      return {
        ...state,
        users: payload,
      };
    case ActionTypes.DELETE_USER_SUCCESS:
      return {
        ...state,
      };
    case ActionTypes.ADD_USER_SUCCSESS:
      return {
        ...state,
      };
    case ActionTypes.FETCH_SINGLE_USER_SUCCESS:
      return {
        ...state,
        user: payload,
      };
    case ActionTypes.EDIT_USER_SUCCESS:
      return {
        ...state,
      };
    case ActionTypes.SEARCH_USER_SUCCESS:
      return {
        ...state,
        userSearchData: payload,
      };
    default:
      return state;
  }
};
export default dashboardReducer;
