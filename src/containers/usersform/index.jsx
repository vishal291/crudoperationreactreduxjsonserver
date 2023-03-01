import { Button, TextField } from "@mui/material";
import React, { Component } from "react";
import "./index.css";
import Box from "@mui/material/Box";
import {
  addUsers,
  fetchUsers,
  editUser,
  fetchSingleUser,
} from "../../store/dashboard/action";
import { connect } from "react-redux";
import { singleUsersListSelector } from "../../store/dashboard/selector";
import withRouter from "../../common/withRouter";
import { errorToast, successToast } from "../../common/SnackBar";
import successMessages from "../../constants/successMessages";
import errorMessage from "../../constants/errorMessage";

class UserForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      name: "",
      email: "",
      phone: "",
      website: "",
      status: "Active",
    };
  }

  componentDidMount() {
    // console.log("adduser--------componentDidMount");
    this.fetchData();
  }

  fetchData = () => {
    const {
      fetchUsers,
      fetchSingleUser,
      currentPage,
      limit,
      searchText,
      sort,
      status,
    } = this.props;
    const request = {
      currentPage: currentPage,
      limit: limit,
      searchText: searchText,
      sort: sort,
      status: status,
    };
    fetchUsers(request);

    // to fetch the single user firing an action and setting in the state
    const { rowId, isEditMode } = this.props;
    // console.log("componentDidMount ----rowId", rowId);
    if (isEditMode) {
      fetchSingleUser(rowId).then(() => {
        const { singleUser } = this.props;
        const { email, name, phone, website, status } = singleUser;
        this.setState({
          name: name,
          email: email,
          phone: phone,
          website: website,
          status: status,
        });
      });
    }
  };

  handleonChange = (e) => {
    const value = e.target.value;
    this.setState({
      ...this.state,
      [e.target.name]: value,
    });
  };

  handleAddSubmit = () => {
    // console.log("handleAddSubmit");
    const { closeModal } = this.props;
    const { name, email, phone, website, status } = this.state;
    // console.log("handleAddSubmit", name, email, phone, website);
    this.props.addUsers({ name, email, phone, website, status }).then((res) => {
      console.log(res);
      if (typeof res === "object" || {}) {
        this.fetchData();
        successToast(successMessages.addUserSuccessful);
      } else {
        errorToast(errorMessage.addUserFail);
      }
      // this.props.router.navigate("/");
    });
    // to close the modal
    closeModal();
  };

  handleEditSubmit = () => {
    const { name, email, phone, website, status } = this.state;
    //  const { id } = this.props.router.params;
    const { rowId, closeModal } = this.props;
    let id = rowId;
    // console.log("handleSubmit", name, email, phone, website);
    this.props
      .editUser({ id, name, email, phone, website, status })
      .then(() => {
        this.fetchData();
        // this.props.router.navigate("/");
      });
    closeModal();
  };

  render() {
    const { isEditMode, rowId } = this.props;
    // const { rowId } = this.props;
    // console.log("user--render ----rowId", rowId);
    const { name, email, phone, website, status } = this.state;
    return (
      <div className="addUsers-container">
        <h3 style={{ textAlign: "center" }}>
          {isEditMode ? "Edit User" : "Add User"}
        </h3>
        <form>
          <Box
            // component="form"
            sx={{
              "& .MuiTextField-root": { m: 1, width: "25ch" },
            }}
            noValidate
            autoComplete="off"
          >
            <TextField
              id="outlined-name"
              label="Name"
              name="name"
              value={name}
              onChange={this.handleonChange}
            />
            <br />
            <TextField
              id="outlined-name"
              label="Email"
              name="email"
              value={email}
              onChange={this.handleonChange}
            />
            <br />
            <TextField
              id="outlined-name"
              label="Phone"
              name="phone"
              value={phone}
              onChange={this.handleonChange}
            />
            <br />
            <TextField
              id="outlined-name"
              label="website"
              name="website"
              value={website}
              onChange={this.handleonChange}
            />
            <br />
            <TextField
              id="outlined-name"
              label="Status"
              name="status"
              value={status}
              onChange={this.handleonChange}
            />
          </Box>
          <Button
            variant="contained"
            color="success"
            style={{
              width: "14rem",
              height: "3rem",
            }}
            onClick={isEditMode ? this.handleEditSubmit : this.handleAddSubmit}
          >
            Submit
          </Button>
        </form>
      </div>
    );
  }
}

const mapStateToProps = (state) => {
  return {
    singleUser: singleUsersListSelector(state),
  };
};

const mapDispatchToProps = { addUsers, fetchUsers, editUser, fetchSingleUser };

const ConnectedAddUserForm = connect(
  mapStateToProps,
  mapDispatchToProps
)(UserForm);
export default withRouter(ConnectedAddUserForm);
