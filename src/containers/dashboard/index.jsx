import React, { Component } from "react";
import { connect } from "react-redux";
import {
  usersListSelector,
  usersSearchDataSelector,
} from "../../store/dashboard/selector";
import {
  fetchUsers,
  deleteUser,
  // addUsers,
  searchUsers,
} from "../../store/dashboard/action";
import { Button, TextField } from "@mui/material";
import PaginationTable from "../../common/paginationTable";
import { dashboardHeader } from "../../constants/dashboard";
import UserForm from "../usersform";
// modal library
import Modal from "react-modal";
import withRouter from "../../common/withRouter";
import ReactPaginate from "react-paginate";
import axios from "axios";
import Search from "../../common/search";

class Dashboard extends Component {
  constructor(props) {
    super(props);
    this.state = {
      isEditMode: false,
      isShowUser: false,
      modalIsOpen: false,
      items: [],
      itemsPerPage: 0,
      limit: 10,
      currentPage: 0,
      searchText: "",
      isSearchEnabled: false,
      sortText: "",
      filterStatus: "Active",
    };
  }

  componentDidMount() {
    this.fetchData();
  }

  fetchData = () => {
    // console.log("this.state.currentPage", this.state.currentPage);
    const { fetchUsers, searchUsers } = this.props;
    const {
      limit,
      isSearchEnabled,
      searchText,
      currentPage,
      sortText,
      filterStatus,
    } = this.state;

    if (isSearchEnabled) {
      const request = {
        currentPage: currentPage,
        limit: limit,
        searchText: searchText,
        sort: sortText,
        status: filterStatus,
      };
      searchUsers(request).then(() => {
        console.log("then");
        this.setState({ searchText: "" });
      });
    } else {
      const request = {
        currentPage: currentPage,
        limit: limit,
        sort: sortText,
        status: filterStatus,
      };
      fetchUsers(request);
    }

    this.setItemsPerPage();
  };

  handleAction = ({ actionType, row }) => {
    // console.log("dasboard---actionType", actionType, row);
    if (actionType === "editAction") {
      this.setState({
        isEditMode: true,
        isShowUser: true,
        modalIsOpen: true,
        rowId: row.id,
      });
    }
    if (actionType === "deleteAction") {
      // console.log("actionType", actionType);
      // this.setState({ id: row.id });
      // const { id } = this.state;
      let id = row.id;
      this.props.deleteUser(id).then(() => this.fetchData());
    }
  };

  // for Model library
  customStyles = {
    content: {
      top: "50%",
      left: "50%",
      right: "auto",
      bottom: "auto",
      marginRight: "-50%",
      transform: "translate(-50%, -50%)",
    },
  };

  openModal = () => {
    this.setState({ modalIsOpen: true });
  };

  // afterOpenModal = () => {
  //   let subtitle;
  //   // references are now sync'd and can be accessed.
  //   subtitle.style.color = "#f00";
  // };

  closeModal = () => {
    this.setState({ modalIsOpen: false, isShowUser: false });
  };

  // for pagination
  setActivePage = (data) => {
    // console.log("pagination", data.selected);
    // let currentPage = data.selected + 1;
    this.setState({ currentPage: data.selected + 1 }, () => this.fetchData());
    // this.fetchData(currentPage);
    // this.fetchData();
  };

  setItemsPerPage = () => {
    // for pagination, we are doing below, generally we don't need to do this, we will get the
    // total count from the api, we should ask from the api total count, but here we are not getting
    // so to get the total count we are just making direct api call to get the count
    const { limit } = this.state;
    axios
      .get("http://localhost:3001/result")
      .then((response) =>
        this.setState({ itemsPerPage: Math.ceil(response.data.length / limit) })
      );
  };

  // search implementation
  handleSearch = (e) => {
    e.preventDefault();
    this.setState({ isSearchEnabled: true }, () => {
      this.fetchData();
    });
  };
  handleReset = () => {
    this.setState({ isSearchEnabled: false }, () => this.fetchData());
  };

  // sorting implementation
  sortOptions = ["name", "email", "phone", "website"];

