import React from "react";
import { bindActionCreators } from "redux";
import { connect } from "react-redux";
import { Route, Redirect, withRouter } from "react-router-dom";
import axios from "axios";
import { message } from "antd";
import {
  // setFiscalTimeInterval,
  setFiscalTimeIntervalReport,
  // setFiscalTimeIntervalTeam,
  // setFiscalTimeIntervalViewport,
} from "../../Containers/Auth/AuthAction";
class PrivateRoute extends React.Component {
  componentDidMount() {
    if (sessionStorage.getItem("userDetails")) {
      // this.props.setFiscalTimeInterval(
      //   JSON.parse(sessionStorage.getItem("userDetails"))
      // );
      this.props.setFiscalTimeIntervalReport(
        JSON.parse(sessionStorage.getItem("userDetails"))
      );
      // this.props.setFiscalTimeIntervalTeam(
      //   JSON.parse(sessionStorage.getItem("userDetails"))
      // );
      // this.props.setFiscalTimeIntervalViewport(
      //   JSON.parse(sessionStorage.getItem("userDetails"))
      // );
    }
    axios.interceptors.response.use(
      (response) => {
        return response;
      },
      (error) => {
        //catches if the session ended!
        if (error.response.status == 401) {
          sessionStorage.clear();
          // store.dispatch({ type: LOGOUT });
          this.props.history.push("/login");
          message.error("Your session has expired. Please re-login.");
        }
        return Promise.reject(error);
      }
    );
    if (!this.props.token) {
      this.props.history.push("/login");
      message.error("Your session has expired. Please re-login.");
    }
    // if (sessionStorage.getItem('userDetails')) {
    //     this.props.setFiscalTimeInterval(sessionStorage.getItem('userDetails'))
    // }
  }
  componentWillUpdate(nextProps) {
    if (!nextProps.token) {
      this.props.history.push("/login");
    }
  }
  render() {
    const { component: Component, ...rest } = this.props;
    return (
      <Route
        {...rest}
        render={(props) =>
          sessionStorage.getItem("token") ? (
            <Component {...props} />
          ) : (
            <Redirect to="/login" />
          )
        }
      />
    );
  }
}

const mapStateToProps = ({ auth }) => {
  return {
    token: auth.token || JSON.stringify(sessionStorage.getItem("token")),
  };
};
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // setFiscalTimeInterval,
      setFiscalTimeIntervalReport,
      // setFiscalTimeIntervalTeam,
      // setFiscalTimeIntervalViewport,
    },
    dispatch
  );
export default withRouter(
  connect(mapStateToProps, mapDispatchToProps)(PrivateRoute)
);
