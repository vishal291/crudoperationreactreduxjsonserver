const endpoints = {
  fetchUsers: ({ currentPage, limit, sort, status }) =>
    `http://localhost:3001/result?_page=${currentPage}&_limit=${limit}&_sort=${sort}&_order=asc&status=${status}`,
  searchUsers: ({ currentPage, limit, searchText, sort, status }) =>
    `http://localhost:3001/result?_page=${currentPage}&_limit=${limit}&q=${searchText}&_sort=${sort}&_order=asc&status=${status}`,
  deleteUser: (id) => `http://localhost:3001/result/${id}`,
  addUsers: () => `http://localhost:3001/result`,
  fetchSingleUser: (rowId) => `http://localhost:3001/result/${rowId}`,
  editUser: (id) => `http://localhost:3001/result/${id}`,
};
export default endpoints;
