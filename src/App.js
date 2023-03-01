import "./App.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Dashboard from "./containers/dashboard";
// import EditDashboard from "./containers/editDashboard";
import AddUsers from "./containers/usersform";
import Loader from "./common/loader";
import { Component } from "react";
import { connect } from "react-redux";
import { isLoadingSelector } from "./store/dashboard/selector";
import SnackbarToast from "./common/SnackBar";

class App extends Component {
  render() {
    console.log(this.props.isLoading);
    const { isLoading } = this.props;
    return (
      <Router>
        <div className="App">
          <SnackbarToast />
          {isLoading && <Loader isLoading={isLoading} />}
          <Routes>
            <Route exact path="/" element={<Dashboard />} />
            <Route exact path="/add/user" element={<AddUsers />} />
            {/* <Route exact path="/edit/dashboard/:id" element={<EditDashboard />} /> */}
          </Routes>
        </div>
      </Router>
    );
  }
}

const mapStateToProps = (state) => {
  return { isLoading: isLoadingSelector(state) };
};

const mapDispatchToProps = {};

const ConnectedApp = connect(mapStateToProps, mapDispatchToProps)(App);

export default ConnectedApp;
