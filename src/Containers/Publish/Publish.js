import React, { Component, Suspense, lazy } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
 const PublishHeader = lazy(() => import("./Child/PublishHeader"));
 const PublishTable = lazy(() => import("./Child/PublishTable"));


class  Publish extends Component {
  state = { currentData: "" };
  handleClear = () => {
    this.setState({ currentData: "" });

  };
  setCurrentData = (value) => {
    this.setState({ currentData: value });
  };

  render() {
    return (
      <React.Fragment>
        <PublishHeader
            viewType={this.props.viewType}
            setPublishViewType={this.props.setPublishViewType}
          handleClear={this.handleClear}
          currentData={this.state.currentData}
          setCurrentData={this.setCurrentData}
        />
        <PublishTable/>
         
      </React.Fragment>
    );
  }
}

const mapStateToProps = ({ customer, auth }) => ({
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(Publish);
