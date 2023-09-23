import React from "react";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
import Button from "antd/lib/button";
import { Tooltip } from "antd";
import { handleEventModal } from "../EventAction";

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
    const { handleEventModal } = this.props;
    return (
      <div class=" flex items-center" >
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

const mapStateToProps = ({ event }) => ({});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      handleEventModal,
    },
    dispatch
  );
export default connect(mapStateToProps, mapDispatchToProps)(EventActionRight);
