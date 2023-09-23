import React, { Component } from "react";
import { connect } from "react-redux";
import { FormattedMessage } from "react-intl";
import { bindActionCreators } from "redux";
import { JumpStartBox } from "../../../../../Components/UI/Elements";
import { FlexContainer } from "../../../../../Components/UI/Layout";
import { CurrencySymbol } from "../../../../../Components/Common";

class EmployeeJumpStartForAdmin extends Component {
  render() {
    return (
      <div class=" flex flex-col">
 
        <FlexContainer style={{ width: "100%" }}>
          <JumpStartBox
            title={<FormattedMessage
              id="app.createdon"
              defaultMessage="Created on"
            />}
            noProgress
            stringValue
            bgColor="#005075"
          />
          <CurrencySymbol />

          <JumpStartBox
            noProgress
            stringValue
            title={<FormattedMessage
              id="app.level"
              defaultMessage="Level"
            />}
            bgColor="#0093d7"
          />
        </FlexContainer>
      </div>
    );
  }
}

const mapStateToProps = ({ contact, account, settings }) => ({
});
const mapDispatchToProps = (dispatch) =>
  bindActionCreators({
  }, dispatch);
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(EmployeeJumpStartForAdmin);