  handleSort = (e) => {
    let value = e.target.value;
    this.setState({ sortText: value }, () => {
      this.fetchData();
    });
  };

  // filter implemetation
  handleFilter = (value) => {
    // console.log("value", value);
    this.setState({ filterStatus: value }, () => this.fetchData());
  };

  render() {
    const { usersList, userListSearchData } = this.props;
    // console.log(this.state.searchText);
    const {
      isShowUser,
      modalIsOpen,
      isEditMode,
      rowId,
      itemsPerPage,
      isSearchEnabled,
      sortText,
      currentPage,
      limit,
      searchText,
      filterStatus,
    } = this.state;
    const tableData = isSearchEnabled ? userListSearchData : usersList;
    return (
      <div>
        <Button
          sx={{ m: 2 }}
          variant="contained"
          color="success"
          onClick={() => this.setState({ isShowUser: true, modalIsOpen: true })}
        >
          ADD USER
        </Button>
        {/* for sorting, need to create a seperate component */}
        <div>
          <select value={sortText} onChange={this.handleSort}>
            <option>Please Select Option</option>
            {this.sortOptions.map((option, index) => (
              <option value={option} key={index}>
                {option}
              </option>
            ))}
          </select>
        </div>
        {/* for filter need to create a seperate component */}
        <div>
          <h4>Filter</h4>
          <Button
            sx={{ mr: 2 }}
            variant="contained"
            onClick={() => this.handleFilter("Active")}
          >
            Active
          </Button>
          <Button
            variant="contained"
            color="error"
            onClick={() => this.handleFilter("Inactive")}
          >
            Inactive
          </Button>
        </div>
        {/* Search Implementation, need to create seperate component later */}
        <form onSubmit={this.handleSearch}>
          <TextField
            id="filled-basic"
            label="Search"
            variant="filled"
            sx={{ m: 1, ml: 100 }}
            value={this.state.searchText}
            onChange={(e) => this.setState({ searchText: e.target.value })}
          />
          <Button
            variant="contained"
            color="success"
            sx={{ m: 1.2, padding: "13px" }}
            onClick={this.handleSearch}
          >
            Search
          </Button>
          <Button
            variant="outlined"
            color="error"
            sx={{ padding: "13px" }}
            onClick={() => this.handleReset()}
          >
            Reset
          </Button>
        </form>
        {/* <Search /> */}
        <PaginationTable
          tableProps={{
            columns: dashboardHeader,
            data: tableData,
            handleAction: this.handleAction,
          }}
        />
        {isShowUser && (
          <Modal
            isOpen={modalIsOpen}
            contentLabel="Add Users"
            // onAfterOpen={this.afterOpenModal}
            style={this.customStyles}
            onRequestClose={this.closeModal}
            ariaHideApp={false}
          >
            <UserForm
              isEditMode={isEditMode}
              rowId={rowId}
              closeModal={this.closeModal}
              currentPage={currentPage}
              limit={limit}
              searchText={searchText}
              sort={sortText}
              status={filterStatus}
            />
          </Modal>
        )}
        <ReactPaginate
          previousLabel={"Previous"}
          nextLabel={"Next"}
          breakLabel={"..."}
          pageCount={itemsPerPage}
          marginPagesDisplayed={2}
          pageRangeDisplayed={3}
          onPageChange={this.setActivePage}
          containerClassName={"pagination"}
          pageClassName={"page-item"}
          pageLinkClassName={"page-link"}
          previousClassName={"page-item"}
          previousLinkClassName={"page-link"}
          nextClassName={"page-item"}
          nextLinkClassName={"page-link"}
          breakClassName={"page-item"}
          breakLinkClassName={"page-link"}
          activeClassName={"active"}
        />
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    usersList: usersListSelector(state),
    userListSearchData: usersSearchDataSelector(state),
  };
};

const mapDispatchToProps = { fetchUsers, deleteUser, searchUsers };

const ConnectedDashboard = connect(
  mapStateToProps,
  mapDispatchToProps
)(Dashboard);

export default withRouter(ConnectedDashboard);
