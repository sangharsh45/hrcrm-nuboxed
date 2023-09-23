import React, { Component, lazy, Suspense } from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import HolidayHeader from "./Child/HolidayHeader";
import { handleHolidayModal } from "./HolidayAction";
const HolidayPage = lazy(() => import("./Child/HolidayPage"));
const HolidayTable = lazy(() => import("./Child/HolidayTable"));
const  AddHolidayModal= lazy(() =>import("./Child/AddHolidayModal"));

class Holiday extends Component {
  componentDidMount() {
    const {
      user: { userId },
    } = this.props;
  }
  render() {
    const { addHolidayModal, handleHolidayModal } = this.props;
    console.log(addHolidayModal);
    return (
      <>
        {/* <React.Fragment> */}
        {/* <HolidayHeader handleHolidayModal={handleHolidayModal} /> */}
        <AddHolidayModal
          addHolidayModal={addHolidayModal}
          handleHolidayModal={handleHolidayModal}
        />
        {/* <HolidayTable /> */}
        <HolidayPage />
      </>
    );
  }
}

const mapStateToProps = ({ auth, holiday }) => ({
  user: auth.userDetails,
  addHolidayModal: holiday.addHolidayModal,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleHolidayModal,
    },
    dispatch
  );

export default connect(mapStateToProps, mapDispatchToProps)(Holiday);
