import { createSelector } from "reselect";

export const dashboardState = (state) => state.dashboard;

// using selector we will take out the reducer and using that we will call varaible which
// we have defined in the action. and using this selector we will call inside the component
// and get the data
export const usersListSelector = createSelector(
  [dashboardState],
  (dashboard) => {
    // console.log("usersListSelector", dashboard?.users);
    return dashboard?.users;
  }
);

export const singleUsersListSelector = createSelector(
  [dashboardState],
  (dashboard) => {
    // console.log("usersListSelector", dashboard?.users);
    return dashboard?.user;
  }
);

export const usersSearchDataSelector = createSelector(
  [dashboardState],
  (dashboard) => {
    // console.log("usersListSelector", dashboard?.users);
    return dashboard?.userSearchData;
  }
);

export const isLoadingSelector = createSelector(
  [dashboardState],
  (dashboard) => {
    return dashboard?.isLoading;
  }
);
