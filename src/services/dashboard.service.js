import { axios, errorHandler, successHandler, endpoints } from "./utils";
// import endpoints from "./utils/endpoints";

export const fetchUsersService = (request) => {
  return axios
    .get(endpoints.fetchUsers(request))
    .then((response) => {
      return successHandler(response);
    })
    .catch((error) => {
      return errorHandler(error);
    });
};

export const deleteUserService = (request) => {
  return axios
    .delete(endpoints.deleteUser(request))
    .then((response) => {
      return successHandler(response);
    })
    .catch((error) => {
      return errorHandler(error);
    });
};

export const addUsersService = (addUsersList) => {
  return axios
    .post(endpoints.addUsers(), addUsersList)
    .then((response) => {
      return successHandler(response);
    })
    .catch((error) => {
      return errorHandler(error);
    });
};

export const fetchSingleUserService = (request) => {
  return axios
    .get(endpoints.fetchSingleUser(request))
    .then((response) => {
      return successHandler(response);
    })
    .catch((error) => {
      return errorHandler(error);
    });
};

export const editUserService = (request) => {
  const userID = request.id;
  delete request.id;
  //   console.log("request", request);
  //   console.log("id", request.id);
  return axios
    .put(endpoints.editUser(userID), request)
    .then((response) => {
      return successHandler(response);
    })
    .catch((error) => {
      return errorHandler(error);
    });
};

export const searchUsersService = (searchParams) => {
  return axios
    .get(endpoints.searchUsers(searchParams))
    .then((response) => {
      return successHandler(response);
    })
    .catch((error) => {
      return errorHandler(error);
    });
};
