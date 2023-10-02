import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { handleEventModal } from "../EventAction";
import EventSharedForm from "./EventSharedForm";

class EventActionRight extends React.Component {
  state = {
    isClicked: "import",
  };
  componentDidMount() {
  }
  handleClicked = (value) => {
    this.setState({
      isClicked: value,
    });
  };
  render() {
    const {
      userId,
      user,
      role,
      handleCustomerModal,
    } = this.props;
    const { handleEventModal } = this.props;
    return (
      <div class=" flex items-center" >
         {user.employee_type === "contractor" && user.candiContShareInd === true || user.employee_type === "employee" && user.candiEmpShareInd === true && user.eventFullListInd === true &&(
         <EventSharedForm/>
         )} 
        <Tooltip placement="left" title="Create">
          <Button type="primary"
           ghost onClick={() => handleEventModal(true)}>
            Add
          </Button>
        </Tooltip>
      </div>
    );
  }
}

const mapStateToProps = ({ auth,event }) => ({
  user: auth.userDetails,
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleEventModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EventActionRight);
