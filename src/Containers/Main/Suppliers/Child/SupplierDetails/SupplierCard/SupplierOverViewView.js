import React, { Component } from "react";
import { FlexContainer } from "../../../../../../Components/UI/Layout";
import { Title, MultiAvatar } from "../../../../../../Components/UI/Elements";
import { connect } from "react-redux";
import { bindActionCreators } from "redux";
// import { handleFeedbackModal } from "../../ShipperAction";
// import ShipperFeedbackModal from "./ShipperFeedbackModal";
import { Tooltip } from "antd";
import { FormattedMessage } from "react-intl";

class SupplierOverViewView extends Component {
  render() {
    const {
        supplier: { name },
      toggleViewType,
      handleFeedbackModal,
      feedbackModal,
    } = this.props;
    return (
      <>
        <div class="flex justify-between">
          <div class="flex start-0 flex-nowrap w-full">
            <div>
              <MultiAvatar />
            </div>
            &nbsp;
            <div class="flex-col w-wk">
              <Title
                overflow="hidden"
                textOverflow="ellipsis"
                fontSize={"0.875rem"}
              >
                {`${name || ""}`}
              </Title>
            </div>
            <Tooltip title={<FormattedMessage id="app.feedback" defaultMessage="Feedback" />}>
              <span
                onClick={() => handleFeedbackModal(true)}
                style={{ cursor: "pointer" }}
              >
                <i
                  class="far fa-comment-alt"
                  style={{ fontSize: "15px" }}
                ></i>
              </span>
            </Tooltip>
          </div>
        </div>
        {/* <ShipperFeedbackModal
          handleFeedbackModal={handleFeedbackModal}
          feedbackModal={feedbackModal}
        /> */}
      </>
    );
  }
}

const mapStateToProps = ({ shipper }) => ({
  feedbackModal: shipper.feedbackModal,
});

const mapDispatchToProps = (dispatch) =>
  bindActionCreators(
    {
      // handleFeedbackModal,
    },
    dispatch
  );

export default connect(
  mapStateToProps,
  mapDispatchToProps
)(SupplierOverViewView);
